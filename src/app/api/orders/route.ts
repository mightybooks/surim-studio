// src/app/api/orders/route.ts

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { randomUUID } from "crypto";

const MAX_QTY_PER_ORDER = 100;

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

      // ✅ 추가: 수량/소스 (없으면 기본값)
      quantity: rawQuantity,
      source: rawSource,
    } = body;

    // ✅ quantity 기본값/검증 (없으면 1)
    const quantity = Number.isFinite(Number(rawQuantity))
      ? Math.floor(Number(rawQuantity))
      : 1;

    if (quantity < 1 || quantity > MAX_QTY_PER_ORDER) {
      return NextResponse.json(
        { message: `수량은 1~${MAX_QTY_PER_ORDER} 사이여야 합니다.` },
        { status: 400 }
      );
    }

    // ✅ source는 펀딩일 때만 허용(그 외에는 shop으로 강제)
    const source =
      rawSource === "funding_500" ? "funding_500" : "shop";

    /* -----------------------------
       최소 유효성 검사
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

    /* -----------------------------
       로그인 체크
    ----------------------------- */
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
       이메일 인증 체크
    ----------------------------- */
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("contact_email, contact_email_verified_at")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.contact_email_verified_at) {
      return NextResponse.json(
        { message: "이메일 인증이 완료된 회원만 결제할 수 있습니다." },
        { status: 403 }
      );
    }

    /* -----------------------------
       기존 pending 주문 재사용
       ✅ source/quantity까지 동일할 때만 재사용
    ----------------------------- */
    const { data: existing } = await supabase
      .from("orders")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .eq("status", "pending")
      .eq("amount", price)
      .eq("quantity", quantity) // ✅ 추가
      .eq("source", source)     // ✅ 추가
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existing) {
      return NextResponse.json(
        { orderId: existing.id, status: "pending" },
        { status: 200 }
      );
    }

    /* -----------------------------
       주문 생성 (pending)
    ----------------------------- */
    const orderId = randomUUID();

    const { error } = await supabase.from("orders").insert({
      id: orderId,
      user_id: user.id,
      product_id: productId,
      product_name: productName,
      amount: price,

      // ✅ 추가
      quantity,
      source,

      recipient_name: recipientName,
      phone,
      zipcode,
      address,
      address_detail: addressDetail,
      buyer_email: profile.contact_email,
      status: "pending",
    });

    if (error) {
      console.error("Order insert error:", error);
      return NextResponse.json(
        { message: "주문 생성에 실패했습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { orderId, status: "pending" },
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

/* =========================
   GET /api/orders
   관리자 주문 목록
========================= */
export async function GET() {
  const supabase = supabaseServer();

  /* -----------------------------
     로그인 체크
  ----------------------------- */
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
    관리자 권한 체크 (admins 테이블 기준)
  ----------------------------- */
  const { data: admin, error: adminError } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .single();

  if (adminError || !admin) {
    return NextResponse.json(
      { message: "접근 권한이 없습니다." },
      { status: 403 }
    );
  }

  /* -----------------------------
     주문 목록 조회
  ----------------------------- */
  const { data, error } = await supabase
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
    return NextResponse.json(
      { message: "주문 조회 실패", error },
      { status: 500 }
    );
  }

  return NextResponse.json({ orders: data }, { status: 200 });
}
