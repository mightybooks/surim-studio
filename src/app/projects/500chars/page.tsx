// src/app/projects/500chars/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "500자소설 프로젝트 – 수림 스튜디오",
  description:
    "초단편 500자 서사 실험. 101편 연재와 문체 이론 정리, 단행본 발간까지의 여정.",
  alternates: {
    canonical: "/projects/500chars",
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

export default function Project500charsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      <nav className="text-sm text-zinc-500">
        <Link href="/projects" className="hover:underline">
          Projects
        </Link>
        <span className="mx-1">/</span>
        <span className="text-zinc-700">500자소설 프로젝트</span>
      </nav>

      {/* 히어로 */}
      <section className="relative w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-100">
        <Image
          src="/projects/500chars-thumb.jpg"
          alt="500자소설 프로젝트"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <span className="absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full bg-zinc-700/80 text-white border border-white/30 shadow-sm">
          아카이브
        </span>
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-6">
          <h1 className="text-3xl md:text-5xl font-semibold mb-3">
            500자소설 프로젝트
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-zinc-200">
            초단편 500자 서사 실험. 101편 연재와 문체 이론 정리, 단행본 발간까지의 여정.
          </p>
        </div>
      </section>

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
