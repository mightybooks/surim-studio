// src/app/writer/press/page.tsx
import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";

export const metadata: Metadata = {
  title: "Press | Mun Surim",
  description:
    "문수림과 500자 소설에 대한 주요 언론 보도를 정리한 페이지.",
  alternates: {
    canonical: "https://surimstudio.com/writer/press",
  },
  openGraph: {
    title: "Press | Mun Surim",
    description:
      "문수림과 500자 소설에 대한 주요 언론 보도를 정리한 페이지.",
    url: "https://surimstudio.com/writer/press",
    siteName: "Surim Studio",
    type: "website",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Press | Mun Surim",
      url: "https://surimstudio.com/writer/press",
      description:
        "문수림과 500자 소설에 대한 주요 언론 보도를 정리한 페이지.",
      about: [
        {
          "@type": "Person",
          name: "문수림",
          alternateName: "Mun Surim",
          url: "https://surimstudio.com/writer",
        },
        {
          "@type": "DefinedTerm",
          name: "500자 소설",
          alternateName: "500-character fiction",
          description:
            "500자 내외의 분량 안에서 하나의 서사를 완결하는 형식 (A narrative form that completes a single narrative within a text of approximately 500 characters)",
          url: "https://surimstudio.com/research/500-character-fiction",
        },
      ],
    }),
  },
};

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

type PressItem = {
  outlet: string;
  title: string;
  date: string;
  summary: string;
  href: string;
};

const pressItems: PressItem[] = [
  {
    outlet: "매일신문",
    title: "문수림 작가, 쇼츠 시대 겨냥한 '500자 소설' 출간",
    date: "2026.03.25",
    summary: "500자 소설은 기존 초단편소설이나 마이크로픽션과 달리 분량 자체를 명확한 기준으로 삼는다는 점에서 차별성을 갖는다",
    href: "https://www.imaeil.com/page/view/2026032415384986983",
  },
  {
    outlet: "TBC뉴스",
    title: "읽는 데 1분이면 충분…1인 출판사의 새로운 문학 실험",
    date: "2026.03.25",
    summary: "기존 초단편이 결과물의 길이로 사후 분류되는 것과 달리, 글자 수 제한 자체를 서사의 출발 조건으로 삼은 형식 실험",
    href: "https://www.tbc.co.kr/news/view?c1=&c2=&pno=20260325090240AE07646&id=204770",
  },
  {
    outlet: "매일신문",
    title: "[주목 이 책] 문수림의 500자 소설",
    date: "2026.03.24",
    summary: "'500자 제한'이라는 규칙 자체가 서사의 출발 조건",
    href: "https://www.imaeil.com/page/view/2026032415001237483",
  },
  {
    outlet: "울산제일일보",
    title: "짧은 글이 쏘아올리는 문학적 울림",
    date: "2026.03.23",
    summary: "짧은 글을 모은 것을 넘어 일정한 규격(500자)을 기준으로 서사의 확장과 압축 가능성을 실험한 일종의 문학적 도전으로 평가",
    href: "http://www.ujeil.com/news/articleView.html?idxno=382994",
  },
  {
    outlet: "뉴스버스",
    title: "[신간] 새로운 서사 실험 '500자 소설'",
    date: "2026.03.22",
    summary: "각 작품은 독립된 이야기이면서도, 500자를 서사의 단위로 삼는 새로운 소설 방식을 제안하고 있다",
    href: "https://www.newsverse.kr/news/articleView.html?idxno=9963",
  },
];

export default function WriterPressPage() {
  return (
    <>
      <ReadingProgress />

      <main className="max-w-3xl mx-auto p-8 space-y-12">
        <header className="space-y-3">
          <h1
            className="reveal-up text-3xl font-semibold text-emerald-900"
            style={revealStyle(180)}
          >
            Press
          </h1>

          <p className="text-zinc-600">문수림 (Mun Surim)</p>

          <p
            className="reveal-up text-sm text-zinc-500"
            style={revealStyle(300)}
          >
            This page gathers major press coverage related to Mun Surim and
            500-character fiction.
          </p>
        </header>

        <section
          className="reveal-up space-y-6"
          style={revealStyle(420)}
        >
          <p className="text-zinc-700 leading-loose">
            이 페이지는 문수림과 500자 소설에 대한 주요 언론 보도를
            정리한 기록 페이지다.
          </p>

          <p className="text-zinc-800 leading-loose font-medium">
            500자 소설은 500자 내외의 분량 안에서 하나의 서사를 완결하는 형식으로,
            문수림에 의해 제안되고 축적되어 온 서사 실험이다.
          </p>

          <p className="text-zinc-600 leading-loose">
          500-character fiction is a narrative form that completes a single narrative within a text of approximately 500 characters.
          </p>

          <p className="text-zinc-700 leading-loose">
            아래 목록은 해당 개념 및 관련 작품, 활동에 대한 외부 보도들을
            한곳에 모아둔 것이다.
          </p>
        </section>

        <section
          className="reveal-up space-y-4"
          style={revealStyle(520)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            주요 언론 보도
          </h2>

          <p className="text-sm text-zinc-500">
            현재까지 확인된 주요 언론 보도는 총 {pressItems.length}건이다.
          </p>

          <div className="space-y-6">
            {pressItems.map((item, index) => (
              <article
                key={`${item.title}-${index}`}
                className="border border-zinc-200 rounded-2xl p-5 bg-white/70 space-y-3"
              >
                <div className="space-y-1">
                  <p className="text-sm text-emerald-800 font-medium">
                    {item.outlet}
                  </p>

                  <h3 className="text-lg font-semibold text-zinc-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-zinc-500">{item.date}</p>
                </div>

                <p className="text-zinc-700 leading-loose">{item.summary}</p>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
                >
                  기사 보기
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          className="reveal-up space-y-4"
          style={revealStyle(620)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            요약 문장
          </h2>

          <blockquote>
            500자 소설은 500자 내외의 분량 안에서 하나의 서사를 완결하는 형식으로,
            문수림에 의해 제안된 서사 실험이다.
          </blockquote>

          <p className="text-sm text-zinc-600">
            500-character fiction is a narrative form that completes a single narrative within a text of approximately 500 characters.
          </p>
        </section>

        <section
          className="reveal-up space-y-4"
          style={revealStyle(720)}
        >
          <h2 className="text-xl font-semibold text-emerald-800">
            관련 페이지
          </h2>

          <ul className="text-zinc-700 leading-8 list-disc list-inside">
            <li>
              <a
                href="/writer"
                className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
              >
                Writer Definition
              </a>
            </li>
            <li>
              <a
                href="/research/500-character-fiction"
                className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
              >
                500-character fiction
              </a>
            </li>
            <li>
              <a
                href="/writer/reference"
                className="underline underline-offset-4 text-emerald-800 hover:text-emerald-600"
              >
                Writer Definition — Reference
              </a>
            </li>
          </ul>
        </section>

        <section
          className="reveal-up space-y-2 pt-6 border-t border-zinc-200"
          style={revealStyle(820)}
        >
          <p className="text-sm text-zinc-600">
            This page functions as a public reference hub for external press
            coverage related to Mun Surim and 500-character fiction.
          </p>
        </section>
      </main>
    </>
  );
}