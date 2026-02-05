// src/components/order/OrderSummary.tsx

import { formatMoney } from "@/lib/formatMoney";

type OrderSummaryProps = {
  productName: string;
  amount_minor: number;            // KRW=원, USD=센트
  currency: "KRW" | "USD";
};

export default function OrderSummary({
  productName,
  amount_minor,
  currency,
}: OrderSummaryProps) {
  return (
    <section className="mb-6 rounded-xl border p-4 bg-white">
      <div className="text-sm text-zinc-500">상품</div>
      <div className="text-lg font-medium">{productName}</div>
      <div className="mt-1 text-base font-semibold">
        {formatMoney({ amount_minor, currency })}
      </div>
    </section>
  );
}
