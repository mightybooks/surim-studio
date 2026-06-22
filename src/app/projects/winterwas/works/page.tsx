import Link from "next/link";

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

const works = [
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
    tags: ["탄산", "맥도날드", "귀환불가"],
  },
  {
    slug: "winter-004",
    date: "2026.01.11",
    tags: ["바람", "민둥산", "패인얼음"],
  },
  {
    slug: "winter-005",
    date: "2026.03.10",
    tags: ["아기", "아이", "태엽 인형"],
  },
  {
    slug: "winter-006",
    date: "2026.03.12",
    tags: ["항구", "충전케이블", "메시지"],
  },
  {
    slug: "winter-007",
    date: "2026.06.20",
    tags: ["장마", "파이프", "바람"],
  },
];

export default function WinterWorksPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="reveal-up text-2xl font-semibold mb-2" style={revealStyle(180)}>《겨울이었다》 기록</h1>
      <p className="reveal-up text-sm text-zinc-500 mb-10" style={revealStyle(300)}>
        동일한 규칙 아래 생산된 텍스트들
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {works.map((work, index) => (
          <Link
            key={work.slug}
            href={`/projects/winterwas/works/${work.slug}`}
            className="
              block rounded-2xl border border-zinc-200/60
              bg-white/70 p-6
              transition
              hover:bg-zinc-100
              hover:shadow-sm
              hover:-translate-y-0.5
            "
            style={revealStyle(420 + index * 90)}
          >
            <div className="space-y-3">
              <div>
                <p className="text-lg font-medium text-zinc-800">
                  {work.slug}
                </p>
                <p className="text-xs text-zinc-500">
                  {work.date}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-zinc-500 bg-zinc-200/60 px-2 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>

      <footer className="reveal-up mt-16 text-center text-xs text-zinc-400" style={revealStyle(1020)}>
        © 2026 수림 스튜디오. All rights reserved.
      </footer>
    </main>
  );
}
