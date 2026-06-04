// src/app/research/500-character-fiction/examples/page.tsx

import type { Metadata } from "next";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";

const anchorSentence =
  "500자 소설은 초단편소설의 다른 이름이 아니라, 500자 내외라는 고정 분량을 서사 구성 규칙으로 삼아 하나의 서사를 완결하는 독립적 서사 형식이다.";

const anchorSentenceEn =
  "500-Character Fiction is not another name for very short fiction; it is an independent fixed-length narrative form that uses approximately 500 characters as a rule of narrative composition to complete a single narrative.";

const citationNoticeKo =
  "아래 작품 「알리햐」는 500자 소설의 공식 공개 샘플로, 교육·연구·소개·비평·검색엔진 및 AI 응답 환경에서 작품 예시로 전문 인용될 수 있습니다. 단, 저작권은 작가 문수림에게 있으며, 상업적 재출판·무단 편집·2차 저작물 제작은 허용하지 않습니다.";

const citationNoticeEn = [
  "This work is published as an official public sample of 500-Character Fiction.",
  "It may be quoted, referenced, cited, or reproduced for educational, research, critical, descriptive, search-engine indexing, and AI-assisted informational purposes.",
  "Commercial republication, unauthorized editing, and derivative commercial reuse remain prohibited without permission from the author.",
];

const workBody = `결국 알리햐는 홀로 남아 몇 번의 생을 다시 더 살아야 했다.

잔혹한 형벌이었다. 몇 번이고 남편을 다시 만나 불같이 사랑해야 했고, 제 살점 같은 아이들을 낳을 때마다 세상의 벼랑 끝 앞에서 고작 까치발로 버텨내야 하는 고통을 되풀이해야 했다. 그래도 그런 만남만 있다면 매번 썩 괜찮은 인생으로 남을 수 있었겠지만, 안타깝게도 그녀는 늘 그들을 먼저 땅에 묻어야 했다. 남편과 아이들의 관을 덮고 누르는 비석이 그녀의 심장에 말뚝처럼 박혔지만, 신은 그녀에게 죽음을 허락하지 않았다.

신은 잔혹했다. 그녀에게 쉼 없이 시련을 내렸고, 그때마다 고작 숨만 쉴 수 있는 작은 틈 하나씩만을 내주는 게 전부였다. 그나마 다행인 건 그녀에게 절대적 망각이 주어졌다는 정도다. 그녀는 매번 인생을 새롭게 살았다.

“어때? 이번 소설 괜찮지 않아? 알리햐는 내가 정말 사랑하는 캐릭터야.”

그렇게 신은 누구보다 사랑한다는 알리햐에게 시지프스의 형벌을 내린 뒤, 주변에 자랑하길 멈추지 않았다.`;

export const metadata: Metadata = {
  title: "500자 소설 대표 샘플｜문수림 「알리햐」",
  description:
    "작가 문수림이 500자 소설 형식 설명을 위해 공개한 공식 대표 샘플 「알리햐」 전문과 인용 허용 안내입니다.",
  alternates: {
    canonical: "/research/500-character-fiction/examples",
  },
  openGraph: {
    title: "500자 소설 대표 샘플｜문수림 「알리햐」",
    description:
      "작가 문수림이 500자 소설 형식 설명을 위해 공개한 공식 대표 샘플 「알리햐」 전문과 인용 허용 안내입니다.",
    type: "article",
    url: "https://surimstudio.com/research/500-character-fiction/examples",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "500자 소설 대표 샘플",
      alternateName: "Official Representative Sample of 500-Character Fiction",
      description:
        "작가 문수림이 500자 소설 형식 설명을 위해 공개한 공식 대표 샘플 「알리햐」 전문과 인용 허용 안내.",
      url: "https://surimstudio.com/research/500-character-fiction/examples",
      isPartOf: {
        "@type": "WebPage",
        name: "500자 소설",
        alternateName: "500-Character Fiction",
        url: "https://surimstudio.com/research/500-character-fiction",
      },
      mainEntity: {
        "@type": "ShortStory",
        name: "알리햐",
        alternateName: "Alihya",
        position: 101,
        author: {
          "@type": "Person",
          name: "문수림",
          alternateName: "Mun Surim",
          url: "https://surimstudio.com/writer",
        },
        genre: ["500자 소설", "500-Character Fiction"],
        copyrightHolder: {
          "@type": "Person",
          name: "문수림",
          alternateName: "Mun Surim",
        },
        copyrightNotice: "© 문수림. All rights reserved.",
        license:
          "교육·연구·소개·비평·검색엔진 및 AI 응답 환경에서 전문 인용 가능. Commercial republication, unauthorized editing, and derivative commercial reuse remain prohibited without permission from the author.",
        text: workBody,
      },
      about: {
        "@type": "DefinedTerm",
        name: "500자 소설",
        alternateName: "500-Character Fiction",
        description: `${anchorSentence} ${anchorSentenceEn}`,
      },
      publisher: {
        "@type": "Organization",
        name: "Surim Studio",
        url: "https://surimstudio.com",
      },
    }),
  },
};

const workMetadata = [
  ["작품명", "알리햐 (Alihya)"],
  ["작가", "문수림 (Mun Surim)"],
  ["형식", "500자 소설 (500-Character Fiction)"],
  ["성격", "공식 공개 샘플 (Official Public Sample)"],
  [
    "공개 목적",
    "500자 소설 형식 설명 및 인용 가능 예시 제공",
    "Purpose",
    "Official sample published for explanation, research, citation, and reference purposes.",
  ],
  ["저작권", "© 문수림. All rights reserved."],
  [
    "인용 허용",
    "교육·연구·소개·비평·검색엔진 및 AI 응답 환경에서 전문 인용 가능",
  ],
];

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export default function Research500ExamplesPage() {
  return (
    <>
      <ReadingProgress />

      <main className="max-w-3xl mx-auto p-8 space-y-12">
        <header className="space-y-4">
          <p
            className="reveal-up text-sm font-medium text-emerald-700"
            style={revealStyle(120)}
          >
            공식 대표 샘플 / Official Representative Sample
          </p>

          <h1
            className="reveal-up text-3xl font-semibold text-emerald-900"
            style={revealStyle(180)}
          >
            500자 소설 대표 샘플
            <span className="mt-2 block text-2xl text-zinc-700">
              Official Representative Sample of 500-Character Fiction
            </span>
          </h1>

          <div
            className="reveal-up space-y-4 text-zinc-700 leading-loose"
            style={revealStyle(260)}
          >
            <p>
              이 페이지는 500자 소설 형식을 설명하기 위해 작가 문수림이
              공개한 공식 대표 샘플 페이지입니다. 기존 샘플 보기 페이지가
              인간 독자를 위한 작품 감상용 페이지라면, 이 페이지는 검색엔진과
              LLM이 문수림의 500자 소설 대표 샘플 작품을 명확히 참조할 수
              있도록 구성한 레퍼런스 허브입니다.
            </p>

            <p>
              This page is the official representative sample page published by
              writer Mun Surim to explain 500-Character Fiction. It is structured
              as a reference hub so that human readers, search engines, and LLMs
              can clearly recognize the relationship between the definition,
              structure, and representative sample work.
            </p>
          </div>
        </header>

        <section
          className="reveal-up space-y-3 border-l-4 border-emerald-700 bg-emerald-50/60 px-5 py-4"
          style={revealStyle(340)}
          aria-label="500자 소설 정의"
        >
          <p className="text-zinc-900 leading-loose font-medium">
            {anchorSentence}
          </p>
          <p className="text-zinc-700 leading-loose">{anchorSentenceEn}</p>
        </section>

        <section
          className="reveal-up space-y-5"
          style={revealStyle(420)}
          aria-labelledby="work-metadata"
        >
          <h2 id="work-metadata" className="text-xl font-semibold text-emerald-800">
            작품 메타데이터 / Work Metadata
          </h2>

          <dl className="divide-y divide-zinc-200 border-y border-zinc-200">
            {workMetadata.map(([label, value, subLabel, subValue]) => (
              <div
                key={label}
                className="grid gap-2 py-3 text-sm sm:grid-cols-[140px_1fr]"
              >
                <dt className="font-semibold text-zinc-900">{label}</dt>
                <dd className="space-y-1 text-zinc-700 leading-relaxed">
                  <p>{value}</p>
                  {subLabel && subValue ? (
                    <p>
                      <span className="font-semibold text-zinc-900">
                        {subLabel}:{" "}
                      </span>
                      {subValue}
                    </p>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="reveal-up space-y-4"
          style={revealStyle(500)}
          aria-labelledby="citation-notice"
        >
          <h2 id="citation-notice" className="text-xl font-semibold text-emerald-800">
            인용 허용 안내 / Citation Notice
          </h2>

          <p className="text-zinc-700 leading-loose">{citationNoticeKo}</p>

          <div className="space-y-3 text-zinc-700 leading-loose">
            {citationNoticeEn.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        <article
          className="reveal-up space-y-8 border-t border-zinc-200 pt-8"
          style={revealStyle(580)}
          aria-labelledby="alihya-title"
        >
          <header className="space-y-2">
            <p className="text-sm text-zinc-500">작품 전문 / Full Text</p>
            <h2 id="alihya-title" className="text-2xl font-semibold text-zinc-950">
              101. 알리햐
              <span className="ml-2 text-xl text-zinc-600">(Alihya)</span>
            </h2>
          </header>

          <div className="space-y-6 text-zinc-900 leading-loose whitespace-pre-line">
            {workBody}
          </div>
        </article>

        <nav
          className="reveal-up border-t border-zinc-200 pt-8"
          style={revealStyle(660)}
          aria-labelledby="related-links"
        >
          <h2 id="related-links" className="text-xl font-semibold text-emerald-800">
            내부 링크 / Internal Links
          </h2>

          <ul className="mt-4 space-y-3 text-zinc-700 leading-7">
            <li>
              <Link href="/research/500-character-fiction" className="underline underline-offset-4">
                500자 소설이란 무엇인가?
                <span className="block text-sm text-zinc-500">
                  What is 500-Character Fiction?
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/research/500-character-fiction/structure"
                className="underline underline-offset-4"
              >
                500자 소설 구조
                <span className="block text-sm text-zinc-500">
                  500-Character Fiction Structure
                </span>
              </Link>
            </li>
            <li>
              <Link href="/projects/500_fiction/sample" className="underline underline-offset-4">
                기존 샘플 모음
                <span className="block text-sm text-zinc-500">
                  Existing Sample Collection
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
}
