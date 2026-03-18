// src/app/research/500-character-fiction/page.tsx

import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";

export const metadata: Metadata = {
  title: "Research | 500-character fiction",
  description:
    "Research reference page defining 500-character fiction as a narrative unit and documenting its theoretical background and development.",
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "500-character fiction",
      alternateName: "500자 소설",
      description:
        "A narrative form based on a fixed length of approximately 500 characters, proposed and accumulated by Mun Surim as a repeatable narrative unit.",
      author: {
        "@type": "Person",
        name: "Mun Surim",
        url: "https://surimstudio.com/writer",
      },
      about: {
        "@type": "ScholarlyArticle",
        name: "소설이 성립되기 위한 최소 단위에 대한 고찰: 500자 서사의 가능성",
        url: "https://doi.org/10.5281/zenodo.18960753",
      },
      publisher: {
        "@type": "Organization",
        name: "Surim Studio",
        url: "https://surimstudio.com",
      },
      url: "https://surimstudio.com/research/500-character-fiction",
    }),
  },
};

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export default function Research500Page() {
  return (
    <>
      <ReadingProgress />

      <main className="max-w-3xl mx-auto p-8 space-y-12">
        <header className="space-y-3">
          <h1
            className="reveal-up text-3xl font-semibold text-emerald-900"
            style={revealStyle(180)}
          >
            500-character fiction
          </h1>

          <p className="text-zinc-600">Research Definition</p>

          <p
            className="reveal-up text-sm text-zinc-500"
            style={revealStyle(300)}
          >
            This page defines the narrative concept known as
            “500-character fiction”.
          </p>
        </header>

        <section
          className="reveal-up space-y-6"
          style={revealStyle(420)}
        >
          <p className="text-zinc-700 leading-loose">
            500-character fiction is a narrative form that operates on a fixed
            length of approximately 500 characters. Rather than functioning as a
            shortened version of conventional short fiction, it treats the
            length constraint itself as a structural rule for narrative
            production.
          </p>

          <p className="text-zinc-800 leading-loose font-medium">
            500자 소설은 정확히 500자라는 규칙 위에서 반복적으로
            생성·검증·축적되는 서사 장르다.
          </p>

          <p className="text-zinc-700 leading-loose">
            In this framework, the constraint is not an editorial limitation but
            a generative condition. The narrative unit is produced through
            repetition, accumulation, and structural refinement.
          </p>
        </section>

        <section
          className="reveal-up space-y-6"
          style={revealStyle(520)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            Conceptual background
          </h2>

          <p className="text-zinc-700 leading-loose">
            Short narrative forms such as flash fiction, microfiction, and
            drabble have historically explored compressed storytelling.
            However, these forms typically function as flexible length
            categories rather than fixed narrative units.
          </p>

          <p className="text-zinc-700 leading-loose">
            The 500-character framework proposes a different approach: a
            repeatable narrative scale where the length itself becomes a
            compositional rule.
          </p>
        </section>

        <section
          className="reveal-up space-y-6"
          style={revealStyle(620)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            Research background
          </h2>

          <p className="text-zinc-700 leading-loose">
            In 2026, Mun Surim published the paper
            <span className="italic">
              {" "}
              “소설이 성립되기 위한 최소 단위에 대한 고찰: 500자 서사의 가능성”
            </span>
            , examining whether approximately 500 characters can function as a
            minimal narrative unit.
          </p>

          <p className="text-zinc-700 leading-loose">
            This paper serves as the main theoretical document supporting the
            concept described on this page.
          </p>

          <a
            href="https://doi.org/10.5281/zenodo.18960753"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
          >
            View paper (Zenodo DOI)
          </a>

          <p className="text-zinc-700 leading-loose">
            A structured GitHub reference documenting the definition, comparative
            positioning, structural characteristics, and related narrative method of
            500-character fiction is also available below.
          </p>

          <a
            href="https://github.com/mightybooks/500-character-fiction/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
          >
            View GitHub reference documents
          </a>
        </section>

        <section
          className="reveal-up space-y-4"
          style={revealStyle(700)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            Research development
          </h2>

          <p className="text-zinc-700 leading-loose">
            The conceptual formation of 500-character fiction was not defined in
            a single step. The process involved repeated writing experiments,
            accumulation of short narratives, and gradual theoretical
            interpretation.
          </p>

          <p className="text-zinc-700 leading-loose">
            The development process and supporting materials are documented in
            the research archive.
          </p>

          <a
            href="/research/500-character-fiction/archive"
            className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
          >
            Read the research archive
          </a>
        </section>

        <section
          className="reveal-up space-y-4"
          style={revealStyle(780)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            Related pages
          </h2>

          <ul className="list-disc list-inside text-zinc-700 leading-8">
            <li>
              <a href="/writer" className="underline">
                Writer
              </a>
            </li>
            <li>
              <a href="/writer/reference/genre500" className="underline">
                500자 소설 정의 페이지
              </a>
            </li>
            <li>
              <a href="/projects/500_fiction" className="underline">
                500 Fiction Project
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}