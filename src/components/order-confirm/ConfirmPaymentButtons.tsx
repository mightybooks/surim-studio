// src/components/order-confirm/ConfirmPaymentButtons.tsx
"use client";

type Props = {
  loading: boolean;
  onPay: (method: "CARD" | "KAKAOPAY") => void;

  /** ✅ 펀딩 페이지에서는 false로 내려서 카카오페이 버튼 숨김 */
  showKakaoPay?: boolean;
};

export default function ConfirmPaymentButtons({
  loading,
  onPay,
  showKakaoPay = true,
}: Props) {
  return (
    <section className="space-y-3">
      <button
        type="button"
        disabled={loading}
        onClick={() => onPay("CARD")}
        className="w-full rounded-xl bg-black py-3 text-white font-semibold disabled:opacity-50"
      >
        결제하기
      </button>

      {showKakaoPay && (
        <button
          type="button"
          disabled={loading}
          onClick={() => onPay("KAKAOPAY")}
          className="w-full rounded-xl bg-yellow-400 py-3 font-semibold text-black disabled:opacity-50"
        >
          카카오페이로 결제
        </button>
      )}
    </section>
  );
}
