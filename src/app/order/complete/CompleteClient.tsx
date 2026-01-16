"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CompleteClient() {
  const router = useRouter();
  const orderId = useSearchParams().get("orderId");

  useEffect(() => {
    if (!orderId) {
      router.replace("/");
    }
  }, [orderId, router]);

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
