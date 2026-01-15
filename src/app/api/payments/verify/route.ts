import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase 서버 클라이언트
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function POST(req: Request) {
  try {
    const { orderId, paymentId } = await req.json();

    if (!orderId || !paymentId) {
      return NextResponse.json(
        { error: "orderId 또는 paymentId 누락" },
        { status: 400 }
      );
    }

    /* --------------------------------
       1. PortOne 결제 상태 조회
       (※ 실제 조회 로직은 이후 교체)
    -------------------------------- */

    // TODO: 여기서 PortOne API 호출
    // const payment = await fetchPortOnePayment(paymentId);

    // 임시 판정 (지금은 성공으로 가정)
    const paymentStatus = "PAID"; // ← PortOne에서 받아온 값이라고 가정

    if (paymentStatus !== "PAID") {
      return NextResponse.json(
        { error: "결제 미완료" },
        { status: 400 }
      );
    }

    /* --------------------------------
       2. orders 상태 업데이트
    -------------------------------- */

    const { error } = await supabase
      .from("orders")
      .update({
        status: "결제완료",
        portone_payment_id: paymentId,
      })
      .eq("id", orderId)
      .eq("status", "결제대기");

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "주문 상태 업데이트 실패" },
        { status: 500 }
      );
    }

    /* --------------------------------
       3. 성공 응답
    -------------------------------- */

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "서버 오류" },
      { status: 500 }
    );
  }
}
