export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify는 SSR에서 안전합니다.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
