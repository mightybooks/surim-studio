import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase/server";
import { sendShippingMail } from "@/lib/mail/sendShippingMail";

const adminSupabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { orderId, trackingNumber, carrier } = await req.json();

    if (!orderId || !trackingNumber) {
      return NextResponse.json(
        { message: "필수 값 누락" },
        { status: 400 }
      );
    }

    // 1. 로그인 확인
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

    // 2. 관리자 권한 확인
    const { data: admin } = await adminSupabase
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .single();

    if (!admin) {
      return NextResponse.json(
        { message: "관리자 권한이 없습니다." },
        { status: 403 }
      );
    }

    // 3. 주문 상태 검증
    const { data: order } = await adminSupabase
      .from("orders")
      .select("status, buyer_email, product_name")
      .eq("id", orderId)
      .single();

    if (!order || order.status !== "paid") {
      return NextResponse.json(
        { message: "배송 처리 불가 상태" },
        { status: 400 }
      );
    }

    // 4. shipped 처리
    const { error } = await adminSupabase
      .from("orders")
      .update({
        status: "shipped",
        tracking_number: trackingNumber,
        shipping_carrier: carrier ?? null,
        shipped_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (error) {
      throw error;
    }

    // 5. 배송 메일 발송 (정확한 좌표)
    await sendShippingMail({
      to: order.buyer_email,
      productName: order.product_name,
      trackingNumber,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("SHIP ORDER ERROR", err);
    return NextResponse.json(
      { message: "서버 오류" },
      { status: 500 }
    );
  }
}
