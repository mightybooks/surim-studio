import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // 서버 전용
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("PORTONE WEBHOOK BODY >>>", JSON.stringify(body, null, 2));

    /**
     * 예상 payload (PortOne v2)
     * {
     *   type: "PAYMENT_PAID",
     *   data: {
     *     paymentId: "order.id",
     *     status: "PAID"
     *   }
     * }
     */

    const status = body?.status || body?.data?.status;

    if (status?.toLowerCase() !== "paid") {
    return NextResponse.json({ ok: true });
    }

    const orderId =
    body?.order_id ||
    body?.orderId ||
    body?.data?.order_id ||
    body?.data?.orderId;

    console.log("RESOLVED orderId >>>", orderId);

    if (!orderId) {
    // 호출 테스트 웹훅에는 주문 개념이 없음 → 정상 종료
    return NextResponse.json({ ok: true });
    }

    // 이미 결제완료면 그대로 종료 (중복 웹훅 대비)
    const { data: order } = await supabase
      .from("orders")
      .select("status")
      .eq("id", orderId)
      .single();

    if (!order) {
      return NextResponse.json(
        { error: "order not found" },
        { status: 404 }
      );
    }

    if (order.status === "결제완료") {
      return NextResponse.json({ ok: true });
    }

    const { error } = await supabase
      .from("orders")
      .update({ status: "결제완료" })
      .eq("id", orderId);

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
