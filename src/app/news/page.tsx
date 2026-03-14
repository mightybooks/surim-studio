import Link from "next/link";
import { NEWS } from "./data";

export const metadata = {
  title: "News – 수림 스튜디오",
  description: "프로젝트 소식, 업데이트, 캠페인 소식을 전합니다.",
};

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}


export default function NewsIndexPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
      <header className="space-y-3">
        <h1 className="reveal-up text-3xl font-semibold text-emerald-900" style={revealStyle(180)}>News</h1>
        <p className="reveal-up text-zinc-600" style={revealStyle(300)}>
          수림 스튜디오의 최신 프로젝트 및 캠페인 소식을 전합니다.
        </p>
      </header>

      <ul className="space-y-6">
        {NEWS.map((item, index) => (
          <li key={item.slug} className="reveal-up" style={revealStyle(420 + index * 90)}>
            <Link
              href={item.href ?? `/news/${item.slug}`} // ← href 우선, 없으면 기본 /news
              className="block rounded-xl border border-zinc-200 bg-white/60 p-6 shadow-sm hover:shadow-md hover:border-emerald-200 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="text-xl font-semibold text-emerald-900">
                  {item.title}
                </h2>
                {item.published_at && (
                  <span className="text-sm text-zinc-500">
                    {item.published_at}
                  </span>
                )}
              </div>

              <p className="mt-2 text-zinc-700 leading-relaxed">{item.body}</p>

              {item.cta && (
                <div className="mt-4">
                  <span className="inline-block text-sm text-emerald-700 border border-emerald-200 rounded-full px-3 py-1 hover:bg-emerald-50 transition">
                    {item.cta.label}
                  </span>
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
