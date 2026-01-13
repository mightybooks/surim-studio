import ProductDetailPage from "@/components/shop/ProductDetailPage";

export default function Page() {
  const product = {
    type: "BOOK",
    name: "문수림의 500자 소설",
    price: 12000,
    delivery: "택배 / 1~3영업일",
    description: "도서 1종 더미 설명입니다.",
  };

  return <ProductDetailPage product={product} />;
}
