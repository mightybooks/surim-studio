export default function ProductDescription({ product }: any) {
  return (
    <div>
      <h2 className="text-sm font-semibold">상품 설명</h2>
      <p className="mt-2 text-sm text-zinc-700">
        {product?.description ?? "설명 더미 텍스트"}
      </p>
    </div>
  );
}
