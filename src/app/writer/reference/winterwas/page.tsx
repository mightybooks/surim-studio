// app/writer/reference/winterwas/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "겨울이었다",
  description:
    "500자 소설 장르를 전제로 한 확장 서사 실험에 대한 기준 정의 문서.",
};

export default function ReferenceWinterWasPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 text-zinc-800">
      <h1 className="mb-12 text-2xl font-semibold tracking-tight">
        겨울이었다
      </h1>

      {/* 1. Definition */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          1. Definition
        </h2>

        <p className="mb-4">
          겨울이었다는 500자 소설 장르의 확장 형태다.
        </p>

        <p className="mb-4">
          이 실험은 500자 소설이 전제하는 고정 분량과 구조 규칙을 유지한 상태에서,
          더 심화된 통제를 통해 동일한 구조의 서사를 최대한 다양하게 전개할 수
          있는지를 검증한다.
        </p>

        <p className="mb-4">
          따라서 겨울이었다는 새로운 장르가 아니라, 이미 정의된 장르 위에서
          작동하는 확장 실험이다.
        </p>

        <p className="mt-6 font-medium">
        이 실험에서 서사는 앞으로 나아가기보다, 되돌릴 수 없는 조건 안에서
        지속되는 상태를 다룬다.
        </p>
      </section>

      {/* 2. Structural Focus */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          2. Structural Focus
        </h2>

        <p className="mb-4">
          겨울이었다는 내용의 변주보다 구조의 유지에 초점을 둔다.
        </p>

        <p className="mb-4">
          각 텍스트는 서로 다른 상황과 장면을 다루지만, 동일한 서사 골격과
          통제된 감정 배치 방식을 공유한다.
        </p>

        <p>
          이로 인해 개별 텍스트의 차이보다, 반복 속에서 드러나는 구조적 잔상이
          먼저 인식된다.
        </p>
      </section>

      {/* 3. Position in the Reference System */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          3. Position in the Reference System
        </h2>

        <p className="mb-4">
          겨울이었다는 500자 소설을 기준 장르로 삼는 Reference 체계 안에서,
          장르의 확장 가능성을 시험하는 위치에 놓인다.
        </p>

        <p>
          이 문서는 작품을 설명하기 위한 글이 아니라, 이후 문체 및 서사 개념
          정의들이 어떤 전제 위에서 등장하는지를 명확히 하기 위한 기준 문서다.
        </p>
      </section>
    </article>
  );
}
