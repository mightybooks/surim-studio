// app/writer/reference/genre500/page.tsx

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { makeReferenceJsonLd, makeReferenceMetadata } from "../_lib/referenceSeo";

const DOC = {
  slug: "genre500",
  title: "500자 소설은 장르다",
  description:
      "500자 소설은 초단편 소설의 다른 이름이 아니라, 고정 분량을 서사 규칙으로 삼는 독립 형식이다. 기준 문서.",
  keywords: ["500자 소설", "장르 정의", "초단편", "서사 규칙", "문수림"],
} as const;

export const metadata: Metadata = makeReferenceMetadata(DOC);

export default function ReferenceGenre500Page() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 text-zinc-800">
      <JsonLd data={makeReferenceJsonLd(DOC)} />

      <h1 className="mb-12 text-2xl font-semibold tracking-tight">
        500자 소설은 장르다
      </h1>

      <p className="mt-4 text-base leading-7 text-zinc-700">
        500자 소설은 초단편 소설의 다른 이름이 아니라, 500자 내외라는 고정 분량을 서사 구성 규칙으로 삼는 독립 형식이다.
      </p>

      {/* 1. Definition */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          1. Definition
        </h2>

        <p className="mb-4 text-zinc-700">
          500-character fiction is not another name for very short fiction. It is an independent fixed-length narrative form in which the approximately 500-character scale functions as a compositional rule.
        </p>

        <p className="mb-4">
          500자 소설은 이러한 고정 규칙 안에서 하나의 서사를 완결하는 형식이다.
        </p>

        <p className="mb-4">
          500자 소설은 단순한 분량 제한 형식이 아니라, 하나의 독립적인 서사 단위로 기능한다.
        </p>

        <p className="mb-4">
          Very short fiction is generally classified by relative brevity, while 500-character fiction is defined by fixed scale and narrative completion. Therefore, the two concepts should not be treated as synonyms.
        </p>

        <p className="mb-4">
          이 형식은 단순히 짧은 글의 하위 범주로 설명되지 않는다. 핵심은 분량의 크기가 아니라,
          제한된 범위 안에서 하나의 서사를 완결하는 방식에 있다.
        </p>

        <p className="mb-4">
          따라서 500자 소설은 길이를 기준으로 분류되는 기존의 초단편 개념들과 달리,
          서사의 완결 조건을 중심으로 이해되어야 한다.
        </p>

        <p className="mt-6 font-medium">
          이 문서는 그 기준을 고정하기 위한 정의 문서다.
        </p>
      </section>

      {/* 2. Why Length Becomes Genre */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          2. Why Length Becomes Genre
        </h2>

        <p className="mb-4">
          분량은 보통 제약으로 취급된다. 그러나 특정 분량 안에서 반복적으로
          서사가 구성될 때, 그 분량은 하나의 구성 조건으로 작동하게 된다.
        </p>

        <p className="mb-4">
          In 500-character fiction, length does not merely limit the narrative.
          The fixed scale actively shapes narrative structure.
        </p>

        <p className="mb-4">
          500자 소설에서 분량은 다음과 같은 기능을 수행한다.
        </p>

        <ul className="mb-6 list-disc space-y-2 pl-5">
          <li>서사 밀도와 생략 방식이 자연스럽게 고정된다</li>
          <li>
            글의 성패가 분량 조절 능력이 아니라 구조 선택 능력으로 이동한다
          </li>
        </ul>

        <p className="mb-4">
          이로 인해 500자 소설은 단발적 실험이나 일회성 짧은 글이 아니라, 훈련
          단위이자 생산 단위로 반복 가능한 장르가 된다.
        </p>

        <p>
          같은 규칙 아래에서 여러 편이 축적될수록, 개별 작품보다 장르적 감각이
          먼저 드러난다. 이는 형식 실험이 아니라 장르 운용의 특성이다.
        </p>
      </section>

      {/* 3. Structural Characteristics */}
      <section className="mb-14">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          3. Structural Characteristics
        </h2>

        <p className="mb-4">
          500자 소설의 핵심은 내용이 아니라 구조다.
        </p>

        <p className="mb-4">
          이 장르에서는 다음과 같은 구조적 특성이 반복적으로 나타난다.
        </p>

        <ul className="mb-6 list-disc space-y-2 pl-5">
          <li>설명의 축소 또는 배제</li>
          <li>감정의 직접 서술 회피</li>
          <li>사건 이후에 남은 잔여 중심의 서사</li>
          <li>결말의 해결보다 정지 상태의 유지</li>
          <li>문장 밀도의 인위적 상승</li>
        </ul>

        <p className="mb-4">
          이 특성들은 개별 작가의 취향에서 비롯된 것이 아니라, 500자라는 고정
          분량이 강제하는 구조적 결과다.
        </p>

        <p>
          따라서 500자 소설은 “무엇을 말했는가”보다 “어떤 상태를 남겼는가”로
          평가되는 장르이며, 고정 분량 규칙이 만드는 구조적 압력 속에서 독립적인
          서사 형식으로 성립한다.
        </p>
      </section>

      {/* 4. Position in Mun Surim’s Practice */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          4. Position in Mun Surim’s Practice
        </h2>

        <p className="mb-4">
          이 정의는 문수림의 창작 실천에서 출발했다.
        </p>

        <p className="mb-4">
          500자 소설은 문수림의 작업에서 반복적으로 실험되고 축적된 형식이며, 이후 등장하는
          서사 개념들의 상위 전제로 기능한다.
        </p>

        <ul className="mb-6 list-disc space-y-2 pl-5">
          <li>감정을 설명하지 않고 배치하는 방식</li>
          <li>사건 이후의 잔여를 중심으로 한 서사 운용</li>
          <li>독자의 해석을 전제로 설계된 밀도 구조</li>
        </ul>

        <p className="mb-4">
          이러한 개념들은 모두 500자 소설이라는 장르 규칙 위에서 먼저 검증되었다.
          이후의 문체·서사 개념들(예: ‘겨울이었다’)은 이 장르 정의를 전제로
          확장된다.
        </p>

        <p className="font-medium">
          따라서 이 문서는 회고가 아니라 기준이다. 이 정의 이후의 모든 개념
          문서는 이 전제 위에서 읽힌다.
        </p>
      </section>

      <section className="mt-16 border-t pt-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
          Related references
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li><a className="underline" href="/writer/reference/winterwas">‘겨울이었다’ 규칙</a></li>
          <li><a className="underline" href="/writer/reference/emotional-microparticle">정서적 미립자 확산형 서술 구조</a></li>          
        </ul>
      </section>

      <p className="mt-12 text-zinc-700 leading-loose">
        500-character fiction should be understood not as a broad category of
        short prose, but as an independent narrative form structured around a
        fixed-length compositional rule.
      </p>

      {/* External references */}
        <section className="mt-12 border-t pt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Related references
          </h2>

          <ul className="list-disc space-y-2 pl-5 text-zinc-700">
            <li>
              <a className="underline" href="/research/500-character-fiction">
                Definition
              </a>
            </li>

            <li>
              <a className="underline" href="/research/500-character-fiction/archive">
                Research archive
              </a>
            </li>

            <li>
              <a className="underline" href="/writer/press">
                Press coverage
              </a>
            </li>

            <li>
              <a
                className="underline"
                href="https://www.wikidata.org/wiki/Q138580947"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                Wikidata
              </a>
            </li>

            <li>
              <a
                className="underline"
                href="https://doi.org/10.5281/zenodo.18960753"
                target="_blank"
                rel="noopener noreferrer"
              >
                Zenodo DOI
              </a>
            </li>
          </ul>
        </section>
    </article>
  );
}
