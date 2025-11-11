// src/app/standby1/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "문수림배 제3회 문예경연대회 예고 | Sulim Studio",
  description:
    "올해는 소설 분야만 투고를 받습니다. 2026년 1월 1일~2월 22일 접수 예정. 수상작은 월간 수림지 창간호에 수록됩니다.",
  openGraph: {
    title: "문수림배 제3회 문예경연대회 예고",
    description:
      "올해는 소설 분야만 투고를 받습니다. 2026년 1월 1일~2월 22일 접수 예정.",
    url: "https://your-domain.com/contest",
    type: "article",
  },
  robots: { index: true, follow: true },
};

export default function ContestTeaserPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
    
      {/* 상태 배지 */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800">
        <span className="inline-block h-2 w-2 rounded-full bg-amber-500" />
        COMING SOON
      </div>

      {/* 제목/부제 */}
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
        문수림배 제3회 문예경연대회 예고
      </h1>
      <p className="mt-2 text-lg text-neutral-600">
        올해는 소설 분야만 투고를 받습니다.
      </p>

      {/* 본문 */}
       <article className="mt-8 space-y-6 text-neutral-800 leading-relaxed">
        <p>
          해마다 신춘문예가 12월까지 원고를 걷고, 1월 1일에 대상을 발표합니다.
          헌데, 낙방한 자들은 아쉬워서 어쩌나요? 그래서 준비한 &lt;누나랑 형은
          아직 살아있다, 제3회 문수림배 문예경연대회&gt;입니다.
          <strong> 26년 1월 1일부터 2월 22일까지</strong> 투고를 받을 예정입니다.
        </p>
        <p>
          올해는 주최 측의 재정 악화로 <strong>“단편 소설 장르”</strong>만
          투고를 받겠습니다. 단편이라 하지만, 분량은
          <strong> 원고지 200매 기준 최소 50매, 최대 80매 내외</strong>입니다.
        </p>
        <p>
          수상작은 3월 이후에 나올 <strong>월간 수림지 창간호</strong>에 수록되며,
          매우 약소하지만 상금도 전달할 예정입니다.
        </p>
        <p>
          이후 원고는 <strong>원작자가 마음대로</strong> 다시 다른 곳에 투고하거나,
          단행본에 수록하여도 관계 없겠습니다. 다만, 그 원고가 웹에서 한 차례
          공개되었다는 이유로 다른 문학상 주최 측에서 신작으로 인정하지 않는다면,
          그건 제 권한 밖의 일이라 도와드리지는 못합니다.
        </p>
        <p>그럼, 여러분들의 열화와 같은 성원을 기대하며 펜을 놓겠습니다.</p>
      </article>

      {/* 일정/요약 카드 */}
      <section className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-500">접수 기간</h3>
          <p className="mt-2 text-base">2026.01.01 ~ 2026.02.22</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-500">분야/분량</h3>
          <p className="mt-2 text-base">단편 소설 · 원고지 200매 기준 50~80매</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-500">발표/수록</h3>
          <p className="mt-2 text-base">2026년 3월 이후 · 월간 수림지 창간호 게재</p>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-neutral-500">비고</h3>
          <p className="mt-2 text-base">
            상금은 소정. 2차 활용 자유(타 공모전 신작 인정 여부는 각 주최 규정 따름).
          </p>
        </div>
      </section>

      {/* 비활성 CTA */}
      <div className="mt-10">
        <button
          disabled
          className="w-full sm:w-auto rounded-xl border border-neutral-300 bg-neutral-100 px-5 py-3 text-neutral-500"
          title="접수 오픈 시 활성화됩니다"
        >
          접수는 2026-01-01에 오픈됩니다
        </button>
        <p className="mt-3 text-sm text-neutral-500">
          세부 규정은 오픈 시점에 함께 공개됩니다. 문의:{" "}
          <a href="mailto:sulimstudio@gmail.com" className="underline">
            sulimstudio@gmail.com
          </a>
        </p>
      </div>

      {/* 끝인사 */}
      <footer className="mt-12 rounded-2xl bg-neutral-50 p-5 text-sm text-neutral-600">
        준비 기간 동안 성실하게 다듬겠습니다. 좋은 원고로 만나 뵙겠습니다.
      </footer>
    </main>
  );
}
