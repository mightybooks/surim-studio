// src/app/about/page.tsx

"use client";

import Image from "next/image";
import ReadingProgress from "@/components/ReadingProgress";

export default function AboutPage() {
  return (
    <>
      <ReadingProgress />
      <main className="max-w-4xl mx-auto p-8 space-y-16">

        {/* 헤더 */}
        <header className="text-center space-y-4">
          <h1 className="text-3xl font-semibold text-emerald-900">About</h1>
          <p className="text-lg font-medium text-emerald-800 tracking-wide">
            수림 스튜디오
          </p>
          <p className="text-zinc-600 italic">
            기계가 장악한 시대에 인간의 감정과 서사는 어떻게 살아남을 수 있을까
          </p>
        </header>

        <p className="text-sm text-zinc-500 leading-relaxed">
        Surim Studio is the primary organizational and conceptual framework
        of this website. All writer definitions, narrative formats,
        and reference documents on this site are defined under this entity.
      </p>

        {/* 질문 블록 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-800">
            우리가 출발한 질문들
          </h2>

          <p className="text-zinc-700 leading-loose">
            수림 스튜디오는 하나의 결론이 아니라, 몇 개의 질문에서 출발했습니다.
            AI가 글을 생산하고 추천 알고리즘이 독서를 매개하는 환경에서
            창작자는 더 이상 “잘 쓰는 사람”만으로 존재하기 어렵습니다.
          </p>

          <ul className="list-disc list-inside text-zinc-700 leading-8">
            <li>분량 제한은 창작을 방해하는 조건일까, 아니면 훈련 가능한 단위가 될 수 있을까.</li>
            <li>감정을 직접 설명하지 않고도 서사는 독자에게 도달할 수 있을까.</li>
            <li>검색과 추천이 독서를 결정하는 시대에 작가는 어떤 방식으로 호출되는 존재가 될 수 있을까.</li>
            <li>작품·플랫폼·독자 참여를 하나의 창작 구조로 설계하는 것은 가능한가.</li>
          </ul>

          <p className="text-zinc-700 leading-loose">
            수림 스튜디오는 이 질문들을 이론이 아니라 실제 실험으로 다루기 위해 만들어졌습니다.
          </p>
        </section>

        <hr className="border-zinc-200" />

        {/* 실험 플랫폼 소개 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-800">
            수림 스튜디오는 무엇을 하는 곳인가
          </h2>

          <p className="text-zinc-700 leading-loose">
            수림 스튜디오는 작가 문수림이 운영하는 창작 실험 플랫폼이자
            콘텐츠 아카이빙 허브입니다.
          </p>

          <p className="text-zinc-700 leading-loose">
            이곳에서 글은 단발성 결과물이 아니라,
            반복 가능한 창작 단위로 설계되고 공개된 상태로 축적되며
            독자와의 상호작용 속에서 다시 검증됩니다.
          </p>

          <p className="text-zinc-700 leading-loose">
            매월 발행되는 《월간 수림지》는 이 실험의 결과와 과정을 기록하는 장치입니다.
            완성된 작품뿐 아니라, 시도와 실패, 설계의 흔적까지 함께 담습니다.
          </p>
        </section>

        {/* 스레드 참고 */}
        <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-5 space-y-2">
          <p className="text-sm text-zinc-700 leading-relaxed">
            수림 스튜디오의 실험은 완성된 결과보다,
            진행 중인 상태로 더 자주 드러납니다.
            설계 과정과 단편적인 기록들은
            아래의 스레드 계정을 통해 공개되고 있습니다.
          </p>

          <a
            href="https://www.threads.com/@surim_studio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-medium underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
          >
            Threads — surim_studio
          </a>
        </div>

        {/* 방법론 */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-emerald-800">
            실험을 가능하게 한 방법론
          </h2>

          <p className="text-zinc-700 leading-loose">
            수림 스튜디오는 감정을 직접 설명하지 않고,
            정지된 행동과 공간의 리듬을 통해 감정의 밀도를 드러내는
            ‘정서적 미립자 확산형 서술 구조’를 핵심 방법론으로 삼습니다.
          </p>

          <p className="text-zinc-700 leading-loose">
            서사는 사건을 빠르게 전개하지 않습니다.
            대신 시간은 잠시 멈추고
            감정은 언어가 아닌 잔상으로 남습니다.
          </p>

          <figure className="rounded-2xl border border-zinc-200 p-5 bg-white shadow-sm">
            <figcaption className="text-sm text-zinc-500 mb-3">
              예문 — 《20에서 30까지》 중 「그 여자의 편지, 쌍곡선을 그리다」
            </figcaption>
            <div className="space-y-3 text-zinc-700 leading-relaxed">
              <p>철민이 눈을 떴다. 버스는 여전히 대구를 향해 달리고 있다.</p>
              <p>버스가 너무 느려, 철민은 다시 라이터를 꺼내서 매만진다.</p>
              <p>파란 불꽃이 피어보기도 전에 사라진다.</p>
            </div>
          </figure>
        </section>

        <hr className="border-zinc-200" />

        {/* 문수림 사례 */}
        <section className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          <div className="md:col-span-2">
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto">
              <Image
                src="/profile/moonsurim2.jpg"
                alt="문수림 사진"
                fill
                sizes="(max-width: 768px) 60vw, 320px"
                className="rounded-2xl object-cover shadow"
                priority
              />
            </div>
          </div>

          <div className="md:col-span-3 space-y-5">
            <h2 className="text-2xl font-semibold text-emerald-800">
              하나의 사례
            </h2>

            <p className="text-zinc-700 leading-loose">
              이 질문들과 실험을 가장 오래, 가장 집요하게 밀어붙여 온 사례가 있습니다.
              그 사람이 바로 문수림입니다.
            </p>

        {/* 연구 글 언급 */}
          <p className="text-zinc-700 leading-loose">
            문수림은 이러한 문제의식을 바탕으로
            「소설이 성립되기 위한 최소 단위에 대한 고찰: 500자 서사의 가능성」이라는
            연구 글을 발표하기도 했습니다.
          </p>

          <a
            href="https://doi.org/10.5281/zenodo.18960753"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
          >
            연구 글 보기 (Zenodo)
          </a>
          <p></p>

            <p className="text-zinc-700 leading-loose">
              문수림의 공식적인 작가 정의와 호출 기준은
              별도의 Writer Definition 페이지에 정리되어 있습니다.
            </p>

            <a
              href="/writer"
              className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
            >
              Writer Definition 페이지로 이동
            </a>
          </div>
        </section>

        {/* 전자책 외부 특강 */}
        <section className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-emerald-900">전자책·디지털북 특강</h3>
          <ul className="list-disc list-inside text-zinc-700 leading-8">
            <li>2021 대구문학관 디지털 북 제작체험</li>
            <li>2023 안심도서관 디지털북 체험공간조성 지원사업 특강</li>
            <li>2025 김천청년창업지원센터 나만의 E-Book 만들기 특강</li>
          </ul>
        </div>

        {/* 언론 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-emerald-900">언론 출연</h3>
          <ul className="list-disc list-inside text-zinc-700 leading-8">
            <li>2016 세이브더칠드런 영상 인터뷰</li>
            <li>2017 영남일보·중앙일보 소개</li>
            <li>2017 딜라이브TV 다큐멘터리 <em>독립출판의 시대가 오다</em> 출연</li>
            <li>2018 KBS1TV <em>라이브오늘</em> 출연</li>
          </ul>
        </div>
      </section>

      {/* 푸터 안내 */}
      <footer className="text-center text-sm text-zinc-500 pt-2">
        <p>© 2025 수림 스튜디오. All rights reserved.</p>
      </footer>
    </main>
    </>
  );
}
