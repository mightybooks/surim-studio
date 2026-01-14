import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      productId,
      productName,
      price,
      recipientName,
      phone,
      zipcode,
      address,
      addressDetail,
    } = body;

    /* -----------------------------
       최소 유효성 검사
       (비회원 주문 기준)
    ----------------------------- */
    if (
      !productId ||
      !productName ||
      !price ||
      !recipientName ||
      !phone ||
      !zipcode ||
      !address
    ) {
      return NextResponse.json(
        { message: "필수 주문 정보가 누락되었습니다." },
        { status: 400 }
      );
    }

    const supabase = supabaseServer();

    /* =========================
    🔐 인증 회원 체크 (여기)
    ========================= */
    const {
    data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
    return NextResponse.json(
        { message: "로그인이 필요합니다." },
        { status: 401 }
    );
    }

    const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("contact_email_verified_at")
    .eq("id", user.id)
    .single();

    if (profileError || !profile?.contact_email_verified_at) {
    return NextResponse.json(
        { message: "이메일 인증이 완료된 회원만 결제할 수 있습니다." },
        { status: 403 }
    );
    }

    /* -----------------------------
    기존 결제대기 주문 재사용 (중복 방지)
    ----------------------------- */
    const { data: existing } = await supabase
    .from("orders")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .eq("status", "결제대기")
    .maybeSingle();

    if (existing) {
    return NextResponse.json(
        { orderId: existing.id, status: "결제대기" },
        { status: 200 }
    );
    }

    /* -----------------------------
       주문 생성 (결제대기)
    ----------------------------- */
    const orderId = randomUUID();

    const { error } = await supabase.from("orders").insert({
    id: orderId,
    user_id: user.id,              
    product_id: productId,
    product_name: productName,
    amount: price,
    recipient_name: recipientName,
    phone,
    zipcode,
    address,
    address_detail: addressDetail ?? "",
    status: "결제대기",
    });

    if (error) {
      console.error("Order insert error:", error);
      return NextResponse.json(
        { message: "주문 생성에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        orderId,
        status: "결제대기",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Order API error:", err);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
