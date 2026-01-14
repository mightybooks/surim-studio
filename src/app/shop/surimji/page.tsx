import ProductDetailPage from "@/components/shop/ProductDetailPage";

export default function SurimjiPage() {
  const product = {
    type: "DIGITAL",
    name: "수림지 디지털 이용권",
    price: 4900,
    delivery: "배송 없음 / 결제 후 즉시 이용",
    thumbnail: "/productlist/digital_list.webp",
    detailImage: "/productdetail/digital_detail.webp",
    composition: "월간 디지털 콘텐츠 이용권",
    spec: "결제 계정 기준 접근 / 로그인 필요",
  };

  return (
    <ProductDetailPage product={product}>
      <section className="max-w-2xl text-lg text-zinc-700 leading-relaxed">
        <p>“본 상품은 정기결제가 아닌 1회 결제형 디지털 콘텐츠입니다.”</p><br/>
        <p>
          수림지는 매달 한 번,<br />
          새로운 글을 가장 먼저 만나는 디지털 웹진입니다.
        </p>
        <p className="mt-2">
          종이책으로 나오기 전의 이야기,<br />
          혹은 끝내 책이 되지 않을 이야기들이 담깁니다.
        </p>
      </section>
    </ProductDetailPage>
  );
}
