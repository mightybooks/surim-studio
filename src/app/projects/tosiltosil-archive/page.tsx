// src/app/projects/tosiltosil_archive/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import ArchiveShowcase from "@/components/archive/ArchiveShowcase";

export const metadata: Metadata = {
  title: "토실토실 돌봄에너지 확산 프로젝트 – 수림 스튜디오",
  description: "참여로 확산되는 돌봄에너지 아카이브",
  alternates: {
    canonical: "/projects/tosiltosil-archive",
  },
  openGraph: {
    title: "토실토실 돌봄에너지 확산 프로젝트 – 수림 스튜디오",
    description: "돌봄에너지 자가측정 앱 사용자들의 참여를 아카이브로 확장",
    images: ["/covers/tosiltosil_archive_hero.webp"],
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
        <span className="text-zinc-700">돌봄에너지 측정 아카이브</span>
      </nav>

      {/* 설명 */}
      <section className="prose prose-zinc max-w-none news-body">
        <p>
          이곳은 돌봄에너지 자가측정 앱을 사용한 참여자들의 응원메시지를 모아두는 아카이브입니다.
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
          href="/projects/tosiltosil"
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
