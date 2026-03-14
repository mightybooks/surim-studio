import Link from "next/link";
import { notFound } from "next/navigation";
import { getNoticeBySlug, NOTICE_ITEMS } from "../data";

export function generateStaticParams() {
  return NOTICE_ITEMS.map((item) => ({ slug: item.slug }));
}

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export default function NoticeDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = getNoticeBySlug(params.slug);
  if (!item) notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <header className="space-y-2">
        <p className="reveal-up text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700" style={revealStyle(80)}>
          {item.category}
        </p>
        <h1 className="reveal-up text-3xl font-semibold text-emerald-950" style={revealStyle(180)}>{item.title}</h1>
        <p className="reveal-up text-sm text-zinc-500" style={revealStyle(300)}>{item.publishedAt}</p>
      </header>

      <article className="reveal-up space-y-5 rounded-2xl border border-zinc-200 bg-white/70 p-6 leading-relaxed text-zinc-800" style={revealStyle(420)}>
        {item.body.split("\n\n").map((paragraph, index) => {
          if (paragraph.startsWith("- ")) {
            const lines = paragraph.split("\n").map((line) => line.replace(/^- /, ""));
            return (
              <ul key={`${item.slug}-${index}`} className="list-disc space-y-2 pl-5">
                {lines.map((line, lineIndex) => (
                  <li key={`${item.slug}-${index}-${lineIndex}`}>{line}</li>
                ))}
              </ul>
            );
          }

          return <p key={`${item.slug}-${index}`}>{paragraph}</p>;
        })}
      </article>

      <div className="reveal-up" style={revealStyle(520)}>
        <Link
          href="/notice"
          className="inline-flex items-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
        >
          공지 목록으로
        </Link>
      </div>
    </main>
  );
}
