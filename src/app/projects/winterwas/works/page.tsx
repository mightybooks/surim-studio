import Link from "next/link";

type Work = {
  slug: string;
  date: string; // YYYY.MM.DD
  tags: string[]; // 1~3개, 클릭 불가
};

const works: Work[] = [
  {
    slug: "winter-001",
    date: "2026.01.05",
    tags: ["코코아", "쓴맛", "라벨"],
  },
  {
    slug: "winter-002",
    date: "2026.01.07",
    tags: ["노인", "벤치", "목도리"],
  },
  {
    slug: "winter-003",
    date: "2026.01.09",
    tags: ["탄산", "로고송", "귀환불가"],
  },
  {
    slug: "winter-004",
    date: "2026.01.11",
    tags: ["바람", "민둥산", "파열음"],
  },
];

export default function WinterWasWorksPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-zinc-800">《겨울이었다》 기록</h1>
        <p className="text-sm text-zinc-500">동일한 규칙 아래 생산된 텍스트들</p>
      </header>

      {/* PC 2열 / 모바일 1열 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
        {works.map((work) => (
          <article key={work.slug} className="space-y-2">
            {/* 제목(고정) */}
            <Link
              href={`/projects/winterwas/works/${work.slug}`}
              className="block text-lg text-zinc-800 hover:text-zinc-900 transition"
            >
              겨울이었다
            </Link>

            {/* 메타(작고 흐리게) */}
            <div className="text-xs text-zinc-400">
              {work.slug} · {work.date}
            </div>

            {/* 태그(클릭 불가) */}
            <div className="flex flex-wrap gap-2 text-xs text-zinc-500">
              {work.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <footer className="pt-10 text-center text-xs text-zinc-400">
        © 2026 수림 스튜디오. All rights reserved.
      </footer>
    </main>
  );
}
