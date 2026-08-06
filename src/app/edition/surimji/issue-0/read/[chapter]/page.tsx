import { notFound } from "next/navigation";

import { issue0Chapters, type SurimjiChapter } from "@/content/surimji/issue-0/chapters";
import { supabaseServerPublic } from "@/lib/supabase/server-public";
import ReaderShell from "../ReaderShell";

type SurimjiIssue0ReadPageProps = {
  params: Promise<{
    chapter: string;
  }>;
};

const FULL_PUBLIC_CHAPTER_SLUGS = new Set(["cover", "opening-technology"]);
const PREVIEW_CHARACTER_LIMIT = 500;

function getPlainTextFromHtml(html: string) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function createPreviewChapter(chapter: SurimjiChapter): SurimjiChapter {
  const previewText = getPlainTextFromHtml(chapter.contentHtml).slice(0, PREVIEW_CHARACTER_LIMIT);
  const next = encodeURIComponent(`/edition/surimji/issue-0/read/${chapter.slug}`);

  return {
    ...chapter,
    contentHtml: `
<div class="surimji-locked-preview">
  <p>${escapeHtml(previewText)}...</p>
</div>
<p class="surimji-preview-cta-wrap">
  <a class="surimji-preview-cta" href="/login?returnTo=${next}">
    로그인 후 무료로 전체 열람하기
  </a>
</p>
    `,
  };
}

export default async function SurimjiIssue0ReadPage({ params }: SurimjiIssue0ReadPageProps) {
  const { chapter: chapterSlug } = await params;
  const chapterIndex = issue0Chapters.findIndex((item) => item.slug === chapterSlug);
  const chapter = issue0Chapters[chapterIndex];

  if (!chapter) {
    notFound();
  }

  const supabase = await supabaseServerPublic();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = Boolean(user);
  const isLimitedPreview = !isLoggedIn && !FULL_PUBLIC_CHAPTER_SLUGS.has(chapter.slug);
  const readableChapter = isLimitedPreview ? createPreviewChapter(chapter) : chapter;
  const previousChapter = issue0Chapters[chapterIndex - 1];
  const nextChapter = issue0Chapters[chapterIndex + 1];
  const menuChapters = issue0Chapters.map(({ slug, sectionTitle, title }) => ({ slug, sectionTitle, title }));

  return (
    <ReaderShell
      chapter={readableChapter}
      previousChapter={previousChapter}
      nextChapter={nextChapter}
      menuChapters={menuChapters}
      hideNavigation={isLimitedPreview}
    />
  );
}
