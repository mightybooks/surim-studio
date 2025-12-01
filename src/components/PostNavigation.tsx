// src/components/PostNavigation.tsx
import Link from "next/link";
import type { PostMeta } from "@/lib/postsNav";

type Props = {
  prev: PostMeta | null;
  next: PostMeta | null;
  backHref: string;   // 목록 경로
  backLabel?: string; // 버튼 문구 (예: "뉴스 목록", "블로그 목록")
};

export function PostNavigation({
  prev,
  next,
  backHref,
  backLabel = "목록으로",
}: Props) {
  return (
    <nav className="mt-10 border-t border-slate-200 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          {prev && (
            <Link
              href={prev.slug}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              ← 이전 글: <span className="font-medium">{prev.title}</span>
            </Link>
          )}
          {next && (
            <Link
              href={next.slug}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              다음 글: <span className="font-medium">{next.title}</span> →
            </Link>
          )}
        </div>

        <div className="flex justify-start sm:justify-end">
          <Link
            href={backHref}
            className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            목록으로
          </Link>
        </div>
      </div>
    </nav>
  );
}
