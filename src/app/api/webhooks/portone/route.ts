// src/app/api/webhooks/portone/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    /* -----------------------------
       0. 기본 헤더 로그 (진단용)
    ----------------------------- */
    console.log("HEADERS CHECK", {
      authorization: req.headers.get("authorization"),
      version: req.headers.get("x-portone-api-version"),
      contentType: req.headers.get("content-type"),
      userAgent: req.headers.get("user-agent"),
    });

    const raw = await req.json();

    console.log("WEBHOOK RAW KEYS", Object.keys(raw));

    const paymentId: string | null =
      raw?.payment_id ?? raw?.paymentId ?? null;

    console.log("WEBHOOK paymentId =", paymentId);

    /* -----------------------------
       1. 웹훅 원문 저장 (항상)
    ----------------------------- */
    await supabase.from("payment_webhooks").insert({
      provider: "portone",
      event_status: raw?.status ?? null,
      event_type: raw?.type ?? null,
      payment_id: paymentId,
      merchant_uid: raw?.merchant_uid ?? null,
      raw_payload: raw,
    });

    if (!paymentId) {
      return NextResponse.json({ ok: true });
    }

    /* -----------------------------
       2. PortOne 결제 상세 조회
    ----------------------------- */
    console.log("FETCH PORTONE PAYMENT START");

    const paymentRes = await fetch(
      `https://api.portone.io/payments/${paymentId}`,
      {
        headers: {
          Authorization: `PortOne ${process.env.PORTONE_SECRET_KEY}`,
          "X-PortOne-Api-Version": "2024-01-01",
          "Content-Type": "application/json",
        },
      }
    );

    console.log(
      "FETCH PORTONE PAYMENT RES OK =",
      paymentRes.ok,
      paymentRes.status
    );

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

    /* -----------------------------
       3. 주문 조회
    ----------------------------- */
    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", paymentId)
      .single();

    console.log("ORDER FOUND =", order?.id, order?.status);

    if (!order) {
      return NextResponse.json({ ok: true });
    }

    // 이미 결제완료면 재처리 금지
    if (order.status === "결제완료") {
      console.log("ORDER ALREADY PAID – SKIP");
      return NextResponse.json({ ok: true });
    }

    /* -----------------------------
       4. 상태별 처리 (핵심)
    ----------------------------- */

    // ✅ 결제 확정
    if (
      payment?.status === "PAID" &&
      payment?.amount?.total === order.amount
    ) {
      const { error } = await supabase
        .from("orders")
        .update({
          status: "결제완료",
          portone_payment_id: paymentId,
        })
        .eq("id", paymentId);

      console.log("UPDATE 결제완료 ERROR =", error);
      return NextResponse.json({ ok: true });
    }

    // ⏸ READY = 정상 대기 상태 → 아무 것도 하지 않음
    if (payment?.status === "READY") {
      console.log("PAYMENT READY – WAIT FOR PAID");
      return NextResponse.json({ ok: true });
    }

    // ❌ 그 외 실패/취소 케이스만 보류 처리
    console.log("PAYMENT NOT PAID – MARK HOLD", {
      status: payment?.status,
    });

    const { error } = await supabase
      .from("orders")
      .update({ status: "결제보류" })
      .eq("id", paymentId);

    console.log("UPDATE 결제보류 ERROR =", error);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("PORTONE WEBHOOK ERROR", err);
    return NextResponse.json({ ok: true });
  }
}
