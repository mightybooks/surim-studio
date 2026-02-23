import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const { orderId, status, trackingNumber } = await req.json();

  if (status === "paid") {
    return NextResponse.json(
      { ok: false, error: "status paid is not allowed on this endpoint" },
      { status: 400 }
    );
  }

  const { error } = await supabase
    .from("orders")
    .update({
      status,
      tracking_number: trackingNumber ?? null,
      shipped_at: status === "shipped" ? new Date() : null,
    })
    .eq("id", orderId);

  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
