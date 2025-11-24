// src/app/projects/500chars/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "500자소설 프로젝트 – 수림 스튜디오",
  description:
    "초단편 500자 서사 실험. 101편 연재와 문체 이론 정리, 단행본 발간까지의 여정.",
  alternates: {
    canonical: "/projects/500chars",
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

      {/* 여기부터는 원하는 새 레이아웃/내용으로 마음껏 교체 */}
      <section className="relative w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-100">
        <Image
          src="/projects/500chars-thumb.jpg"
          alt="500자소설 프로젝트"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 1200px"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-6">
          <h1 className="text-3xl md:text-5xl font-semibold mb-3">
            500자소설 프로젝트
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-zinc-200">
            초단편 500자 서사 실험. 101편 연재와 문체 이론 정리, 단행본 발간까지의 여정.
          </p>
        </div>
      </section>

      {/* 이하 원하는 섹션들 */}
    </main>
  );
}
