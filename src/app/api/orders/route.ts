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

    /* -----------------------------
    기존 결제대기 주문 재사용 (중복 방지)
    ----------------------------- */
    const { data: existing } = await supabase
     .from("orders")
     .select("id")
     .eq("product_id", productId)
     .eq("recipient_name", recipientName)
     .eq("phone", phone)
     .eq("zipcode", zipcode)
     .eq("address", address)
     .eq("status", "결제대기")
     .limit(1)
     .single();

     if (existing) {
      return NextResponse.json(
         {
         orderId: existing.id,
         status: "결제대기",
         },
         { status: 200 }
       );
    }

    /* -----------------------------
       주문 생성 (결제대기)
    ----------------------------- */
    const orderId = randomUUID();

    const { error } = await supabase.from("orders").insert({
      id: orderId,
      product_id: productId,
      product_name: productName,
      amount: price,
      recipient_name: recipientName,
      phone,
      zipcode,
      address,
      address_detail: addressDetail ?? "",
      status: "결제대기",
      user_id: null, // 비회원 주문
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
