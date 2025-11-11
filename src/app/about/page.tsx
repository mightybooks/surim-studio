"use client";

import Image from "next/image";
import ReadingProgress from "@/components/ReadingProgress";

export default function AboutPage() {
  return (
     <>
      <ReadingProgress />
    <main className="max-w-4xl mx-auto p-8 space-y-14">
      {/* 헤더 */}
      <header className="text-center space-y-4">
        <h1 className="text-3xl font-semibold text-emerald-900">About</h1>
        <p className="text-lg font-medium text-emerald-800 tracking-wide">
          수림 스튜디오
        </p>
        <p className="text-zinc-600 italic">
          기계가 장악한 시대에 인간의 감정과 서사를 되살리는 실험
        </p>
      </header>

      {/* 스튜디오 소개 */}
      <section className="space-y-6">
        <p className="text-zinc-700 leading-loose">
          수림 스튜디오는 작가이자 출판사 대표인 문수림의 콘텐츠 창작 허브입니다.
        </p>
        <p className="text-zinc-700 leading-loose">
          AI 시대에도 창작자 문수림의 도전은 계속됩니다.
          <br />
          실험적인 글쓰기와 감정 서사의 확장을 보여드립니다.
        </p>
        <p className="text-zinc-700 leading-loose">
          매월 발행되는 《월간 수림지》는 그런 도전의 과정과 팬들과의 소통을 담고
          있습니다.
        </p>
      </section>

      <hr className="border-zinc-200" />

      {/* 문수림 소개: 2단 그리드, 좌 이미지 우 텍스트 */}
      <section aria-labelledby="msr-heading" className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-2">
          <div className="relative aspect-[3/4] w-full max-w-sm mx-auto">
            <Image
              src="/profile/moonsurim.png" // public/profile/ 에 실제 이미지를 두세요
              alt="문수림 사진"
              fill
              sizes="(max-width: 768px) 60vw, 320px"
              className="rounded-2xl object-cover shadow"
              priority
            />
          </div>
        </div>

        <div className="md:col-span-3 space-y-5">
          <h2 id="msr-heading" className="text-2xl font-semibold text-emerald-800">
            문수림 소개
          </h2>

          <p className="text-sm uppercase tracking-wider text-emerald-900/80">1인출판사 CEO 겸 소설가</p>

          <blockquote className="text-zinc-700 leading-relaxed border-l-4 border-emerald-300 pl-4">
            “첨단의 자본주의 아래 기계화가 뿌리를 내리고 있는 오늘, 나는 여전히 인간의 감성과 서사를 위해 실험을 한다.”
          </blockquote>

          <p className="text-zinc-700 leading-loose">
            “AI 시대, 저작권에 대한 대중의 인식 경계선은 모호해지며 필연적으로 AI 생성물이 과잉 공급된다. 이 과정에서 창작자가 살아남는 방법은 무엇일까?”
          </p>

          <ul className="text-zinc-700 leading-8 list-disc list-inside">
            <li>작품 창작의 연속성과 일관성 확보로 기본적인 저작권 방어</li>
            <li>고유한 문체 확립을 통한 차별화</li>
            <li>AI 생성 도구의 적절한 활용</li>
          </ul>
        </div>
      </section>

      {/* 문체 이론 */}
      <section aria-labelledby="style-heading" className="space-y-6">
        <h2 id="style-heading" className="text-2xl font-semibold text-emerald-800">
          정서적 미립자 확산형 서술 구조
        </h2>
        <p className="text-zinc-700 leading-loose">
          문수림은 스스로의 작품을 냉정하게 분석하여 규칙성을 추출했습니다. 완성도 이전에
          지속 가능한 창작과 정체성 유지를 위해 스타일과 톤의 일정 수준을 확보했고,
          그렇게 정식화한 개념이 ‘정서적 미립자 확산형 서술 구조’, ‘저강도 곡선’, ‘Aggro to
          Art’입니다.
        </p>
        <p className="text-zinc-700 leading-loose">
          특히 ‘정서적 미립자 확산형 서술 구조’는 감정을 직접 서술하지 않고, 정지된 행동과
          공간의 리듬으로 감정의 밀도를 드러내는 방식입니다. 시간의 정지 속에서 인물의 내면은
          주변 사물과 공간, 리듬에 반사되며 감정은 언어가 아닌 잔상으로 남습니다. (정지 → 공간화 → 여운)
        </p>

        {/* 예문 카드 */}
        <figure className="rounded-2xl border border-zinc-200 p-5 bg-white shadow-sm">
          <figcaption className="text-sm text-zinc-500 mb-3">예문 — 《20에서 30까지》 중 「그 여자의 편지, 쌍곡선을 그리다」</figcaption>
          <div className="space-y-3 text-zinc-700 leading-relaxed">
            <p>철민이 눈을 떴다. 버스는 여전히 대구를 향해 달리고 있다. <span className="text-zinc-500">(정지)</span></p>
            <p>철민이 이마에 맺힌 식은땀을 닦는다. 이미 십여 개월이나 지났으면서도 그날에 관한 꿈은 꾸면 꿀수록 더 선명해진다. 이제 버스가 도착하기만 하면, 이 꿈과도 작별할 수가 있으리라. 철민은 품속에서 그 여자가 보내어준 답장을 꺼내든다.</p>
            <p>버스가 너무 느려, 철민이 다시 라이터를 꺼내서 매만진다. <span className="text-zinc-500">(공간화)</span></p>
            <p>파란 불꽃이 피어보기도 전에 사라진다. <span className="text-zinc-500">(여운)</span></p>
          </div>
        </figure>
      </section>

      {/* 연혁/포트폴리오 */}
      <section aria-labelledby="history-heading" className="space-y-6">
        <h2 id="history-heading" className="text-2xl font-semibold text-emerald-800">
          지나온 발자취
        </h2>

        {/* 대표작 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-emerald-900">대표작</h3>
          <ul className="list-disc list-inside text-zinc-700 leading-8">
            <li>단편소설집, 동화집: <em>20에서 30까지</em>, <em>괜찮아, 아빠도 쉽진 않더라</em></li>
            <li>교양서: <em>장르불문 관통하는 글쓰기</em>, <em>세일즈맨 불황탈출 마스터키</em></li>
            <li>기관 웹진 연재: <em>무림지존, 취업준비생이 되다</em> (고용노동부 웹진, 2024 연재 종료), <em>레어템 한의약으로 이세계 정복</em> (한국한의학진흥원 웹진, 2025 연재 종료)</li>
          </ul>
        </div>

        {/* 특강 */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-emerald-900">글쓰기·출판 관련 특강</h3>
          <ul className="list-disc list-inside text-zinc-700 leading-8">
            <li>2017 대구 동성아트홀 글쓰기 특강</li>
            <li>2018 김천의료원 특강, 충북대 인문대학 특강, 대구 신세계 아카데미 문학교실 개설</li>
            <li>2019~ 대구대학교 꿈드림 특강단 활동</li>
            <li>2023 대구 달성도서관 글쓰기 특강, 저자 북토크</li>
            <li>2024 대구 달성도서관·2·28기념학생도서관 글쓰기 특강</li>
            <li>2025 대구 달성도서관 글쓰기 특강, 인천시교육청북구도서관 온라인 특강, 대구 서부도서관 글쓰기 특강</li>
          </ul>
        </div>

        {/* 전자책 외부 특강 */}
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
