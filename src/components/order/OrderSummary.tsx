type OrderSummaryProps = {
  productName: string;
  price: number;
};

export default function OrderSummary({
  productName,
  price,
}: OrderSummaryProps) {
  return (
    <section className="mb-6 rounded-xl border p-4 bg-white">
      <div className="text-sm text-zinc-500">상품</div>
      <div className="text-lg font-medium">{productName}</div>
      <div className="mt-1 text-base font-semibold">
        {price.toLocaleString()}원
      </div>
    </section>
  );
}
