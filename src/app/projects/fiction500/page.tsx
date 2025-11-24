// src/app/projects/apppro500/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "500자소설 프로젝트 – 수림 스튜디오",
  description:
    "초단편 500자 서사 실험. 101편 연재와 문체 이론 정리, 단행본 발간까지의 여정.",
  alternates: {
    canonical: "/projects/apppro500",
  },
  openGraph: {
    title: "500자소설 프로젝트 – 수림 스튜디오",
    description:
      "초단편 500자 서사 실험. 101편 연재와 문체 이론 정리, 단행본 발간까지의 여정.",
    images: ["/covers/500chars-hero.jpg"],
    type: "article",
    locale: "ko_KR",
  },
};

export default function apppro500() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <nav className="text-sm text-zinc-500">
        <Link href="/projects" className="hover:underline">
          Projects
        </Link>
        <span className="mx-1">/</span>
        <span className="text-zinc-700">500자소설 프로젝트</span>
      </nav>

      {/* 본문 – 필요하면 지금 쓰고 싶은 내용으로 교체 */}
      <section className="prose prose-zinc max-w-none news-body">
        <p>
          스레드 500자 제약을 서사 완결 규칙으로 전환해 실험했던 기록입니다. 완결된
          101편의 데이터로 문체 이론을 정리하고, 단행본 발간까지 이어간 과정을
          아카이브 형식으로 정리할 예정입니다.
        </p>
        {/* …여기에 지금 원하시는 설명들 넣으시면 됩니다 */}
      </section>

      <section className="flex flex-col md:flex-row gap-4 justify-center">
        <Link
          href="/news/500novel"
          className="px-6 py-3 rounded-xl border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50 text-center"
        >
          관련 뉴스 읽기
        </Link>
      </section>

      <footer className="text-center text-xs text-zinc-400">
        © 2025 수림 스튜디오. All rights reserved.
      </footer>
    </main>
  );
}
