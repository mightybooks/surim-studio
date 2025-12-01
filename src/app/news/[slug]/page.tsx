// src/app/news/[slug]/page.tsx

import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { NEWS } from "../data";

type NewsItem = {
  slug: string;
  title: string;
  body: string;
  published_at?: string;
  href?: string;
  cta?: {
    href: string;
    label: string;
  };
};

function getAdjacentNews(slug: string) {
  // published_at 기준 최신순 정렬 (없으면 가장 오래된 것으로 처리)
  const sorted = [...NEWS].sort((a, b) => {
    const aDate = a.published_at
      ? new Date(a.published_at).getTime()
      : 0;
    const bDate = b.published_at
      ? new Date(b.published_at).getTime()
      : 0;
    return bDate - aDate;
  });

  const index = sorted.findIndex((n) => n.slug === slug);
  if (index === -1) {
    return { prev: null as NewsItem | null, next: null as NewsItem | null };
  }

  const prev = index > 0 ? (sorted[index - 1] as NewsItem) : null;
  const next =
    index < sorted.length - 1
      ? (sorted[index + 1] as NewsItem)
      : null;

  return { prev, next };
}

export default function NewsDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const item = NEWS.find((n) => n.slug === params.slug) as
    | NewsItem
    | undefined;

  if (!item) notFound();

  // 외부/내부 링크 리다이렉트용 필드가 있는 경우 기존 동작 유지
  if (item.href) {
    redirect(item.href);
  }

  const { prev, next } = getAdjacentNews(params.slug);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          News
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-emerald-900">
          {item.title}
        </h1>
        {item.published_at && (
          <p className="mt-1 text-sm text-zinc-500">
            {item.published_at}
          </p>
        )}
      </header>

      <article className="prose prose-zinc max-w-none leading-relaxed">
        <p>{item.body}</p>
      </article>

      {item.cta && (
        <div className="pt-4">
          {/* 내부 링크면 Link로 교체 가능 */}
          <a
            href={item.cta.href}
            className="inline-block rounded-lg bg-emerald-700 px-4 py-2 text-sm text-white transition hover:bg-emerald-800"
          >
            {item.cta.label}
          </a>
        </div>
      )}

      {/* 하단 네비게이션: 이전 글 / 다음 글 / 목록 */}
      <nav className="mt-10 border-t border-zinc-200 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            {prev && (
              <Link
                href={`/news/${prev.slug}`}
                className="text-sm text-zinc-600 hover:text-zinc-900"
              >
                ← 이전 소식:{" "}
                <span className="font-medium">{prev.title}</span>
              </Link>
            )}
            {next && (
              <Link
                href={`/news/${next.slug}`}
                className="text-sm text-zinc-600 hover:text-zinc-900"
              >
                다음 소식:{" "}
                <span className="font-medium">{next.title}</span> →
              </Link>
            )}
          </div>

          <div className="flex justify-start sm:justify-end">
            <Link
              href="/news"
              className="inline-flex items-center rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              뉴스 목록으로
            </Link>
          </div>
        </div>
      </nav>
    </main>
  );
}
