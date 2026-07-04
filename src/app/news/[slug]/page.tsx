import type { Metadata } from "next";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { notFound, redirect } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { createClient } from "@supabase/supabase-js";
import { getPrevNextPost } from "@/lib/postsNav";
import { NEWS } from "../data";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Props = {
  params: { slug: string };
};

type NewsPost = {
  slug: string;
  title: string;
  summary: string | null;
  content_markdown: string;
  published_at: string | null;
  status: string;
};

function newsSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}

function formatDate(value: string | null | undefined) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("ko-KR");
}

function isVisiblePublishedNews(item: Pick<NewsPost, "status" | "published_at">) {
  if (item.status !== "published" || !item.published_at) return false;
  return new Date(item.published_at).getTime() <= Date.now();
}

async function getDbPost(slug: string) {
  noStore();
  const { data, error } = await newsSupabase()
    .from("news_posts")
    .select("slug, title, summary, content_markdown, published_at, status")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("news_posts detail fetch failed", error);
    return { post: null as NewsPost | null, failed: true };
  }

  return { post: (data as NewsPost | null) ?? null, failed: false };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { post, failed } = await getDbPost(params.slug);
  if (post) {
    if (!isVisiblePublishedNews(post)) return {};
    return {
      title: post.title,
      description: post.summary ?? "수림 스튜디오 공식 뉴스입니다.",
    };
  }


  const legacy = NEWS.find((item) => item.slug === params.slug);
  if (!legacy) return {};

  return {
    title: legacy.title,
    description: legacy.body,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { post: dbPost, failed } = await getDbPost(params.slug);

  if (dbPost) {
    if (!isVisiblePublishedNews(dbPost)) notFound();

    const { data: allPosts } = await newsSupabase()
      .from("news_posts")
      .select("slug, title, published_at, status")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString());

    const safePosts = (allPosts ?? []).map((post) => ({
      slug: `/news/${post.slug ?? ""}`,
      title: post.title ?? "",
      published_at: post.published_at ?? null,
    }));

    const { prev, next } = getPrevNextPost(safePosts, `/news/${params.slug}`);

    return (
      <main className="mx-auto max-w-3xl px-6 py-12 space-y-8">
        <header>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            News
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-emerald-900">
            {dbPost.title}
          </h1>
          {dbPost.published_at && (
            <p className="mt-1 text-sm text-zinc-500">
              {formatDate(dbPost.published_at)}
            </p>
          )}
          {dbPost.summary && (
            <p className="mt-4 leading-relaxed text-zinc-700">
              {dbPost.summary}
            </p>
          )}
        </header>

        <article className="news-body prose prose-zinc max-w-none">
          <ReactMarkdown>{dbPost.content_markdown ?? ""}</ReactMarkdown>
        </article>

        <nav className="mt-10 border-t border-zinc-200 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-2">
              {prev && (
                <Link
                  href={prev.slug}
                  className="text-sm text-zinc-600 hover:text-zinc-900"
                >
                  이전 소식: <span className="font-medium">{prev.title}</span>
                </Link>
              )}
              {next && (
                <Link
                  href={next.slug}
                  className="text-sm text-zinc-600 hover:text-zinc-900"
                >
                  다음 소식: <span className="font-medium">{next.title}</span>
                </Link>
              )}
            </div>

            <Link
              href="/news"
              className="inline-flex items-center rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
            >
              뉴스 목록으로
            </Link>
          </div>
        </nav>
      </main>
    );
  }


  const item = NEWS.find((news) => news.slug === params.slug);
  if (!item) notFound();

  if (item.href) {
    redirect(item.href);
  }

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
            {formatDate(item.published_at)}
          </p>
        )}
      </header>

      <article className="prose prose-zinc max-w-none leading-relaxed">
        <p>{item.body}</p>
      </article>

      {item.cta && (
        <div className="pt-4">
          <a
            href={item.cta.href}
            className="inline-block rounded-lg bg-emerald-700 px-4 py-2 text-sm text-white transition hover:bg-emerald-800"
          >
            {item.cta.label}
          </a>
        </div>
      )}

      <div className="mt-10 border-t border-zinc-200 pt-6">
        <Link
          href="/news"
          className="inline-flex items-center rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          뉴스 목록으로
        </Link>
      </div>
    </main>
  );
}
