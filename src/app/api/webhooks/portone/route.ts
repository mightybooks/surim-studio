import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * PortOne Webhook (Observer)
 * - 절대 orders를 업데이트하지 않음
 * - 들어온 웹훅을 그대로 기록만 함
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 가능하면 다양하게 뽑되, 실패해도 상관없게 (기록자이므로)
    const status = body?.status ?? body?.data?.status ?? null;

    const portonePaymentId =
      body?.payment_id ??
      body?.paymentId ??
      body?.data?.payment_id ??
      body?.data?.paymentId ??
      null;

    const merchantUid =
      body?.merchant_uid ??
      body?.merchantUid ??
      body?.data?.merchant_uid ??
      body?.data?.merchantUid ??
      body?.order_id ??
      body?.data?.order_id ??
      null;

    // ✅ orders 업데이트 없음. 무조건 기록만.
    const { error: insertError } = await supabase
      .from("payment_webhooks")
      .insert({
        provider: "portone",
        event_status: status ? String(status) : null,
        payment_id: portonePaymentId ? String(portonePaymentId) : null,
        merchant_uid: merchantUid ? String(merchantUid) : null,
        raw_payload: body,
      });

    if (insertError) {
      console.error("WEBHOOK LOG INSERT ERROR", insertError);

      // 선택지:
      // - 200: 재시도 폭주 방지 (로그 유실 가능)
      // - 500: 재시도 유도 (로그 보존 우선)
      // 저는 '로그 보존'이 목적이므로 500을 권합니다.
      return NextResponse.json({ ok: false }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("WEBHOOK API ERROR", err);

    // 파싱 실패 등은 재시도해도 의미 없을 가능성이 큼 → 200 권장
    return NextResponse.json({ ok: true });
  }
}
