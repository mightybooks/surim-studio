export default function ProductNotice({ type }: { type?: string }) {
  return (
    <section>
      <h2 className="text-sm font-semibold mb-3">주의사항</h2>
      <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
        {type === "DIGITAL" ? (
          <li>
            본 상품은 디지털 콘텐츠 이용권으로,
            결제 완료 후 계정에 이용 권한이 부여됩니다.
          </li>
        ) : type === "GOODS" ? (
          <li>
            본 상품은 제작 공정 특성상 미세한 스크래치가 발생할 수 있으며,
            이는 교환·환불 사유가 되지 않습니다.
          </li>
        ) : (
          <li>
            본 상품은 종이 도서로, 비·눈·습기 등에 취약할 수 있으니
            배송 완료 후 즉시 수령을 부탁드립니다.
          </li>
        )}
      </ul>
    </section>
  );
}
