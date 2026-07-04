import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const adminSupabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

type NewsPost = {
  slug: string;
  title: string;
  summary: string | null;
  status: "draft" | "published";
  published_at: string | null;
  updated_at: string | null;
};

function formatDate(value: string | null) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("ko-KR");
}

export default async function AdminNewsPage() {
  const { data, error } = await adminSupabase
    .from("news_posts")
    .select("slug, title, summary, status, published_at, updated_at")
    .order("updated_at", { ascending: false });

  const posts = (data ?? []) as NewsPost[];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
            Admin
          </p>
          <h1 className="text-2xl font-semibold text-slate-900">뉴스관리</h1>
          <p className="text-sm text-slate-600">
            공식 공지와 프로젝트 소식을 작성하고 발행합니다.
          </p>
        </div>
        <Link
          href="/admin/news/new"
          className="inline-flex rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800"
        >
          새 뉴스 작성
        </Link>
      </header>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          뉴스 목록을 불러오지 못했습니다. news_posts 테이블과 마이그레이션을 확인해 주세요.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-slate-50 text-xs text-slate-600">
              <tr>
                <th className="px-4 py-3 font-medium">제목</th>
                <th className="px-4 py-3 font-medium">상태</th>
                <th className="px-4 py-3 font-medium">발행일</th>
                <th className="px-4 py-3 font-medium">수정</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {posts.map((post) => (
                <tr key={post.slug}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-slate-900">{post.title}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      /news/{post.slug}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        post.status === "published"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {post.status === "published" ? "발행" : "초안"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {formatDate(post.published_at)}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/news/${post.slug}`}
                      className="text-emerald-700 hover:text-emerald-900"
                    >
                      수정
                    </Link>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td className="px-4 py-8 text-sm text-slate-500" colSpan={4}>
                    아직 DB에 저장된 뉴스가 없습니다. 기존 data.ts 뉴스는 공개 페이지에 계속 노출됩니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
