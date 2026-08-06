import { NextResponse } from "next/server";
import { sendShippingMail } from "@/lib/mail/sendShippingMail";
import { cleanSingleLine, getAdminContext, hasValidOrigin, readJsonBody, UUID_PATTERN } from "@/lib/securityServer";

const TRACKING_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._ -]{2,79}$/;

export async function POST(req: Request) {
  if (!hasValidOrigin(req)) return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  const admin = await getAdminContext();
  if (!admin.ok) return NextResponse.json({ message: admin.status === 401 ? "Unauthorized" : "Forbidden" }, { status: admin.status });
  const parsed = await readJsonBody(req, 4096);
  if (!parsed.ok) return NextResponse.json({ message: parsed.error }, { status: parsed.status });

  const orderId = cleanSingleLine(parsed.value.orderId, 36) ?? "";
  const trackingNumber = cleanSingleLine(parsed.value.trackingNumber, 80) ?? "";
  const carrier = cleanSingleLine(parsed.value.carrier, 40);
  if (!UUID_PATTERN.test(orderId) || !TRACKING_PATTERN.test(trackingNumber) || carrier === null) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  const { data: order, error: orderError } = await admin.adminClient
    .from("orders")
    .select("status, buyer_email, product_name")
    .eq("id", orderId)
    .maybeSingle();
  if (orderError) return NextResponse.json({ message: "Order lookup failed" }, { status: 500 });
  if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 });
  if (order.status !== "paid") return NextResponse.json({ message: "Invalid order status" }, { status: 409 });

  const { data: updated, error: updateError } = await admin.adminClient
    .from("orders")
    .update({
      status: "shipped",
      tracking_number: trackingNumber,
      shipping_carrier: carrier || null,
      shipped_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .eq("status", "paid")
    .select("id")
    .maybeSingle();
  if (updateError) return NextResponse.json({ message: "Shipping update failed" }, { status: 500 });
  if (!updated) return NextResponse.json({ message: "Order state changed" }, { status: 409 });

  try {
    await sendShippingMail({ to: order.buyer_email, productName: order.product_name, trackingNumber });
  } catch {
    console.error("shipping email failed", { orderId });
  }
  return NextResponse.json({ ok: true });
}
