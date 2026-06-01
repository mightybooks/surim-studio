import type { Metadata } from "next";
import Link from "next/link";

import { issue0Chapters } from "@/content/surimji/issue-0/chapters";
import { supabaseServerPublic } from "@/lib/supabase/server-public";

export const metadata: Metadata = {
  title: "수림지 Vol.0 | 수림 스튜디오 디지털 문예지 창간호",
  description:
    "《수림지 Vol.0》은 수림 스튜디오의 디지털 문예지 창간호입니다. 500자 소설, PPL 소설, 메타버스 원고, 문예경연대회 수상작과 창작 실험 기록을 담았습니다.",
  alternates: {
    canonical: "https://surimstudio.com/edition/surimji/issue-0",
  },
  openGraph: {
    title: "수림지 Vol.0 | 수림 스튜디오 디지털 문예지 창간호",
    description:
      "500자 소설, PPL 소설, 메타버스 원고, 문예경연대회 수상작을 담은 수림지 창간호입니다.",
    url: "https://surimstudio.com/edition/surimji/issue-0",
    siteName: "수림 스튜디오",
    type: "article",
    images: [
      {
        url: "https://surimstudio.com/og/surimji-issue-0-og.png",
        alt: "수림지 Vol.0 창간호 표지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "수림지 Vol.0 | 수림 스튜디오 디지털 문예지 창간호",
    description:
      "500자 소설, PPL 소설, 메타버스 원고, 문예경연대회 수상작을 담은 수림지 창간호입니다.",
    images: ["https://surimstudio.com/surimji/issue-0/cover.webp"],
  },
};

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export default async function SurimjiIssue0Page() {
  const supabase = supabaseServerPublic();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = Boolean(user);
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

    <aside
      className="reveal-up rounded-2xl border border-amber-200 bg-amber-50/70 p-5 text-sm leading-7 text-amber-950"
      style={revealStyle(400)}
    >
      <p className="font-semibold">저작권 안내</p>

      {/*
        <p className="mt-2">
          현재 열람 중인 《수림지 vol.0》는 ISBN 979-11-994493-8-1로
          정식 도서 유통 중인 저작물을 기반으로 합니다.
        </p>
        */}

      <p className="mt-2">
        본문에 수록된 글, 이미지, 구성, 편집 요소는 저작권법에 따라 보호받는
        저작물입니다.<br/>저작권자 및 출판사의 사전 서면 동의 없이 내용의 전부
        또는 일부를 무단 전재, 복제, 배포, 변형, 2차 이용하는 행위를 금합니다.
      </p>

      <p className="mt-2">
        이를 위반할 경우 관련 법령에 따라 민·형사상 책임을 물을 수 있습니다.
      </p>
    </aside>

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
        {isLoggedIn ? (
          <Link
            href="/edition/surimji/issue-0/read/cover"
            className="inline-flex items-center rounded-full border border-emerald-900 bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            읽기 시작
          </Link>
        ) : (
          <Link href="/login?next=%2Fedition%2Fsurimji%2Fissue-0" className="surimji-login-cta">
            로그인 후 무료로 전체 열람하기
          </Link>
        )}
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
