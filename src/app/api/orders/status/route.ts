import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// 결제 미확정 상태들 (의미 단위)
const PENDING_STATUSES = ["결제대기", "결제보류"];

// 만료 기준 (5분)
const EXPIRE_MS = 5 * 60 * 1000;

export async function GET(req: Request) {
  console.log("[STATUS API HIT] v2026-01-xx");

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { ok: false, error: "missing orderId" },
      { status: 400 }
    );
  }

  const { data: order, error } = await supabase
    .from("orders")
    .select("status, created_at")
    .eq("id", orderId)
    .single();

  if (error || !order) {
    return NextResponse.json(
      { ok: false, error: "order not found" },
      { status: 404 }
    );
  }

  const status = order.status?.trim();
  const createdMs = new Date(order.created_at).getTime();
  const nowMs = Date.now();
  const diffMs = nowMs - createdMs;

  console.log("[STATUS CHECK]", {
    orderId,
    status,
    created_at: order.created_at,
    createdMs,
    nowMs,
    diffMs,
    expireMs: EXPIRE_MS,
  });

  // ─────────────────────────────
  // 만료 판정 (pending 계열만)
  // ─────────────────────────────
  if (
    PENDING_STATUSES.includes(status) &&
    diffMs > EXPIRE_MS
  ) {
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: "만료" })
      .eq("id", orderId);

    console.log("[STATUS UPDATE RESULT]", { updateError });

    const { data: after, error: afterError } = await supabase
      .from("orders")
      .select("status")
      .eq("id", orderId)
      .single();

    console.log("[STATUS AFTER UPDATE]", { after, afterError });

    return NextResponse.json({ ok: true, status: "만료" });
  }

  // 그 외는 현재 상태 그대로 반환
  return NextResponse.json({
    ok: true,
    status: order.status,
  });
}
