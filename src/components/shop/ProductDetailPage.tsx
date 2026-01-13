// components/shop/ProductDetailPage.tsx
import PurchaseSummary from "./PurchaseSummary";
import ProductDescription from "./ProductDescription";
import ProductInfoTable from "./ProductInfoTable";
import ProductNotice from "./ProductNotice";
import ProductPolicyBlock from "./ProductPolicyBlock";

export default function ProductDetailPage({ product }: any) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <PurchaseSummary product={product} />

      <div className="mt-10 space-y-8">
        <ProductDescription product={product} />
        <ProductInfoTable product={product} />
        <ProductNotice product={product} />
      </div>

      <div className="mt-12">
        <ProductPolicyBlock />
      </div>
    </section>
  );
}
