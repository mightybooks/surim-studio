import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  console.log("WEBHOOK HIT"); 
  try {
    const raw = await req.json();

    const paymentId: string | null =
      raw?.payment_id ?? raw?.paymentId ?? null;

  console.log("WEBHOOK paymentId =", paymentId);

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

console.log("FETCH PORTONE PAYMENT START");
    // 2. PortOne 결제 상세 조회 (서버 검증)
    const paymentRes = await fetch(
      `https://api.portone.io/payments/${paymentId}`,
      {
        headers: {
          Authorization: `PortOne ${process.env.PORTONE_SECRET_KEY}`,
        },
      }
    );
console.log("FETCH PORTONE PAYMENT RES OK =", paymentRes.ok, paymentRes.status);

    if (!paymentRes.ok) {
      const text = await paymentRes.text();
console.log("PORTONE ERROR BODY =", text);
      return NextResponse.json({ ok: true });
    }

    const payment = await paymentRes.json();

  console.log("PORTONE PAYMENT =", {
  status: payment?.status,
  amount: payment?.amount,
});

    // 3. 주문 조회 (paymentId === order.id)
    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", paymentId)
      .single();

console.log("ORDER FOUND =", order?.id, order?.status);
      
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

console.log("PAID CHECK =", {
  paid,
  paymentStatus: payment?.status,
  paymentAmount: payment?.amount,
  orderAmount: order.amount,
}); // ✅ ⑤


  if (paid) {
    const { error } = await supabase
      .from("orders")
      .update({
        status: "결제완료",
        portone_payment_id: paymentId,
      })
      .eq("id", paymentId);

console.log("UPDATE 결제완료 ERROR =", error); // ✅ ⑥
  } else {
    const { error } = await supabase
      .from("orders")
      .update({ status: "결제보류" })
      .eq("id", paymentId);

console.log("UPDATE 결제보류 ERROR =", error); // 진단용
  }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // 웹훅은 실패 응답을 주지 않는 게 원칙
    console.error("PORTONE WEBHOOK ERROR", err);
    return NextResponse.json({ ok: true });
  }
}
