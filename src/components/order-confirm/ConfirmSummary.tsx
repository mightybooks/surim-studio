type Props = {
  productName: string;
  price: number;
};

export default function ConfirmSummary({ productName, price }: Props) {
  return (
    <section className="rounded-xl border p-4 bg-white">
      <div className="text-sm text-zinc-500">상품</div>
      <div className="text-lg font-medium">{productName}</div>
      <div className="mt-1 font-semibold">
        {price.toLocaleString()}원
      </div>
    </section>
  );
}
