import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("DEBUG API HIT", body);

    const {
      stage,
      traceId,
      orderId,
      paymentId,
      payload,
    } = body;

    await supabase.from("debug_events").insert({
      stage,
      trace_id: traceId,
      order_id: orderId,
      payment_id: paymentId,
      payload,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DEBUG API ERROR", err);
    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}
