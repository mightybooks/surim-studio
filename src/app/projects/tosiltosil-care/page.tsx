import Image from "next/image";
import Link from "next/link";

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export const metadata = {
  title: "토실토실 프로젝트 – 돌봄에너지 자가측정 앱",
  description:
    "우리 모두에게 잠재된 돌봄에너지를 측정하고 결과를 공유하는 어플리케이션.",
  openGraph: {
    title: "토실토실 프로젝트 – 돌봄에너지 자가측정 앱",
    description:
      "돌봄에너지를 측정하고, 결과를 공유해 모두에게 알리는 확산 프로젝트.",
    images: ["/covers/tosiltosil_care_hero.webp"],
  },
};

export default function TosiltosilCarePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* 히어로 */}
      <section className="reveal-up relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow" style={revealStyle(80)}>
        <Image
          src="/covers/tosiltosil_care_hero.webp"
          alt="돌봄에너지 자가측정 어플리케이션"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
          <h1 className="reveal-up text-3xl md:text-5xl font-semibold mb-3" style={revealStyle(180)}>
            돌봄에너지를 측정하고<br />결과를 공유해 모두와 함께 하자
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
            1. 이 앱은 무엇을 하는가
          </h2>
          <p>
            <strong>돌봄에너지 자가측정 앱</strong>은 우리 각자가 지닌 돌봄의 감각을
            간단한 질문을 통해 돌아보게 하는 디지털 참여 콘텐츠입니다.
            결과는 점수나 등급이 아니라, 현재 내가 어떤 방식으로 돌봄에 반응하고 있는지를
            하나의 이야기로 보여줍니다.
          </p>
          <p>
            이 앱은 누군가를 평가하거나 분류하기 위한 도구가 아닙니다.
            스스로를 돌아보고, 감각을 자각하는 데에 목적이 있습니다.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            2. 왜 ‘측정’이라는 방식을 택했는가
          </h2>
          <p>
            돌봄은 원래 수치화되기 어려운 감정입니다. 그럼에도 이 프로젝트가
            ‘측정’이라는 방식을 택한 이유는, 돌봄을 판단하기 위해서가 아니라
            <em>인식의 계기</em>를 만들기 위해서입니다.
          </p>
          <p>
            질문에 답하는 짧은 시간 동안, 우리는 무의식적으로 외면해 왔던 감각을
            다시 마주하게 됩니다. 이 앱은 그 짧은 멈춤을 제공하기 위해 설계되었습니다.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            3. 결과는 어떻게 사용되는가
          </h2>
          <p>
            테스트 결과는 사용자의 선택에 따라 기록으로 남길 수 있으며,
            일부 결과는 익명 형태로 아카이브에 축적됩니다.
            이는 개인의 점수를 공개하기 위함이 아니라,
            돌봄에너지에 대한 다양한 반응이 실제로 존재한다는 사실을
            함께 확인하기 위함입니다.
          </p>
          <p>
            참여하지 않더라도 앱 사용은 완결되며,
            기록과 공유는 전적으로 사용자의 선택에 맡겨져 있습니다.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900">
            4. 이 앱이 프로젝트 안에서 맡은 역할
          </h2>
          <p>
            이 앱은 토실토실 프로젝트에서 <em>참여의 입구</em>에 해당합니다.
            책이 이야기를 전하고, 아카이브가 기록을 축적한다면,
            이 앱은 사용자가 스스로 그 이야기 안으로 들어오는 경로입니다.
          </p>
          <p>
            돌봄에너지는 행동으로만 증명되지 않습니다.
            반응하고, 인식하고, 외면하지 않는 태도 역시
            이 프로젝트가 중요하게 여기는 돌봄의 한 형태입니다.
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
        href="https://dolbom-mu.vercel.app/"
        target="_blank"
        className="px-6 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-medium border border-emerald-600 hover:bg-emerald-100"
        >
        앱 이용하기
        </Link>
        <Link
          href="/projects/tosiltosil-archive"
          className="px-6 py-3 rounded-xl bg-emerald-50 text-emerald-700 font-medium border border-emerald-600 hover:bg-emerald-100"
        >
          아카이브 보러가기
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