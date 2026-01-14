"use client";

import { useRouter } from "next/navigation";

export default function PurchaseSummary({ product }: any) {
  const router = useRouter();

  const handlePay = (method: "CARD" | "KAKAOPAY") => {
    const params = new URLSearchParams({
      productId: product.id,
      payMethod: method,
    });

    window.location.href = `/payment/test?${params.toString()}`;
  };

  return (
    <div className="rounded-2xl border p-6 space-y-4 bg-white">
      <div className="text-sm text-zinc-500">{product.type}</div>
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <div className="text-xl font-bold">
        {product.price.toLocaleString()}원
      </div>

      <button
        onClick={() =>
          router.push(`/order?productId=${product.id}`)
        }
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
        주문하기
      </button>

    </div>
  );
}
