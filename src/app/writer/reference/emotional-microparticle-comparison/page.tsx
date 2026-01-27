// src/app/writer/reference/emotional-microparticle-comparison/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "정서의 집중 서술과 분산 서술의 구조적 차이",
  description:
    "정서적 미립자 확산형 서술과 기존 간접 정서 서술을 작동 구조 기준으로 비교하는 레퍼런스 문서.",
};

export default function ReferenceEmotionalMicroparticleComparisonPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 text-zinc-800">
      <h1 className="mb-12 text-2xl font-semibold tracking-tight">
        정서의 집중 서술과 분산 서술의 구조적 차이
      </h1>

      {/* 1. Scope */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          1. Scope
        </h2>

        <p className="mb-4">
          이 문서는 감정을 직접 설명하지 않는 서술 전반을 포괄적으로 다루지
          않는다.
        </p>

        <p>
          비교의 대상은 기존의 간접 정서 서술과, 정서적 미립자 확산형 서술 사이의
          구조적 작동 방식이다.
        </p>
      </section>

      {/* 2. Existing Indirect Emotional Narration */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          2. 기존 간접 정서 서술의 구조
        </h2>

        <p className="mb-4">
          기존의 간접 정서 서술은 감정을 직접 명명하지 않되, 특정 장면이나
          사물, 행동에 정서적 책임을 집중시킨다.
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>감정은 특정 장면 또는 문단에 집중된다</li>
          <li>정서 해석의 핵심 단서가 명확히 배치된다</li>
          <li>독자는 그 지점을 통해 감정을 해석한다</li>
        </ul>
      </section>

      {/* 3. Emotional Microparticle Diffusion */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          3. 정서적 미립자 확산형 서술의 구조
        </h2>

        <p className="mb-4">
          정서적 미립자 확산형 서술은 감정을 특정 장면이나 문장에 집중시키지
          않는다.
        </p>

        <ul className="list-disc space-y-2 pl-5">
          <li>감정은 의도적으로 분해된 상태로 배치된다</li>
          <li>정서 해석의 책임을 맡는 단일 지점이 존재하지 않는다</li>
          <li>독자는 텍스트 전체에서 신호를 누적해 감각을 형성한다</li>
        </ul>
      </section>

      {/* 4. Structural Comparison */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          4. Structural Comparison
        </h2>

        <ul className="list-disc space-y-2 pl-5">
          <li>감정의 책임 위치: 집중됨 / 분산됨</li>
          <li>해석 방식: 핵심 장면 해석 / 전체 텍스트 누적</li>
          <li>독자 역할: 의미 파악 / 감각 축적</li>
          <li>서사 에너지: 국지적 고조 / 저강도 유지</li>
        </ul>
      </section>

      {/* 5. Conclusion */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          5. Conclusion
        </h2>

        <p className="font-medium">
          이 차이는 표현 기법의 차이가 아니라, 감정의 배치 방식과 해석 책임을
          어디에 두는가에 대한 구조적 선택의 차이다.
        </p>
      </section>
    </article>
  );
}
