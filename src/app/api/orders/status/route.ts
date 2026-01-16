import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json(
      { ok: false, error: "missing orderId" },
      { status: 400 }
    );
  }

  const { data: order } = await supabase
    .from("orders")
    .select("status")
    .eq("id", orderId)
    .single();

  if (!order) {
    return NextResponse.json(
      { ok: false, error: "order not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    status: order.status,
  });
}
