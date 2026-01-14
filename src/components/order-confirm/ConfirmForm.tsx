"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmSummary from "./ConfirmSummary";
import ConfirmAddress from "./ConfirmAddress";
import ConfirmPaymentButtons from "./ConfirmPaymentButtons";

declare global {
  interface Window {
    PortOne: any;
  }
}

export default function ConfirmForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);

  const errorType = params.get("error");
  const orderId = params.get("orderId");

  // ❗ orderId 없으면 잘못된 접근
  if (!orderId) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p>잘못된 접근입니다.</p>
      </main>
    );
  }

  // (지금은 query 기반 유지 — 다음 단계에서 서버 조회로 교체)
  const productName = params.get("productName") ?? "";
  const price = Number(params.get("price") ?? 0);
  const recipientName = params.get("recipientName") ?? "";
  const phone = params.get("phone") ?? "";
  const zipcode = params.get("zipcode") ?? "";
  const address = params.get("address") ?? "";
  const addressDetail = params.get("addressDetail") ?? "";

  // 중복 결제 방지 체크
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch(
          `/api/orders/status?orderId=${orderId}`
        );
        if (!res.ok) return;

        const data = await res.json();
        if (data.status === "결제완료") {
          router.replace(`/order/complete?orderId=${orderId}`);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkStatus();
  }, [orderId, router]);

  const requestPayment = async (method: "CARD" | "KAKAOPAY") => {
    if (loading) return;
    setLoading(true);

    try {
      await window.PortOne.requestPayment({
        storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
        channelKey: process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY!,
        paymentId: orderId,
        orderName: productName,
        totalAmount: price,
        currency: "KRW",
        payMethod: method,
        buyer: {
          name: recipientName,
          phoneNumber: phone,
        },
        successUrl: `https://surimstudio.com/order/complete?orderId=${orderId}`,
        failUrl: `https://surimstudio.com/order/confirm?error=payment_failed&orderId=${orderId}`,
      });
    } catch (err) {
      alert("결제 처리 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-semibold">주문 확인</h1>

      {errorType === "payment_failed" && (
        <section className="rounded-xl border border-red-300 bg-red-50 p-4">
          <h2 className="font-medium text-red-700 mb-1">
            결제가 완료되지 않았습니다
          </h2>
          <p className="text-sm text-red-600">
            결제 과정에서 오류가 발생했습니다. 다시 시도해 주세요.
          </p>
        </section>
      )}

      <ConfirmSummary productName={productName} price={price} />

      <ConfirmAddress
        recipientName={recipientName}
        phone={phone}
        zipcode={zipcode}
        address={address}
        addressDetail={addressDetail}
      />

      <ConfirmPaymentButtons loading={loading} onPay={requestPayment} />
    </main>
  );
}
