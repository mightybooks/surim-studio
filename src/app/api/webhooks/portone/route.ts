import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // paid 이벤트만 처리
    const status = body?.status || body?.data?.status;
    if (String(status).toLowerCase() !== "paid") {
      return NextResponse.json({ ok: true });
    }

    const portonePaymentId =
      body?.payment_id || body?.data?.payment_id;

    const merchantUid =
      body?.merchant_uid ||
      body?.data?.merchant_uid ||
      body?.order_id ||
      body?.data?.order_id;

    if (!portonePaymentId || !merchantUid) {
      console.log("WEBHOOK MISSING IDS", { portonePaymentId, merchantUid });
      return NextResponse.json({ ok: true });
    }

    const { data, error } = await supabase
      .from("orders")
      .update({
        status: "결제완료",
        portone_payment_id: portonePaymentId,
      })
      .eq("id", merchantUid)
      .eq("status", "결제대기")
      .select("id");

    if (error) {
      console.error("WEBHOOK DB ERROR", error);
      return NextResponse.json(
        { error: "db error" },
        { status: 500 }
      );
    }

    // 🔒 중복 웹훅 or 이미 처리된 경우
    if (!data || data.length === 0) {
      return NextResponse.json({ ok: true });
    }

    // 최초 결제완료 처리
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("WEBHOOK API ERROR", err);
    return NextResponse.json(
      { error: "invalid webhook request" },
      { status: 400 }
    );
  }
}
