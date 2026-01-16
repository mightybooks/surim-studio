// src/components/order-confirm/ConfirmPaymentButtons

type Props = {
  loading: boolean;
  onPay: (method: "CARD" | "KAKAOPAY") => void;
};

export default function ConfirmPaymentButtons({ loading, onPay }: Props) {
  return (
    <section className="space-y-3">
      <button
        disabled={loading}
        onClick={() => onPay("CARD")}
        className="w-full rounded-xl bg-black py-3 text-white font-semibold disabled:opacity-50"
      >
        결제하기
      </button>

      <button
        disabled={loading}
        onClick={() => onPay("KAKAOPAY")}
        className="w-full rounded-xl bg-yellow-400 py-3 font-semibold text-black disabled:opacity-50"
      >
        카카오페이로 결제
      </button>
    </section>
  );
}
