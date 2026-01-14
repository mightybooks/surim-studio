import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

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

  return NextResponse.json({
    orderId,
    status: data.status,
  });
}
