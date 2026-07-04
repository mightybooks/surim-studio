import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { NEWS } from "./data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "News - 수림 스튜디오",
  description: "수림 스튜디오의 공식 공지, 프로젝트 소식, 업데이트를 전합니다.",
};

type DbNewsPost = {
  slug: string;
  title: string;
  summary: string | null;
  published_at: string | null;
  status: string;
};

type NewsListItem = {
  slug: string;
  title: string;
  summary: string;
  published_at: string | null;
  href?: string;
  cta?: { href: string; label: string };
};

function newsSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

function formatDate(value: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("ko-KR");
}

function isVisiblePublishedNews(item: Pick<DbNewsPost, "status" | "published_at">) {
  if (item.status !== "published" || !item.published_at) return false;
  return new Date(item.published_at).getTime() <= Date.now();
}

export default async function NewsIndexPage() {
  noStore();
  const { data, error } = await newsSupabase()
    .from("news_posts")
    .select("slug, title, summary, published_at, status")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("news_posts list fetch failed", error);
  }

  const dbRows = error ? [] : ((data ?? []) as DbNewsPost[]);
  const dbSlugs = new Set(dbRows.map((item) => item.slug));

  const dbItems: NewsListItem[] = dbRows
    .filter(isVisiblePublishedNews)
    .map((item) => ({
      slug: item.slug,
      title: item.title,
      summary: item.summary ?? "",
      published_at: item.published_at,
    }));

  const legacyItems: NewsListItem[] = NEWS.filter(
    (item) => !dbSlugs.has(item.slug),
  ).map((item) => ({
    slug: item.slug,
    title: item.title,
    summary: item.body,
    published_at: item.published_at ?? null,
    href: item.href,
    cta: item.cta,
  }));

  const news = [...dbItems, ...legacyItems].sort((a, b) =>
    (b.published_at ?? "").localeCompare(a.published_at ?? ""),
  );

  return (
    <main className="mx-auto max-w-5xl px-6 py-12 space-y-10">
      <header className="space-y-3">
        <h1
          className="reveal-up text-3xl font-semibold text-emerald-900"
          style={revealStyle(180)}
        >
          News
        </h1>
        <p className="reveal-up text-zinc-600" style={revealStyle(300)}>
          수림 스튜디오의 공식 공지와 프로젝트 업데이트를 전합니다.
        </p>
      </header>

      <ul className="space-y-6">
        {news.map((item, index) => (
          <li
            key={item.slug}
            className="reveal-up"
            style={revealStyle(420 + index * 90)}
          >
            <Link
              href={item.href ?? `/news/${item.slug}`}
              className="block rounded-xl border border-zinc-200 bg-white/60 p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="text-xl font-semibold text-emerald-900">
                  {item.title}
                </h2>
                {item.published_at && (
                  <span className="text-sm text-zinc-500">
                    {formatDate(item.published_at)}
                  </span>
                )}
              </div>

              {item.summary && (
                <p className="mt-2 leading-relaxed text-zinc-700">
                  {item.summary}
                </p>
              )}

              {item.cta && (
                <div className="mt-4">
                  <span className="inline-block rounded-full border border-emerald-200 px-3 py-1 text-sm text-emerald-700 transition hover:bg-emerald-50">
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
