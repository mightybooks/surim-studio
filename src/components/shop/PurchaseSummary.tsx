// src/components/shop/PurchaseSummary.tsx
"use client";

import { useRouter } from "next/navigation";

export default function PurchaseSummary({
  product,
  ctaLabel = "주문하기",
  extraQuery = {},
}: {
  product: any;
  ctaLabel?: string;
  /** /order 로 넘길 query param 추가 (예: { source: "funding_500" }) */
  extraQuery?: Record<string, string>;
}) {
  const router = useRouter();

  return (
    <div className="rounded-2xl border p-6 space-y-4 bg-white">
      <div className="text-sm text-zinc-500">{product.type}</div>
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <div className="text-xl font-bold">
        {product.price.toLocaleString()}원
      </div>

      <button
        onClick={() => {
          const params = new URLSearchParams({
            productId: product.id,
            productName: product.name,
            price: String(product.price),
            ...extraQuery, // ✅ 추가
          });

          router.push(`/order?${params.toString()}`);
        }}
        className="
          mt-3
          w-full
          rounded-xl
          border
          border-black
          bg-black
          px-4
          py-3
          text-white
          font-semibold
          hover:bg-white
          hover:text-black
          transition
        "
      >
        {ctaLabel}
      </button>
    </div>
  );
}
