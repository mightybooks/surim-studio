import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * service role client (RLS 우회)
 */
const adminSupabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    /* -----------------------------
       1. 로그인 유저 확인 (cookie 기반)
    ----------------------------- */
    const supabase = supabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 }
      );
    }

    /* -----------------------------
       2. 관리자 권한 확인
    ----------------------------- */
    const { data: admin, error: adminError } = await adminSupabase
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .single();

    if (adminError || !admin) {
      return NextResponse.json(
        { message: "관리자 권한이 없습니다." },
        { status: 403 }
      );
    }

    /* -----------------------------
       3. 전체 주문 조회 (RLS 무시)
    ----------------------------- */
    const { data: orders, error } = await adminSupabase
      .from("orders")
      .select(`
        id,
        product_name,
        amount,
        status,
        created_at,
        recipient_name,
        phone
      `)
      .eq("status", "paid") 
      .order("created_at", { ascending: false });

    if (error) {
      console.error("ADMIN ORDERS FETCH ERROR", error);
      return NextResponse.json(
        { message: "주문 조회 실패" },
        { status: 500 }
      );
    }

    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    console.error("ADMIN ORDERS API ERROR", err);
    return NextResponse.json(
      { message: "서버 오류" },
      { status: 500 }
    );
  }
}
