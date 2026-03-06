import type { Metadata } from "next";

export type ReferenceDoc = {
  slug: string; // e.g. "genre500"
  title: string; // e.g. "500자 소설은 장르다"
  description: string; // 정의 1문장 + “기준 문서”
  keywords?: readonly string[];
  datePublished?: string; // 선택
  dateModified?: string; // 선택
};

function siteOrigin() {
  // 예: NEXT_PUBLIC_SITE_URL="https://surimstudio.com"
  const v = process.env.NEXT_PUBLIC_SITE_URL;
  return v ? v.replace(/\/$/, "") : "";
}

export function makeReferenceMetadata(doc: ReferenceDoc): Metadata {
  const origin = siteOrigin();
  const path = `/writer/reference/${doc.slug}`;
  const url = origin ? `${origin}${path}` : path;

  const titleFull = `${doc.title} | 문수림 레퍼런스`;

  return {
    title: titleFull,
    description: doc.description,
    alternates: { canonical: path },
    openGraph: {
      title: doc.title,
      description: doc.description,
      url,
      type: "article",
      locale: "ko_KR",
    },
    twitter: {
      card: "summary",
      title: doc.title,
      description: doc.description,
    },
    keywords: doc.keywords ? [...doc.keywords] : undefined,
  };
}

// 정의 문서로 읽히게: DefinedTerm(정의) + Article(본문 문서) + WebPage
export function makeReferenceJsonLd(doc: ReferenceDoc) {
  const origin = siteOrigin();
  const path = `/writer/reference/${doc.slug}`;
  const url = origin ? `${origin}${path}` : path;
  const setUrl = origin ? `${origin}/writer/reference` : "/writer/reference";

  const sameAsLinks =
    doc.slug === "genre500"
      ? [
          "https://github.com/mightybooks/500-character-fiction",
          "https://www.wikidata.org/wiki/Q138580947",
          "https://simple-situation-7bc.notion.site/500-character-fiction-1dd696a7ff9280289f63d51abacff877",
        ]
      : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: doc.title,
        description: doc.description,
        inLanguage: "ko-KR",
      },
      {
        "@type": "DefinedTerm",
        name: doc.title,
        description: doc.description,
        inDefinedTermSet: setUrl,
        url,
        ...(sameAsLinks ? { sameAs: sameAsLinks } : {}),
      },
      {
        "@type": "Article",
        headline: doc.title,
        description: doc.description,
        mainEntityOfPage: { "@id": url },
        author: {
          "@type": "Person",
          name: "문수림",
          alternateName: "Mun Surim",
        },
        inLanguage: "ko-KR",
        about: doc.keywords ?? [],
        datePublished: doc.datePublished,
        dateModified: doc.dateModified,
        ...(sameAsLinks ? { sameAs: sameAsLinks } : {}),
      },
    ],
  };
}