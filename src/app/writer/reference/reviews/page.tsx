import Link from "next/link";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Reviews and Reception",
  "url": "https://surimstudio.com/writer/reference/reviews",
  "hasPart": [
    {
      "@type": "CollectionPage",
      "name": "Reader Reviews",
      "url": "https://surimstudio.com/writer/reference/reviews/readers"
    },
    {
      "@type": "CollectionPage",
      "name": "Retail Reviews",
      "url": "https://surimstudio.com/writer/reference/reviews/retail"
    }
  ],
  "mentions": {
    "@type": "CollectionPage",
    "name": "Press Coverage",
    "url": "https://surimstudio.com/writer/press"
  }
};

const sections = [
  {
    title: "Press Coverage",
    description: "언론 보도를 통해 형성된 외부 검증 레이어입니다.",
    href: "/writer/press",
    cta: "언론 기사 보기"
  },
  {
    title: "Reader Reviews",
    description: "독자들이 남긴 후기와 외부 서술을 수집한 페이지입니다.",
    href: "/writer/reference/reviews/readers",
    cta: "독자 후기 보기"
  },
  {
    title: "Retail Reviews",
    description: "주요 서점 및 플랫폼에서 확인 가능한 반응과 평가입니다.",
    href: "/writer/reference/reviews/retail",
    cta: "서점 리뷰 보기"
  }
];

export default function ReviewsHub() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-4xl mx-auto px-4 py-10">
        <header className="reveal-up" style={{ animationDelay: "0ms" }}>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">
            Reviews & Reception
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-zinc-600">
            이 페이지는 500자 소설 및 관련 저작에 대한 외부 반응을 수집한
            레퍼런스입니다.
          </p>
        </header>

        <section
          className="reveal-up mt-8 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-6"
          style={{ animationDelay: "100ms" }}
        >
          <h2 className="text-lg font-semibold text-zinc-800 mb-4">
            Evidence Summary
          </h2>

          <ul className="space-y-2 text-sm text-zinc-700">
            <li>
              <span className="font-medium text-zinc-800">Media Coverage:</span>{" "}
              확인 가능
            </li>
            <li>
              <span className="font-medium text-zinc-800">Reader Reviews:</span>{" "}
              수집 중
            </li>
            <li>
              <span className="font-medium text-zinc-800">Retail Reviews:</span>{" "}
              존재
            </li>
          </ul>
        </section>

        <section className="mt-10 grid gap-6">
          {sections.map((section, i) => (
            <Link
              key={section.href}
              href={section.href}
              className="reveal-up group rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              style={{ animationDelay: `${180 + i * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-800 mb-2">
                    {section.title}
                  </h2>

                  <p className="text-sm leading-relaxed text-zinc-600">
                    {section.description}
                  </p>
                </div>

                <span className="shrink-0 text-emerald-600 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>

              <div className="mt-5 text-sm font-medium text-emerald-600 transition-colors group-hover:text-emerald-700">
                {section.cta}
              </div>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}