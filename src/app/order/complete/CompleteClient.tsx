"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CompleteClient() {
  const params = useSearchParams();
  const router = useRouter();
  const paymentId = params.get("paymentId"); // 🔒 단일 키

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!paymentId) {
      setError("결제 정보가 없습니다.");
      setLoading(false);
      return;
    }

    const confirm = async () => {
      try {
        const res = await fetch("/api/orders/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId }),
        });

        if (!res.ok) {
          throw new Error("confirm failed");
        }

        const data = await res.json();
        setStatus(data.status); // "결제완료"
      } catch (e) {
        console.error(e);
        setError("주문 확정 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    confirm();
  }, [paymentId]);

  /* -----------------------------
     렌더링
  ----------------------------- */

  if (loading) {
    return (
      <main className="mx-auto max-w-xl px-4 py-10 text-center">
        <p className="text-zinc-600">주문을 확정하는 중입니다…</p>
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

  if (status !== "결제완료") {
    return (
      <main className="mx-auto max-w-xl px-4 py-10 text-center">
        <p className="text-zinc-600">결제 확인 중입니다. 잠시만 기다려 주세요.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-xl px-4 py-10 text-center space-y-4">
      <h1 className="text-2xl font-semibold">결제가 완료되었습니다</h1>
      <p className="text-zinc-600">
        주문이 정상적으로 접수되었습니다.
      </p>

      <button
        onClick={() => router.push("/")}
        className="w-full rounded-xl bg-black py-3 text-white font-semibold"
      >
        홈으로 이동
      </button>
    </main>
  );
}
