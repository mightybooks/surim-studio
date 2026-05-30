import Link from "next/link";

import { issue0Chapters } from "@/content/surimji/issue-0/chapters";

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export default function SurimjiIssue0Page() {
  const chapterSections = issue0Chapters.reduce<Array<{ sectionTitle: string; chapters: typeof issue0Chapters }>>(
    (sections, chapter) => {
      const currentSection = sections[sections.length - 1];

      if (currentSection?.sectionTitle === chapter.sectionTitle) {
        currentSection.chapters.push(chapter);
        return sections;
      }

      sections.push({ sectionTitle: chapter.sectionTitle, chapters: [chapter] });
      return sections;
    },
    [],
  );

  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-12">
      <header className="space-y-3">
        <p className="reveal-up text-sm font-medium text-emerald-800" style={revealStyle(180)}>
          수림지 창간호
        </p>
        <h1 className="reveal-up text-3xl font-semibold text-emerald-900" style={revealStyle(260)}>
          수림지 vol.0
        </h1>
        <div className="reveal-up max-w-2xl space-y-2 text-zinc-700" style={revealStyle(340)}>
          <p>로그인 후 무료로 전체 열람할 수 있는 수림지 창간호입니다.</p>
          <p>비로그인 사용자는 일부 원고와 목차만 확인할 수 있습니다.</p>
        </div>
      </header>

      <section className="reveal-up rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-6" style={revealStyle(460)}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-emerald-950">목차</h2>
          <span className="text-sm text-zinc-500">Issue 0</span>
        </div>

        <div className="mt-5 space-y-6">
          {chapterSections.map((section) => (
            <section key={section.sectionTitle} className="space-y-2">
              <h3 className="text-base font-semibold leading-7 text-emerald-950">{section.sectionTitle}</h3>
              <ol className="divide-y divide-[var(--border)]">
                {section.chapters.map((chapter) => {
                  const chapterNumber = issue0Chapters.findIndex((item) => item.slug === chapter.slug) + 1;

                  return (
                    <li key={chapter.slug}>
                      <Link
                        href={`/edition/surimji/issue-0/read/${chapter.slug}`}
                        className="flex items-center justify-between gap-4 py-4 transition hover:bg-[#F5EEDC]"
                      >
                        <div className="px-2">
                          <p className="text-sm text-zinc-500">{String(chapterNumber).padStart(2, "0")}</p>
                          <h4 className="mt-1 font-medium text-[color:var(--fg)]">{chapter.title}</h4>
                        </div>
                        {chapter.isPreview ? (
                          <span className="mr-2 rounded-full border border-[var(--border)] px-3 py-1 text-xs text-emerald-800">
                            미리보기
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </section>

      <div className="reveal-up flex flex-wrap gap-3" style={revealStyle(560)}>
        <Link
          href="/edition/surimji/issue-0/read/cover"
          className="inline-flex items-center rounded-full border border-emerald-900 bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
        >
          읽기 시작
        </Link>
        <Link
          href="/edition/surimji"
          className="inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[color:var(--fg)] transition hover:bg-[#F5EEDC]"
        >
          수림지 목록으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
