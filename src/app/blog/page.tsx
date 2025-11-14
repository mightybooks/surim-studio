// src/app/blog/page.tsx
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";

export const revalidate = 60; // 1분마다 재검증

export default async function BlogPage() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug, title, subtitle, published_at, tags, hero_image_url, status")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error) {
    console.error(error);
    return (
      <div className="mx-auto max-w-3xl py-10 px-4">
        <p className="text-sm text-red-600">
          블로그 글을 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  const posts = data ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Blog</h1>
        <p className="text-sm text-slate-600">
          수림 스튜디오의 작업일지, 서사 실험, 출판 비하인을 기록하는 공간입니다.
        </p>
      </header>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-4 shadow-sm"
          >
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-lg font-semibold text-slate-900">
                {post.title}
              </h2>
            </Link>
            {post.subtitle && (
              <p className="mt-1 text-sm text-slate-600">{post.subtitle}</p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              {post.published_at && (
                <span>
                  {new Date(post.published_at).toLocaleDateString("ko-KR")}
                </span>
              )}
              {post.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 px-2 py-0.5"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </article>
        ))}

        {posts.length === 0 && (
          <p className="text-sm text-slate-500">
            아직 발행된 글이 없습니다. /admin에서 첫 글을 작성해 주세요.
          </p>
        )}
      </div>
    </div>
  );
}
