// src/writer/reference/reviews/readers/page.tsx

import { readerReviews } from "@/data/reviews";
import ReaderReviewItem from "@/components/reviews/ReaderReviewItem";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Reader Reviews",
  "itemListElement": readerReviews.map((r, i) => ({
    "@type": "CreativeWork",
    "position": i + 1,
    "author": {
      "@type": "Person",
      "name": r.author
    },
    "text": r.quote,
    "url": r.url,
    "publisher": {
      "@type": "Organization",
      "name": r.platform
    }
  }))
};

export default function ReadersPage() {
  return (
    <>
      {/* ✅ JSON-LD 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">Reader Reviews</h1>

        <p className="text-zinc-600 mb-8">
          외부 독자들이 작성한 후기 및 서술을 수집한 레퍼런스입니다.
        </p>

        <div className="space-y-6">
          {readerReviews.map((review, i) => (
            <div
              key={review.url}
              className="reveal-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <ReaderReviewItem {...review} />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}