export default function PurchaseSummary({ product }: any) {
  return (
    <div className="rounded-2xl border p-4">
      <div className="text-sm text-zinc-500">{product?.type ?? "product"}</div>
      <h1 className="mt-1 text-xl font-semibold">{product?.name ?? "상품명"}</h1>
      <div className="mt-2 text-lg font-semibold">
        {(product?.price ?? 0).toLocaleString()}원
      </div>
      <div className="mt-2 text-sm text-zinc-600">
        {product?.delivery ?? "배송/이용 정보"}
      </div>

      <button
        className="mt-4 w-full rounded-xl border px-4 py-3 text-sm"
        disabled
      >
        승인 완료 후 결제 가능
      </button>
    </div>
  );
}
