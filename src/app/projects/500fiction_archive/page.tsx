// src/app/projects/500fiction_archive/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import ArchiveShowcase from "@/components/archive/ArchiveShowcase";

export const metadata: Metadata = {
  title: "500자소설 프로젝트 – 수림 스튜디오",
  description: "독자 참여로 확대된 500자소설 아카이브",
  alternates: {
    canonical: "/projects/500fiction_archive",
  },
  openGraph: {
    title: "500자소설 프로젝트 – 수림 스튜디오",
    description: "초단편 500자 서사 실험. 독자 참여를 아카이브로 확장",
    images: ["/covers/500fiction_archive_hero.webp"],
    type: "article",
    locale: "ko_KR",
  },
};

export default async function Page() {
  const res = await fetch(
    `${process.env.DOLBOM_APP_URL}/api/archives?token=${process.env.ARCHIVE_API_TOKEN}&limit=20&hasMessage=true`,
    { cache: "no-store" }
  );

  const json = await res.json();
  const archives = json.ok ? json.data : [];

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* breadcrumb */}
      <nav className="text-sm text-zinc-500">
        <Link href="/projects" className="hover:underline">
          Projects
        </Link>
        <span className="mx-1">/</span>
        <span className="text-zinc-700">500자소설 아카이브</span>
      </nav>

      {/* 설명 */}
      <section className="prose prose-zinc max-w-none news-body">
        <p>
          이곳은 독자 참여로 생성된 이야기의 흔적을 모아두는 아카이브입니다.
          모든 결과가 한 번에 보이지는 않지만, 계속해서 쌓이고 있습니다.
        </p>
      </section>

      {/* 아카이브 쇼케이스 */}
      {archives.length > 0 && (
        <ArchiveShowcase archives={archives} />
      )}

      {/* 관련 링크 */}
      <section className="flex justify-center">
        <Link
          href="/projects/500_fiction"
          className="px-6 py-3 rounded-xl border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50"
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
