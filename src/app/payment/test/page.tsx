"use client";

import Script from "next/script";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

declare global {
  interface Window {
    PortOne?: any;
  }
}

export default function PaymentTestPage() {
  const [ready, setReady] = useState(false);
  const params = useSearchParams();

  // ✅ 결제수단 분기 (CARD | KAKAOPAY)
  const payMethod = params.get("payMethod");

  // ✅ Store ID (V2)
  const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID!;

  // ✅ channelKey 분기
  const channelKey =
    payMethod === "KAKAOPAY"
      ? process.env.NEXT_PUBLIC_PORTONE_KAKAOPAY_CHANNEL_KEY!
      : process.env.NEXT_PUBLIC_PORTONE_INICIS_CHANNEL_KEY!;

  const paymentId = useMemo(() => `pay_${Date.now()}`, []);

  const requestPay = async () => {
    if (!window.PortOne) {
      alert("PortOne SDK가 아직 로드되지 않았습니다.");
      return;
    }

    const response = await window.PortOne.requestPayment({
      storeId,
      channelKey,
      paymentId,
      orderName: "수림지 디지털 이용권",
      totalAmount: 4900,
      currency: "KRW",
      payMethod: "CARD", // ⚠️ channelKey로 결제수단 결정
      customer: {
        fullName: "테스트구매자",
        email: "test@surim.studio",
        phoneNumber: "01000000000",
      },
      redirectUrl: `${window.location.origin}/payment/test?done=1&paymentId=${paymentId}`,
    });

    console.log("PortOne 결제 응답:", response);
  };

  return (
    <>
      <Script
        src="https://cdn.portone.io/v2/browser-sdk.js"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />

      <div className="p-6 space-y-4">
        <div className="text-sm text-zinc-600">
          PortOne SDK: {ready ? "로드됨" : "로딩중"}
        </div>

        <div className="text-xs text-zinc-500">
          결제수단: {payMethod === "KAKAOPAY" ? "카카오페이" : "카드"}
        </div>

        <button
          onClick={requestPay}
          disabled={!ready}
          className="w-full rounded-xl bg-black text-white px-4 py-3 text-sm disabled:opacity-50"
        >
          결제하기
        </button>

        <div className="text-xs text-zinc-500">
          paymentId: {paymentId}
        </div>
      </div>
    </>
  );
}
