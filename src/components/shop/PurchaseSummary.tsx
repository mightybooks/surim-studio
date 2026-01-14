"use client";

declare global {
  interface Window {
    IMP: any;
  }
}

function handleTestPayment(product: any) {
  const { IMP } = window;
  if (!IMP) {
    alert("결제 모듈이 아직 로드되지 않았습니다.");
    return;
  }

  IMP.init("impXXXXXXXX"); // 포트원 테스트 가맹점 코드

  IMP.request_pay(
    {
      channelKey: "channel-key-492f9529-6ed4-499e-b64a-19cd5a9c6f4c",
      pay_method: "card",
      merchant_uid: `test_${Date.now()}`,
      name: product.name,
      amount: product.price,
      buyer_email: "test@surim.studio",
      buyer_name: "테스트구매자",
    },
    (rsp: any) => {
      console.log("결제 결과:", rsp);
    }
  );
}

export default function PurchaseSummary({ product }: any) {
  return (
    <div className="rounded-2xl border p-6 space-y-4 bg-white">
      <div className="text-sm text-zinc-500">{product.type}</div>
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <div className="text-xl font-bold">
        {product.price.toLocaleString()}원
      </div>
      <div className="text-sm text-zinc-600">{product.delivery}</div>

      <button
        onClick={() => handleTestPayment(product)}
        className="mt-4 w-full rounded-xl bg-black text-white px-4 py-3 text-sm"
      >
        결제하기
      </button>
    </div>
  );
}
