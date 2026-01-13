// src/components/shop/ProductDescription.tsx

export default function ProductDescription({ product }: any) {
  return (
    <section>
      <h2 className="text-sm font-semibold mb-3">상품 설명</h2>
      <div className="rounded-xl border overflow-hidden bg-white">
        <img
          src={product.detailImage}
          alt={`${product.name} 상세 설명`}
          className="w-full"
        />
      </div>
    </section>
  );
}
