// src/app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabaseClient";
import ReactMarkdown from "react-markdown";

type Props = {
  params: { slug: string };
};

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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: data.hero_image_url ? [data.hero_image_url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: data.hero_image_url ? [data.hero_image_url] : [],
    },
  };
}

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

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <article className="space-y-6">
        {/* 헤드 이미지 */}
        {data.hero_image_url && (
          <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)]">
            <img
              src={data.hero_image_url}
              alt={data.title}
              className="h-64 w-full object-cover"
            />
          </div>
        )}

        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            {data.title}
          </h1>
          {data.subtitle && (
            <p className="text-sm text-slate-600">{data.subtitle}</p>
          )}
          <div className="flex flex-wrap gap-2 text-[11px] text-slate-500">
            {publishedDate && <span>{publishedDate}</span>}
            {data.tags?.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border border-slate-200 px-2 py-0.5"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose prose-sm sm:prose-base max-w-none prose-p:leading-relaxed">
          <ReactMarkdown>{data.content_md}</ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
