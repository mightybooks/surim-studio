"use client";

export default function PurchaseSummary({ product }: any) {
  const handlePay = (method: "CARD" | "KAKAOPAY") => {
    const params = new URLSearchParams({
      productId: product.id,
      payMethod: method,
    });

    window.location.href = `/payment/test?${params.toString()}`;
  };

  return (
    <div className="rounded-2xl border p-6 space-y-4 bg-white">
      <div className="text-sm text-zinc-500">{product.type}</div>
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <div className="text-xl font-bold">
        {product.price.toLocaleString()}원
      </div>

      <p>현재 결제 시스템 점검 중입니다.<br/>
서비스 오픈 후 정상 결제가 가능합니다.<br/>
테스트터들 외 이용자들은 버튼을 누르지 마세요!!</p>

      <button
        onClick={() => handlePay("CARD")}
        className="w-full rounded-xl bg-black text-white py-3"
      >
        카드 결제
      </button>

      <button
        onClick={() => handlePay("KAKAOPAY")}
        className="w-full rounded-xl bg-yellow-400 text-black py-3"
      >
        카카오페이
      </button>
    </div>
  );
}
