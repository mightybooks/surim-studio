export default function ProductPolicyBlock() {
  return (
    <div className="rounded-2xl border p-4 text-sm text-zinc-700 space-y-2">
      <div className="font-semibold">배송 안내</div>
      <div>택배 / 1~3영업일 (상품별 상이할 수 있음)</div>

      <div className="pt-2 font-semibold">교환/환불 정책</div>
      <div>교환·환불 정책은 고지된 기준 및 네이버 스토어 정책을 준용합니다.</div>

      <div className="pt-2 font-semibold">문의</div>
      <div>이메일: contact@surimstudio.com</div>

      <div className="pt-2 text-xs text-zinc-500">
        본 상품은 네이버 스토어팜에서 동일하게 판매 중인 상품입니다. 본 사이트는 브랜드 공식 소개 및 결제 연동을 위한 공식 채널입니다.
      </div>
    </div>
  );
}
