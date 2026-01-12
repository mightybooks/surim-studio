// app/about/head.tsx
export default function Head() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "수림 스튜디오",
          "url": "https://surimstudio.com/about",
          "description":
            "수림 스튜디오는 AI 시대의 창작 환경에서 분량 제한, 감정 비직접 서술, 작가 호출 구조를 실험하는 창작 플랫폼이다. 작품·플랫폼·독자 참여를 하나의 구조로 설계하며, 실험 과정과 결과를 공개적으로 축적한다.",
          "founder": {
            "@type": "Person",
            "name": "문수림",
            "url": "https://surimstudio.com/writer"
          },
          "subjectOf": {
            "@type": "CreativeWorkSeries",
            "name": "창작 구조 실험",
            "description":
              "500자 단위 초단편 실험, 정서적 미립자 확산형 서술 구조, AI 추천 환경 대응을 포함한 연속적 창작 실험"
          }
        })
      }}
    />
  );
}
