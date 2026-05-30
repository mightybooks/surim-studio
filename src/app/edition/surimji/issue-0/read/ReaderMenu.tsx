"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type MenuView = "main" | "toc";
const BOOKMARK_KEY = "surimji:issue-0:bookmark";

export type ReaderPreferences = {
  fontFamily: "gowun" | "kopub" | "notoSans" | "system";
  fontSize: "small" | "base" | "large" | "xlarge";
  lineHeight: "compact" | "base" | "wide";
  theme: "paper" | "sepia" | "night" | "contrast";
  contentWidth: "narrow" | "base" | "wide";
};

type ReaderBookmark = {
  chapterSlug: string;
  title: string;
  savedAt: string;
};

type ReaderMenuProps = {
  chapters: Array<{
    slug: string;
    sectionTitle: string;
    title: string;
  }>;
  currentChapterSlug: string;
  currentChapterTitle: string;
  preferences: ReaderPreferences;
  onPreferencesChange: (preferences: ReaderPreferences) => void;
};

const FONT_OPTIONS: Array<{ value: ReaderPreferences["fontFamily"]; label: string }> = [
  { value: "gowun", label: "고운바탕" },
  { value: "kopub", label: "KoPub 돋움" },
  { value: "notoSans", label: "Noto Sans" },
  { value: "system", label: "시스템" },
];

const FONT_SIZE_OPTIONS: Array<{ value: ReaderPreferences["fontSize"]; label: string }> = [
  { value: "small", label: "작게" },
  { value: "base", label: "기본" },
  { value: "large", label: "크게" },
  { value: "xlarge", label: "아주 크게" },
];

const LINE_HEIGHT_OPTIONS: Array<{ value: ReaderPreferences["lineHeight"]; label: string }> = [
  { value: "compact", label: "좁게" },
  { value: "base", label: "기본" },
  { value: "wide", label: "넓게" },
];

const WIDTH_OPTIONS: Array<{ value: ReaderPreferences["contentWidth"]; label: string }> = [
  { value: "narrow", label: "좁게" },
  { value: "base", label: "기본" },
  { value: "wide", label: "넓게" },
];

const THEME_OPTIONS: Array<{ value: ReaderPreferences["theme"]; label: string }> = [
  { value: "paper", label: "종이" },
  { value: "sepia", label: "세피아" },
  { value: "night", label: "밤" },
  { value: "contrast", label: "고대비" },
];

export default function ReaderMenu({
  chapters,
  currentChapterSlug,
  currentChapterTitle,
  preferences,
  onPreferencesChange,
}: ReaderMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [menuView, setMenuView] = useState<MenuView>("main");
  const [bookmark, setBookmark] = useState<ReaderBookmark | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      const saved = window.localStorage.getItem(BOOKMARK_KEY);
      return saved ? (JSON.parse(saved) as ReaderBookmark) : null;
    } catch {
      return null;
    }
  });
  const [bookmarkStatus, setBookmarkStatus] = useState("");
  const chapterSections = chapters.reduce<Array<{ sectionTitle: string; chapters: typeof chapters }>>((sections, chapter) => {
    const currentSection = sections[sections.length - 1];

    if (currentSection?.sectionTitle === chapter.sectionTitle) {
      currentSection.chapters.push(chapter);
      return sections;
    }

    sections.push({ sectionTitle: chapter.sectionTitle, chapters: [chapter] });
    return sections;
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  }

  function updatePreference<Key extends keyof ReaderPreferences>(key: Key, value: ReaderPreferences[Key]) {
    onPreferencesChange({ ...preferences, [key]: value });
  }

  function saveBookmark() {
    const nextBookmark = {
      chapterSlug: currentChapterSlug,
      title: currentChapterTitle,
      savedAt: new Date().toISOString(),
    };

    window.localStorage.setItem(BOOKMARK_KEY, JSON.stringify(nextBookmark));
    setBookmark(nextBookmark);
    setBookmarkStatus("저장됨");
    window.setTimeout(() => setBookmarkStatus(""), 1600);
  }

  function goToBookmark() {
    if (!bookmark) return;
    closeMenu();
    router.push(`/edition/surimji/issue-0/read/${bookmark.chapterSlug}`);
  }

  function closeMenu() {
    setIsOpen(false);
    setMenuView("main");
  }

  function renderOptionGroup<Key extends keyof ReaderPreferences>(
    label: string,
    key: Key,
    options: Array<{ value: ReaderPreferences[Key]; label: string }>,
  ) {
    return (
      <section className="rounded-xl border border-[var(--border)] px-3 py-3">
        <h3 className="text-sm font-medium text-[color:var(--fg)]">{label}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {options.map((option) => {
            const isSelected = preferences[key] === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => updatePreference(key, option.value)}
                className={[
                  "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                  isSelected
                    ? "border-emerald-900 bg-emerald-900 text-white"
                    : "border-[var(--border)] text-[color:var(--fg)] hover:bg-[#F5EEDC]",
                ].join(" ")}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </section>
    );
  }

  return (
    <div className="fixed inset-x-4 bottom-5 z-30 flex justify-end sm:inset-x-auto sm:bottom-6 sm:right-6">
      {isOpen ? (
        <section className="surimji-reader-menu absolute bottom-14 right-0 max-h-[70vh] w-full max-w-sm overflow-y-auto rounded-2xl border p-4 shadow-lg sm:bottom-16 sm:w-80">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-3">
            <h2 className="text-base font-semibold text-emerald-950">
              {menuView === "toc" ? "목차" : "리더 메뉴"}
            </h2>
            <button
              type="button"
              onClick={closeMenu}
              className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[color:var(--fg)] transition hover:bg-[#F5EEDC]"
            >
              닫기
            </button>
          </div>

          {menuView === "toc" ? (
            <div className="mt-3 space-y-3">
              <button
                type="button"
                onClick={() => setMenuView("main")}
                className="w-full rounded-xl border border-[var(--border)] px-4 py-3 text-left text-sm font-medium text-[color:var(--fg)] transition hover:bg-[#F5EEDC]"
              >
                ← 리더 메뉴로 돌아가기
              </button>

              <div className="space-y-5">
                {chapterSections.map((section) => (
                  <section key={section.sectionTitle} className="space-y-2">
                    <h3 className="text-sm font-semibold leading-6 text-emerald-950">{section.sectionTitle}</h3>
                    <ol className="space-y-2">
                      {section.chapters.map((chapter) => {
                        const chapterNumber = chapters.findIndex((item) => item.slug === chapter.slug) + 1;
                        const isCurrent = chapter.slug === currentChapterSlug;

                        return (
                          <li key={chapter.slug}>
                            <Link
                              href={`/edition/surimji/issue-0/read/${chapter.slug}`}
                              className={[
                                "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition",
                                isCurrent
                                  ? "border-emerald-900 bg-emerald-900 text-white"
                                  : "border-[var(--border)] text-[color:var(--fg)] hover:bg-[#F5EEDC]",
                              ].join(" ")}
                              aria-current={isCurrent ? "page" : undefined}
                              onClick={closeMenu}
                            >
                              <span className={isCurrent ? "text-white/75" : "text-zinc-500"}>
                                {String(chapterNumber).padStart(2, "0")}
                              </span>
                              <span>{chapter.title}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ol>
                  </section>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              <button
                type="button"
                onClick={() => setMenuView("toc")}
                className="flex w-full items-center justify-between rounded-xl border border-[var(--border)] px-4 py-3 text-left text-sm font-medium text-[color:var(--fg)] transition hover:bg-[#F5EEDC]"
              >
                <span>목차</span>
                <span className="text-xs text-zinc-500">보기</span>
              </button>

              {renderOptionGroup("서체", "fontFamily", FONT_OPTIONS)}
              {renderOptionGroup("글자 크기", "fontSize", FONT_SIZE_OPTIONS)}
              {renderOptionGroup("줄간격", "lineHeight", LINE_HEIGHT_OPTIONS)}
              {renderOptionGroup("본문 폭", "contentWidth", WIDTH_OPTIONS)}
              {renderOptionGroup("조명", "theme", THEME_OPTIONS)}

              <section className="rounded-xl border border-[var(--border)] px-3 py-3">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-medium text-[color:var(--fg)]">책갈피</h3>
                  {bookmarkStatus ? <span className="text-xs text-emerald-700">{bookmarkStatus}</span> : null}
                </div>
                {bookmark ? (
                  <p className="mt-2 text-xs leading-5 text-zinc-500">저장 위치: {bookmark.title}</p>
                ) : (
                  <p className="mt-2 text-xs leading-5 text-zinc-500">저장된 책갈피가 없습니다.</p>
                )}
                <div className="mt-3 grid gap-2">
                  <button
                    type="button"
                    onClick={saveBookmark}
                    className="rounded-full border border-[var(--border)] px-3 py-2 text-xs font-medium text-[color:var(--fg)] transition hover:bg-[#F5EEDC]"
                  >
                    현재 챕터 책갈피 저장
                  </button>
                  <button
                    type="button"
                    onClick={goToBookmark}
                    disabled={!bookmark}
                    className="rounded-full border border-[var(--border)] px-3 py-2 text-xs font-medium text-[color:var(--fg)] transition hover:bg-[#F5EEDC] disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    책갈피로 이동
                  </button>
                </div>
              </section>

              <button
                type="button"
                onClick={scrollToTop}
                className="flex w-full items-center justify-between rounded-xl border border-[var(--border)] px-4 py-3 text-left text-sm font-medium text-[color:var(--fg)] transition hover:bg-[#F5EEDC]"
              >
                <span>맨 위로</span>
                <span className="text-xs text-zinc-500">이동</span>
              </button>
            </div>
          )}
        </section>
      ) : null}

      <button
        type="button"
        onClick={() => {
          setIsOpen((current) => !current);
          setMenuView("main");
        }}
        className="surimji-reader-menu-button rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition"
        aria-expanded={isOpen}
      >
        리더 메뉴
      </button>
    </div>
  );
}
