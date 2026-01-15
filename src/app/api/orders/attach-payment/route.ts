import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    // 1. 주문 조회
    const { data: order, error: fetchError } = await supabase
      .from("orders")
      .select("id, portone_payment_id")
      .eq("id", orderId)
      .single();

    if (fetchError || !order) {
      return NextResponse.json(
        { ok: false, error: "order not found" },
        { status: 404 }
      );
    }

    // 2. 이미 attach 된 경우 (idempotency)
    if (order.portone_payment_id) {
      if (order.portone_payment_id === portonePaymentId) {
        return NextResponse.json({ ok: true });
      } else {
        return NextResponse.json(
          { ok: false, error: "paymentId conflict" },
          { status: 409 }
        );
      }
    }

    // 3. 최초 attach (매핑만 수행, 상태 변경 없음)
    const { error: updateError } = await supabase
      .from("orders")
      .update({ portone_payment_id: portonePaymentId })
      .eq("id", orderId);

    if (updateError) {
      console.error("ATTACH PAYMENT DB ERROR", updateError);
      return NextResponse.json(
        { ok: false, error: "db update failed" },
        { status: 500 }
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
