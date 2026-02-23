// File: src/app/projects/500funding-archive/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "500자소설 펀딩 기록 – 수림 스튜디오",
  description:
    "2026년 2월 9일부터 22일까지 진행된 『500자 소설』 펀딩 기록. 150권 목표, 62권 달성. 디지털 우선 출간 전략과 운영 실험의 공식 아카이브.",
  alternates: {
    canonical: "/projects/500funding-archive",
  },
  openGraph: {
    title: "500자소설 펀딩 기록 – 수림 스튜디오",
    description:
      "150권 목표 중 62권(41%) 달성. 디지털 우선 전략과 종이책 펀딩 구조 실험의 기록.",
    images: ["/covers/500funding-archive.webp"],
    type: "article",
    locale: "ko_KR",
  },
};

export default function FundingArchivePage() {
  return (
    <main className="mx-auto max-w-4xl space-y-16 px-6 py-12">
      {/* 히어로 */}
      <section className="relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow">
        <Image
          src="/covers/500funding-archive.webp"
          alt="500자소설 펀딩 아카이브"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="mb-2 text-4xl md:text-5xl font-semibold tracking-[0.2em] text-emerald-200 drop-shadow">
            Funding History
          </h1>
          <p className="text-sm md:text-base text-emerald-50">
            독자와 함께 한 도전의 기록
          </p>
        </div>
      </section>

      {/* 선언 */}
      <section className="prose prose-zinc max-w-none">
        <p>
          이 페이지는 2026년 2월 9일부터 22일까지 진행된 『500자 소설』
          펀딩의 공식 기록입니다.
          <br />
          낭만은 얇게, 숫자는 두껍게 남깁니다.
        </p>
      </section>

      {/* 숫자 요약 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="rounded-2xl border p-6 shadow-sm">
          <p className="text-xs text-zinc-400">펀딩 기간</p>
          <p className="text-lg font-semibold">
            2026.02.09 – 2026.02.22
          </p>
        </div>
        <div className="rounded-2xl border p-6 shadow-sm">
          <p className="text-xs text-zinc-400">목표 / 달성</p>
          <p className="text-lg font-semibold">
            150권 → 62권
          </p>
          <p className="text-sm text-emerald-600 font-medium">
            달성률 41%
          </p>
        </div>
        <div className="rounded-2xl border p-6 shadow-sm">
          <p className="text-xs text-zinc-400">발송 시작</p>
          <p className="text-lg font-semibold">
            국내 2월 23일
          </p>
          <p className="text-sm text-zinc-600">
            해외 2월 24일
          </p>
        </div>
      </section>

      {/* 41% 설명 */}
      <section className="prose prose-zinc max-w-none">
        <h2>41%는 실패 수치가 아니다</h2>
        <p>
          이 펀딩은 제작 여부를 결정하는 모금과는 성격이 달랐습니다.
          인쇄소의 빠른 대응으로 도서는 펀딩 시작 전에 이미 완성된 상태였습니다.
        </p>
        <p>
          구조는 사실상 사전 예약구매에 가까웠지만,
          그럼에도 ‘펀딩’이라는 단어를 사용한 이유는 분명합니다.
        </p>
        <p>
          앞으로 수림서가의 기본 원칙은
          <strong> 디지털 우선 출간</strong>입니다.
          종이책은 독자의 요구가 모였을 때만,
          펀딩을 통해 소량 생산합니다.
        </p>
        <p>
          41%는 부족함의 숫자가 아니라,
          종이책을 실제로 원하는 독자의 밀도를 확인한 첫 데이터입니다.
        </p>
      </section>

      {/* 디지털 전략 */}
      <section className="prose prose-zinc max-w-none">
        <h2>왜 디지털 우선인가</h2>
        <p>
          1인 출판사에게 재고는 자산이 아니라 부담이 되기 쉽습니다.
          수요를 먼저 확인하고, 그 수요만큼 정확히 생산하는 구조가
          장기적으로 더 건강합니다.
        </p>
        <p>
          또한 도서정가제 환경에서 가격 할인 경쟁은 의미가 없습니다.
          대신 선택한 전략은 다음과 같습니다.
        </p>
        <ul>
          <li>무료배송</li>
          <li>직접 제작 사은품</li>
          <li>친필 서명</li>
          <li>운영자가 직접 관리하는 배송</li>
        </ul>
        <p>
          플랫폼 수수료를 줄이고,
          그만큼을 독자 경험에 환원하는 방식입니다.
        </p>
      </section>

      {/* 베타테스트 */}
      <section className="prose prose-zinc max-w-none">
        <h2>이번 펀딩은 베타테스트였다</h2>
        <p>
          수림 스튜디오는 개인이 직접 설계한 웹사이트입니다.
          로그인, 인증, 모바일 결제, 해외 결제 분기까지
          모든 과정이 실전에서 점검되었습니다.
        </p>
        <p>
          이번 펀딩은 책 판매가 아니라,
          앞으로 수림 스튜디오에서 콘텐츠를 소비하게 될 독자들과의
          운영 연습이었습니다.
        </p>
      </section>

      {/* 결제 원칙 */}
      <section className="prose prose-zinc max-w-none">
        <h2>국내 · 국외 결제 지원 원칙</h2>
        <p>
          이번 프로젝트는 국내와 해외 모두 결제를 지원하는 구조로 운영되었습니다.
          이 원칙은 이후에도 유지됩니다.
        </p>
        <p>
          수림 스튜디오의 모든 콘텐츠는
          국내·국외 결제를 지원하는 방향으로 설계됩니다.
        </p>
      </section>

      {/* 이후 경로 */}
      <section className="prose prose-zinc max-w-none">
        <h2>이후의 경로</h2>
        <p>
          펀딩 종료 후 남은 재고는 수림서가로 이동합니다.
          일반 온라인 서점과 오프라인 독립서점을 통해서도 구매 가능합니다.
        </p>
      </section>

      {/* CTA */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
        <Link
          href="/edition"
          className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700"
        >
          수림서가 바로가기
        </Link>

        <Link
          href="/projects/500_fiction"
          className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          500자 프로젝트 배경 읽기
        </Link>
      </section>

      <footer className="text-center text-xs text-zinc-400">
        © 2026 수림 스튜디오. All rights reserved.
      </footer>
    </main>
  );
}
