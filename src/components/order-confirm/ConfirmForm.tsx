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
  const [expired, setExpired] = useState(false);
  const [showDelayNotice, setShowDelayNotice] = useState(false);
  
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
  if (errorType === "payment_failed" && orderId) {
    fetch("/api/orders/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        status: "failed",
      }),
    });
  }
}, [errorType, orderId]);

useEffect(() => {
  if (!orderId || !loading) return;

  console.log("POLLING START", { orderId });

  const timer = setInterval(async () => {
    try {
      const res = await fetch(
        `/api/orders/status?orderId=${orderId}`,
        { cache: "no-store" }
      );
      const json = await res.json();

      console.log("POLLING RESPONSE", json);

      if (!json?.ok) return;

      const status = json.status as string;

      // ✅ 결제 완료 계열
      if (status === "paid" || status === "shipped") {
        console.log("POLLING DETECTED PAID/SHIPPED");
        clearInterval(timer);
        router.replace(`/order/complete?orderId=${orderId}`);
        return;
      }

      // ✅ 만료 (재시도 가능 상태)
      if (status === "expired") {
        console.log("POLLING DETECTED EXPIRED");
        clearInterval(timer);
        setExpired(true);
        setLoading(false);
        return;
      }

      // ✅ 실패
      if (status === "failed") {
        console.log("POLLING DETECTED FAILED");
        clearInterval(timer);
        setLoading(false);
        return;
      }

      // 그 외(pending 등)는 계속 폴링
    } catch (e) {
      console.error("POLLING ERROR", e);
    }
  }, 2000);

  return () => clearInterval(timer);
}, [orderId, loading, router]);

useEffect(() => {
  if (!loading) {
    setShowDelayNotice(false);
    return;
  }

  const t = setTimeout(() => {
    setShowDelayNotice(true);
  }, 15000); // 15초 권장

  return () => clearTimeout(t);
}, [loading]);

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

          {expired && (
            <section className="rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-center">
              <h2 className="font-medium text-yellow-800 mb-1">
                주문 시간이 초과되었습니다
              </h2>
              <p className="text-sm text-yellow-700">
                결제 시간이 초과되어 주문이 만료되었습니다.<br />
                다시 시도해 주세요.
              </p>
            </section>
          )}

          <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-center">
            <p className="text-sm text-zinc-600 leading-relaxed">
              카드사 인증 중에는 입력 반응이 늦거나<br />
              화면이 정지된 것처럼 보일 수 있습니다.<br />
              <strong>결제가 정상 처리될 때까지 창을 닫지 마세요.</strong>
            </p>
          </section>
          
          {loading && (
            <section className="rounded-xl border p-4 bg-zinc-50 text-center">
              <p className="text-sm text-zinc-600">
                결제가 정상적으로 처리되었습니다. 결과를 확인 중입니다.<br/>
                새로고침·뒤로 가기·재결제를 하지 마세요.
              </p>
            </section>
          )}

         {loading && showDelayNotice && (
          <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
            <p className="text-sm text-blue-700">
              카드 결제는 이미 완료되었습니다.<br />
              최종 확인까지 최대 1분 정도 소요될 수 있습니다.<br />
              잠시만 기다려 주세요.
            </p>
          </section>
        )} 

        <ConfirmPaymentButtons
          loading={loading || expired}
          onPay={requestPayment}
        />
        </>
      )}
    </main>
  );
}
