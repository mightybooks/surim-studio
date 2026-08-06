// src/app/blog/[slug]/page.tsx

// 개발 중에는 항상 최신 데이터 쓰도록 캐시 끔
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseServerPublic } from "@/lib/supabase/server-public";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import ShareButtons from "@/components/ShareButtons";
import { getPrevNextPost } from "@/lib/postsNav";
import { PostNavigation } from "@/components/PostNavigation";
import PostEngagement from "@/components/engagement/PostEngagement";

type Props = {
  params: Promise<{ slug: string }>;
};

// 공통: hero_image_url 정리 로직
function normalizeHeroUrl(raw: string | null | undefined): string | null {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return null;

  // ✅ 절대 URL은 그대로 반환 (Supabase public URL 포함)
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  let fixed = trimmed;

  // 1) 과거 오타 보정: /publc/blogimg/ → /blogimg/
  if (fixed.startsWith("/publc/blogimg/")) {
    fixed = fixed.replace("/publc/blogimg/", "/blogimg/");
  }

  // 2) /public/... 형태라면 /public 제거
  if (fixed.startsWith("/public/")) {
    fixed = fixed.replace("/public", "");
  }

  // 3) /로 안 시작하면 붙이기 (상대경로만 대상)
  if (!fixed.startsWith("/")) {
    fixed = "/" + fixed;
  }

  return fixed;
}

// ─────────────────────────────────────────────
// 메타데이터 (OG 이미지 포함)
// ─────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await supabaseServerPublic();
  const { data } = await supabase
    .from("blog_posts")
    .select("title, subtitle, hero_image_url, status")
    .eq("slug", slug)
    .maybeSingle();

  if (!data || data.status !== "published") {
    return {};
  }

  const title = data.title;
  const description =
    data.subtitle ??
    "수림 스튜디오 블로그 글입니다. 감정의 미립자를 기록하는 작은 출판 실험실.";

  const heroUrl = normalizeHeroUrl(data.hero_image_url);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: heroUrl ? [heroUrl] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: heroUrl ? [heroUrl] : [],
    },
  };
}

// ─────────────────────────────────────────────
// 본문 페이지
// ─────────────────────────────────────────────
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await supabaseServerPublic();
  
  // 1) 현재 글 정보 가져오기
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !post || post.status !== "published") {
    notFound();
  }

  // 2) 이전/다음 글 계산을 위한 전체 목록 (published만)
    const { data: allPosts } = await supabase
      .from("blog_posts")
      .select("slug, title, published_at, status")
      .eq("status", "published");

    // supabase 결과 → PostMeta 형태로 정제
    const safePosts = (allPosts ?? []).map((p) => ({
      slug: p.slug ?? "",
      title: p.title ?? "",
      published_at: p.published_at ?? null,
    }));

    // 올바른 구조분해
    const { prev, next } = getPrevNextPost(safePosts, slug);

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("ko-KR")
    : undefined;

  const heroUrl = normalizeHeroUrl(post.hero_image_url);
  const tags: string[] = Array.isArray(post.tags) ? post.tags : [];

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article className="space-y-6">
        {/* 헤드 이미지 */}
        {heroUrl ? (
          <div className="relative h-64 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)]">
            <Image
              src={heroUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
            />
          </div>
        ) : (
          <p className="text-xs text-slate-400">(DEBUG) hero_image_url 없음</p>
        )}

        {/* 제목/메타 */}
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="text-sm text-slate-600">{post.subtitle}</p>
          )}
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
            {publishedDate && <span>{publishedDate}</span>}
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 px-2 py-0.5"
              >
                #{tag}
              </span>
            ))}
          </div>
          <div className="mt-6 border-t border-slate-200 pt-4">
            <ShareButtons title={post.title} />
          </div>
        </header>

        {/* 본문 마크다운 */}
        <div className="prose prose-sm max-w-none whitespace-pre-wrap sm:prose-base">
          <ReactMarkdown
            components={{
              p({ children }) {
                return (
                  <p className="mb-4 leading-relaxed text-slate-800">
                    {children}
                  </p>
                );
              },
              h2({ children }) {
                return (
                  <h2 className="mt-10 mb-4 border-t border-slate-200 pt-6 text-xl font-semibold text-slate-900">
                    {children}
                  </h2>
                );
              },
              h3({ children }) {
                return (
                  <h3 className="mt-8 mb-3 text-lg font-semibold text-slate-900">
                    {children}
                  </h3>
                );
              },
            }}
          >
            {post.content_md ?? ""}
          </ReactMarkdown>
        </div>

        {/* 👇 여기서 Client Wrapper만 호출 */}
         <PostEngagement
         targetType="blog"
         targetId={post.id}
        />

        {/* 하단 공유 버튼 */}
        <div className="mt-10 border-t border-slate-200 pt-4">
          <ShareButtons title={post.title} />
        </div>
      </article>

      {/* 하단 네비게이션: 이전 글 / 다음 글 / 목록 */}
      <div className="mt-10 border-t border-slate-200 pt-6">
        <PostNavigation
          prev={prev}
          next={next}
          backHref="/blog"
          backLabel="블로그 목록으로"
        />
      </div>
    </main>
  );
}
