// src/app/api/orders/route.ts

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { randomUUID } from "crypto";

const MAX_QTY_PER_ORDER = 100;
const FUNDING_500_ACTIVE = false; // 2026 2월 펀딩 종료

function normalizeCurrency(v: unknown) {
  const c = String(v ?? "KRW").toUpperCase();
  return c === "USD" ? "USD" : "KRW";
}

function normalizePg(v: unknown) {
  const p = String(v ?? "").toLowerCase();
  // 지금은 paypal만 해외로 쓰니 최소 셋업
  return p === "paypal" ? "paypal" : "inicis"; // 기본 국내는 inicis로 귀속
}

/**
 * price(major unit) -> amount_minor(int)
 * KRW: 4900 -> 4900
 * USD: 5.99 -> 599
 */
function toMinorAmount(currency: "KRW" | "USD", price: unknown) {
  const n = Number(price);
  if (!Number.isFinite(n) || n <= 0) return null;
  if (currency === "USD") return Math.round((n + Number.EPSILON) * 100);
  return Math.round(n); // KRW는 원 단위 정수
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      productId,
      productName,
      price,
      amount_minor: rawAmountMinor,
      currency: rawCurrency,
      pg: rawPg,
      channelKey: rawChannelKey,
      recipientName,
      phone,
      zipcode,
      address,
      addressDetail,
      quantity: rawQuantity,
      source: rawSource,
    } = body;

    console.log("[orders] money inputs:", {
      rawCurrency,
      rawPg,
      rawChannelKey: Boolean(rawChannelKey),
      price,
      rawAmountMinor,
    });

    // ✅ quantity 기본값/검증 (없으면 1)
    const quantity = Number.isFinite(Number(rawQuantity))
      ? Math.floor(Number(rawQuantity))
      : 1;

    if (quantity < 1 || quantity > MAX_QTY_PER_ORDER) {
      return NextResponse.json(
        { message: `수량은 1~${MAX_QTY_PER_ORDER} 사이여야 합니다.` },
        { status: 400 }
      );
    }

    // ✅ source는 펀딩일 때만 허용(그 외에는 shop으로 강제)
    const source = rawSource === "funding_500" ? "funding_500" : "shop";

    /* -----------------------------
      최소 유효성 검사
    ----------------------------- */
    if (
      !productId ||
      !productName ||
      ((price === undefined || price === null) &&
        (rawAmountMinor === undefined || rawAmountMinor === null)) ||
      !recipientName ||
      !phone ||
      !zipcode ||
      !address
    ) {
      return NextResponse.json(
        { message: "필수 주문 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    // ✅ 펀딩 종료 차단 (서버 방어선)
    const isFunding500 =
      source === "funding_500" || String(productId).startsWith("funding_500_");

    if (isFunding500 && !FUNDING_500_ACTIVE) {
      return NextResponse.json(
        {
          message: "이 펀딩은 종료되었습니다. 아카이브를 확인해 주세요.",
          redirectTo: "/projects/500funding-archive",
        },
        { status: 403 }
      );
    }

    const supabase = supabaseServer();

    /* -----------------------------
       로그인 체크
    ----------------------------- */
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    /* -----------------------------
       이메일 인증 체크
    ----------------------------- */
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("contact_email, contact_email_verified_at")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.contact_email_verified_at) {
      return NextResponse.json(
        { message: "이메일 인증이 완료된 회원만 결제할 수 있습니다." },
        { status: 403 }
      );
    }

    /* -----------------------------
       ✅ 결제모드 정규화 & 검증
    ----------------------------- */
    const currency = normalizeCurrency(rawCurrency); // "KRW" | "USD"
    const pg = normalizePg(rawPg); // "inicis" | "paypal"
    const channelKey = String(rawChannelKey ?? "").trim() || null;

    // 해외 결제 규칙(현재는 PayPal만)
    if (currency === "USD") {
      if (pg !== "paypal") {
        return NextResponse.json(
          { message: "USD 결제는 PayPal(pg=paypal)만 지원합니다." },
          { status: 400 }
        );
      }
      if (!channelKey) {
        return NextResponse.json(
          { message: "PayPal 채널키(channelKey)가 없습니다." },
          { status: 400 }
        );
      }
    }

    /* -----------------------------
       ✅ 금액 기준 전환: amount_minor 우선
       - amount_minor가 있으면 그 값을 기준으로 사용
       - price가 함께 오면 교차 검증(불일치 시 400)
    ----------------------------- */
    const parsedAmountMinor =
      Number.isFinite(Number(rawAmountMinor)) && Number(rawAmountMinor) > 0
        ? Math.floor(Number(rawAmountMinor))
        : null;

    // amount_minor가 없으면(구버전) price로 계산하여 사용
    const fallbackAmountMinor =
      parsedAmountMinor ?? toMinorAmount(currency, price);

    if (!fallbackAmountMinor) {
      return NextResponse.json(
        { message: "결제 금액이 올바르지 않습니다." },
        { status: 400 }
      );
    }

    // price가 함께 왔다면 교차검증 (조작/불일치 방지)
    const priceNum = Number(price);

    if (Number.isFinite(priceNum) && priceNum > 0) {
      const expected = toMinorAmount(currency, priceNum);
      if (!expected || expected !== fallbackAmountMinor) {
        return NextResponse.json(
          { message: "결제 금액이 일치하지 않습니다." },
          { status: 400 }
        );
      }
    }

    const amount_minor = fallbackAmountMinor;

    /* -----------------------------
       기존 pending 주문 재사용
       ✅ 결제모드까지 동일할 때만 재사용
    ----------------------------- */
    const { data: existing } = await supabase
      .from("orders")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .eq("status", "pending")
      .eq("currency", currency)
      .eq("pg", pg)
      .eq("amount_minor", amount_minor)
      .eq("quantity", quantity)
      .eq("source", source)
      .eq("channel_key", channelKey)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { orderId: existing.id, status: "pending" },
        { status: 200 }
      );
    }

    /* -----------------------------
       주문 생성 (pending)
    ----------------------------- */
    const orderId = randomUUID();

    const { error } = await supabase.from("orders").insert({
      id: orderId,
      user_id: user.id,
      product_id: productId,
      product_name: productName,

      // ✅ amount는 기존 int 컬럼일 가능성이 높으므로 "결제 기준값"으로 통일 (항상 정수)
      // - KRW: 원 단위
      // - USD: 센트 단위
      amount: amount_minor,
      amount_minor,
      currency,
      pg,
      channel_key: channelKey,
    
      quantity,
      source,

      recipient_name: recipientName,
      phone,
      zipcode,
      address,
      address_detail: String(addressDetail ?? "").trim(),
      buyer_email: profile.contact_email,
      status: "pending",
    });

    if (error) {
      console.error("Order insert error:", error);
      return NextResponse.json(
        { message: "주문 생성에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json({ orderId, status: "pending" }, { status: 201 });
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
