"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { insertAtCursor } from "@/lib/editor/insertAtCursor";
import { editorButtonClass } from "@/app/admin/blog/new/editorButtonStyle";

type NewsStatus = "draft" | "published";

type NewsPost = {
  slug: string;
  title: string;
  summary: string | null;
  content_markdown: string;
  status: NewsStatus;
  published_at: string | null;
};

type Props = {
  initialPost?: NewsPost | null;
  saved?: "created" | "updated";
};

function slugifyFromTitle(title: string) {
  return title.trim().toLowerCase().replace(/\s+/g, "-");
}

function toDatetimeLocal(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 16);
}

function fromDatetimeLocal(value: string) {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString();
}

function savedMessage(saved?: Props["saved"]) {
  if (saved === "created") return "뉴스가 저장되었습니다.";
  if (saved === "updated") return "변경사항이 저장되었습니다.";
  return null;
}

export default function NewsEditorClient({ initialPost, saved }: Props) {
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [title, setTitle] = useState(initialPost?.title ?? "");
  const [slug, setSlug] = useState(initialPost?.slug ?? "");
  const [summary, setSummary] = useState(initialPost?.summary ?? "");
  const [contentMarkdown, setContentMarkdown] = useState(
    initialPost?.content_markdown ?? "",
  );
  const [publishedAt, setPublishedAt] = useState(
    toDatetimeLocal(initialPost?.published_at ?? null),
  );
  const [saving, setSaving] = useState<"idle" | "draft" | "publish">("idle");
  const [error, setError] = useState<string | null>(null);

  const currentStatus = initialPost?.status ?? "draft";
  const notice = savedMessage(saved);

  function insertMarkdown(text: string) {
    if (!textareaRef.current) return;
    insertAtCursor(
      textareaRef.current,
      contentMarkdown,
      text,
      setContentMarkdown,
    );
  }

  async function handleSave(mode: "draft" | "publish") {
    if (!title.trim() || !slug.trim() || !contentMarkdown.trim()) {
      setError("제목, 슬러그, 본문을 입력해 주세요.");
      return;
    }

    setSaving(mode);
    setError(null);

    const now = new Date().toISOString();
    const status: NewsStatus = mode === "publish" ? "published" : "draft";
    const payload = {
      title,
      slug,
      summary,
      content_markdown: contentMarkdown,
      original_slug: initialPost?.slug ?? null,
      status,
      published_at:
        status === "published"
          ? fromDatetimeLocal(publishedAt) ?? initialPost?.published_at ?? now
          : fromDatetimeLocal(publishedAt),
    };

    const res = await fetch("/api/admin/news-posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const result = await res.json().catch(() => null);
      setError(result?.message ?? "저장 중 오류가 발생했습니다.");
      setSaving("idle");
      return;
    }

    setSaving("idle");
    const savedState = initialPost ? "updated" : "created";
    router.push(
      `/admin/news/${encodeURIComponent(slug)}?saved=${savedState}`,
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
          News Admin
        </p>
        <h1 className="text-2xl font-semibold text-slate-900">
          {initialPost ? "뉴스 수정" : "새 뉴스 작성"}
        </h1>
        <p className="text-sm text-slate-600">
          공식 공지 성격의 소식만 사실 중심 문체로 작성합니다.
        </p>
      </header>

      {notice && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
          <p className="font-semibold">{notice}</p>
          {currentStatus === "published" ? (
            <a
              href={`/news/${initialPost?.slug ?? slug}`}
              className="mt-2 inline-flex rounded-full bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800"
            >
              공개 페이지 보기
            </a>
          ) : (
            <p className="mt-1 text-emerald-800">임시저장 상태입니다.</p>
          )}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-4 shadow-sm">
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">
            제목
          </label>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm"
            placeholder="예: 수림 스튜디오 공식 소식"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">
            슬러그
          </label>
          <div className="flex gap-2">
            <input
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              className="flex-1 rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm"
              placeholder="official-news"
            />
            <button
              type="button"
              onClick={() => setSlug(slugifyFromTitle(title))}
              className="rounded-md border border-[var(--border)] bg-white px-3 py-2 text-xs hover:bg-slate-50"
            >
              제목에서 생성
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">
            요약
          </label>
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            className="h-24 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm"
            placeholder="목록과 메타 설명에 노출될 짧은 요약"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">
            발행일
          </label>
          <input
            type="datetime-local"
            value={publishedAt}
            onChange={(event) => setPublishedAt(event.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">
            본문 Markdown
          </label>
          <div className="mb-2 flex flex-wrap gap-1 rounded-lg border border-slate-200 bg-slate-50 p-2">
            <button
              type="button"
              className={editorButtonClass}
              onClick={() => insertMarkdown("## 중간 제목\n")}
            >
              H2
            </button>
            <button
              type="button"
              className={editorButtonClass}
              onClick={() => insertMarkdown("- 항목\n")}
            >
              목록
            </button>
            <button
              type="button"
              className={editorButtonClass}
              onClick={() => insertMarkdown("\n\n---\n\n")}
            >
              구분선
            </button>
            <button
              type="button"
              className={editorButtonClass}
              onClick={() => insertMarkdown("> 인용문\n")}
            >
              인용
            </button>
          </div>
          <textarea
            ref={textareaRef}
            value={contentMarkdown}
            onChange={(event) => setContentMarkdown(event.target.value)}
            className="h-80 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm font-mono"
            placeholder="공개 가능한 사실만 Markdown으로 작성해 주세요."
          />
        </div>

        <div className="flex flex-wrap justify-between gap-2 pt-2">
          <a
            href="/admin/news"
            className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm hover:bg-slate-50"
          >
            목록으로
          </a>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleSave("draft")}
              disabled={saving !== "idle"}
              className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm disabled:opacity-50"
            >
              {saving === "draft" ? "저장 중..." : "임시 저장"}
            </button>
            <button
              type="button"
              onClick={() => handleSave("publish")}
              disabled={saving !== "idle"}
              className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving === "publish" ? "발행 중..." : "발행"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
