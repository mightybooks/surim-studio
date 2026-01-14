import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

/**
 * GET
 * - 주문 상태 조회 (polling 용)
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { message: "orderId 누락" },
      { status: 400 }
    );
  }

  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("orders")
    .select("status")
    .eq("id", orderId)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { message: "주문 조회 실패" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { orderId, status: data.status },
    { status: 200 }
  );
}

/**
 * POST
 * - 주문 상태 변경 (결제 완료 처리)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { message: "orderId 누락" },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    const { error } = await supabase
      .from("orders")
      .update({ status: "결제완료" })
      .eq("id", orderId);

    if (error) {
      console.error("status update error:", error);
      return NextResponse.json(
        { message: "상태 업데이트 실패" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { orderId, status: "결제완료" },
      { status: 200 }
    );
  } catch (err) {
    console.error("status API error:", err);
    return NextResponse.json(
      { message: "서버 오류" },
      { status: 500 }
    );
  }
}
