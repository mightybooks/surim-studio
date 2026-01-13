import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용안내 | 수림 스튜디오",
  description:
    "수림 스튜디오 서비스 이용안내입니다. 디지털 콘텐츠 및 실물 상품 이용에 관한 기본 안내를 제공합니다.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function GuidePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">이용안내</h1>

        <section className="space-y-10 text-sm leading-relaxed text-slate-700">
        <section className="space-y-2">
            <p>
            본 사이트는 수림 스튜디오에서 운영하는 콘텐츠 기반 서비스입니다.
            디지털 콘텐츠와 일부 실물 도서를 함께 제공합니다.
            </p>
        </section>

        <section id="service-guide" className="space-y-3">
            <h2 className="text-base font-semibold">서비스 이용 안내</h2>
            <p>본 사이트에서는 다음과 같은 서비스를 제공합니다.</p>
            <ul className="list-disc pl-5 space-y-1">
            <li>디지털 콘텐츠 열람 이용권 구매</li>
            <li>일부 실물 도서 및 굿즈 구매</li>
            <li>콘텐츠 열람 및 참여형 서비스 이용</li>
            </ul>
            <p>
            디지털 콘텐츠는 결제 완료 즉시 이용이 가능하며, 실물 도서 및 굿즈는
            택배를 통해 배송됩니다.
            </p>
        </section>

        <section id="digital-content-guide" className="space-y-3">
            <h2 className="text-base font-semibold">디지털 콘텐츠 이용 안내</h2>
            <ul className="list-disc pl-5 space-y-1">
            <li>디지털 콘텐츠는 이용권 구매와 동시에 이용이 가능합니다.</li>
            <li>디지털 콘텐츠는 특성상 열람 이후 환불 및 교환이 불가합니다.</li>
            <li>
                디지털 콘텐츠는 특정 기기나 플랫폼에 종속되지 않으며, 개인적 이용
                범위 내에서만 열람이 허용됩니다.
            </li>
            </ul>
            <p className="text-slate-600">
            ※ 본 서비스의 디지털 콘텐츠는 의학, 심리, 법률적 진단이나 조언을
            제공하지 않으며, 상징적·창작적 콘텐츠로 제공됩니다.
            </p>
        </section>

        <section id="delivery-guide" className="space-y-3">
            <h2 className="text-base font-semibold">실물 상품 배송 안내</h2>
            <ul className="space-y-1">
            <li>배송 방법: CJ대한통운</li>
            <li>배송 지역: 전국</li>
            <li>배송 비용: 기본 3,000원 (산간·도서 지역 추가 비용 발생)</li>
            <li>배송 기간: 결제 완료 후 1~5일 내 발송</li>
            </ul>
        </section>

        <section id="refund-guide" className="space-y-3">
            <h2 className="text-base font-semibold">교환 및 반품 안내</h2>

            <div className="space-y-1">
            <p className="font-medium">교환 및 반품 주소</p>
            <p>대구 동구 동호로7길 66, 1층 102호</p>
            </div>

            <div className="space-y-1">
            <p className="font-medium">교환 및 반품 가능</p>
            <ul className="list-disc pl-5 space-y-1">
                <li>실물 도서 및 굿즈는 수령 후 5일 이내 신청한 경우</li>
                <li>
                상품의 내용이 표시·광고와 다르거나 계약 내용과 다르게 이행된 경우
                </li>
            </ul>
            </div>

            <div className="space-y-1">
            <p className="font-medium">교환 및 반품 불가</p>
            <ul className="list-disc pl-5 space-y-1">
                <li>디지털 콘텐츠를 열람한 경우</li>
                <li>이용자의 책임으로 상품이 훼손된 경우</li>
                <li>사용 또는 일부 소비로 상품 가치가 현저히 감소한 경우</li>
                <li>시간 경과로 재판매가 곤란한 경우</li>
                <li>복제가 가능한 상품의 포장을 훼손한 경우</li>
                <li>주문 제작 상품으로 사전 동의가 이루어진 경우</li>
            </ul>
            <p className="text-slate-600">
                ※ 단순 변심에 의한 교환·반품 시 배송비는 이용자 부담입니다.
            </p>
            </div>
        </section>

        <section id="payment-guide" className="space-y-3">
            <h2 className="text-base font-semibold">결제 안내</h2>
            <ul className="list-disc pl-5 space-y-1">
            <li>고액 결제의 경우 카드사 확인 절차가 진행될 수 있습니다.</li>
            <li>
                정상적이지 않은 주문으로 판단될 경우 주문이 보류 또는 취소될 수
                있습니다.
            </li>
            </ul>
        </section>

        <section className="space-y-3">
            <h2 className="text-base font-semibold">문의 안내</h2>
            <p>서비스 이용 관련 문의는 고객센터를 통해 접수해 주시기 바랍니다.</p>
        </section>
        </section>
    </main>
  );
}
