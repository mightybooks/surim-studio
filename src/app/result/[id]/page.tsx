type Props = { params: { id: string } };

const map = {
  guardian: { title: "보호천사형", cta: { href: "https://example-book", label: "도서 보러가기" } },
  actor:    { title: "실행가형",   cta: { href: "/projects/tosiltosil", label: "#토실토실챌린지" } },
  empath:   { title: "감성전파형", cta: { href: "/garden", label: "그날의 토실이 기록" } },
} as const;

export default function ResultPage({ params }: Props) {
  const data = map[params.id as keyof typeof map] ?? map.guardian;
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <p className="text-zinc-600">유형 설명과 결과 일러스트 자리.</p>
      <div className="flex gap-3">
        <a className="rounded-xl bg-emerald-800 px-5 py-3 text-white" href={data.cta.href}>{data.cta.label}</a>
        <a className="rounded-xl border px-5 py-3" href="https://example-book">도서 보러가기</a>
      </div>
    </section>
  );
}
