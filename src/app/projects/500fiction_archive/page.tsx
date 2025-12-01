// src/app/projects/500fiction_archive/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "500자소설 프로젝트 – 수림 스튜디오",
  description:
    "독자 참여로 확대된 500자소설 아카이브",
  alternates: {
    canonical: "/projects/500fiction_archive",
  },
  openGraph: {
    title: "500자소설 프로젝트 – 수림 스튜디오",
    description:
      "초단편 500자 서사 실험. 독자 참여를 아카이브로 확장",
    images: ["/covers/500fiction_archive_hero.webp"],
    type: "article",
    locale: "ko_KR",
  },
};

export default function () {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <nav className="text-sm text-zinc-500">
        <Link href="/projects" className="hover:underline">
          Projects
        </Link>
        <span className="mx-1">/</span>
        <span className="text-zinc-700">500자소설 아카이브</span>
      </nav>

      {/* 본문 – 필요하면 지금 쓰고 싶은 내용으로 교체 */}
      <section className="prose prose-zinc max-w-none news-body">
        <p>
          현재는 관련 앱 개발중이며, 12월 중에 공개될 예정입니다.
          앱 이용자들의 결과물이 이곳에 쌓이게 될 예정이며,
          작품들 중 일부가 카드뷰 형식으로 랜덤으로 등장합니다.
        </p>
        {/* …여기에 지금 원하시는 설명들 넣으시면 됩니다 */}
      </section>

      <section className="flex flex-col md:flex-row gap-4 justify-center">
        <Link
          href="/projects/500_fiction"
          className="px-6 py-3 rounded-xl border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50 text-center"
        >
          관련 프로젝트 읽기
        </Link>
      </section>

      <footer className="text-center text-xs text-zinc-400">
        © 2025 수림 스튜디오. All rights reserved.
      </footer>
    </main>
  );
}
