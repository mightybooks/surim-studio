type Props = {
  platform: string;
  rating?: number;
  reviewCount?: number;
  quotes: string[];
  url: string;
};

export default function RetailReviewItem({
  platform,
  rating,
  reviewCount,
  quotes,
  url
}: Props) {
  return (
    <article className="rounded-2xl border border-zinc-200/80 bg-white/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">

      {/* 상단: 플랫폼 + 평점 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-zinc-800">
          {platform}
        </h3>

        {rating && (
          <div className="text-sm font-medium text-emerald-600">
            ★ {rating} {reviewCount && `(${reviewCount})`}
          </div>
        )}
      </div>

      {/* 리뷰 문장 */}
      <ul className="mb-5 space-y-2">
        {quotes.slice(0, 2).map((q, i) => (
          <li key={i} className="text-base text-zinc-700 leading-relaxed">
            “{q}”
          </li>
        ))}
      </ul>

      {/* 링크 */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700 hover:underline"
      >
        {platform} 서점 페이지 →
      </a>
    </article>
  );
}