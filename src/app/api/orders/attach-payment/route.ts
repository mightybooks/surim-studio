import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { verifyPortonePayment } from "@/lib/portone"; // ← verify 로직 분리 권장

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { orderId, portonePaymentId } = await req.json();

    if (!orderId || !portonePaymentId) {
      return NextResponse.json(
        { ok: false, error: "missing params" },
        { status: 400 }
      );
    }

    /** 1. 주문 조회 */
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("id, status, amount, portone_payment_id")
      .eq("id", orderId)
      .single();

    if (fetchError || !order) {
      return NextResponse.json(
        { ok: false, error: "order not found" },
        { status: 404 }
      );
    }

    /** 2. 이미 결제 완료된 주문 (idempotency) */
    if (order.status === "결제완료") {
      if (order.portone_payment_id === portonePaymentId) {
        return NextResponse.json({ ok: true });
      }

      return NextResponse.json(
        { ok: false, error: "paymentId conflict" },
        { status: 409 }
      );
    }

    /** 2-1. 이미 paymentId가 attach된 주문 방어 */
    if (order.portone_payment_id) {
    if (order.portone_payment_id === portonePaymentId) {
        // 같은 paymentId면 idempotent success
        return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
        { ok: false, error: "paymentId already attached" },
        { status: 409 }
    );
    }

    /** 3. PortOne 결제 검증 (내부 verify) */
    const verification = await verifyPortonePayment(portonePaymentId);

    if (!verification.ok || verification.status !== "PAID") {
    return NextResponse.json(
        { ok: false, error: "payment not paid" },
        { status: 400 }
     );
    }

    if (verification.amount !== order.amount) {
      return NextResponse.json(
        { ok: false, error: "amount mismatch" },
        { status: 400 }
      );
    }

    /** 4. 결제 확정 (상태 전이) */
    const { data: updated, error: updateError } = await supabase
    .from("orders")
    .update({
        portone_payment_id: portonePaymentId,
        status: "결제완료",
        paid_at: new Date().toISOString(),
      })
    .eq("id", orderId)
    .eq("status", "결제대기")
    .select("id");

    console.log("ATTACH UPDATE RESULT:", updated, updateError);

    if (updateError || !updated || updated.length === 0) {
    return NextResponse.json(
        { ok: false, error: "order not updated" },
        { status: 409 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("ATTACH PAYMENT API ERROR", e);
    return NextResponse.json(
      { ok: false, error: "invalid request" },
      { status: 400 }
    );
  }
}
