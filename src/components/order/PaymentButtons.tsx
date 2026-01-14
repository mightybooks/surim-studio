type PaymentButtonsProps = {
  disabled?: boolean;
};

export default function PaymentButtons({ disabled }: PaymentButtonsProps) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full rounded-xl bg-black py-3 text-white font-semibold disabled:opacity-50"
    >
      주문 내용 확인
    </button>
  );
}
