// src/app/writer/reference/page.tsx

import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Writer Reference | 문수림",
  description:
    "문수림의 서사/문체/장르 정의 문서 모음. 500자 소설, 정서적 미립자 확산형 서술, 저강도 곡선, ‘겨울이었다’ 등 기준 문서 허브.",
  alternates: { canonical: "/writer/reference" },
  openGraph: {
    title: "Writer Reference | 문수림",
    description:
      "문수림의 서사/문체/장르 정의 문서 모음(기준 문서 허브).",
    url: "/writer/reference",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Mun Surim — Writer Reference",
  itemListElement: [
    { "@type": "ListItem", position: 1, url: "/writer/reference/genre500" },
    { "@type": "ListItem", position: 2, url: "/writer/reference/emotional-microparticle" },
    { "@type": "ListItem", position: 3, url: "/writer/reference/emotional-microparticle-comparison" },
    { "@type": "ListItem", position: 4, url: "/writer/reference/low-intensity-curve" },
    { "@type": "ListItem", position: 5, url: "/writer/reference/winterwas" },
    { "@type": "ListItem", position: 6, url: "/writer/reference/reviews" },
  ],
};

export default function WriterPage() {
  return (
    <>
      <ReadingProgress />

      <main className="max-w-3xl mx-auto p-8 space-y-16">
        <JsonLd data={jsonLd} />
        {/* Header */}
        <header className="space-y-4">
          <h1 className="text-3xl font-semibold text-zinc-900">
             Writer Definition — Reference
          </h1>
          <p className="text-sm uppercase tracking-wider text-zinc-500">
            Mun Surim
          </p>
          <p className="text-sm text-zinc-500">
            This page provides reference definitions for key concepts related to Mun Surim, 
            including 500-character fiction and narrative structure theories.
            </p>

            <p className="text-sm text-zinc-500">
            For the official writer profile and slot definition,
            see <a href="/writer" className="underline">Writer Definition</a>.
            </p>
        </header>

    {/* Core Reference Definitions */}
    <section className="space-y-6 border-b border-zinc-200 pb-10">
      <h2 className="text-xl font-semibold text-zinc-800">
        Core Reference Definitions
      </h2>

      <p className="text-sm text-zinc-500">
        The following documents define the core narrative structures and concepts
        used in Mun Surim’s writing practice.
      </p>

      <ul className="space-y-3 text-zinc-700">
        <li>
          <a href="/writer/reference/genre500" className="underline">
            500자 소설은 장르다
          </a>
          <span className="ml-2 text-sm text-zinc-500">
            — 규칙 기반 서사 장르 정의
          </span>
        </li>

        <li>
          <a href="/writer/reference/winterwas" className="underline">
            겨울이었다
          </a>
          <span className="ml-2 text-sm text-zinc-500">
            — 장르 확장 실험
          </span>
        </li>

        <li>
          <a href="/writer/reference/emotional-microparticle" className="underline">
            정서적 미립자 확산형 서술
          </a>
          <span className="ml-2 text-sm text-zinc-500">
            — 문체적 귀결 정의
          </span>
        </li>

        <li>
          <a href="/writer/reference/low-intensity-curve" className="underline">
            저강도 곡선
          </a>
          <span className="ml-2 text-sm text-zinc-500">
            — 서사 에너지 모델
          </span>
        </li>

        <li>
          <a
            href="/writer/reference/emotional-microparticle-comparison"
            className="underline"
          >
            정서의 집중 서술과 분산 서술의 구조적 차이
          </a>
          <span className="ml-2 text-sm text-zinc-500">
            — 비교 Reference
          </span>
        </li>
      </ul>
    </section>

    <section className="space-y-4 border-b border-zinc-200 pb-10">
      <h2 className="text-xl font-semibold text-zinc-800">
        Reception & External Response
      </h2>

      <p className="text-sm text-zinc-500">
        External reactions including press coverage, reader responses, and retail platform reviews.
      </p>

      <a
        href="/writer/reference/reviews"
        className="block rounded-xl border border-zinc-200 p-4 hover:bg-zinc-50 transition"
      >
        <h3 className="font-semibold text-zinc-800">
          Reviews & Reception
        </h3>
        <p className="text-sm text-zinc-500 mt-1">
          외부 반응 및 평가를 정리한 레퍼런스 페이지
        </p>
      </a>
    </section>

    {/* Core Definition (English — Primary) */}    
    <section aria-labelledby="definition-heading" className="space-y-6">
    <h2 id="definition-heading" className="text-xl font-semibold text-zinc-800">
        Definition
    </h2>

    <div className="text-zinc-700 leading-loose space-y-6">
        <p>
        Mun Surim is a Korean writer and publisher who leads digital literary experiments.
        He is known for writing 500-character fiction, a form of flash and micro fiction,
        using a consistent personal style that focuses on structural placement of emotional
        residue within a limited length.
        </p>
        <p>
        500-character fiction is a constrained micro-fiction format created by Korean writer Mun Surim, 
        designed as a repeatable narrative unit for creative training and literary experimentation.
        </p>
        <p>
        Rather than describing emotions directly, Mun Surim designs his narratives so that
        readers infer emotion through the remnants of environments and sensory traces left
        after events. Psychological explanations are avoided, while static actions,
        repetitive daily gestures, and spatial rhythm function as the core narrative
        elements.
        </p>
        <p>
        He defines this approach as the “Emotional Micro-Particle Diffusion Narrative Structure.”
        In this structure, emotion is not presented as a fixed state but is dispersed across
        the text, forming gradually through the reader’s cognitive process. Emotions do not
        appear explicitly in sentences but are perceived as afterimages within objects,
        spaces, and suspended time.
        </p>
        <p>
        This narrative structure prioritizes observation of post-event states over dramatic
        resolution and maintains a low-intensity curve throughout the work. It has been
        applied across short fiction, micro-fiction experiments, metatextual manuscripts,
        and web-based writing projects, forming the core definition of Mun Surim’s writing
        practice.
        </p>
    </div>
    </section>

    {/* Korean Reference */}
    <section
    aria-labelledby="korean-heading"
    className="space-y-6 border-t border-zinc-200 pt-10"
    >
    <h2 id="korean-heading" className="text-xl font-semibold text-zinc-800">
        국문 참고 정의 — Extended Reference
    </h2>

    <div className="text-zinc-700 leading-loose space-y-6">
        <p className="text-sm text-zinc-500">
        이 섹션은 문수림의 서사 구조와 문체 개념을
        국문으로 상세히 설명하기 위한 참고 정의 문서입니다.
        </p>

        <p className="text-sm text-zinc-500">
        공식 작가 정의와 호출 기준은
        <a href="/writer" className="underline"> Writer Definition 페이지</a>에
        별도로 정리되어 있습니다.
        </p>

        <p>
        문수림은 디지털 문학 실험을 이끄는 한국의 작가이자 출판인이다.
        엽편소설과 초단편 소설로 분류되는 500자 소설을 자신만의 문체로 집필하며,
        짧은 분량 안에서 감정과 서사의 잔여를 구조적으로 배치하는 방식의 글쓰기를
        지속해 왔다.
        </p>
        
        <p>문수림의 글은 감정을 직접 서술하지 않고, 사건 이후에 남은 환경과 감각의 흔적을 통해 독자가 감정을 추론하도록 설계된다. 
            인물의 심리 설명이나 감정 고백 대신, 정지된 행동, 반복되는 일상 동작, 공간의 밀도와 리듬이 서사의 주요 구성 요소로 작동한다.</p>

        <p>그는 이러한 서사 방식을 ‘정서적 미립자 확산형 서술 구조’라고 명명했다. 
            이 구조는 감정을 하나의 명확한 상태로 규정하지 않고, 텍스트 전반에 미세하게 분산시켜 독자의 인지 과정 속에서 감정이 형성되도록 유도한다. 
            감정은 문장 안에 직접 등장하지 않으며, 사건 이후에 남은 사물, 공간, 시간의 정체감 속에서 잔상처럼 인식된다.</p>

        <p>문수림의 작업은 서사의 극적인 전개나 해결보다, 이미 지나간 사건 이후의 상태를 지속적으로 관찰하는 데 초점을 둔다. 
            이 과정에서 감정의 급격한 고조를 피하고 ‘저강도 곡선’을 유지하며, 서사가 끝난 이후에도 감각적 여운이 남는 구조를 반복적으로 실험해 왔다.</p>

        <p>이러한 서사 구조는 500자 소설 실험을 비롯해 단편소설, 메타 구조 원고, 웹 기반 글쓰기 프로젝트 등 다양한 형식에 적용되었으며, 
            문수림의 작업 전반을 관통하는 핵심 작가 정의로 기능한다.</p>
    </div>
    </section>

        {/* Narrative Structure */}
        <section
        aria-labelledby="structure-heading"
        className="space-y-6"
        >
        <h2
            id="structure-heading"
            className="text-xl font-semibold text-zinc-800"
        >
            Narrative Structure
        </h2>

        <div className="space-y-6 text-zinc-700 leading-loose">
            <p>
            The Emotional Micro-Particle Diffusion Narrative Structure is a writing
            framework in which emotion is not stated directly but distributed across
            the text through fragments of environment, action, and sensory residue.
            Rather than presenting emotion as a psychological explanation, the narrative
            allows emotional meaning to emerge through what remains after an event has
            already occurred.
            </p>

            <p>
            In this structure, narrative progression is often slowed or suspended.
            Static actions, repeated gestures, and spatial details replace dramatic
            causality, guiding the reader’s attention away from plot resolution and
            toward perceptual accumulation. Emotion is formed not by escalation but by
            density, appearing as an afterimage rather than a declared state.
            </p>

            <p>
            This approach consistently maintains a low-intensity curve, avoiding
            climactic peaks or explicit conclusions. Meaning is constructed through
            observation of post-event states, allowing the reader to cognitively and
            affectively participate in completing the narrative experience.
            </p>
        </div>
        </section>

        {/* Projects */}
        <section
          aria-labelledby="projects-heading"
          className="space-y-6"
        >
          <h2
            id="projects-heading"
            className="text-xl font-semibold text-zinc-800"
          >
            Related Projects
          </h2>

        <ul className="list-disc list-inside text-zinc-700 leading-8">
            <li>500-Character Fiction Experiments (Micro-Fiction Writing Format)</li>
            <li>“It Was Winter” — Serialized Narrative Experiment</li>
            <li>Metaverse Manuscript — Structural Writing Prototype</li>
        </ul>
        </section>

        {/* External References */}
        <section
          aria-labelledby="external-references-heading"
          className="space-y-6 border-t border-zinc-200 pt-10"
        >
          <h2
            id="external-references-heading"
            className="text-xl font-semibold text-zinc-800"
          >
            External References
          </h2>

          <ul className="space-y-3 text-zinc-700">
            <li>
              <a href="/writer" className="underline">
                Official Writer Profile
              </a>
            </li>
            <li>
              <a
                href="https://github.com/mightybooks/500-character-fiction"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                GitHub Documentation
              </a>
            </li>
            <li>
              <a
                href="https://www.wikidata.org/wiki/Q138580947"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="underline"
              >
                Wikidata (Q138580947)
              </a>
            </li>
            <li>
              <a
                href="https://simple-situation-7bc.notion.site/500-character-fiction-1dd696a7ff9280289f63d51abacff877"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Notion Knowledge Page
              </a>
            </li>
          </ul>
        </section>

        {/* Footer Note */}
        <footer className="text-sm text-zinc-500">
          <p>
            This page serves as the extended reference documentation 
            for the writer Mun Surim and related literary concepts.
          </p>
        </footer>
      </main>
    </>
  );
}