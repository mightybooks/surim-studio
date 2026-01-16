import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const raw = await req.json();

    const paymentId: string | null =
      raw?.payment_id ?? raw?.paymentId ?? null;

    // 1. 웹훅 원문 저장 (항상)
    await supabase.from("payment_webhooks").insert({
      provider: "portone",
      event_status: raw?.status ?? null,
      event_type: raw?.type ?? null,
      payment_id: paymentId,
      merchant_uid: raw?.merchant_uid ?? null,
      raw_payload: raw,
    });

    if (!paymentId) {
      // payment_id 없는 웹훅은 여기서 종료
      return NextResponse.json({ ok: true });
    }

    // 2. PortOne 결제 상세 조회 (서버 검증)
    const paymentRes = await fetch(
      `https://api.portone.io/payments/${paymentId}`,
      {
        headers: {
          Authorization: `PortOne ${process.env.PORTONE_SECRET_KEY}`,
        },
      }
    );

    if (!paymentRes.ok) {
      return NextResponse.json({ ok: true });
    }

    const payment = await paymentRes.json();

    // 3. 주문 조회 (paymentId === order.id)
    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", paymentId)
      .single();

    if (!order) {
      return NextResponse.json({ ok: true });
    }

    // 이미 결제완료면 중복 웹훅 무시
    if (order.status === "결제완료") {
      return NextResponse.json({ ok: true });
    }

    // 4. 검증
    const paid =
      payment?.status === "Paid" &&
      payment?.amount?.total === order.amount;

    if (paid) {
      await supabase
        .from("orders")
        .update({
          status: "결제완료",
          portone_payment_id: paymentId,
        })
        .eq("id", paymentId);
    } else {
      await supabase
        .from("orders")
        .update({ status: "결제보류" })
        .eq("id", paymentId);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // 웹훅은 실패 응답을 주지 않는 게 원칙
    console.error("PORTONE WEBHOOK ERROR", err);
    return NextResponse.json({ ok: true });
  }
}
