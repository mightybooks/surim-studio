import Link from "next/link";

export default function EditionsSurimjiPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-6">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-emerald-900">수림지</h1>
        <p className="text-zinc-600">
          월간 수림지 에디션과 관련 페이지를 안내합니다.
        </p>
      </header>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-6">
        <p className="text-sm text-zinc-700">
          현재 수림지 소개/발간 페이지는 아래 경로에서 확인할 수 있습니다.
        </p>
        <Link
          href="/surimzine"
          className="mt-4 inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[color:var(--fg)] transition hover:bg-[#F5EEDC]"
        >
          SurimZine 보러가기
        </Link>
      </div>
    </main>
  );
}
