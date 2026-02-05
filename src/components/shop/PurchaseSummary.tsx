"use client";

import { useRouter } from "next/navigation";
import { formatMoney } from "@/lib/formatMoney";

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

  function goOrder(path: "/order" | "/order/intl", paramsObj: Record<string, string>) {
    const params = new URLSearchParams({
      productId: String(product.id ?? "test-product"),
      productName: product.name,
      ...paramsObj,
      ...extraQuery,
    });

    router.push(`${path}?${params.toString()}`);
  }

  return (
    <div className="rounded-2xl border p-6 space-y-4 bg-white">
      <div className="text-sm text-zinc-500">{product.type}</div>
      <h1 className="text-2xl font-semibold">{product.name}</h1>

      {/* 국내 가격 표시 */}
      <div className="text-xl font-bold">
        {formatMoney({
          amount_minor: Number(product.price ?? 0),
          currency: "KRW",
        })}
      </div>

      {/* ✅ 국내 주문 (기존 /order 유지) */}
      <button
        onClick={() => {
          goOrder("/order", {
            amount_minor: String(Number(product.price ?? 0)), // KRW minor = 원 단위(현재 규칙 유지)
            currency: "KRW",
            payRegion: "KOREA",
            pg: "", // 국내 PG는 confirm에서 선택되므로 공란 유지 가능
          });
        }}
        className="
          mt-3 w-full rounded-xl px-4 py-3 font-semibold text-white
          bg-emerald-700 hover:bg-emerald-800
          transition disabled:opacity-50
        "
      >
        {ctaLabel}
      </button>

      {/* ✅ 해외 결제 (PayPal) -> /order/intl 로 분기 */}
      <button
        onClick={() => {
          const usd = Number(product.priceUsd ?? 1.0);
          const usdMinor = Math.round(usd * 100);

          goOrder("/order/intl", {
            amount_minor: String(usdMinor),
            currency: "USD",
            payRegion: "OVERSEAS",
            pg: "paypal",
          });
        }}
        className="
          w-full rounded-xl px-4 py-3 font-semibold text-white
          bg-[#003087] hover:bg-[#001f5c]
          transition disabled:opacity-50
        "
      >
        해외결제 (PayPal)
      </button>

      <div className="text-xs text-zinc-500">
        해외결제는 USD로 진행됩니다.
      </div>
    </div>
  );
}
