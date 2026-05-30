import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "제3회 문수림배 문예경연대회 결과 | Sulim Studio",
  description:
    "제3회 문수림배 문예경연대회 결과 안내 및 수림지 창간호 수록 소식.",
  robots: { index: true, follow: true },
};

export default function Contest2026ResultsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <section className="space-y-10">
        <header className="space-y-4">
          <p className="text-sm font-medium text-emerald-700">
            문수림배 문예경연대회
          </p>
          <h1 className="text-3xl font-semibold text-emerald-950">
            제3회 문수림배 문예경연대회 결과
          </h1>
          <p className="leading-8 text-zinc-700">
            제3회 문수림배 문예경연대회는 결과 발표를 마쳤으며, 수상자와
            수상작은 《수림지》 창간호에 수록되어 있습니다.
          </p>
        </header>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="mb-4 text-xl font-semibold">당선작 안내</h2>
          <ul className="space-y-2 leading-7 text-zinc-700">
            <li>
              <strong>대상</strong> : 글그림, 『항구의 전깃줄』</li>
            <li>
              <strong>가작</strong> : 엘리스레빗, 『안녕하세요, 소금 버터 롤입니다.』</li>
          </ul>
        </div>

        <div className="space-y-5 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-6">
          <h2 className="text-xl font-semibold">수림지 창간호 수록 안내</h2>

          <p className="leading-8 text-zinc-700">
            제3회 문수림배 문예경연대회의 수상자와 수상작은 《수림지》
            창간호에 수록되어 있습니다. 수상작과 함께, 공모전 결과 및
            심사평도 《수림지》 안에서 확인하실 수 있습니다.
          </p>

          <p className="leading-8 text-zinc-700">
            《수림지》 창간호는 수림 스튜디오가 앞으로 기록하고 실험해 나갈
            이야기들의 첫 자리입니다. 이번 문예경연대회 수상작 역시 그 첫
            기록의 일부로 함께 실었습니다.
          </p>

          <div className="pt-2">
            <Link
              href="/edition/surimji/issue-0"
              className="inline-flex items-center rounded-full bg-emerald-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
            >
              《수림지》 창간호 보러가기
            </Link>
          </div>
        </div>

        <div className="space-y-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-6">
          <h2 className="text-xl font-semibold">제4회 대회 안내</h2>

          <p className="leading-8 text-zinc-700">
            제4회 문수림배 문예창작대회는 아직 일정이 정해지지 않았습니다.
            다음 대회의 형식, 주제, 모집 일정이 확정되면 이 페이지와 수림
            스튜디오 공지를 통해 다시 안내드리겠습니다.
          </p>

          <p className="leading-8 text-zinc-700">
            기다려주시는 분들께 감사드립니다. 다음 대회 역시 창작자의
            저작권과 작품의 개별성을 존중하는 방식으로 준비하겠습니다.
          </p>
        </div>
      </section>
    </main>
  );
}