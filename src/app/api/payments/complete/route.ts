import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * 결제 완료 콜백
 * - PortOne 결제 성공 후 호출
 * - orderId 기준으로 주문 상태를 '결제완료'로 변경
 *
 * 지금 단계에서는:
 * - POST
 * - body에 orderId만 받아도 충분
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { message: "orderId가 누락되었습니다." },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    // 주문 상태 업데이트
    const { error } = await supabase
      .from("orders")
      .update({
        status: "결제완료",
      })
      .eq("id", orderId);

    if (error) {
      console.error("결제 완료 처리 실패:", error);
      return NextResponse.json(
        { message: "주문 상태 업데이트 실패" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        orderId,
        status: "결제완료",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("payments/complete error:", err);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
