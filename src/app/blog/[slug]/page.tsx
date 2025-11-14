// src/app/blog/[slug]/page.tsx

// 개발 중에는 항상 최신 데이터 쓰도록 캐시 끔
export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabaseClient";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import ShareButtons from "@/components/ShareButtons";

type Props = {
  params: { slug: string };
};

// 공통: hero_image_url 정리 로직
function normalizeHeroUrl(raw: string | null | undefined): string | null {
  const trimmed = (raw ?? "").trim();
  if (!trimmed) return null;

  let fixed = trimmed;

  // 1) 과거 오타 보정: /publc/blogimg/ → /blogimg/
  if (fixed.startsWith("/publc/blogimg/")) {
    fixed = fixed.replace("/publc/blogimg/", "/blogimg/");
  }

  // 2) /public/... 형태라면 /public 제거
  if (fixed.startsWith("/public/")) {
    fixed = fixed.replace("/public", "");
  }

  // 3) /로 안 시작하면 강제로 붙이기
  if (!fixed.startsWith("/")) {
    fixed = "/" + fixed;
  }

  return fixed;
}

// ─────────────────────────────────────────────
// 메타데이터 (OG 이미지 포함)
// ─────────────────────────────────────────────
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("title, subtitle, hero_image_url, status")
    .eq("slug", params.slug)
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
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", params.slug)
    .maybeSingle();

  if (error || !data || data.status !== "published") {
    notFound();
  }

  const publishedDate = data.published_at
    ? new Date(data.published_at).toLocaleDateString("ko-KR")
    : undefined;

  const heroUrl = normalizeHeroUrl(data.hero_image_url);
  const tags: string[] = Array.isArray(data.tags) ? data.tags : [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <article className="space-y-6">
        {/* 헤드 이미지 */}
        {heroUrl ? (
          <div className="relative h-64 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)]">
            <Image
              src={heroUrl}
              alt={data.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 768px, 100vw"
            />
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            (DEBUG) hero_image_url 없음
          </p>
        )}
        
        {/* 제목/메타 */}
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-sm text-slate-600">{data.subtitle}</p>
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
          <ShareButtons title={data.title} />
        </div>
        </header>

        {/* 본문 마크다운 */}
        <div className="prose prose-sm max-w-none whitespace-pre-wrap sm:prose-base">
          <ReactMarkdown
            components={{
              p({ node, ...props }) {
                return (
                  <p
                    className="mb-4 leading-relaxed text-slate-800"
                    {...props}
                  />
                );
              },
              h2({ node, ...props }) {
                return (
                  <h2
                    className="mt-10 mb-4 border-t border-slate-200 pt-6 text-xl font-semibold text-slate-900"
                    {...props}
                  />
                );
              },
              h3({ node, ...props }) {
                return (
                  <h3
                    className="mt-8 mb-3 text-lg font-semibold text-slate-900"
                    {...props}
                  />
                );
              },
            }}
          >
            {data.content_md ?? ""}
          </ReactMarkdown>
          </div>
          
         {/* 하단 공유 버튼 */}
        <div className="mt-10 border-t border-slate-200 pt-4">
          <ShareButtons title={data.title} />
        </div>

        {/* 여기 밑에 "자체 댓글 기능은 우선 3월까지 막아둡니다" 고정 문구 */}
        <p className="mt-6 text-[11px] text-slate-500">
          자체 댓글 기능은 우선 3월까지 막아둡니다. 필요하시면 SNS나 이메일로
          연락 주세요.
        </p>        
      </article>      
    </div>
  );
}
