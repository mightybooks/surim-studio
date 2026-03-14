import Link from "next/link";

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export default function EditionSurimjiPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 px-6 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-emerald-900">수림지</h1>
        <p className="reveal-up text-zinc-700" style={revealStyle(300)}>곧 창간호가 발행됩니다. (준비중)</p>
      </header>

      <div className="reveal-up rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-6" style={revealStyle(420)}>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/edition/surimseoga"
            className="inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[color:var(--fg)] transition hover:bg-[#F5EEDC]"
          >
            수림서가 보러가기
          </Link>
          <Link
            href="/edition/goods"
            className="inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[color:var(--fg)] transition hover:bg-[#F5EEDC]"
          >
            굿즈 보러가기
          </Link>
        </div>
      </div>
    </main>
  );
}

