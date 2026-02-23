import { notFound } from "next/navigation";
import ProductDetailPage from "@/components/shop/ProductDetailPage";
import {
  getEditionProductBySlug,
  getEditionProducts,
  getOrderQuerySource,
} from "@/lib/editionProducts";

export function generateStaticParams() {
  return getEditionProducts("goods").map((product) => ({
    slug: product.slug,
  }));
}

export default function EditionGoodsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getEditionProductBySlug("goods", params.slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductDetailPage
      product={product}
      ctaLabel="주문하기"
      extraQuery={{ source: getOrderQuerySource(product) }}
    />
  );
}

