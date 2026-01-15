import { NextRequest, NextResponse } from "next/server";
import { fetchPaymentIdByOrderId } from "@/lib/portone";

export async function POST(req: NextRequest) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { error: "orderId missing" },
        { status: 400 }
      );
    }

    const payment = await fetchPaymentIdByOrderId(orderId);

    console.log("RESOLVE PAYMENT orderId:", orderId);
    console.log("RESOLVE PAYMENT result:", payment);

    return NextResponse.json({
      ok: true,
      paymentId: payment.paymentId,
    });
  } catch (e) {
    console.error("resolve-payment error", e);
    return NextResponse.json(
      { ok: false },
      { status: 500 }
    );
  }
}
