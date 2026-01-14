import { Suspense } from "react";
import CompleteClient from "./CompleteClient";

export default function OrderCompletePage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-xl px-4 py-10 text-center">
          <p className="text-zinc-600">결제 정보를 불러오는 중입니다…</p>
        </main>
      }
    >
      <CompleteClient />
    </Suspense>
  );
}
