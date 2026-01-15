// src/app/api/payment/verify/route.ts

import { NextResponse } from "next/server";
import { verifyPortonePayment } from "@/lib/portone";

export async function POST(req: Request) {
  try {
    const { paymentId } = await req.json();

    if (!paymentId) {
      return NextResponse.json(
        { ok: false, error: "missing paymentId" },
        { status: 400 }
      );
    }

    const verification = await verifyPortonePayment(paymentId);

    return NextResponse.json(verification);
  } catch (err) {
    console.error("VERIFY PAYMENT API ERROR", err);
    return NextResponse.json(
      { ok: false, error: "server error" },
      { status: 500 }
    );
  }
}
