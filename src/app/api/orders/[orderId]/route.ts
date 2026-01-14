import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(
  _req: Request,
  { params }: { params: { orderId: string } }
) {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("orders")
    .select(`
      id,
      product_name,
      amount,
      recipient_name,
      phone,
      zipcode,
      address,
      address_detail,
      status
    `)
    .eq("id", params.orderId)
    .single();

  if (error || !data) {
    return NextResponse.json(
      { message: "주문을 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}
