import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  
);

const EXPIRE_MS = 5 * 60 * 1000;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { ok: false, error: "missing orderId" },
      { status: 400 }
    );
  }

  const { data: order, error } = await supabase
    .from("orders")
    .select("status, created_at") // ← 반드시 추가
    .eq("id", orderId)
    .single();

 if (error || !order) {
  return NextResponse.json(
    { ok: false, error: "order not found" },
    { status: 404 }
  );
}

// 결제대기 + 3분 초과 → 만료
if (
  order.status === "결제대기" &&
  Date.now() - new Date(order.created_at).getTime() > EXPIRE_MS
) {
  await supabase
    .from("orders")
    .update({ status: "만료" })
    .eq("id", orderId);

  return NextResponse.json({ ok: true, status: "만료" });
}

return NextResponse.json({
  ok: true,
  status: order.status,
 });
}