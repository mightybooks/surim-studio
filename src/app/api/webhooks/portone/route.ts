import { createHash } from "crypto";
import { NextResponse } from "next/server";
import * as PortOne from "@portone/server-sdk";
import { isValidPaymentId } from "@/lib/paymentId";
import { serviceRoleClient } from "@/lib/securityServer";

const MAX_WEBHOOK_BYTES = 64 * 1024;

type PaymentDetails = {
  id?: unknown;
  amount?: { total?: unknown };
  currency?: unknown;
  orderName?: unknown;
  storeId?: unknown;
  status?: unknown;
};

function response(status = 200) {
  return NextResponse.json({ ok: status < 400 }, { status });
}

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_WEBHOOK_BYTES) return response(413);
  const rawBody = await req.text();
  if (Buffer.byteLength(rawBody, "utf8") > MAX_WEBHOOK_BYTES) return response(413);

  const webhookSecret = process.env.PORTONE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("portone webhook secret is not configured");
    return response(500);
  }

  let webhook: Awaited<ReturnType<typeof PortOne.Webhook.verify>>;
  try {
    webhook = await PortOne.Webhook.verify(webhookSecret, rawBody, Object.fromEntries(req.headers));
  } catch {
    return response(400);
  }

  if (!("data" in webhook) || !("paymentId" in webhook.data)) return response();
  const paymentId = webhook.data.paymentId;
  const eventId = req.headers.get("webhook-id") ?? "";
  // The SDK accepts any non-empty webhook-id and authenticates its exact value
  // as part of the signature input. Do not impose a guessed UUID/charset format.
  if (!isValidPaymentId(paymentId) || !eventId) return response(400);

  const secretKey = process.env.PORTONE_SECRET_KEY;
  if (!secretKey) return response(500);

  let payment: PaymentDetails;
  try {
    const paymentRes = await fetch(
      `https://api.portone.io/payments/${encodeURIComponent(paymentId)}`,
      {
        headers: {
          Authorization: `PortOne ${secretKey}`,
          "X-PortOne-Api-Version": "2024-01-01",
        },
        cache: "no-store",
      },
    );
    if (paymentRes.status === 404) return response();
    if (!paymentRes.ok) return response(502);
    payment = await paymentRes.json();
  } catch {
    return response(502);
  }

  const supabase = serviceRoleClient();
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id, portone_payment_id, status, amount_minor, amount, currency, product_name")
    .eq("portone_payment_id", paymentId)
    .maybeSingle();
  if (orderError) return response(500);
  if (!order) return response();

  const expectedAmount = Number(order.amount_minor ?? order.amount);
  const paymentAmount = Number(payment?.amount?.total);
  const paymentCurrency = String(payment?.currency ?? "").toUpperCase();
  const paymentOrderName = String(payment?.orderName ?? "");
  const storeId = process.env.PORTONE_STORE_ID ?? process.env.NEXT_PUBLIC_PORTONE_STORE_ID;

  if (
    order.portone_payment_id !== paymentId ||
    payment?.id !== paymentId ||
    paymentAmount !== expectedAmount ||
    paymentCurrency !== String(order.currency).toUpperCase() ||
    paymentOrderName !== order.product_name ||
    (storeId && payment?.storeId !== storeId)
  ) {
    return response();
  }

  let nextStatus: "paid" | "failed" | null = null;
  if (payment.status === "PAID") nextStatus = "paid";
  if (payment.status === "FAILED" || payment.status === "CANCELLED") nextStatus = "failed";

  if (nextStatus) {
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: nextStatus, portone_payment_id: paymentId })
      .eq("id", order.id)
      .eq("status", "pending");
    if (updateError) return response(500);
  }

  const payloadHash = createHash("sha256").update(rawBody).digest("hex");
  const { error: eventError } = await supabase.from("payment_webhooks").upsert(
    {
      provider: "portone",
      provider_event_id: eventId,
      payload_hash: payloadHash,
      event_status: payment.status ?? null,
      event_type: webhook.type,
      payment_id: paymentId,
      merchant_uid: paymentId,
      raw_payload: {
        type: webhook.type,
        timestamp: "timestamp" in webhook ? webhook.timestamp : null,
        storeId: "storeId" in webhook.data ? webhook.data.storeId : null,
      },
      processed_at: new Date().toISOString(),
    },
    { onConflict: "provider,provider_event_id", ignoreDuplicates: true },
  );
  if (eventError) return response(500);

  return response();
}
