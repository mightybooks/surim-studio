import { NextResponse } from "next/server";
import { getAdminContext, hasValidOrigin, readJsonBody, UUID_PATTERN } from "@/lib/securityServer";

const ALLOWED_STATUSES = ["failed", "expired", "shipped"] as const;
const TRACKING_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._ -]{2,79}$/;

export async function POST(req: Request) {
  if (!hasValidOrigin(req)) {
    return NextResponse.json({ ok: false, error: "FORBIDDEN_ORIGIN" }, { status: 403 });
  }

  const admin = await getAdminContext();
  if (!admin.ok) {
    return NextResponse.json(
      { ok: false, error: admin.status === 401 ? "UNAUTHORIZED" : "FORBIDDEN" },
      { status: admin.status },
    );
  }

  const parsed = await readJsonBody(req, 4096);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: parsed.status });
  }
  const orderId = String(parsed.value.orderId ?? "").trim();
  const status = String(parsed.value.status ?? "").trim();
  const trackingNumber = String(parsed.value.trackingNumber ?? "").trim();

  if (!UUID_PATTERN.test(orderId) || !ALLOWED_STATUSES.includes(status as typeof ALLOWED_STATUSES[number])) {
    return NextResponse.json({ ok: false, error: "INVALID_INPUT" }, { status: 400 });
  }
  if (status === "shipped" && !TRACKING_PATTERN.test(trackingNumber)) {
    return NextResponse.json({ ok: false, error: "INVALID_TRACKING_NUMBER" }, { status: 400 });
  }

  if (status === "paid") {
    return NextResponse.json(
      { ok: false, error: "status paid is not allowed on this endpoint" },
      { status: 400 }
    );
  }

  const update: Record<string, string> = { status };
  if (status === "shipped") {
    update.tracking_number = trackingNumber;
    update.shipped_at = new Date().toISOString();
  }

  const { data: existingOrder, error: lookupError } = await admin.adminClient
    .from("orders")
    .select("status")
    .eq("id", orderId)
    .maybeSingle();
  if (lookupError) return NextResponse.json({ ok: false, error: "LOOKUP_FAILED" }, { status: 500 });
  if (!existingOrder) return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });
  const expectedCurrentStatus = status === "shipped" ? "paid" : "pending";
  if (existingOrder.status !== expectedCurrentStatus) {
    return NextResponse.json({ ok: false, error: "INVALID_STATUS_TRANSITION" }, { status: 409 });
  }

  const { data, error } = await admin.adminClient
    .from("orders")
    .update(update)
    .eq("id", orderId)
    .eq("status", expectedCurrentStatus)
    .select("id")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ ok: false, error: "UPDATE_FAILED" }, { status: 500 });
  }

  if (!data) return NextResponse.json({ ok: false, error: "NOT_FOUND" }, { status: 404 });

  return NextResponse.json({ ok: true });
}
