import { notFound } from "next/navigation";

import { issue0Chapters } from "@/content/surimji/issue-0/chapters";
import ReaderShell from "../ReaderShell";

type SurimjiIssue0ReadPageProps = {
  params: {
    chapter: string;
  };
};

export default function SurimjiIssue0ReadPage({ params }: SurimjiIssue0ReadPageProps) {
  const chapterIndex = issue0Chapters.findIndex((item) => item.slug === params.chapter);
  const chapter = issue0Chapters[chapterIndex];
  const previousChapter = issue0Chapters[chapterIndex - 1];
  const nextChapter = issue0Chapters[chapterIndex + 1];
  const menuChapters = issue0Chapters.map(({ slug, sectionTitle, title }) => ({ slug, sectionTitle, title }));

  if (!chapter) {
    notFound();
  }

  // TODO: 정식 공개 전 수림지 접근 정책 적용
  // - 수림지 0호: 로그인 사용자는 전체 무료 열람
  // - 비로그인 사용자는 isPreview 챕터만 열람
  // - 이후 유료호는 entitlement 확인 필요
  // 현재는 개발 검수를 위해 전체 공개 상태로 둔다.

  return (
    <ReaderShell
      chapter={chapter}
      previousChapter={previousChapter}
      nextChapter={nextChapter}
      menuChapters={menuChapters}
    />
  );
}
