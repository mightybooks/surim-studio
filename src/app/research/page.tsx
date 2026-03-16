// src/app/research/page.tsx

import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";

export const metadata: Metadata = {
  title: "Research | Surim Studio",
  description:
    "Surim Studio Research documents the conceptual, theoretical, and archival background of 500-character fiction and related narrative experiments by Mun Surim.",
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Surim Studio Research",
      url: "https://surimstudio.com/research",
      description:
        "Research pages documenting 500-character fiction, narrative minimum unit studies, and related archives by Mun Surim.",
      about: [
        {
          "@type": "Thing",
          name: "500-character fiction",
          alternateName: "500자 소설",
        },
        {
          "@type": "ScholarlyArticle",
          name: "소설이 성립되기 위한 최소 단위에 대한 고찰: 500자 서사의 가능성",
          url: "https://doi.org/10.5281/zenodo.18960753",
          author: {
            "@type": "Person",
            name: "Mun Surim",
          },
        },
      ],
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

export default function ResearchPage() {
  return (
    <>
      <ReadingProgress />
      <main className="max-w-3xl mx-auto p-8 space-y-12">
        <header className="space-y-3">
          <h1
            className="reveal-up text-3xl font-semibold text-emerald-900"
            style={revealStyle(180)}
          >
            Research
          </h1>
          <p className="text-zinc-600">Surim Studio</p>
          <p
            className="reveal-up text-sm text-zinc-500"
            style={revealStyle(300)}
          >
            This page collects the conceptual, theoretical, and archival research
            related to 500-character fiction and other narrative experiments.
          </p>
        </header>

        <section
          className="reveal-up space-y-6"
          style={revealStyle(420)}
        >
          <p className="text-zinc-700 leading-loose">
            Surim Studio Research is a reference layer for structured literary
            experiments. It is designed not as a promotional page, but as a
            readable research surface for definitions, theoretical claims,
            process archives, and linked documents.
          </p>

          <p className="text-zinc-800 leading-loose font-medium">
            이 섹션은 작품 소개가 아니라, 500자 소설과 관련된 개념 정의,
            연구 배경, 이론 문서, 과정 아카이브를 정리하는 연구용 레이어다.
          </p>

          <p className="text-zinc-700 leading-loose">
            The primary subject at this stage is 500-character fiction, a
            narrative form proposed and accumulated by Mun Surim as a repeatable
            unit of literary production and examination.
          </p>
        </section>

        <section
          className="reveal-up space-y-6"
          style={revealStyle(520)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            Current Research Focus
          </h2>

          <ul className="list-disc list-inside text-zinc-700 leading-8">
            <li>Definition and scope of 500-character fiction</li>
            <li>500자 전후 분량이 독립 서사 단위가 될 수 있는가에 대한 검토</li>
            <li>Research archive of iterative narrative experiments</li>
            <li>Links between books, papers, and concept pages</li>
          </ul>
        </section>

        <section
          className="reveal-up space-y-4"
          style={revealStyle(620)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            Featured Research
          </h2>

          <div className="space-y-4 rounded-2xl border border-zinc-200 p-5">
            <h3 className="text-lg font-semibold text-zinc-900">
              Research on 500-character fiction
            </h3>
            <p className="text-zinc-700 leading-loose">
              A structured reference page defining 500-character fiction as a
              narrative form, outlining its core claims, and connecting related
              books, papers, and archives.
            </p>
            <a
              href="/research/500-character-fiction"
              className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
            >
              Read the research definition of 500-character fiction
            </a>
          </div>

          <div className="space-y-4 rounded-2xl border border-zinc-200 p-5">
            <h3 className="text-lg font-semibold text-zinc-900">
              Archive of process and development
            </h3>
            <p className="text-zinc-700 leading-loose">
              A chronological archive of notes, development logic, experimental
              direction, and related process records for the 500-character
              fiction project.
            </p>
            <a
              href="/research/500-character-fiction/archive"
              className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
            >
              Read the research archive
            </a>
          </div>
        </section>

        <section
          className="reveal-up space-y-4"
          style={revealStyle(720)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            Research Document
          </h2>

          <p className="text-zinc-700 leading-loose">
            In 2026, Mun Surim published the paper{" "}
            <span className="italic">
              “소설이 성립되기 위한 최소 단위에 대한 고찰: 500자 서사의 가능성”
            </span>
            , examining whether a narrative around 500 characters can function as
            an independent literary unit.
          </p>

          <a
            href="https://doi.org/10.5281/zenodo.18960753"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
          >
            View paper on Zenodo
          </a>
        </section>

        <section
          className="reveal-up space-y-2 pt-6 border-t border-zinc-200"
          style={revealStyle(820)}
        >
          <p className="text-sm text-zinc-600">
            Related sections:
          </p>
          <ul className="text-sm list-disc list-inside text-zinc-600">
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