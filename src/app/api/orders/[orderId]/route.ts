// /api/orders/[orderId]/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(
  _req: Request,
  { params }: { params: { orderId: string } }
) {
  const supabase = supabaseServer();

  // 🔐 1. 로그인 유저 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { message: "로그인이 필요합니다." },
      { status: 401 }
    );
  }

  // 🔐 2. 본인 주문만 조회
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", params.orderId)
    .eq("user_id", user.id)   // ← 이 줄이 핵심
    .single();

  if (error || !data) {
    return NextResponse.json(
      { message: "주문을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
