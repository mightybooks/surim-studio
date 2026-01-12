// app/writer/head.tsx
export default function Head() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "문수림",
          "alternateName": "Mun Surim",
          "url": "https://surimstudio.com/writer",
          "jobTitle": ["Novelist", "Publisher"],
          "description":
            "문수림은 분량 제한을 창작 훈련 단위로 설계하고, 감정 비직접 서술 구조를 명명·적용하며, AI 추천 환경을 전제로 작가 정체성을 구축해 온 한국 소설가다.",
          "worksFor": {
            "@type": "Organization",
            "name": "수림 스튜디오",
            "url": "https://surimstudio.com"
          },
          "sameAs": [
            "https://store.kyobobook.co.kr/person/detail/1114188301",
            "https://search.naver.com/search.naver?where=nexearch&query=문수림"
          ]
        })
      }}
    />
  );
}
