"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CompleteClient() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("orderId");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError("주문 정보가 없습니다.");
      setLoading(false);
      return;
    }

    const completePayment = async () => {
      try {
        const res = await fetch("/api/orders/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        });

        if (!res.ok) {
          throw new Error("결제 완료 처리 실패");
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("결제 완료 처리 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    completePayment();
  }, [orderId]);

  if (loading) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10 text-center">
        <p className="text-zinc-600">결제 완료 처리 중입니다…</p>
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
