import Link from "next/link";

const EDITION_SECTIONS = [
  {
    href: "/edition/surimji",
    title: "수림지",
    description: "곧 창간호가 발행됩니다.",
  },
  {
    href: "/edition/surimseoga",
    title: "수림서가",
    description: "수림 스튜디오 도서를 소개합니다.",
  },
  {
    href: "/edition/goods",
    title: "굿즈",
    description: "수림 스튜디오 굿즈를 소개합니다.",
  },
];

export default function EditionPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-emerald-900">Surim Edition</h1>
        <p className="text-zinc-600">
          출판/콘텐츠/굿즈를 한 곳에서 볼 수 있도록 에디션 섹션으로 정리했습니다.
        </p>
      </header>

      <ul className="grid gap-4 sm:grid-cols-3">
        {EDITION_SECTIONS.map((section) => (
          <li key={section.href}>
            <Link
              href={section.href}
              className="block rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-5 transition hover:bg-[#F5EEDC]"
            >
              <h2 className="text-lg font-semibold text-emerald-900">{section.title}</h2>
              <p className="mt-2 text-sm text-zinc-600">{section.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

