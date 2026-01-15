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

export async function POST(req: NextRequest) {
  console.log("===== ORDER CONFIRM ROUTE HIT =====");

  try {
    const { paymentId } = await req.json();
    console.log("PAYMENT ID RECEIVED:", paymentId);

    if (!paymentId) {
      return NextResponse.json(
        { ok: false, error: "paymentId missing" },
        { status: 400 }
      );
    }

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, status")
      .eq("id", paymentId)
      .single();

    console.log("ORDER QUERY RESULT:", order);

    if (orderError || !order) {
      return NextResponse.json(
        { ok: false, error: "order not found" },
        { status: 404 }
      );
    }

    if (order.status === "결제완료") {
      return NextResponse.json({ ok: true, status: "결제완료" });
    }

    const payment = await fetchPortOnePayment(paymentId);
    console.log("PORTONE PAYMENT RESPONSE:", payment);

    if (payment.status !== "Paid") {
      return NextResponse.json(
        { ok: false, error: "payment not paid" },
        { status: 409 }
      );
    }

    console.log("ORDER UPDATE ATTEMPT");

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

    console.log("ORDER UPDATE DONE");

    return NextResponse.json({ ok: true, status: "결제완료" });
  } catch (err) {
    console.error("ORDER CONFIRM ERROR", err);

    return NextResponse.json(
      { ok: false, error: "internal error" },
      { status: 500 }
    );
  }
}
