// src/app/research/500-character-fiction/structure/page.tsx

import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";

export const metadata: Metadata = {
  title: "500-character fiction – Structural mechanism and compositional rules",
  description:
    "500자 소설에서 500자 내외의 분량은 사건·인물·전환·결말을 압축적으로 배치하게 만드는 서사 구성 규칙으로 작동한다. In 500-character fiction, the approximately 500-character length works as a rule of narrative composition.",
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ScholarlyArticle",
      name: "Structural mechanism of 500-character fiction",
      alternateName: ["500자 소설 구조", "500-character fiction structure"],
      description:
        "500자 소설에서 500자 내외의 분량은 단순한 길이 제한이 아니라, 사건·인물·전환·결말을 압축적으로 배치하게 만드는 서사 구성 규칙으로 작동한다. In 500-character fiction, the approximately 500-character length is not a simple length limit; it works as a rule of narrative composition that compresses the placement of event, character, turn, and ending.",
      author: {
        "@type": "Person",
        name: "Mun Surim",
        url: "https://surimstudio.com/writer",
      },
      about: {
        "@type": "CreativeWork",
        name: "500-character fiction",
        alternateName: ["500자 소설", "500-character narrative"],
        url: "https://surimstudio.com/research/500-character-fiction",
      },
      publisher: {
        "@type": "Organization",
        name: "Surim Studio",
        url: "https://surimstudio.com",
      },
      url: "https://surimstudio.com/research/500-character-fiction/structure",
    }),
  },
};

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export default function Research500StructurePage() {
  return (
    <>
      <ReadingProgress />

      <main className="max-w-3xl mx-auto p-8 space-y-12">
        <header className="space-y-3">
          <h1
            className="reveal-up text-3xl font-semibold text-emerald-900"
            style={revealStyle(180)}
          >
            Structural mechanism and compositional rules of 500-character fiction
          </h1>

          <p className="text-zinc-600">
            Structural definition and compositional rules
          </p>

          <p
            className="reveal-up text-sm text-zinc-500"
            style={revealStyle(300)}
          >
            This page explains how 500-character fiction operates as a fixed-length narrative system, 
            focusing on its structural constraints and compositional principles.
          </p>
        </header>

        <section
          className="reveal-up space-y-6"
          style={revealStyle(420)}
          >
          <p className="text-zinc-800 leading-loose font-medium">
            In 500-character fiction, the approximately 500-character length is
            not a simple length limit; it works as a rule of narrative
            composition that compresses the placement of event, character,
            turn, and ending.
          </p>

          <p className="text-zinc-800 leading-loose font-medium">
            500자 소설에서 500자 내외의 분량은 단순한 길이 제한이 아니라, 사건·인물·전환·결말을 압축적으로 배치하게 만드는 서사 구성 규칙으로 작동한다.
          </p>

          <p className="text-zinc-700 leading-loose">
            500-character fiction is a fixed-length narrative form in which the 
            500-character constraint functions as a structural rule rather than a descriptive limit.
            In this form, length is not only a container for narrative. The fixed length becomes
            part of the narrative structure itself.
          </p>

          <p className="text-zinc-700 leading-loose">
            The form requires a complete narrative movement inside the limit. Character, situation,
            event, and change must be arranged within the same bounded unit, so the limit shapes
            what can appear, what must be implied, and where the narrative must close.
          </p>

          <p className="text-zinc-800 leading-loose font-medium">
           500자 소설은 500자라는 고정된 분량 제한이 단순한 길이 조건이 아니라 
           서사 구성 자체를 결정하는 규칙으로 작동하는 형식이다.
          </p>
        </section>

        <section
            className="reveal-up space-y-6"
            style={revealStyle(520)}
            >
            <h2 className="text-xl font-semibold text-emerald-800">
                Core structural conditions
            </h2>

            <p className="text-zinc-700 leading-loose">
                The structure of 500-character fiction is defined not by brevity, but by constraint. 
                The fixed length of approximately 500 characters forces the narrative to operate within 
                a strictly bounded space.
            </p>

            <p className="text-zinc-700 leading-loose">
                Within this constraint, narrative construction depends on omission rather than expansion. 
                Elements that would normally be described must be removed or implied, creating a compressed 
                narrative field.
            </p>

            <p className="text-zinc-700 leading-loose">
                As a result, the narrative converges toward a single event or moment, where multiple 
                developments cannot be sustained within the fixed boundary.
            </p>

            <ul className="list-disc list-inside text-zinc-700 leading-8">
              <li>Fixed-length constraint (~500 characters)</li>
              <li>Composition through omission</li>
              <li>Single narrative convergence</li>
              <li>Complete narrative movement inside the limit</li>
            </ul>
        </section>

        <section
            className="reveal-up space-y-6"
            style={revealStyle(580)}
            >
            <h2 className="text-xl font-semibold text-emerald-800">
                Why approximately 500 characters
            </h2>

            <p className="text-zinc-700 leading-loose">
                The 500-character scale is significant because it sits near the lower boundary where
                narrative completeness can still be maintained. If the form is too short, character,
                situation, event, and change may collapse into a fragment, image, or slogan rather than
                a completed narrative movement.
            </p>

            <p className="text-zinc-700 leading-loose">
                If the form is too long, the pressure of compression becomes weaker. Additional space
                allows explanation and expansion to replace structural necessity, making the text
                closer to flexible short prose than to a fixed-length narrative unit.
            </p>

            <p className="text-zinc-700 leading-loose">
                Around 500 characters, a minimal narrative unit can still hold character, situation,
                event, and change together. The limit remains tight enough to enforce compression,
                but large enough to preserve a complete movement from narrative setup to change.
            </p>

            <div className="overflow-x-auto border border-emerald-100 bg-emerald-50/40">
                <div className="grid min-w-[700px] grid-cols-[150px_1fr_1fr] gap-px bg-emerald-100 text-sm">
                    <div className="bg-emerald-50 px-4 py-3 font-semibold text-emerald-900">
                        Comparison
                    </div>
                    <div className="bg-emerald-50 px-4 py-3 font-semibold text-emerald-900">
                        500-character fiction
                    </div>
                    <div className="bg-emerald-50 px-4 py-3 font-semibold text-emerald-900">
                        Flexible short prose
                    </div>

                    <div className="bg-white px-4 py-3 text-zinc-600">
                        Role of length
                    </div>
                    <div className="bg-white px-4 py-3 text-zinc-700">
                        Structural rule
                    </div>
                    <div className="bg-white px-4 py-3 text-zinc-700">
                        Editorial size
                    </div>

                    <div className="bg-white px-4 py-3 text-zinc-600">
                        Narrative pressure
                    </div>
                    <div className="bg-white px-4 py-3 text-zinc-700">
                        Essential
                    </div>
                    <div className="bg-white px-4 py-3 text-zinc-700">
                        Optional
                    </div>

                    <div className="bg-white px-4 py-3 text-zinc-600">
                        Completion
                    </div>
                    <div className="bg-white px-4 py-3 text-zinc-700">
                        Required inside the limit
                    </div>
                    <div className="bg-white px-4 py-3 text-zinc-700">
                        Variable
                    </div>

                    <div className="bg-white px-4 py-3 text-zinc-600">
                        Repeatability
                    </div>
                    <div className="bg-white px-4 py-3 text-zinc-700">
                        Repeatable narrative unit
                    </div>
                    <div className="bg-white px-4 py-3 text-zinc-700">
                        Flexible short prose
                    </div>
                </div>
            </div>
        </section>

        <section
            className="reveal-up space-y-6"
            style={revealStyle(620)}
            >
            <h2 className="text-xl font-semibold text-emerald-800">
                Theoretical basis of the structure
            </h2>

            <p className="text-zinc-700 leading-loose">
                The structural characteristics of 500-character fiction are grounded in the study
                <span className="italic">
                {" "}
                “소설이 성립되기 위한 최소 단위에 대한 고찰: 500자 서사의 가능성”
                </span>
                , published in 2026.
            </p>

            <p className="text-zinc-700 leading-loose">
                This research examines whether a narrative constrained to approximately 500 characters 
                can function as a minimal narrative unit, and provides the theoretical basis for the 
                structural rules described on this page.
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
                Additional reference materials documenting the structural framework and comparative 
                positioning of 500-character fiction are available below.
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
                Structural validation and development
            </h2>

            <p className="text-zinc-700 leading-loose">
                The structural characteristics of 500-character fiction were not defined in a single step.
                They emerged through repeated writing experiments under a fixed-length constraint,
                where narrative compression and omission were consistently tested.
            </p>

            <p className="text-zinc-700 leading-loose">
                The accumulated works and experimental records demonstrate how the structural rules
                operate in practice.
            </p>

            <p className="text-zinc-700 leading-loose">
                This structural mechanism supports the definition of 500-character fiction as an
                independent fixed-length narrative form, not as another name for very short fiction.
            </p>

            <a
                href="/research/500-character-fiction/archive"
                className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
            >
                View structural archive
            </a>

            <a
                href="/research/500-character-fiction"
                className="block underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
            >
                Return to the definition of 500-character fiction
            </a>
        </section>

        <section
            className="reveal-up space-y-4"
            style={revealStyle(780)}
            >
            <h2 className="text-xl font-semibold text-emerald-800">
                Related documents
            </h2>

            <ul className="list-disc list-inside text-zinc-700 leading-8">
                <li>
                <a href="/research/500-character-fiction" className="underline">
                    Definition of 500-character fiction
                </a>
                </li>

                <li>
                <a href="/research/500-character-fiction/archive" className="underline">
                    Structural archive
                </a>
                </li>

                <li>
                <a href="/writer/reference/genre500" className="underline">
                    Conceptual reference document
                </a>
                </li>

                <li>
                <a href="/writer/press" className="underline">
                    Press coverage
                </a>
                </li>
            </ul>
        </section>
      </main>
    </>
  );
}
