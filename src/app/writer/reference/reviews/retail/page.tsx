import { retailReviews } from "@/data/reviews";
import RetailReviewItem from "@/components/reviews/RetailReviewItem";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Retail Reviews",
  "itemListElement": retailReviews.map((r, i) => {
    const item: any = {
      "@type": "Review",
      "position": i + 1,
      "author": {
        "@type": "Organization",
        "name": r.platform
      },
      "reviewBody": r.quotes[0],
      "url": r.url
    };

    // ✅ rating 있을 때만 추가
    if (r.rating) {
      item.reviewRating = {
        "@type": "Rating",
        "ratingValue": r.rating
      };
    }

    return item;
  })
};

export default function RetailPage() {
  return (
    <>
      {/* ✅ JSON-LD 삽입 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">Retail Reviews</h1>

        <p className="text-zinc-600 mb-8">
          주요 서점 및 플랫폼에서 확인 가능한 사용자 리뷰를 정리한 페이지입니다.
        </p>

        <div className="mt-8 grid gap-6">
        {retailReviews.map((item, i) => (
            <div
            key={item.url}
            className="reveal-up"
            style={{ animationDelay: `${i * 100}ms` }}
            >
            <RetailReviewItem {...item} />
            </div>
        ))}
        </div>
      </main>
    </>
  );
}