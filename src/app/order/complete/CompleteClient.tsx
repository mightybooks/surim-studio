"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

type Order = {
  status: string;
};

export default function CompleteClient() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("orderId");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<Order | null>(null);

useEffect(() => {
  console.log("COMPLETE PAGE MOUNTED", {
    orderId,
    location: window.location.href,
  });
}, [orderId]);


useEffect(() => {
  if (!orderId) return;

  const run = async () => {
    try {
      // 1. 서버에 paymentId 조회 요청
      const res = await fetch("/api/orders/resolve-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      if (!res.ok) {
        console.error("resolve-payment failed");
        return;
      }

      const data = await res.json();
      const paymentId = data.paymentId;

      if (!paymentId) {
        console.error("paymentId not found");
        return;
      }

      // 2. attach-payment 실행
      await fetch("/api/orders/attach-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          portonePaymentId: paymentId,
        }),
      });
    } catch (e) {
      console.error("complete attach flow error", e);
    }
  };

  run();
}, [orderId]);

  useEffect(() => {
    if (!orderId) {
      setError("주문 정보가 없습니다.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (!res.ok) {
          throw new Error("주문 조회 실패");
        }

        const data = await res.json();
        setOrder(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("주문 정보를 불러오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  /* -----------------------------
     렌더링
  ----------------------------- */

  if (loading) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10 text-center">
        <p className="text-zinc-600">주문 정보를 확인 중입니다…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10 text-center">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  // 주문은 존재하지만 아직 확정되지 않은 경우
  if (!order || order.status !== "결제완료") {
    return (
      <main className="mx-auto max-w-xl px-4 py-10 text-center space-y-4">
        <h1 className="text-xl font-semibold">주문 확인 중입니다</h1>
        <p className="text-zinc-600">
          주문이 아직 확정되지 않았습니다.  
          잠시만 기다려 주세요.
        </p>
      </main>
    );
  }

  // 결제완료 확정 상태
  return (
    <main className="mx-auto max-w-xl px-4 py-10 text-center space-y-4">
      <h1 className="text-2xl font-semibold">결제가 완료되었습니다</h1>

      <p className="text-zinc-600">
        주문이 정상적으로 접수되었습니다.  
        순차적으로 발송이 진행됩니다.
      </p>

      <div className="pt-6 space-y-3">
        <button
          onClick={() => router.push("/")}
          className="w-full rounded-xl bg-black py-3 text-white font-semibold"
        >
          홈으로 이동
        </button>
      </div>
    </main>
  );
}
