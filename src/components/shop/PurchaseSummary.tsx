// src/components/shop/PurchaseSummary.tsx
"use client";

export default function PurchaseSummary({ product }: any) {
  return (
    <div className="rounded-2xl border p-6 space-y-4 bg-white">
      <div className="text-sm text-zinc-500">{product.type}</div>
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <div className="text-xl font-bold">{product.price.toLocaleString()}원</div>
      <div className="text-sm text-zinc-600">{product.delivery}</div>

<p>현재 결제 시스템 점검 중입니다.<br/>
서비스 오픈 후 정상 결제가 가능합니다.<br/>
테스트터들 외 이용자들은 버튼을 누르지 마세요!!</p>

      <button
        onClick={() => {
          // 필요하면 query로 product 전달 가능
          window.location.href = "/payment/test";
        }}
        className="mt-4 w-full rounded-xl bg-black text-white px-4 py-3 text-sm"
      >
        결제하기
      </button>
    </div>
  );
}
