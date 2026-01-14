import { Suspense } from "react";
import ConfirmForm from "@/components/order-confirm/ConfirmForm";

export default function OrderConfirmPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmForm />
    </Suspense>
  );
}
