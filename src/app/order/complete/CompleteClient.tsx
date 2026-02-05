// src/app/order/complete/CompleteClient.tsx

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Order = {
  id: string;
  source?: string | null;
  currency?: string | null;
  amount_minor?: number | null;
};

export default function CompleteClient() {
  const router = useRouter();
  const orderId = useSearchParams().get("orderId");

  const [loading, setLoading] = useState(true);
  const [isFunding, setIsFunding] = useState(false);

  useEffect(() => {
    if (!orderId) {
      router.replace("/");
      return;
    }

    let alive = true;

    (async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`, { cache: "no-store" });
        if (!res.ok) throw new Error("ORDER_FETCH_FAILED");
        const order: Order = await res.json();

        if (!alive) return;

        const funding = order?.source === "funding_500";
        setIsFunding(funding);

        // ✅ 펀딩이면 잠깐 메시지 보여주고 펀딩 페이지로 이동
        if (funding) {
          setLoading(false);
          setTimeout(() => {
            // TODO: 실제 펀딩 페이지 경로로 교체
            router.replace("/funding/books/500");
          }, 1200);
          return;
        }

        setLoading(false);
      } catch (e) {
        console.error(e);
        // 조회 실패해도 UX는 유지(홈 이동 가능)
        if (!alive) return;
        setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [orderId, router]);

  return (
    <main className="mx-auto max-w-xl px-4 py-10 text-center space-y-4">
      <h1 className="text-2xl font-semibold">결제가 완료되었습니다</h1>

      {loading ? (
        <p className="text-zinc-600">주문 정보를 확인하는 중입니다…</p>
      ) : isFunding ? (
        <p className="text-zinc-600">
          펀딩 참여가 완료되었습니다. 펀딩 페이지로 이동합니다…
        </p>
      ) : (
        <p className="text-zinc-600">주문이 정상적으로 접수되었습니다.</p>
      )}

      {/* 펀딩이면 자동 이동이므로 버튼은 숨기거나 비활성 추천 */}
      {!isFunding && (
        <button
          onClick={() => router.push("/")}
          className="w-full rounded-xl bg-black py-3 text-white font-semibold"
        >
          홈으로 이동
        </button>
      )}
    </main>
  );
}
