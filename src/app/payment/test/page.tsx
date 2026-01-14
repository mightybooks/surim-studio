// app/payment/test/page.tsx
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import PaymentClient from "./PaymentClient";

export default function PaymentTestPage() {
  return (
    <Suspense fallback={<div className="p-6 text-sm">로딩중…</div>}>
      <PaymentClient />
    </Suspense>
  );
}
