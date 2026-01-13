// src/components/shop/ProductDetailPage.tsx

import PurchaseSummary from "./PurchaseSummary";
import ProductDescription from "./ProductDescription";
import ProductInfoTable from "./ProductInfoTable";
import ProductNotice from "./ProductNotice";
import ProductPolicyBlock from "./ProductPolicyBlock";

export default function ProductDetailPage({
  product,
  children,
}: {
  product: any;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-5xl px-4 py-10 space-y-12">

      {/* 상단: 이미지 + 요약 */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-2xl border overflow-hidden bg-white">
          <img
            src={product.thumbnail}
            alt={product.name}
            className="w-full object-cover"
          />
        </div>

        <PurchaseSummary product={product} />
      </div>

      {/* 상단 소개 문구 (선택적) */}
      {children}

      {/* 상품 설명 (이미지) */}
      <ProductDescription product={product} />

      {/* 구성 / 규격 */}
      <ProductInfoTable product={product} />

      {/* 주의사항 */}
      <ProductNotice type={product.type} />

      {/* 하단 정책 */}
      <ProductPolicyBlock />
    </section>
  );
}
