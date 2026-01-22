// src/app/api/orders/status/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { OrderStatus } from "@/lib/orderStatus";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * 결제가 확정되지 않은 상태들
 * - UX / 운영 편의상 구분되지만
 * - 논리적으로는 모두 "미완료"
 */
const PENDING_STATUSES: OrderStatus[] = ["pending"];

/**
 * 주문 만료 기준 (5분)
 * - 이 시간 이후 미완료 상태면 실패 처리
 */
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

  /* -----------------------------
     주문 조회
  ----------------------------- */
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

  /* -----------------------------
     시간 / 상태 계산
  ----------------------------- */
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

  /* -----------------------------
     만료 판정
     - 결제대기 / 결제보류 모두
     - 일정 시간 초과 시 "만료"로 강제 종료
  ----------------------------- */
  if (
    PENDING_STATUSES.includes(status) &&
    diffMs > EXPIRE_MS
  ) {
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status: "expired" })
      .eq("id", orderId);

    console.log("[STATUS UPDATE RESULT]", { orderId, updateError });

    // 실제 반영 여부 재확인 (디버깅용)
    const { data: after, error: afterError } = await supabase
      .from("orders")
      .select("status")
      .eq("id", orderId)
      .single();

    console.log("[STATUS AFTER UPDATE]", { after, afterError });

    return NextResponse.json({
      ok: true,
      status: "expired",
    });
  }

  /* -----------------------------
     그 외: 현재 상태 그대로 반환
  ----------------------------- */
  return NextResponse.json({
    ok: true,
    status,
  });
}
