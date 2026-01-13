// src/components/shop/PurchaseSummary.tsx

export default function PurchaseSummary({ product }: any) {
  return (
    <div className="rounded-2xl border p-6 space-y-4 bg-white">
      <div className="text-sm text-zinc-500">{product.type}</div>

      <h1 className="text-2xl font-semibold">{product.name}</h1>

      <div className="text-xl font-bold">
        {product.price.toLocaleString()}원
      </div>

      <div className="text-sm text-zinc-600">
        {product.delivery}
      </div>

      <button
        disabled
        className="mt-4 w-full rounded-xl border px-4 py-3 text-sm"
      >
        승인 완료 후 결제 가능
      </button>
    </div>
  );
}
