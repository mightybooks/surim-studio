// src/components/order-confirm/ConfirmForm.tsx

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
  buyer_email: string;
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
  let alive = true;

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        credentials: "include",
      });
      if (!res.ok) {
        alert("주문 정보를 불러올 수 없습니다.");
        return;
      }
      const data = await res.json();
      if (alive) setOrder(data);
    } catch (err) {
      console.error("주문 조회 실패:", err);
    }
  };

  fetchOrder();

  return () => {
    alive = false;
  };
}, [orderId]);


useEffect(() => {
  if (!orderId || !loading) return;

  const timer = setInterval(async () => {
    try {
      const res = await fetch(
        `/api/orders/status?orderId=${orderId}`
      );
      const json = await res.json();

      if (!json.ok) return;

      if (json.status === "결제완료") {
        clearInterval(timer);
        router.replace(`/order/complete?orderId=${orderId}`);
      }

      if (json.status === "결제보류") {
        clearInterval(timer);
        setLoading(false);
        alert("결제 확인이 필요합니다. 잠시 후 다시 시도해주세요.");
      }
    } catch (e) {
      console.warn("polling error", e);
    }
  }, 2000);

  return () => clearInterval(timer);
}, [orderId, loading, router]);

  /* -----------------------------
     결제 요청
  ----------------------------- */
  
 const requestPayment = async (method: "CARD" | "KAKAOPAY") => {
  if (!order || loading) return;
  setLoading(true);

  const paymentId = order.id;

  const channelKey =
    method === "KAKAOPAY"
      ? process.env.NEXT_PUBLIC_PORTONE_KAKAOPAY_CHANNEL_KEY!
      : process.env.NEXT_PUBLIC_PORTONE_INICIS_CHANNEL_KEY!;

  const payMethodForPortOne =
    method === "KAKAOPAY" ? "EASY_PAY" : "CARD";

  // 2️⃣ 결제 요청 (단 1회)
  try {
    window.PortOne.requestPayment({
      storeId: process.env.NEXT_PUBLIC_PORTONE_STORE_ID!,
      channelKey,
      paymentId,
      orderName: order.product_name,
      totalAmount: order.amount,
      currency: "KRW",
      payMethod: payMethodForPortOne,
      customer: {
        fullName: order.recipient_name,
        phoneNumber: order.phone,
        email: order.buyer_email,
      },
    });
  } catch (e) {
    console.error("PortOne requestPayment failed", e);
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
          
          {loading && (
            <section className="rounded-xl border p-4 bg-zinc-50 text-center">
              <p className="text-sm text-zinc-600">
                결제 확인 중입니다. 카드 승인 후 자동으로 완료됩니다.
              </p>
            </section>
          )}

          <ConfirmPaymentButtons
            loading={loading}
            onPay={requestPayment}
          />
        </>
      )}
    </main>
  );
}
