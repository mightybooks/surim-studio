import Link from "next/link";

const EDITIONS = [
  {
    href: "/editions/surimji",
    title: "수림지",
    description: "월간 수림지 발간 및 아카이브",
  },
  {
    href: "/editions/surimseoga",
    title: "수림서가",
    description: "수림 스튜디오 북 큐레이션",
  },
  {
    href: "/editions/goods",
    title: "굿즈",
    description: "굿즈 상품 모음",
  },
];

export default function EditionsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-emerald-900">Surim Editions</h1>
        <p className="text-zinc-600">
          수림 스튜디오의 출판/에디션 카테고리를 모아둔 허브입니다.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-3">
        {EDITIONS.map((edition) => (
          <li key={edition.href}>
            <Link
              href={edition.href}
              className="block rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-5 transition hover:bg-[#F5EEDC]"
            >
              <h2 className="text-lg font-semibold text-emerald-900">{edition.title}</h2>
              <p className="mt-2 text-sm text-zinc-600">{edition.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
