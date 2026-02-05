// src/components/order-confirm/ConfirmSummary.tsx

import { formatMoney } from "@/lib/formatMoney";

type Props = {
  productName: string;

  // ✅ 결제 기준(최소단위)
  amount_minor: number;            // KRW=원, USD=센트
  currency: "KRW" | "USD";
};

export default function ConfirmSummary({
  productName,
  amount_minor,
  currency,
}: Props) {
  const formattedPrice = formatMoney({ amount_minor, currency });

  return (
    <section className="rounded-xl border p-4 bg-white">
      <div className="text-sm text-zinc-500">상품</div>
      <div className="text-lg font-medium">{productName}</div>
      <div className="mt-1 font-semibold">{formattedPrice}</div>
    </section>
  );
}
