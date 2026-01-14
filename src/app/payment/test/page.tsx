// app/payment/test/page.tsx
"use client";

import Script from "next/script";
import { useMemo, useState } from "react";

declare global {
  interface Window {
    PortOne?: any;
  }
}

export default function PaymentTestPage() {
  const [ready, setReady] = useState(false);

  // ✅ 본인 값으로 교체
  const storeId = "store-d0b1d407-3477-47a0-9603-1311d770912a"; // V2 Store ID
  const channelKey = "channel-key-492f9529-6ed4-499e-b64a-19cd5a9c6f4c"; // 채널키

  const paymentId = useMemo(() => `pay_${Date.now()}`, []);

  const requestPay = async () => {
    if (!window.PortOne) {
      alert("PortOne SDK가 아직 로드되지 않았습니다.");
      return;
    }

    // PortOne V2 결제 요청 (공식 파라미터명)
    // storeId / channelKey / paymentId / orderName / totalAmount / currency / payMethod / customer / redirectUrl
    const response = await window.PortOne.requestPayment({
      storeId,
      channelKey,
      paymentId,
      orderName: "수림지 디지털 이용권",
      totalAmount: 4900,
      currency: "KRW",
      payMethod: "CARD",
      customer: {
        fullName: "테스트구매자",
        email: "test@surim.studio",
        phoneNumber: "01000000000",
      },
      // 모바일/일부 환경에서 필수
      redirectUrl: `${window.location.origin}/payment/test?done=1&paymentId=${paymentId}`,
    });

    console.log("PortOne 결제 응답:", response);
    alert("응답은 콘솔에서 확인하세요.");
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

        <button
          onClick={requestPay}
          disabled={!ready}
          className="w-full rounded-xl bg-black text-white px-4 py-3 text-sm disabled:opacity-50"
        >
          결제하기 (V2)
        </button>

        <div className="text-xs text-zinc-500">
          paymentId: {paymentId}
        </div>
      </div>
    </>
  );
}
