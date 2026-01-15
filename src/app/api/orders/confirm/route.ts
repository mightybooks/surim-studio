import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/* -----------------------------
   Supabase (Service Role)
----------------------------- */
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* -----------------------------
   PortOne 서버 결제 조회
   (v2 기준, REST 호출)
----------------------------- */
async function fetchPortOnePayment(paymentId: string) {
  const res = await fetch(
    `https://api.portone.io/payments/${paymentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `PortOne ${process.env.PORTONE_API_SECRET!}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PortOne 조회 실패: ${text}`);
  }

  return res.json();
}

/* -----------------------------
   POST /api/orders/confirm
----------------------------- */
export async function POST(req: NextRequest) {
  try {
    const { paymentId } = await req.json();

    if (!paymentId) {
      return NextResponse.json(
        { ok: false, error: "paymentId missing" },
        { status: 400 }
      );
    }

    /* -----------------------------
       1. 주문 조회
    ----------------------------- */
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, status")
      .eq("id", paymentId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { ok: false, error: "order not found" },
        { status: 404 }
      );
    }

    /* -----------------------------
       2. 멱등성: 이미 결제완료
    ----------------------------- */
    if (order.status === "결제완료") {
      return NextResponse.json({
        ok: true,
        status: "결제완료",
      });
    }

    /* -----------------------------
       3. PortOne 결제 조회
    ----------------------------- */
    const payment = await fetchPortOnePayment(paymentId);

    if (payment.status !== "Paid") {
      return NextResponse.json(
        {
          ok: false,
          error: "payment not paid",
          paymentStatus: payment.status,
        },
        { status: 409 }
      );
    }

    /* -----------------------------
       4. 주문 상태 전이 (단일 확정)
    ----------------------------- */
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        status: "결제완료",
        portone_payment_id: paymentId,
      })
      .eq("id", paymentId);

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json({
      ok: true,
      status: "결제완료",
    });
  } catch (err) {
    console.error("ORDER CONFIRM ERROR", err);

    return NextResponse.json(
      { ok: false, error: "internal error" },
      { status: 500 }
    );
  }
}
