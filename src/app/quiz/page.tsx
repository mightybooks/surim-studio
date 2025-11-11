export default function Quiz() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">〈당신은 토끼를 구출했다〉</h1>
      <p className="text-zinc-600">발견 → 돌봄 → 위기 → 갈등 → 결말 (5문항 시뮬)</p>
      <div className="flex gap-3">
        <a href="/result/guardian" className="rounded-xl bg-emerald-800 px-5 py-3 text-white">결과 보기(보호천사형)</a>
        <a href="/result/actor" className="rounded-xl border px-5 py-3">실행가형</a>
        <a href="/result/empath" className="rounded-xl border px-5 py-3">감성전파형</a>
      </div>
    </section>
  );
}
