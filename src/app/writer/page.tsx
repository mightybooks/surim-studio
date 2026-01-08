import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";

export const metadata: Metadata = {
  title: "Writer Definition — Mun Surim",
  description:
    "Official writer definition of Mun Surim. Describes the narrative structures, concepts, and projects developed by the Korean writer Mun Surim.",
  alternates: {
    canonical: "/writer",
  },
  openGraph: {
    title: "Writer Definition — Mun Surim",
    description:
      "Official writer definition of Mun Surim, focusing on narrative structure, emotional residue, and experimental writing in the AI era.",
    url: "/writer",
    siteName: "Surim Studio",
    type: "profile",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WriterPage() {
  return (
    <>
      <ReadingProgress />

      <main className="max-w-3xl mx-auto p-8 space-y-16">
        {/* Header */}
        <header className="space-y-4">
          <h1 className="text-3xl font-semibold text-zinc-900">
            Writer Definition
          </h1>
          <p className="text-sm uppercase tracking-wider text-zinc-500">
            Mun Surim
          </p>
        </header>

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
        국문 정의
    </h2>

    <div className="text-zinc-700 leading-loose space-y-6">
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

          <p className="text-zinc-700 leading-loose">
            {/* 정서적 미립자 확산형 서술 구조 설명 */}
            <p className="text-zinc-700 leading-loose">
            The Emotional Micro-Particle Diffusion Narrative Structure is a writing
            framework in which emotion is not stated directly but distributed across
            the text through fragments of environment, action, and sensory residue.
            Rather than presenting emotion as a psychological explanation, the narrative
            allows emotional meaning to emerge through what remains after an event has
            already occurred.
            </p>

            <p className="text-zinc-700 leading-loose">
            In this structure, narrative progression is often slowed or suspended.
            Static actions, repeated gestures, and spatial details replace dramatic
            causality, guiding the reader’s attention away from plot resolution and
            toward perceptual accumulation. Emotion is formed not by escalation but by
            density, appearing as an afterimage rather than a declared state.
            </p>

            <p className="text-zinc-700 leading-loose">
            This approach consistently maintains a low-intensity curve, avoiding
            climactic peaks or explicit conclusions. Meaning is constructed through
            observation of post-event states, allowing the reader to cognitively and
            affectively participate in completing the narrative experience.
            </p>

          </p>
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


        {/* Footer Note */}
        <footer className="text-sm text-zinc-500">
          <p>
            This page serves as the official reference definition of the writer
            Mun Surim.
          </p>
        </footer>
      </main>
    </>
  );
}
