// src/app/writer/reference/emotional-microparticle/page.tsx

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { makeReferenceJsonLd, makeReferenceMetadata } from "../_lib/referenceSeo";

const DOC = {
  slug: "emotional-microparticle",
  title: "정서적 미립자 확산형 서술",
  description:
    "정서적 미립자 확산형 서술은 감정을 직접 설명하지 않고, 미세한 정서 단서들을 분산 배치해 전체 감각을 형성하는 문체다. 기준 문서.",
  keywords: [
    "정서적 미립자 확산형 서술",
    "문수림",
    "문체",
    "감정 비직접 서술",
    "서술 구조",
  ],
} as const;

export const metadata: Metadata = makeReferenceMetadata(DOC);

export default function ReferenceEmotionalMicroparticlePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 text-zinc-800">
      <JsonLd data={makeReferenceJsonLd(DOC)} />

      <h1 className="mb-12 text-2xl font-semibold tracking-tight">
        정서적 미립자 확산형 서술
      </h1>

      {/* 1. Definition */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          1. Definition
        </h2>

        <p className="mb-4">
          정서적 미립자 확산형 서술은 감정을 직접 설명하지 않고, 미세한 정서
          단서들을 분산 배치함으로써 전체 감각을 형성하는 문체다.
        </p>

        <p className="mb-4">
          이 문체에서 감정은 하나의 중심 문장이나 결정적 표현으로 제시되지
          않는다. 대신 사소한 행동, 환경의 잔여, 반복되는 상태 묘사 속에
          분해되어 존재한다.
        </p>

        <p className="font-medium">
          독자는 감정을 이해하기보다, 텍스트 전반에 흩어진 정서의 밀도를 통해
          그것을 감지하게 된다.
        </p>
      </section>

      {/* 2. Structural Basis */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          2. Structural Basis
        </h2>

        <p className="mb-4">
          이 서술 방식은 표현 기법의 선택이 아니라, 구조적 조건의 결과로
          발생한다.
        </p>

        <p className="mb-4">
          고정된 분량, 설명의 제한, 사건 이후 상태 중심의 서사 구조는 감정을
          직접 명명하는 방식을 배제하게 만든다.
        </p>

        <p>
          그 결과 감정은 제거되는 것이 아니라, 더 작은 단위로 분해되어 텍스트
          전반에 확산된다.
        </p>
      </section>

      {/* 3. Function */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          3. Function
        </h2>

        <p className="mb-4">
          정서적 미립자 확산형 서술은 독자의 해석을 전제로 작동한다.
        </p>

        <p className="mb-4">
          이 문체는 감정을 전달하거나 설득하지 않는다. 대신 독자가 텍스트의
          여러 지점에서 감정적 신호를 수집하도록 구조를 설계한다.
        </p>

        <p className="font-medium">
          따라서 이 서술은 감정의 명확한 전달보다, 잔상처럼 남는 상태를 목표로
          한다.
        </p>
      </section>
    </article>
  );
}
