"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
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
  const productId = params.get("productId") ?? "";
  const productName = params.get("productName") ?? "";
  const price = Number(params.get("price") ?? 0);

  const recipientName = params.get("recipientName") ?? "";
  const phone = params.get("phone") ?? "";
  const zipcode = params.get("zipcode") ?? "";
  const address = params.get("address") ?? "";
  const addressDetail = params.get("addressDetail") ?? "";

  const createOrder = async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        productName,
        price,
        recipientName,
        phone,
        zipcode,
        address,
        addressDetail,
      }),
    });

    if (!res.ok) throw new Error("주문 생성 실패");
    const data = await res.json();
    return data.orderId as string;
  };

    useEffect(() => {
    const orderId = params.get("orderId");
    if (!orderId) return;

    const checkStatus = async () => {
        try {
        const res = await fetch(
            `/api/orders/status?orderId=${orderId}`
        );
        if (!res.ok) return;

        const data = await res.json();

        if (data.status === "결제완료") {
            alert("이미 결제가 완료된 주문입니다.");
            router.replace(`/order/complete?orderId=${orderId}`);
        }
        } catch (err) {
        console.error("주문 상태 확인 실패:", err);
        }
    };

    checkStatus();
    }, [params, router]);

    const requestPayment = async (method: "CARD" | "KAKAOPAY") => {
    if (loading) return;
    setLoading(true);

    try {
        // 1️⃣ 주문 생성 (멱등 처리됨)
        const orderId = await createOrder();

        // 2️⃣ 주문 상태 확인 (중복 결제 방지)
        const statusRes = await fetch(
        `/api/orders/status?orderId=${orderId}`
        );
        const statusData = await statusRes.json();

        if (statusData.status === "결제완료") {
        alert("이미 결제가 완료된 주문입니다.");
        router.replace(`/order/complete?orderId=${orderId}`);
        return;
        }

        // 3️⃣ 실제 결제 요청
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
        failUrl: `https://surimstudio.com/order/confirm?error=payment_failed`,
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
            결제 과정에서 오류가 발생했습니다.  
            다시 결제를 시도해 주세요.
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

      <ConfirmPaymentButtons
          loading={loading}
          onPay={requestPayment}
      />
    </main>
  );
}
