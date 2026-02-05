// src/app/shop/goods/[slug]/page.tsx

import ProductDetailPage from "@/components/shop/ProductDetailPage";

export default function Page() {
  const product = {
    type: "GOODS",
    name: "8컷 콘티노트 7권 1세트",
    price: 21000,
    delivery: "택배 / 1~3영업일",
    thumbnail: "/productlist/8cut_list.webp",
    detailImage: "/productdetail/8cut_detail.webp",
    composition: "노트 1권",
    spec: "B5 / 무선제본 36매 / 평량 120g",
  };

  return <ProductDetailPage product={product} />;
}
