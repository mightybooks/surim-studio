// src/app/funding/books/[slug]/page.tsx

import FundingDetailPage from "@/components/funding/FundingDetailPage";

export default function Page() {
  // ✅ 펀딩 전용 상품 (별도 productId 필수)
  const product = {
    id: "funding_500_2026_01", // 🔥 별도 ID (고정값)
    type: "FUNDING_BOOK",
    name: "문수림의『500자 소설』(펀딩)",
    price: 12000,
    delivery: "택배 / 1~3영업일",
    thumbnail: "/productlist/500funding_list.jpg",
    detailImage: "/productdetail/500funding_detail.jpg",
    composition: "도서 1권",
    spec: "128×188mm / 208p",
    isbn: "979-11-994493-2-9(03810)",
  };

  return (
    <FundingDetailPage
      product={product}
      targetBooks={150}
      source="funding_500"
    />
  );
}
