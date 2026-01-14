// src/app/shop/books/[slug]/page.tsx

import ProductDetailPage from "@/components/shop/ProductDetailPage";

export default function Page() {
  const product = {
    type: "BOOK",
    name: "수리미 쩐다요",
    price: 1100,
    delivery: "택배 / 1~3영업일",
    thumbnail: "/productlist/tosiltosil_list.webp",
    detailImage: "/productdetail/tosiltosil_detail.webp",
    composition: "도서 1권",
    spec: "128×188mm / 284p",
    isbn: "979-11-994493-0-5",
  };

  return <ProductDetailPage product={product} />;
}
