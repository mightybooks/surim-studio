import Image from "next/image";
import Link from "next/link";

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export const metadata = {
  title: "토실토실 프로젝트 – 돌봄에너지 확대로 유기토끼를 구하자",
  description:
    "『토실토실 토끼를 안았습니다』를 기반으로 한 수림 스튜디오의 돌봄에너지 확산 프로젝트. 유기동물 문제를 이야기로 풀어냅니다.",
  openGraph: {
    title: "토실토실 프로젝트 – 돌봄에너지 확대로 유기토끼를 구하자",
    description:
      "돌봄에너지를 확장하고, 유기토끼 문제를 함께 해결하는 캠페인 프로젝트.",
    images: ["/covers/tosiltosil_hero.webp"],
  },
};

export default function TosiltosilProjectPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* 히어로 */}
      <section className="reveal-up relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow" style={revealStyle(80)}>
        <Image
          src="/covers/tosiltosil_hero.webp"
          alt="돌봄에너지 확산으로 유기토끼를 구하자"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
          <h1 className="reveal-up text-3xl md:text-5xl font-semibold mb-3" style={revealStyle(180)}>
            돌봄에너지 확산으로<br />유기토끼를 구하자
          </h1>
          <p className="reveal-up text-sm md:text-base text-zinc-200" style={revealStyle(300)}>
            『토실토실 토끼를 안았습니다』캠페인 프로젝트
          </p>
        </div>
      </section>

      {/* 프로젝트 개요 */}
      <section className="reveal-up text-zinc-700 leading-loose space-y-12" style={revealStyle(420)}>
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            1. 저자 시안
          </h2>
          <p>
            <strong>토실토실 프로젝트</strong>는 한 사람의 기록에서 시작되었습니다. 저자
            시안은 특별한 활동가도, 유명한 인물도 아닙니다. 이제 막 결혼을 한 평범한
            여성이고, 다만 그녀의 집에는 아홉이 넘는 작은 생명들이 함께 살고 있습니다.
            모두 한때 유기되었거나, 유기된 토끼로부터 태어난 아이들입니다.
          </p>
          <p>
            『토실토실 토끼를 안았습니다』는 그녀가 지난 십여 년간 유기토끼를 구조하고,
            입양을 연결하고, 그 과정에서 만난 사람들이 다시 어떤 방식으로 토끼들과
            인연을 이어가게 되었는지를 기록한 책입니다. 거창한 구호 활동의 보고서라기보다,
            한 사람이 감당할 수 있는 만큼의 돌봄을 이어온 시간의 기록에 가깝습니다.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            2. 유기토끼의 현실
          </h2>
          <p>
            그렇다면 얼마나 많은 토끼들이 유기되고 있기에, 한 개인이 이렇게 오랜 시간
            이 문제에 매달리게 되었을까요. 현재 추정되는 수치만 보아도 매년 최소
            300마리 이상의 토끼가 유기되고 있으며, 이 숫자는 해마다 증가하는 추세입니다.
          </p>
          <p>
            토끼는 특수동물군에 속해 일반 동물보호소에서 보호가 어려운 경우가 많고,
            구조 이후의 돌봄과 입양까지 대부분 개인의 책임으로 남습니다.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            3. 사람도 살기 팍팍한 사회
          </h2>
          <p>
            유기동물의 증가는 개인의 무책임으로만 설명하기 어렵습니다. 경제적 부담은
            해마다 커지고 있고, 사회 전체의 여유는 줄어들고 있습니다. 경제성장의 둔화와
            함께 유기동물 수치가 증가하는 현상은, 이 문제가 개인의 도덕성만으로
            해결될 수 없음을 보여줍니다.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            4. 우리는 모두 돌봄에너지를 지니고 있다
          </h2>
          <p>
            그렇다고 해서 이 문제 앞에서 낙심하거나 등을 돌릴 필요는 없습니다. 우리는
            모두 크고 작게 <em>돌봄에너지</em>를 지니고 있기 때문입니다. 누군가는 직접
            구조자가 될 수 있고, 누군가는 입양자가 될 수 있으며, 또 다른 누군가는 이
            문제에 관심을 가지고 공감하는 사람으로 남을 수 있습니다.
          </p>
          <p>
            중요한 것은 완벽한 행동이 아니라, 차가워지지 않는 감각입니다.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            5. 토실토실 프로젝트가 하는 일
          </h2>
          <p>
            토실토실 프로젝트는 우리가 각자 지닌 돌봄에너지를 인식하고, 확산하고,
            연결하는 데 목적이 있습니다. 책과 캠페인, 그리고 디지털 참여 콘텐츠는 모두
            유기동물에 대한 인식 개선을 위한 도구일 뿐입니다.
          </p>
          <p>
            우리가 모두 직접 다른 생명을 품을 수는 없지만, 이 문제에 따뜻하게 반응하는
            사람이라는 사실을 드러내고 그 흔적을 남길 수는 있습니다. 이 프로젝트는 바로
            그 지점을 기록하고 이어가는 실험입니다.
          </p>
        </div>
      </section>


      {/* CTA */}
      <section className="reveal-up flex flex-col md:flex-row gap-4 justify-center text-center" style={revealStyle(620)}>
        <Link
          href="/library/tosilbook"
          className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
        >
          책 보러가기
        </Link>
        <Link
          href="/projects/tosiltosil-care"
          className="px-6 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-medium border border-emerald-600 hover:bg-emerald-100"
        >
          앱 알아보기
        </Link>
        <Link
        href="/projects/tosiltosil/bookmaps"
        className="px-6 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-medium border border-emerald-600 hover:bg-emerald-100"
        >
        입고서점 확인
        </Link>
      </section>

      {/* 푸터 */}
      <footer className="reveal-up text-center text-xs text-zinc-400" style={revealStyle(720)}>
        © 2025 수림 스튜디오. All rights reserved.
      </footer>
    </main>
  );
}
