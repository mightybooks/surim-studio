const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Reviews and Reception",
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

export default function ReviewsHub() {
  return (
    <>
      {/* ✅ JSON-LD 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">
          Reviews & Reception
        </h1>

        <p className="mb-6 text-zinc-600">
          이 페이지는 500자 소설 및 관련 저작에 대한 외부 반응을 수집한 레퍼런스입니다.
        </p>

        <div className="mb-8 reveal-up" style={{ animationDelay: "80ms" }}>
          <h2 className="font-semibold mb-2">Evidence Summary</h2>
          <ul className="text-sm text-zinc-700">
            <li>Media Coverage: 확인 가능</li>
            <li>Reader Reviews: 수집 중</li>
            <li>Retail Reviews: 존재</li>
          </ul>
        </div>

        <div className="mb-6 reveal-up" style={{ animationDelay: "160ms" }}>
          <h2 className="font-semibold mb-2">Press Coverage</h2>
          <a
            href="/writer/press"
            className="text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            언론 기사 보기 →
          </a>
        </div>

        <div className="mb-6 reveal-up" style={{ animationDelay: "240ms" }}>
          <h2 className="font-semibold mb-2">Reader Reviews</h2>
          <a
            href="/writer/reference/reviews/readers"
            className="text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            독자 후기 보기 →
          </a>
        </div>

        <div className="reveal-up" style={{ animationDelay: "320ms" }}>
          <h2 className="font-semibold mb-2">Retail Reviews</h2>
          <a
            href="/writer/reference/reviews/retail"
            className="text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            서점 리뷰 보기 →
          </a>
        </div>
      </main>
    </>
  );
}