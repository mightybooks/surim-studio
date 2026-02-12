// app/writer/reference/low-intensity-curve/page.tsx

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { makeReferenceJsonLd, makeReferenceMetadata } from "../_lib/referenceSeo";

const DOC = {
  slug: "low-intensity-curve",
  title: "저강도 곡선",
  description:
    "저강도 곡선은 서사의 긴장을 고조시키지 않고 낮은 강도의 상태를 유지한 채 지속시키는 서사 에너지 구조다. 기준 문서.",
  keywords: ["저강도 곡선", "문수림", "서사 에너지", "서사 구조", "상태 서사"],
} as const;

export const metadata: Metadata = makeReferenceMetadata(DOC);

export default function ReferenceLowIntensityCurvePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 text-zinc-800">
      <JsonLd data={makeReferenceJsonLd(DOC)} />

      <h1 className="mb-12 text-2xl font-semibold tracking-tight">
        저강도 곡선</h1>

      {/* 1. Definition */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          1. Definition
        </h2>

        <p className="mb-4">
          저강도 곡선은 서사의 긴장을 점진적으로 고조시키지 않고, 낮은 강도의
          상태를 유지한 채 지속시키는 서사 에너지 구조다.
        </p>

        <p className="mb-4">
          이 곡선에서 서사는 위기나 전환을 향해 나아가지 않는다. 대신 이미
          결정이 끝난 조건 안에서 상태가 유지되고, 변화 없이 시간이 누적된다.
        </p>

        <p className="font-medium">
          저강도 곡선은 서사의 결말이나 해소보다, 지속되는 상태 자체를 중심에
          둔다.
        </p>
      </section>

      {/* 2. Structural Origin */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          2. Structural Origin
        </h2>

        <p className="mb-4">
          이 서사 구조는 의도적인 감정 절제나 미학적 선택에서 출발하지 않는다.
        </p>

        <p className="mb-4">
          고정된 분량, 설명의 배제, 사건 이후 상태 중심의 서사 조건은 긴장의
          상승과 해소라는 전통적 곡선을 작동 불가능하게 만든다.
        </p>

        <p>
          그 결과 서사는 고조 대신 유지, 해결 대신 지속이라는 에너지 배치를
          택하게 된다.
        </p>
      </section>

      {/* 3. Narrative Function */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          3. Narrative Function
        </h2>

        <p className="mb-4">
          저강도 곡선은 독자에게 감정적 카타르시스를 제공하지 않는다.
        </p>

        <p className="mb-4">
          이 구조에서 독자는 사건의 결말을 기대하기보다, 변화하지 않는 조건
          속에서 축적되는 시간과 정서를 관찰하게 된다.
        </p>

        <p className="font-medium">
          따라서 저강도 곡선은 서사의 추진력보다, 버티는 상태의 밀도를 통해
          작동한다.
        </p>
      </section>
    </article>
  );
}
