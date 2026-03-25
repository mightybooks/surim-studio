// src/app/research/500-character-fiction/archive/page.tsx

import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";

export const metadata: Metadata = {
  title: "Research Archive | 500-character fiction",
  description:
    "An archive documenting the development and recorded milestones of 500-character fiction.",
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "500-character fiction research archive",
      alternateName: "500자 소설 연구 아카이브",
      description:
        "An archive documenting the conceptual development, iterative accumulation, and research process of 500-character fiction by Mun Surim.",
      url: "https://surimstudio.com/research/500-character-fiction/archive",
      isPartOf: {
        "@type": "WebPage",
        name: "500-character fiction",
        url: "https://surimstudio.com/research/500-character-fiction",
      },
      author: {
        "@type": "Person",
        name: "Mun Surim",
        url: "https://surimstudio.com/writer",
      },
      publisher: {
        "@type": "Organization",
        name: "Surim Studio",
        url: "https://surimstudio.com",
      },
    }),
  },
};

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export default function Research500ArchivePage() {
  return (
    <>
      <ReadingProgress />

      <main className="max-w-3xl mx-auto p-8 space-y-12">
        <header className="space-y-3">
          <h1
            className="reveal-up text-3xl font-semibold text-emerald-900"
            style={revealStyle(180)}
          >
            Research Archive
          </h1>

          <p className="text-zinc-600">500-character fiction</p>

          <p
            className="reveal-up text-sm text-zinc-500"
            style={revealStyle(300)}
          >
            This page documents how the concept of 500-character fiction was
            accumulated, tested, and formalized over time.
          </p>
        </header>

        <section
          className="reveal-up space-y-6"
          style={revealStyle(420)}
        >
          <p className="text-zinc-700 leading-loose">
            This archive does not function as a promotional timeline. It is a
            process record of how a fixed-length narrative unit was repeatedly
            produced, examined, and reframed as a literary concept.
          </p>

          <p className="text-zinc-800 leading-loose font-medium">
            이 페이지는 500자 소설이 단순한 짧은 글 형식이 아니라,
            반복 생산과 축적을 통해 하나의 서사 단위로 정리되어 온 과정을
            기록하는 연구 아카이브다.
          </p>

          <p className="text-zinc-700 leading-loose">
            The emphasis is placed not on a single publication event, but on the
            continuity between writing practice, conceptual refinement, and
            theoretical articulation.
          </p>
        </section>

        <section
          className="reveal-up space-y-6"
          style={revealStyle(520)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            Archive structure
          </h2>

          <ul className="list-disc list-inside text-zinc-700 leading-8">
            <li>반복적 500자 집필 실험과 축적</li>
            <li>분량 제한을 서사 규칙으로 해석한 구조적 전환</li>
            <li>개념 정의 페이지 및 프로젝트 페이지와의 연결</li>
            <li>논문 작성과 이론화 과정</li>
          </ul>
        </section>

        <section
          className="reveal-up space-y-5"
          style={revealStyle(620)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            Development outline
          </h2>

          <div className="space-y-4 rounded-2xl border border-zinc-200 p-5">
            <h3 className="text-lg font-semibold text-zinc-900">
              1. Repeated production
            </h3>
            <p className="text-zinc-700 leading-loose">
              The 500-character unit began not as an isolated formal claim but
              as a repeatable writing practice. The form was tested through
              repeated production, accumulation, and public presentation.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-zinc-200 p-5">
            <h3 className="text-lg font-semibold text-zinc-900">
              2. Structural interpretation
            </h3>
            <p className="text-zinc-700 leading-loose">
              Over time, the fixed length ceased to function as a mere limit and
              was interpreted instead as a narrative rule. This marked the shift
              from short text to structured narrative unit.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-zinc-200 p-5">
            <h3 className="text-lg font-semibold text-zinc-900">
              3. Conceptual naming
            </h3>
            <p className="text-zinc-700 leading-loose">
              As the practice stabilized, the term “500-character fiction” was
              used not as a casual label but as a definitional concept tied to
              fixed scale, repetition, and narrative independence.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-zinc-200 p-5">
            <h3 className="text-lg font-semibold text-zinc-900">
              4. Theoretical formalization
            </h3>
            <p className="text-zinc-700 leading-loose">
              The concept was later formalized through the paper
              <span className="italic">
                {" "}
                “소설이 성립되기 위한 최소 단위에 대한 고찰: 500자 서사의 가능성”
              </span>
              , where the 500-character scale was examined as a possible minimum
              narrative unit.
            </p>
          </div>
        </section>

        <section
          className="reveal-up space-y-4"
          style={revealStyle(680)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            Selected records
          </h2>

          <ul className="space-y-3 text-zinc-700 leading-loose">
            <li>
              <strong>2026</strong> — Initial definition of 500-character fiction published as a conceptual page.
            </li>

            <li>
              <strong>2026</strong> — Repeated production of 500-character narratives accumulated as a body of work.
            </li>

            <li>
              <strong>2026</strong> — Structural interpretation established: length constraint reframed as a compositional rule.
            </li>

            <li>
              <strong>2026</strong> — Formal publication of the book 
              <span className="italic"> 500-character fiction</span>.
            </li>

            <li>
              <strong>2026</strong> — Theoretical paper published via Zenodo DOI.
            </li>

            <li>
              <strong>2026</strong> — Initial press coverage and external references began to accumulate.
            </li>
          </ul>
        </section>

        <section
          className="reveal-up space-y-4"
          style={revealStyle(720)}
          >
          <h2 className="text-xl font-semibold text-emerald-800">
            Linked research documents
          </h2>

          <ul className="list-disc list-inside text-zinc-700 leading-8">
            <li>
              <a href="/research/500-character-fiction" className="underline">
               Research definition of 500-character fiction
              </a>
            </li>
            <li>
              <a href="/writer/reference/genre500" className="underline">
              500자 소설 정의 페이지
              </a>
            </li>
            <li>
              <a
               href="https://doi.org/10.5281/zenodo.18960753"
               target="_blank"
               rel="noopener noreferrer"
               className="underline"
               >
               View paper (Zenodo DOI)
              </a>
            </li>
           </ul>
          </section>

          <section
            className="reveal-up space-y-4"
            style={revealStyle(780)}
          >
            <h2 className="text-xl font-semibold text-emerald-800">
              Related project
            </h2>

            <p className="text-zinc-700 leading-loose">
              The broader public-facing project built around this research can be viewed
              on the 500 Fiction project page.
            </p>

            <a href="/projects/500_fiction" className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600">
              View the 500 Fiction Project
            </a>
          </section>

        <section
          className="reveal-up space-y-4 pt-6 border-t border-zinc-200"
          style={revealStyle(820)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            Note
          </h2>

          <p className="text-zinc-700 leading-loose">
            This archive will continue to expand as additional records,
            documents, and process notes are organized. Its purpose is to make
            the research trajectory of 500-character fiction legible as a
            continuous body of work rather than as a single isolated claim.
          </p>
        </section>
      </main>
    </>
  );
}