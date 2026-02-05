import { Suspense } from "react";
import OrderFormIntl from "@/components/order/OrderFormIntl";

export default function OrderIntlPage() {
  return (
    <Suspense fallback={null}>
      <OrderFormIntl />
    </Suspense>
  );
}
