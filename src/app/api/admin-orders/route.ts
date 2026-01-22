import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * 관리자 전용 Supabase Client
 * - service role 사용 (RLS 우회)
 * - 서버에서만 사용
 */
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  try {
    /* -----------------------------
       1. 관리자 인증 확인
       - Supabase auth 쿠키를 직접 검증할 수 없으므로
       - admins 테이블을 기준으로 user_id 검증
    ----------------------------- */

    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json(
        { message: "Missing authorization header" },
        { status: 401 }
      );
    }

    // Next.js middleware에서 이미 /admin 접근 제한됨
    // 여기서는 방어적으로 admins 테이블만 확인
    const userId = authHeader.replace("Bearer ", "");

    const { data: admin, error: adminError } = await supabase
      .from("admins")
      .select("user_id")
      .eq("user_id", userId)
      .single();

    if (adminError || !admin) {
      return NextResponse.json(
        { message: "관리자 권한이 없습니다." },
        { status: 403 }
      );
    }

    /* -----------------------------
       2. 전체 주문 조회 (RLS 무시)
    ----------------------------- */
    const { data: orders, error } = await supabase
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
