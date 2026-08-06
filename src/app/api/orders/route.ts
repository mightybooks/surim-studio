import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { calculateOrderAmount, getOrderCatalogProduct, type Currency, type PaymentGateway } from "@/lib/orderCatalog";
import { majorToMinor } from "@/lib/formatMoney";
import { isValidPaymentId } from "@/lib/paymentId";
import { cleanSingleLine, hasValidOrigin, readJsonBody, serviceRoleClient } from "@/lib/securityServer";

const MAX_QTY_PER_ORDER = 100;
const PRODUCT_ID_PATTERN = /^[a-z0-9][a-z0-9_-]{1,79}$/i;
const PHONE_PATTERN = /^[0-9+()\- ]{7,24}$/;
const ZIPCODE_PATTERN = /^[a-z0-9 -]{2,12}$/i;

function error(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

export async function POST(req: Request) {
  if (!hasValidOrigin(req)) return error("허용되지 않은 요청 출처입니다.", 403);
  const parsed = await readJsonBody(req);
  if (!parsed.ok) return error(parsed.error, parsed.status);
  const body = parsed.value;

  const productId = cleanSingleLine(body.productId, 80);
  if (!productId || !PRODUCT_ID_PATTERN.test(productId)) return error("상품 ID가 올바르지 않습니다.", 400);
  const product = getOrderCatalogProduct(productId);
  if (!product) return error("존재하지 않는 상품입니다.", 404);
  if (!product.active) return error("판매가 종료된 상품입니다.", 410);
  if (!product.shippable) return error("현재 배송할 수 없는 상품입니다.", 403);

  const quantity = Number(body.quantity ?? 1);
  if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > MAX_QTY_PER_ORDER) {
    return error("수량이 올바르지 않습니다.", 400);
  }

  const currency = cleanSingleLine(body.currency ?? "KRW", 3)?.toUpperCase();
  const pg = cleanSingleLine(body.pg ?? "inicis", 16)?.toLowerCase();
  if (currency !== "KRW" && currency !== "USD") return error("지원하지 않는 통화입니다.", 400);
  if (pg !== "inicis" && pg !== "paypal") return error("지원하지 않는 결제수단입니다.", 400);
  const typedCurrency = currency as Currency;
  const typedPg = pg as PaymentGateway;
  const catalogPrice = product.prices[typedCurrency];
  if (!catalogPrice || !product.allowedPgs.includes(typedPg)) return error("허용되지 않는 상품 결제 조합입니다.", 400);
  const unitMinor = catalogPrice.unitAmountMinor;
  if ((typedCurrency === "USD") !== (typedPg === "paypal")) return error("통화와 결제수단이 일치하지 않습니다.", 400);
  const amountMinor = calculateOrderAmount(unitMinor, quantity);
  if (!amountMinor) return error("결제 금액을 계산할 수 없습니다.", 400);

  // Legacy values are comparison-only and never become stored order values.
  if (body.productName != null && String(body.productName).trim() !== product.name) return error("상품 정보가 일치하지 않습니다.", 400);
  if (body.amount_minor != null && Number(body.amount_minor) !== unitMinor) return error("결제 금액이 일치하지 않습니다.", 400);
  if (body.price != null && Number(body.price) > 0) {
    const legacyMinor = majorToMinor(Number(body.price), typedCurrency);
    if (legacyMinor === null || legacyMinor !== unitMinor) return error("결제 금액이 일치하지 않습니다.", 400);
  }

  const recipientName = cleanSingleLine(body.recipientName, 80);
  const phone = cleanSingleLine(body.phone, 24);
  const zipcode = cleanSingleLine(body.zipcode, 12);
  const address = cleanSingleLine(body.address, 300);
  const addressDetail = cleanSingleLine(body.addressDetail, 200);
  const deliveryMemo = cleanSingleLine(body.delivery_memo, 300);
  if (!recipientName || !phone || !zipcode || !address || addressDetail === null || deliveryMemo === null) {
    return error("필수 주문 정보가 누락되었거나 너무 깁니다.", 400);
  }
  if (!PHONE_PATTERN.test(phone) || !ZIPCODE_PATTERN.test(zipcode)) return error("전화번호 또는 우편번호 형식이 올바르지 않습니다.", 400);

  const receiptType = cleanSingleLine(body.receipt_type ?? "NONE", 8)?.toUpperCase();
  if (!receiptType || !["NONE", "CASH", "BUSINESS"].includes(receiptType)) return error("증빙 유형이 올바르지 않습니다.", 400);
  const receiptValue = cleanSingleLine(body.receipt_value, 40);
  if (receiptValue === null || (receiptType !== "NONE" && !receiptValue)) return error("증빙 발행 번호를 확인해 주세요.", 400);
  const channelKey = cleanSingleLine(body.channelKey, 200);
  if (channelKey === null || (typedPg === "paypal" && !channelKey)) return error("결제 채널 정보가 올바르지 않습니다.", 400);

  const supabase = await supabaseServer();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return error("로그인이 필요합니다.", 401);
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("contact_email, contact_email_verified_at")
    .eq("id", user.id)
    .single();
  if (profileError || !profile?.contact_email_verified_at) return error("이메일 인증을 완료한 회원만 결제할 수 있습니다.", 403);

  const { data: existing } = await supabase
    .from("orders")
    .select("id, portone_payment_id")
    .eq("user_id", user.id)
    .eq("product_id", product.id)
    .eq("product_name", product.name)
    .eq("status", "pending")
    .eq("currency", typedCurrency)
    .eq("pg", typedPg)
    .eq("amount_minor", amountMinor)
    .eq("quantity", quantity)
    .eq("source", product.source)
    .eq("channel_key", channelKey)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (existing) {
    const existingPaymentId = existing.id;
    if (!isValidPaymentId(existingPaymentId)) return error("저장된 결제 ID가 올바르지 않습니다.", 500);
    if (existing.portone_payment_id && existing.portone_payment_id !== existingPaymentId) {
      return error("저장된 결제 ID가 주문과 일치하지 않습니다.", 409);
    }
    const { error: bindError } = await serviceRoleClient()
      .from("orders")
      .update({ portone_payment_id: existingPaymentId })
      .eq("id", existingPaymentId)
      .is("portone_payment_id", null);
    if (bindError) return error("결제 ID를 주문에 연결하지 못했습니다.", 500);
    return NextResponse.json({ orderId: existingPaymentId, status: "pending" });
  }

  const orderId = randomUUID();
  if (!isValidPaymentId(orderId)) return error("결제 ID를 생성하지 못했습니다.", 500);
  const { error: insertError } = await serviceRoleClient().from("orders").insert({
    id: orderId,
    user_id: user.id,
    product_id: product.id,
    product_name: product.name,
    amount: amountMinor,
    amount_minor: amountMinor,
    currency: typedCurrency,
    pg: typedPg,
    channel_key: channelKey || null,
    quantity,
    source: product.source,
    recipient_name: recipientName,
    phone,
    zipcode,
    address,
    address_detail: addressDetail,
    delivery_memo: deliveryMemo || null,
    receipt_type: receiptType,
    receipt_value: receiptType === "NONE" ? null : receiptValue,
    buyer_email: profile.contact_email,
    portone_payment_id: orderId,
    status: "pending",
  });
  if (insertError) {
    console.error("order insert failed", { code: insertError.code });
    return error("주문 생성에 실패했습니다.", 500);
  }
  return NextResponse.json({ orderId, status: "pending" }, { status: 201 });
}
