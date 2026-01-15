import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { orderId, portonePaymentId } = await req.json();

  if (!orderId || !portonePaymentId) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await supabase
    .from("orders")
    .update({ portone_payment_id: portonePaymentId })
    .eq("id", orderId);

  return NextResponse.json({ ok: true });
}
