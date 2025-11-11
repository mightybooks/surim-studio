import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "토실토실 프로젝트 – 돌봄의 에너지 확대로 유기토끼를 구하자",
  description:
    "『토실토실 토끼를 안았습니다』를 기반으로 한 수림 스튜디오의 돌봄 확장 프로젝트. 유기동물 문제를 이야기와 예술로 다시 생각합니다.",
  openGraph: {
    title: "토실토실 프로젝트 – 돌봄의 에너지 확대로 유기토끼를 구하자",
    description:
      "돌봄의 에너지를 확장하고, 유기토끼 문제를 함께 해결하는 캠페인 프로젝트.",
    images: ["/covers/tosiltosil_hero.webp"],
  },
};

export default function TosiltosilProjectPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* 히어로 */}
      <section className="relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow">
        <Image
          src="/covers/tosiltosil_hero.webp"
          alt="돌봄의 에너지 확대로 유기토끼를 구하자"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-3xl md:text-5xl font-semibold mb-3">
            돌봄의 에너지 확대로<br />유기토끼를 구하자
          </h1>
          <p className="text-sm md:text-base text-zinc-200">
            『토실토실 토끼를 안았습니다』 기반 캠페인 프로젝트
          </p>
        </div>
      </section>

      {/* 프로젝트 개요 */}
      <section className="text-zinc-700 leading-loose space-y-6">
        <p>
          <strong>토실토실 프로젝트</strong>는 한 권의 책에서 시작되었습니다. 『토실토실
          토끼를 안았습니다』는 유기토끼 문제를 다루는 수필이자, 돌봄의 에너지를 되살리는
          기록입니다. 이 이야기는 단순한 반려동물과의 교감 에세이가 아니라, 인간의 돌봄 감각이
          사회적으로 확장될 수 있음을 보여줍니다.
        </p>

        <p>
          우리는 이 책을 중심으로 <strong>‘돌봄의 에너지 확장’</strong>이라는 메시지를
          현실에서 구현하고자 합니다. 버려진 동물의 생명을 구하는 일은 개인의 선의가 아니라,
          사회적 연대의 감정이 필요하기 때문입니다.
        </p>

        <p>
          프로젝트는 책과 캠페인, 그리고 디지털 참여 콘텐츠로 연결됩니다. 누구나
          <em>돌봄의 주체</em>가 될 수 있으며, 예술과 이야기로 세상을 조금씩 바꾸는
          실험을 계속하고 있습니다.
        </p>
      </section>

      {/* CTA */}
      <section className="flex flex-col md:flex-row gap-4 justify-center text-center">
        <Link
          href="/library/tosilbook"
          className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
        >
          책 정보 보기
        </Link>
        <Link
          href="/projects/tosiltosil-care"
          className="px-6 py-3 rounded-xl border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50"
        >
          캠페인 참여하기
        </Link>
      </section>

      {/* 푸터 */}
      <footer className="text-center text-xs text-zinc-400">
        © 2025 수림 스튜디오. All rights reserved.
      </footer>
    </main>
  );
}
