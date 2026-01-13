export default function ProductNotice({ product }: any) {
  const notices = product?.notices ?? ["주의사항 더미 문구"];

  return (
    <div>
      <h2 className="text-sm font-semibold">주의사항</h2>
      <ul className="mt-2 list-disc pl-5 text-sm text-zinc-700">
        {notices.map((t: string, i: number) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
