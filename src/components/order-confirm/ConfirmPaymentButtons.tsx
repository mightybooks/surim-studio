// src/components/order-confirm/ConfirmPaymentButtons.tsx
"use client";

type Props = {
  loading: boolean;
  onPay: (method: "CARD" | "KAKAOPAY" | "PAYPAL") => void;

  /** 해외결제(페이팔) 모드일 때만 true */
  showPaypal?: boolean;

  /** ✅ 펀딩 페이지에서는 false로 내려서 카카오페이 버튼 숨김 */
  showKakaoPay?: boolean;
};

export default function ConfirmPaymentButtons({
  loading,
  onPay,
  showPaypal = false,
  showKakaoPay = true,
}: Props) {
  // ✅ 해외(PayPal)면 PayPal 버튼만
  if (showPaypal) {
    return (
      <section className="space-y-3">
        <button
          type="button"
          disabled={loading}
          onClick={() => onPay("PAYPAL")}
          className="w-full rounded-xl bg-[#003087] py-3 font-semibold text-white disabled:opacity-50"
        >
          PayPal로 결제
        </button>
      </section>
    );
  }

  // ✅ 국내면 카드 + (선택적으로) 카카오만
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
