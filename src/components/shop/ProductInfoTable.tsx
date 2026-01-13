// src/components/shop/ProductInfoTable.tsx

export default function ProductInfoTable({ product }: any) {
  return (
    <section>
      <h2 className="text-sm font-semibold mb-3">구성 / 규격</h2>

      <div className="rounded-xl border divide-y bg-white">
        <div className="flex p-4 text-sm">
          <div className="w-24 text-zinc-500">구성</div>
          <div className="flex-1">{product.composition}</div>
        </div>

        <div className="flex p-4 text-sm">
          <div className="w-24 text-zinc-500">규격</div>
          <div className="flex-1">{product.spec}</div>
        </div>
        
        {product.type === "BOOK" && product.isbn && (
          <div className="flex p-4 text-sm">
            <div className="w-24 text-zinc-500">ISBN</div>
            <div className="flex-1">{product.isbn}</div>
          </div>
        )}
      </div>
    </section>
  );
}
