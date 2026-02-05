// src/app/order/page.tsx 

import { Suspense } from "react";
import OrderForm from "@/components/order/OrderForm";

export default function OrderPage() {
  return (
    <Suspense fallback={null}>
      <OrderForm />
    </Suspense>
  );
}
