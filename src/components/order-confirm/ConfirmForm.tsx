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

type Order = {
  id: string;
  product_name: string;
  amount: number;
  recipient_name: string;
  phone: string;
  zipcode: string;
  address: string;
  address_detail: string;
  status: string;
};

export default function ConfirmForm() {
  const router = useRouter();
  const params = useSearchParams();

  const orderId = params.get("orderId");
  const errorType = params.get("error");

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  

  // ❌ orderId 없으면 잘못된 접근
  if (!orderId) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-8">
        <p>잘못된 접근입니다.</p>
      </main>
    );
  }

  /* -----------------------------
     주문 정보 조회 (orderId 기준)
  ----------------------------- */
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) {
          alert("주문 정보를 불러올 수 없습니다.");
          return;
        }
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error("주문 조회 실패:", err);
      }
    };

    fetchOrder();
  }, [orderId]);

  /* -----------------------------
     중복 결제 방지 (결제완료면 이동)
  ----------------------------- */
  useEffect(() => {
    if (!order) return;

    if (order.status === "결제완료") {
      router.replace(`/order/complete?orderId=${orderId}`);
    }
  }, [order, orderId, router]);

  /* -----------------------------
     결제 요청
  ----------------------------- */
  
  const requestPayment = async (method: "CARD" | "KAKAOPAY") => {
  if (!order || loading) return;
  setLoading(true);

  const channelKey =
    method === "KAKAOPAY"
      ? process.env.NEXT_PUBLIC_PORTONE_KAKAOPAY_CHANNEL_KEY!
      : process.env.NEXT_PUBLIC_PORTONE_INICIS_CHANNEL_KEY!;

  const payMethodForPortOne =
    method === "KAKAOPAY" ? "EASY_PAY" : "CARD";

  try {
    await window.PortOne.requestPayment({
      storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
      channelKey,
      paymentId: order.id,
      orderName: order.product_name,
      totalAmount: order.amount,
      currency: "KRW",
      payMethod: payMethodForPortOne,
      customer: {
        fullName: order.recipient_name,
        phoneNumber: order.phone,
      },
      successUrl: `https://surimstudio.com/order/complete?orderId=${order.id}`,
      failUrl: `https://surimstudio.com/order/confirm?error=payment_failed&orderId=${order.id}`,
    });
  } catch (err) {
    alert("결제 처리 중 오류가 발생했습니다.");
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  /* -----------------------------
     렌더링
  ----------------------------- */
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

      {!order ? (
        <p>주문 정보를 불러오는 중입니다...</p>
      ) : (
        <>
          <ConfirmSummary
            productName={order.product_name}
            price={order.amount}
          />

          <ConfirmAddress
            recipientName={order.recipient_name}
            phone={order.phone}
            zipcode={order.zipcode}
            address={order.address}
            addressDetail={order.address_detail}
          />

          <ConfirmPaymentButtons
            loading={loading}
            onPay={requestPayment}
          />
        </>
      )}
    </main>
  );
}
