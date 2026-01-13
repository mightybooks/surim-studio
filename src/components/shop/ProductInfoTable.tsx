export default function ProductInfoTable({ product }: any) {
  const items = product?.info ?? [
    { label: "구성", value: "—" },
    { label: "규격", value: "—" },
  ];

  return (
    <div>
      <h2 className="text-sm font-semibold">구성/규격</h2>
      <div className="mt-2 rounded-xl border">
        {items.map((it: any, idx: number) => (
          <div key={idx} className="flex gap-4 border-b last:border-b-0 p-3 text-sm">
            <div className="w-24 text-zinc-500">{it.label}</div>
            <div className="flex-1 text-zinc-800">{it.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
