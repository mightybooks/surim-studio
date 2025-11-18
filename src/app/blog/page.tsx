// src/app/blog/page.tsx
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";

export const revalidate = 60; // 1분마다 재검증

type BlogSection = "log" | "insight" | "note";

type BlogPost = {
  slug: string;
  title: string;
  subtitle: string | null;
  published_at: string | null;
  tags: string[] | null;
  hero_image_url: string | null;
  status: string;
  section: BlogSection | null;
};

const SECTION_LABELS: Record<BlogSection, string> = {
  log: "작업일지",
  insight: "출판·글쓰기",
  note: "단상",
};

const FILTER_TABS: { value: "all" | BlogSection; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "log", label: "작업일지" },
  { value: "insight", label: "출판·글쓰기" },
  { value: "note", label: "단상" },
];

type PageProps = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function BlogPage({ searchParams }: PageProps) {
  const supabase = createClient();

  // ?section=log | insight | note
  const rawSection = searchParams?.section;
  const sectionParam =
    typeof rawSection === "string" ? rawSection : Array.isArray(rawSection) ? rawSection[0] : undefined;

  const allowedSections: BlogSection[] = ["log", "insight", "note"];
  const activeSection: "all" | BlogSection = allowedSections.includes(
    sectionParam as BlogSection,
  )
    ? (sectionParam as BlogSection)
    : "all";

  // 기본 쿼리
  let query = supabase
    .from("blog_posts")
    .select("slug, title, subtitle, published_at, tags, hero_image_url, status, section")
    .eq("status", "published");

  // 섹션 필터 적용
  if (activeSection !== "all") {
    query = query.eq("section", activeSection);
  }

  const { data, error } = await query.order("published_at", { ascending: false });

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

  const posts = (data ?? []) as BlogPost[];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      {/* 헤더 */}
      <header className="space-y-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Blog</h1>
          <p className="text-sm text-slate-600">
            수림 스튜디오의 작업일지, 출판·글쓰기 인사이트, 단상을 기록하는 공간입니다.
          </p>
        </div>

        {/* 섹션 필터 탭 */}
        <nav className="flex flex-wrap gap-2 text-xs">
          {FILTER_TABS.map((tab) => {
            const isActive = tab.value === activeSection || (tab.value === "all" && activeSection === "all");
            const href =
              tab.value === "all"
                ? "/blog"
                : `/blog?section=${encodeURIComponent(tab.value)}`;

            return (
              <Link
                key={tab.value}
                href={href}
                className={`rounded-full border px-3 py-1 ${
                  isActive
                    ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                    : "border-[var(--border)] bg-[var(--bg-elev)] text-slate-600 hover:border-slate-300"
                }`}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </header>

      {/* 게시글 목록 */}
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

            {/* 섹션 배지 + 부제 */}
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {post.section && (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                  {SECTION_LABELS[post.section]}
                </span>
              )}
              {post.subtitle && (
                <p className="text-sm text-slate-600">{post.subtitle}</p>
              )}
            </div>

            {/* 날짜 + 태그 */}
            <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              {post.published_at && (
                <span>
                  {new Date(post.published_at).toLocaleDateString("ko-KR")}
                </span>
              )}
              {post.tags?.map((tag) => (
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
            아직 이 섹션에는 발행된 글이 없습니다. /admin에서 첫 글을 작성해 주세요.
          </p>
        )}
      </div>
    </div>
  );
}
