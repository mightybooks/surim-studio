import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("PORTONE WEBHOOK BODY >>>", JSON.stringify(body, null, 2));

    const status = body?.status || body?.data?.status;
    if (status?.toLowerCase() !== "paid") {
      return NextResponse.json({ ok: true });
    }

    const portonePaymentId = body?.payment_id;
    if (!portonePaymentId) {
      return NextResponse.json({ ok: true });
    }

    const { error } = await supabase
      .from("orders")
      .update({ status: "결제완료" })
      .eq("portone_payment_id", portonePaymentId);

    if (error) {
      console.error("DB update error:", error);
      return NextResponse.json(
        { error: "DB update failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "invalid webhook request" },
      { status: 400 }
    );
  }
}
