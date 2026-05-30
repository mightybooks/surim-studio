"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import type { SurimjiChapter } from "@/content/surimji/issue-0/chapters";
import ReaderMenu, { type ReaderPreferences } from "./ReaderMenu";

const PREFERENCES_KEY = "surimji:issue-0:reader-preferences";

const DEFAULT_PREFERENCES: ReaderPreferences = {
  fontFamily: "gowun",
  fontSize: "base",
  lineHeight: "base",
  theme: "paper",
  contentWidth: "base",
};

const FONT_FAMILY_VALUES: Record<ReaderPreferences["fontFamily"], string> = {
  gowun: '"Gowun Batang", "Noto Serif KR", serif',
  kopub: '"KoPubWorldDotum", "KoPub Dotum", "Noto Sans KR", sans-serif',
  notoSans: '"Noto Sans KR", "Noto Sans CJK KR", sans-serif',
  system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};

const ACCENT_FONT_FAMILY_VALUES = {
  serif: '"Gowun Batang", "Noto Serif KR", serif',
  sans: '"KoPubWorldDotum", "KoPub Dotum", "Noto Sans KR", sans-serif',
};

const FONT_SIZE_VALUES: Record<ReaderPreferences["fontSize"], string> = {
  small: "0.95rem",
  base: "1.05rem",
  large: "1.15rem",
  xlarge: "1.28rem",
};

const LINE_HEIGHT_VALUES: Record<ReaderPreferences["lineHeight"], string> = {
  compact: "1.75",
  base: "2",
  wide: "2.25",
};

const CONTENT_WIDTH_VALUES: Record<ReaderPreferences["contentWidth"], string> = {
  narrow: "640px",
  base: "760px",
  wide: "900px",
};

type ReaderShellProps = {
  chapter: SurimjiChapter;
  previousChapter?: Pick<SurimjiChapter, "slug">;
  nextChapter?: Pick<SurimjiChapter, "slug">;
  menuChapters: Array<Pick<SurimjiChapter, "slug" | "sectionTitle" | "title">>;
};

function isReaderPreferences(value: unknown): value is ReaderPreferences {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<ReaderPreferences>;
  return (
    ["gowun", "kopub", "notoSans", "system"].includes(candidate.fontFamily ?? "") &&
    ["small", "base", "large", "xlarge"].includes(candidate.fontSize ?? "") &&
    ["compact", "base", "wide"].includes(candidate.lineHeight ?? "") &&
    ["paper", "sepia", "night", "contrast"].includes(candidate.theme ?? "") &&
    ["narrow", "base", "wide"].includes(candidate.contentWidth ?? "")
  );
}

export default function ReaderShell({ chapter, previousChapter, nextChapter, menuChapters }: ReaderShellProps) {
  const [preferences, setPreferences] = useState<ReaderPreferences>(DEFAULT_PREFERENCES);
  const [hasLoadedPreferences, setHasLoadedPreferences] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PREFERENCES_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved);
      if (isReaderPreferences(parsed)) {
        setPreferences(parsed);
      }
    } catch {
      setPreferences(DEFAULT_PREFERENCES);
    } finally {
      setHasLoadedPreferences(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedPreferences) return;
    window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  }, [hasLoadedPreferences, preferences]);

  const readerStyle = useMemo(
    () =>
      ({
        "--reader-font-family": FONT_FAMILY_VALUES[preferences.fontFamily],
        "--reader-accent-font-family":
          preferences.fontFamily === "gowun" ? ACCENT_FONT_FAMILY_VALUES.sans : ACCENT_FONT_FAMILY_VALUES.serif,
        "--reader-font-size": FONT_SIZE_VALUES[preferences.fontSize],
        "--reader-line-height": LINE_HEIGHT_VALUES[preferences.lineHeight],
        "--reader-content-width": CONTENT_WIDTH_VALUES[preferences.contentWidth],
      }) as CSSProperties,
    [preferences],
  );

  return (
    <div className={`surimji-reader surimji-theme-${preferences.theme}`} style={readerStyle}>
      <main className="mx-auto max-w-5xl px-6 py-10">
        <header className="surimji-reader-header border-b pb-6">
          <Link href="/edition/surimji/issue-0" className="text-sm font-medium">
            수림지 0호
          </Link>
          <p className="mt-3 text-sm">{chapter.sectionTitle}</p>
          <h1 className="mt-2 text-3xl font-semibold">{chapter.title}</h1>
        </header>

        <article
          className={`surimji-reader-body surimji-content-${chapter.contentType} mt-10`}
          dangerouslySetInnerHTML={{ __html: chapter.contentHtml }}
        />

        <nav className="surimji-reader-nav mt-12 grid gap-3 border-t pt-6 sm:grid-cols-3">
          {previousChapter ? (
            <Link
              href={`/edition/surimji/issue-0/read/${previousChapter.slug}`}
              className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition"
            >
              ← 이전
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}

          <Link
            href="/edition/surimji/issue-0"
            className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition"
          >
            목차로 돌아가기
          </Link>

          {nextChapter ? (
            <Link
              href={`/edition/surimji/issue-0/read/${nextChapter.slug}`}
              className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition"
            >
              다음 →
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
        </nav>

        <ReaderMenu
          chapters={menuChapters}
          currentChapterSlug={chapter.slug}
          currentChapterTitle={chapter.title}
          preferences={preferences}
          onPreferencesChange={setPreferences}
        />
      </main>
    </div>
  );
}
