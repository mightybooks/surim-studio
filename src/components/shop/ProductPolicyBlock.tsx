type ProductType = "BOOK" | "GOODS" | "DIGITAL";

export default function ProductPolicyBlock({
  type,
}: {
  type?: ProductType;
}) {
  return (
    <section className="rounded-2xl border p-6 bg-white space-y-4 text-sm text-zinc-700">

      {/* 배송 / 이용 안내 */}
      <div>
        <strong>{type === "DIGITAL" ? "이용 안내" : "배송 안내"}</strong>
        <div className="mt-1">
          {type === "DIGITAL" ? (
            <>
              본 상품은 디지털 콘텐츠 이용권으로,<br />
              배송되지 않으며 결제 완료 후 즉시 이용 가능합니다.
            </>
          ) : (
            <>
              택배 오후 2시 이전 결제 당일 발송 / 토, 일 휴무 / 1~3영업일 소요<br />
              (상품별 상이할 수 있음)
            </>
          )}
        </div>
      </div>

      {/* 교환·환불 정책 */}
      <div>
        <strong>교환·환불 정책</strong>
        <div className="mt-1">
          {type === "DIGITAL" ? (
            <>
              디지털 콘텐츠 이용권은 결제일로부터 7일 이내이며,
              열람(이용) 이력이 없는 경우에 한해 환불이 가능합니다.
            </>
          ) : (
            <>
              교환 및 환불 정책은 고지된 기준 및 네이버 스토어 정책을 준용합니다.
            </>
          )}
        </div>
      </div>

      {/* 문의 */}
      <div>
        <strong>문의</strong>
        <div className="mt-1">
          이메일: surimstudio@gmail.com
        </div>
      </div>

      {/* 고지 문구 */}
      <div className="pt-2 text-xs text-zinc-500">
        {type === "DIGITAL" ? (
          <>
            본 상품은 디지털 콘텐츠 이용권으로,
            본 사이트에서만 제공 및 결제되는 서비스입니다.
          </>
        ) : (
          <>
            본 상품은 네이버 스토어팜에서 동일하게 판매 중인 상품입니다.
            본 사이트는 브랜드 공식 소개 및 결제 연동을 위한 공식 채널입니다.
          </>
        )}
        <br />
        자세한 내용은{" "}
        <a href="/legal/guide" className="underline">
          이용안내
        </a>
        를 참고해 주세요.
      </div>
    </section>
  );
}
