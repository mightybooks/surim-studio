// src/app/admin/blog/new/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

function slugifyFromTitle(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-"); // 한글은 그대로 두고, 공백만 하이픈 처리
}

export default function AdminBlogNewPage() {
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [slug, setSlug] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [contentMd, setContentMd] = useState("");
  const [saving, setSaving] = useState<"idle" | "draft" | "publish">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateSlug = () => {
    if (!title.trim()) return;
    const nextSlug = slugifyFromTitle(title);
    setSlug(nextSlug);
  };

  const parseTags = () => {
    if (!tagsInput.trim()) return [];
    return tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
  };

  const handleSave = async (mode: "draft" | "publish") => {
    if (!title.trim() || !contentMd.trim()) {
      setError("제목과 본문은 반드시 입력해야 합니다.");
      setMessage(null);
      return;
    }

    if (!slug.trim()) {
      setError("슬러그를 생성하거나 직접 입력해 주세요.");
      setMessage(null);
      return;
    }

    setSaving(mode);
    setError(null);
    setMessage(null);

    const tags = parseTags();
    const now = new Date().toISOString();

    const payload: any = {
      slug,
      title,
      subtitle: subtitle || null,
      content_md: contentMd,
      hero_image_url: heroImageUrl || null,
      tags,
      status: mode === "publish" ? "published" : "draft",
      updated_at: now,
    };

    if (mode === "publish") {
      payload.published_at = now;
    }

    // slug 중복을 피하려면 upsert를 쓰는 것도 가능
    const { error: dbError } = await supabase
      .from("blog_posts")
      .upsert(payload, { onConflict: "slug" });

    if (dbError) {
      console.error(dbError);
      setError("저장 중 오류가 발생했습니다.");
      setMessage(null);
      setSaving("idle");
      return;
    }

    if (mode === "draft") {
      setMessage("임시 저장되었습니다.");
      setSaving("idle");
    } else {
      setMessage("발행되었습니다. 글 페이지로 이동합니다.");
      setSaving("idle");
      router.push(`/blog/${encodeURIComponent(slug)}`);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">새 블로그 글 작성</h1>
        <p className="text-sm text-slate-600">
          수림 스튜디오 블로그에 게시할 글을 작성합니다. 제목과 본문, 슬러그만
          필수입니다.
        </p>
      </header>

      <div className="space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-4 shadow-sm">
        {/* 제목 */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">
            제목 (title)
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm"
            placeholder="예: 토실토실 토끼 이후, 수림 스튜디오의 다음 한 수"
          />
        </div>

        {/* 부제 */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">
            부제 (subtitle, 선택)
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm"
            placeholder="예: 출판사 대표의 솔직한 작업일지"
          />
        </div>

        {/* 슬러그 */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">
            슬러그 (URL 경로)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm"
              placeholder="예: chubby-bunny-after-story"
            />
            <button
              type="button"
              onClick={handleGenerateSlug}
              className="rounded-md border border-[var(--border)] bg-[var(--bg-elev)] px-3 py-2 text-xs"
            >
              제목에서 생성
            </button>
          </div>
          <p className="text-[11px] text-slate-500">
            /blog/슬러그 형태로 주소가 만들어집니다. 한글 슬러그도 사용 가능합니다.
          </p>
        </div>

        {/* 대표 이미지 URL */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">
            대표 이미지 URL (선택)
          </label>
          <input
            type="text"
            value={heroImageUrl}
            onChange={(e) => setHeroImageUrl(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm"
            placeholder="https://... 형식의 이미지 주소"
          />
          <p className="text-[11px] text-slate-500">
            블로그 상단 헤드 이미지와 SNS 미리보기(og:image)에 사용됩니다.
          </p>
        </div>

        {/* 태그 */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">
            태그 (쉼표로 구분, 선택)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm"
            placeholder="예: 토실토실, 출판, 서사, 500자소설"
          />
          <p className="text-[11px] text-slate-500">
            예: <code>토실토실, 출판, 서사</code> 처럼 입력하면
            {" "}#토실토실 #출판 #서사 형태로 노출됩니다.
          </p>
        </div>

        {/* 본문 */}
        <div className="space-y-1">
          <label className="block text-xs font-medium text-slate-600">
            본문 (Markdown)
          </label>
          <textarea
            value={contentMd}
            onChange={(e) => setContentMd(e.target.value)}
            className="h-64 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm font-mono"
            placeholder={`여기에 Markdown 형식으로 글을 작성하세요.

예)
## 오늘의 작업일지

토실토실 전자책 작업을 마무리했다.
다음 단계는 오프라인 DM과 500자 소설 앱이다.
`}
          />
        </div>

        {/* 메시지 / 에러 */}
        {(error || message) && (
          <div className="text-sm">
            {error && <p className="text-red-600">{error}</p>}
            {message && <p className="text-emerald-700">{message}</p>}
          </div>
        )}

        {/* 버튼 영역 */}
        <div className="flex flex-wrap justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => handleSave("draft")}
            disabled={saving !== "idle"}
            className="rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-4 py-2 text-sm disabled:opacity-50"
          >
            {saving === "draft" ? "임시 저장 중..." : "임시 저장"}
          </button>
          <button
            type="button"
            onClick={() => handleSave("publish")}
            disabled={saving !== "idle"}
            className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {saving === "publish" ? "발행 중..." : "바로 발행"}
          </button>
        </div>
      </div>
    </div>
  );
}
