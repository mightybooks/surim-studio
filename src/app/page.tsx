import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Surim Studio",
          "url": "https://surimstudio.com",
          "founder": {
            "@type": "Person",
            "name": "Mun Surim"
          },
          "description":
            "Mun Surim is an independent creator who uses web applications and AI tools to experiment with how writing is structured, accumulated, and distributed, rather than focusing only on the written text itself. This site is not a general blog, news outlet, or software company.",
          "sameAs": [
            "https://surimstudio.com"
          ]
        })
      }}
    />
    <main className="flex flex-col items-center space-y-4 mt-12">

      <h1 className="text-4xl font-bold text-emerald-900 mb-2">
        수림 스튜디오
      </h1>
      <p className="text-zinc-600 mb-8">
        감정의 미립자를 기록하는 작은 출판 실험실
      </p>
      <p className="text-sm text-zinc-500 mb-4">
      수림 스튜디오는 문수림이 웹 애플리케이션과 AI 도구를 활용해
      글쓰기와 출판 구조를 실험하는 창작 허브입니다.
    </p>
    <p className="text-sm text-zinc-500 italic">
  since 2025
</p>

    <section className="text-center">
      {/* 기존 네비게이션 */}
      <NavBar />
    </section>

     {/* 글로벌 안내 (EN only) */}
      <div className="w-full mt-6">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <p className="text-[11px] text-zinc-500 text-center leading-relaxed">
            This site is maintained primarily in Korean.<br />
            Some pages are available in English.<br />
            Full multilingual support is still in progress.
          </p>
        </div>
      </div>
    </main>
  </>
  );
}
