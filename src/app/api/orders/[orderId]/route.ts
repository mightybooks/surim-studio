// src/app/api/orders/[orderid]/route.ts

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(
  _req: Request,
  { params }: { params: { orderId: string } }
) {
  const supabase = supabaseServer();

  // ✅ 로그인 강제
  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();

  if (userErr || !user?.id) {
    return NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      product_id,
      product_name,

      amount,
      amount_minor,
      currency,
      pg,
      channel_key,

      quantity,
      source,

      recipient_name,
      phone,
      zipcode,
      address,
      address_detail,

      status,
      buyer_email,
      user_id
    `)
    .eq("id", params.orderId)
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { message: "주문을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  // ✅ 안전장치: null/빈값 방어 + 표준화
  const currency = String(data.currency ?? "KRW").toUpperCase();
  const pg = String(data.pg ?? "inicis").toLowerCase();
  const amount_minor = (data.amount_minor ?? data.amount) as number; // ✅ 핵심: 빈 컬럼이면 amount로 대체

  const normalized = {
    ...data,
    currency,
    pg,
    amount_minor,
    channel_key: data.channel_key ?? null,
  };

  return NextResponse.json(normalized, { status: 200 });
}
