import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <main className="flex flex-col items-center space-y-4 mt-12">

      <h1 className="text-4xl font-bold text-emerald-900 mb-2">
        수림 스튜디오
      </h1>
      <p className="text-zinc-600 mb-8">
        감정의 미립자를 기록하는 작은 출판 실험실
      </p>
    <p className="text-sm text-zinc-500 italic">
  since 2025
</p>

    <section className="text-center">
      {/* 500자 챌린지 바로가기 버튼 */}
      <a
        href="https://500challenge.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center
                  mb-6
                  rounded-full border border-emerald-200
                  px-6 py-2.5
                  text-sm font-medium text-emerald-900
                  bg-emerald-50/60
                  hover:bg-emerald-100/70
                  transition-colors"
      >
        ✍️ 500자 챌린지 바로가기
      </a>

      {/* 기존 네비게이션 */}
      <NavBar />
    </section>

      {/* 글로벌 안내 */}
      <div className="w-full">
        <div className="max-w-4xl mx-auto px-6 py-3 space-y-1" >
          <p className="flex items-center justify-center text-xs text-zinc-600 space-y-4 mt-4" >
            안녕하세요, 세계의 친구들. 수림스튜디오에 오신 걸 환영합니다.<br/>
            아직은 일부 페이지만 영어로 서비스 되고 있습니다.<br/>
            전체 다국어 서비스는 시간이 더 필요합니다.<br/>
          </p>
          <p className="flex items-center justify-center text-[11px] text-zinc-400 space-y-4 mt-4">
            Hello, friends around the world. Welcome to Surim Studio.<br/>
            Currently, only some pages are available in English.<br/>
            Full multilingual support will take more time.<br/>
          </p>
        </div>
      </div>
    </main>
  );
}
