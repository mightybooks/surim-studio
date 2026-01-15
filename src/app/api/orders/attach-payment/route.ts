import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { orderId, portonePaymentId } = await req.json();

    console.log("ATTACH PAYMENT >>>", { orderId, portonePaymentId });

    if (!orderId || !portonePaymentId) {
      return NextResponse.json(
        { ok: false, error: "missing params" },
        { status: 400 }
      );
    }

    const { error } = await supabase
    .from("orders")
    .update({
        portone_payment_id: portonePaymentId,
        status: "결제완료",
    })
    .eq("id", orderId);

    if (error) {
      console.error("ATTACH DB ERROR >>>", error);
      return NextResponse.json(
        { ok: false, error: "db update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("ATTACH API ERROR >>>", e);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
