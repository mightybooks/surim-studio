// src/app/api/webhooks/portone/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { OrderStatus } from "@/lib/orderStatus";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function normalizePortoneStatus(payment: any): OrderStatus | null {
  switch (payment?.status) {
    case "PAID":
      return "paid";
    case "READY":
      return "pending";
    case "FAILED":
    case "CANCELLED":
      return "failed";
    default:
      return null;
  }
}

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
      total: payment?.amount?.total,
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
    if (order.status === "paid") {
      console.log("ORDER ALREADY PAID – SKIP");
      return NextResponse.json({ ok: true });
    }

    /* -----------------------------
       4. 상태별 처리 (핵심)
    ----------------------------- */

    const nextStatus = normalizePortoneStatus(payment);

    if (!nextStatus) {
      console.log("UNKNOWN PAYMENT STATUS – SKIP", payment?.status);
      return NextResponse.json({ ok: true });
    }

    // paid 상태는 금액 검증 필수
    if (
      nextStatus === "paid" &&
      payment?.amount?.total !== order.amount
    ) {
      console.log("AMOUNT MISMATCH – SKIP", {
        payment: payment?.amount?.total,
        order: order.amount,
      });
      return NextResponse.json({ ok: true });
    }

    if (nextStatus === "paid" && order.status !== "pending") {
      console.log("INVALID STATUS TRANSITION", {
        orderId: paymentId,
        current: order.status,
        next: nextStatus,
      });
      return NextResponse.json({ ok: true });
    }

    const { error } = await supabase
      .from("orders")
      .update({
        status: nextStatus,
        portone_payment_id: paymentId,
      })
      .eq("id", paymentId);

    console.log("ORDER STATUS UPDATE", {
      orderId: paymentId,
      nextStatus,
      error,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("PORTONE WEBHOOK ERROR", err);
    return NextResponse.json({ ok: true });
  }
}
