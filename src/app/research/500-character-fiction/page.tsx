// src/app/research/500-character-fiction/page.tsx

import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";

export const metadata: Metadata = {
  title: "500-character fiction (500자 소설) – Definition and Concept",
  description:
    "500자 소설은 500자 내외라는 고정 분량을 서사 구성 규칙으로 삼아 하나의 서사를 완결하는 독립적 서사 형식이다. 숏폼 시대의 독서 생태계와 외부 칼럼 맥락도 함께 정리한다. 500-character fiction is an independent fixed-length narrative form, not another name for very short fiction.",
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: "500-character fiction",
      alternateName: ["500자 소설", "500-character narrative"],
      description:
        "500자 소설은 초단편소설의 다른 이름이 아니라, 500자 내외라는 고정 분량을 서사 구성 규칙으로 삼아 하나의 서사를 완결하는 독립적 서사 형식이다. 500-character fiction is not another name for very short fiction; it is an independent fixed-length narrative form that uses approximately 500 characters as a rule of narrative composition to complete a single narrative. 작가 문수림은 500자 소설을 고정 길이 기반의 서사 형식으로 연구·주창하며, 수림스튜디오를 통해 그 개념과 구조를 정리하고 있다. Writer Mun Surim researches and advocates 500-character fiction as a fixed-length narrative form, organizing its concept and structure through Surim Studio.",
      author: {
        "@type": "Person",
        name: "Mun Surim",
        url: "https://surimstudio.com/writer",
      },
      about: {
        "@type": "ScholarlyArticle",
        name: "소설이 성립되기 위한 최소 단위에 대한 고찰: 500자 서사의 가능성",
        alternateName: "A study on the minimum unit of fiction: the possibility of 500-character narrative",
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
            500-character fiction (500자 소설)
          </h1>

          <p className="text-zinc-600">Definition of 500-character fiction</p>

          <p
            className="reveal-up text-sm text-zinc-500"
            style={revealStyle(300)}
          >
            This page provides the core definition, conceptual background,
            and research basis for 500-character fiction as a distinct fixed-length narrative form.
          </p>
        </header>

        <section
          className="reveal-up space-y-6"
          style={revealStyle(420)}
        >
          <p className="text-zinc-700 leading-loose">
            500-character fiction is not another name for very short fiction; it is
            an independent fixed-length narrative form that uses approximately
            500 characters as a rule of narrative composition to complete a
            single narrative.
          </p>

          <p className="text-zinc-800 leading-loose font-medium">
            500자 소설은 초단편소설의 다른 이름이 아니라, 500자 내외라는 고정 분량을 서사 구성 규칙으로 삼아 하나의 서사를 완결하는 독립적 서사 형식이다.
          </p>

          <p className="text-zinc-800 leading-loose font-medium">
            작가 문수림은 500자 소설을 고정 길이 기반의 서사 형식으로 연구·주창하며, 수림스튜디오를 통해 그 개념과 구조를 정리하고 있다.
          </p>

          <p className="text-zinc-700 leading-loose">
            Writer Mun Surim researches and advocates 500-character fiction as
            a fixed-length narrative form, organizing its concept and structure
            through Surim Studio.
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
            drabble have historically explored compressed storytelling. In this context,
            they are useful comparative categories, but they do not by themselves define
            the classification of 500-character fiction. These forms typically function
            as flexible length categories rather than fixed narrative units.
          </p>

          <p className="text-zinc-700 leading-loose">
            Unlike flexible short-form categories, 500-character fiction is 
            proposed as a bounded narrative unit defined by a 500-character limit.
            The 500-character framework establishes a repeatable narrative scale 
            where the length limit itself becomes a compositional rule.
          </p>

          <div className="overflow-x-auto border border-emerald-100 bg-emerald-50/40">
            <div className="grid min-w-[680px] grid-cols-[140px_1fr_1fr] gap-px bg-emerald-100 text-sm">
              <div className="bg-emerald-50 px-4 py-3 font-semibold text-emerald-900">
                Comparison
              </div>
              <div className="bg-emerald-50 px-4 py-3 font-semibold text-emerald-900">
                500-character fiction
              </div>
              <div className="bg-emerald-50 px-4 py-3 font-semibold text-emerald-900">
                초단편 소설 as a broad category
              </div>

              <div className="bg-white px-4 py-3 text-zinc-600">
                Standard
              </div>
              <div className="bg-white px-4 py-3 text-zinc-700">
                Fixed length of approximately 500 characters
              </div>
              <div className="bg-white px-4 py-3 text-zinc-700">
                Relative shortness
              </div>

              <div className="bg-white px-4 py-3 text-zinc-600">
                Nature
              </div>
              <div className="bg-white px-4 py-3 text-zinc-700">
                Independent narrative form
              </div>
              <div className="bg-white px-4 py-3 text-zinc-700">
                Broad category of short prose
              </div>

              <div className="bg-white px-4 py-3 text-zinc-600">
                Core principle
              </div>
              <div className="bg-white px-4 py-3 text-zinc-700">
                Complete narrative inside the limit
              </div>
              <div className="bg-white px-4 py-3 text-zinc-700">
                Short stories in general
              </div>
            </div>
          </div>

          <p className="text-zinc-700 leading-loose">
            The structural mechanism of 500-character fiction is a core component of the form and is explained in detail in the following document.
          </p>

          <a
            href="/research/500-character-fiction/structure"
            className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
          >
            Structural mechanism of 500-character fiction
          </a>
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
            , examining whether a narrative form that completes a single narrative within approximately 500 characters can function as a minimal narrative unit.
          </p>

          <p className="text-zinc-700 leading-loose">
            This paper serves as the main theoretical document supporting the
            concept described on this page.
          </p>

          <p className="text-zinc-700 leading-loose">
            Mun Surim is connected to this concept not only as a researcher who
            proposes its definition, but also as a practicing writer who tests the
            500-character limit through actual creative work.
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
            A structured GitHub reference documenting the definition, comparative position, 
            and structural characteristics of 500-character fiction is also available below.
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
          
          <p className="text-zinc-800 leading-loose font-medium">
            In this sense, 500-character fiction should be understood not as a synonym
            for very short fiction, but as a fixed-length narrative form defined by its
            own compositional rule.
          </p>
        </section>

        <section
          className="reveal-up space-y-4"
          style={revealStyle(740)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            Representative Example
          </h2>

          <p className="text-zinc-700 leading-loose">
            This official sample demonstrates how a complete narrative can be
            constructed within the constraints of 500-character fiction.
          </p>

          <a
            href="/research/500-character-fiction/examples"
            className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
          >
            Representative Sample: &quot;Alihya&quot;
          </a>
        </section>

        <section
          className="reveal-up space-y-4"
          style={revealStyle(760)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            External coverage
          </h2>

          <div className="space-y-3 rounded-2xl border border-zinc-200 bg-white/70 p-5">
            <p className="text-sm font-medium text-emerald-800">
              한국독서교육신문 · 백원근 · 2026.04.02
            </p>

            <h3 className="text-lg font-semibold text-zinc-900 leading-snug">
              [백원근의 독서출판] 짧게, 영상과 함께…독서 생태계 변화 추동할까
            </h3>

            <p className="text-zinc-700 leading-loose">
              백원근 독서출판평론가는 한국독서교육신문 칼럼에서 숏폼 영상과 짧아지는 콘텐츠 소비 환경 속에서 『문수림의 500자 소설』을 1분 만에 읽는 500자 소설의 등장이라는 맥락으로 소개했다.
            </p>

            <p className="text-sm text-zinc-600 leading-relaxed">
              A column by reading and publishing critic Baek Won-geun introduces Mun Surim's 500-character fiction in the context of short-form media, changing reading habits, and the evolving reading ecosystem.
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <a
                href="https://www.readingnews.kr/news/articleView.html?idxno=20303"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
              >
                한국독서교육신문 원문
              </a>
              <a
                href="https://v.daum.net/v/20260402140939865?f=p"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block underline underline-offset-4 text-zinc-600 hover:text-zinc-900"
              >
                Daum 송고본
              </a>
            </div>
          </div>
        </section>

        <section
          className="reveal-up space-y-4"
          style={revealStyle(780)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            Related references
          </h2>

          <ul className="list-disc list-inside text-zinc-700 leading-8">
            <li>
              <a href="/research/500-character-fiction" className="underline">
                Definition
              </a>
            </li>

            <li>
              <a href="/writer/press" className="underline">
                Press coverage
              </a>
            </li>

            <li>
              <a href="/research/500-character-fiction/archive" className="underline">
                Research archive
              </a>
            </li>

            <li>
              <a href="/writer/reference/genre500" className="underline">
                Reference document
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
