// File: src/app/projects/500fiction_shortpaper/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export const metadata: Metadata = {
  title: "500자 소설 소논문 아카이브 – 수림 스튜디오",
  description:
    "『500자 소설』 프로젝트와 관련된 소논문 자료 아카이브. 서사의 최소 단위와 500자 서사의 가능성에 대한 짧은 연구 문서를 정리했습니다.",
  alternates: {
    canonical: "/projects/500fiction_shortpaper",
  },
  openGraph: {
    title: "500자 소설 소논문 아카이브 – 수림 스튜디오",
    description:
      "『500자 소설』 프로젝트와 관련된 소논문과 소개 콘텐츠를 모아둔 자료 아카이브 페이지입니다.",
    images: ["/covers/500fiction_shortpaper.webp"],
    type: "article",
    locale: "ko_KR",
  },
};

export default function FiveHundredShortPaperPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-16 px-6 py-12">
      {/* 히어로 */}
      <section className="relative h-[320px] w-full overflow-hidden rounded-3xl shadow md:h-[400px]">
        <Image
          src="/covers/500fiction_shortpaper.webp"
          alt="500자 소설 소논문 아카이브"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/45 px-6 text-center text-white">
          <p className="reveal-up mb-3 text-xs uppercase tracking-[0.35em] text-emerald-200 md:text-sm" style={revealStyle(80)}>
            Short Paper Archive
          </p>
          <h1 className="reveal-up text-3xl font-semibold tracking-tight md:text-5xl" style={revealStyle(180)}>
            500자 소설 소논문 아카이브
          </h1>
          <p className="reveal-up mt-4 max-w-2xl text-sm leading-relaxed text-emerald-50 md:text-base" style={revealStyle(300)}>
            『500자 소설』 프로젝트를 둘러싼 개념 자료와 짧은 연구 문서를 정리한 페이지입니다.
          </p>
        </div>
      </section>

      {/* 소개 */}
      <section className="reveal-up prose prose-zinc max-w-none" style={revealStyle(420)}>
        <p>
          이 페이지는 『500자 소설』 프로젝트와 관련하여 작성된 소논문 자료를 정리한 아카이브입니다.
        </p>
        <p>
          짧은 텍스트가 어디까지 독립된 서사가 될 수 있는지, 그리고 약 500자 전후의 길이가 하나의
          서사 단위로 기능할 수 있는지를 검토하는 문제의식에서 출발했습니다.
        </p>
        <p>
          결과물인 책만이 아니라, 그 바깥에서 형성된 개념적 배경과 설명 자료까지 함께 남겨두기 위한
          기록 페이지이기도 합니다.
        </p>
      </section>

      {/* 논문 정보 카드 */}
      <section className="reveal-up rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-8" style={revealStyle(520)}>
        <div className="space-y-4">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">Short Paper</p>
            <h2 className="mt-2 text-2xl font-semibold text-zinc-900 md:text-3xl">
              소설이 성립되기 위한 최소 단위에 대한 고찰: 500자 서사의 가능성
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-zinc-700 md:text-base">
            『500자 소설』 프로젝트를 바탕으로, 짧은 길이의 텍스트가 단순한 단상이나 감상이 아니라
            독립된 서사로 성립할 수 있는지 탐색한 소논문입니다.
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs text-zinc-400">자료 형식</p>
              <p className="mt-1 font-medium text-zinc-900">DOI / PDF 아카이브</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs text-zinc-400">자료 성격</p>
              <p className="mt-1 font-medium text-zinc-900">Short Paper</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs text-zinc-400">주제</p>
              <p className="mt-1 font-medium text-zinc-900">500자 서사의 가능성</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="https://doi.org/10.5281/zenodo.18960753"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
            >
              논문 원문 보기
            </a>

            <Link
              href="/projects/500_fiction"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-4 py-2 text-zinc-700 transition hover:bg-zinc-50"
            >
              프로젝트 메인으로
            </Link>
          </div>
        </div>
      </section>

      {/* 요약 설명 */}
      <section className="reveal-up prose prose-zinc max-w-none" style={revealStyle(620)}>
        <h2>이 자료는 무엇을 다루는가</h2>
        <p>
          이 소논문은 소설의 성립 조건을 분량 중심으로만 바라보는 관점에 질문을 던집니다. 긴 서사가
          아니어도 사건, 변화, 인물, 암시된 구조가 성립한다면 서사로서 기능할 수 있는지 검토합니다.
        </p>
        <p>
          특히 『500자 소설』이라는 실제 창작 및 출간 프로젝트를 바탕으로, 짧은 글이 어디까지
          서사적 밀도를 획득할 수 있는지 실험적으로 접근합니다.
        </p>
      </section>

      {/* 유튜브 섹션 */}
      <section className="space-y-5">
        <div className="reveal-up prose prose-zinc max-w-none" style={revealStyle(720)}>
          <h2>팟캐스트로 듣기</h2>
          <p>
            아래 영상은 해당 소논문을 조금 더 흥미롭게 풀어 소개한 콘텐츠입니다. 문서로 읽는 방식과는
            또 다른 결의 설명으로 보실 수 있습니다.
          </p>
        </div>

        <div className="reveal-up overflow-hidden rounded-3xl border border-zinc-200 bg-black shadow-sm" style={revealStyle(800)}>
          <div className="relative w-full pt-[56.25%]">
            <iframe
              src="https://www.youtube.com/embed/C6KxAbxnowM?si=IXaGE1n-_4oNTmM4"
              title="500자 소설 소논문 소개 팟캐스트"
              className="absolute left-0 top-0 h-full w-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* 연결 섹션 */}
      <section className="reveal-up prose prose-zinc max-w-none" style={revealStyle(900)}>
        <h2>프로젝트 안에서 이 자료의 위치</h2>
        <p>
          『500자 소설』은 단지 한 권의 책으로 끝나는 프로젝트가 아니라, 짧은 서사가 어떤 형식으로
          존재하고 유통될 수 있는지 실험하는 연속된 구조입니다.
        </p>
        <p>이 페이지의 자료는 그 구조 안에서 다음 요소들과 연결됩니다.</p>
        <ul>
          <li>책 자체로서의 결과물</li>
          <li>입고 서점 지도와 같은 현실 유통 흔적</li>
          <li>앱, 샘플, 프로젝트 소개 페이지 등 디지털 확장 요소</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="reveal-up rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6" style={revealStyle(1000)}>
        <p className="mb-4 text-zinc-700">
          500자 소설의 프로젝트 구조를 함께 살펴보세요. 책, 앱, 샘플, 입고 서점 정보까지 하나의 흐름으로
          이어집니다.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects/500_fiction/sample"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-700"
          >
            작품 미리보기
          </Link>

          <Link
            href="/projects/500fiction_app"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-white transition hover:bg-emerald-600"
          >
            앱 알아보기
          </Link>

          <Link
            href="/edition/surimseoga/500-fiction"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-white transition hover:bg-emerald-500"
          >
            책 보러가기
          </Link>

          <Link
            href="/projects/500_fiction/bookmaps"
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-300 px-4 py-2 text-white transition hover:bg-emerald-500"
          >
            입고서점 확인
          </Link>
        </div>
      </section>

      <footer className="reveal-up text-center text-xs text-zinc-400" style={revealStyle(1100)}>
        © 2026 수림 스튜디오. All rights reserved.
      </footer>
    </main>
  );
}