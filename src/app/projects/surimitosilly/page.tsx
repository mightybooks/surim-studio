import Image from "next/image";

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export const metadata = {
  title: "수리미와 토실이 – 수림 스튜디오 대표 캐릭터",
  description:
    "수림 스튜디오의 마스코트 수리미와 토실이 캐릭터의 탄생과 개발 비하인드",
  openGraph: {
    title: "수리미와 토실이 – 수림 스튜디오 대표 캐릭터",
    description:
      "수림 스튜디오의 대표 캐릭터 수리미·토실이의 세계관과 개발 과정",
    images: ["/covers/surimitosilly_hero.webp"],
  },
};

export default function SurimiTosillyProjectPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">

      {/* 히어로 섹션 */}
      <section className="reveal-up relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow" style={revealStyle(80)}>
        <Image
          src="/covers/surimitosilly_hero.webp"
          alt="수림 스튜디오 대표 캐릭터 수리미와 토실이"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
          <h1 className="reveal-up text-3xl md:text-5xl font-semibold mb-3" style={revealStyle(180)}>
            수리미와 토실이
          </h1>
          <p className="reveal-up text-sm md:text-base text-zinc-200" style={revealStyle(300)}>
            수림 스튜디오의 대표 캐릭터
          </p>
        </div>
      </section>

      {/* 캐릭터 소개 본문 */}
      <article className="reveal-up prose prose-zinc max-w-none news-body" style={revealStyle(420)}>
        <h2>1. 수리미와 토실이 소개</h2>

        {/* 수리미 솔로 이미지 */}
        <figure className="my-10">
            <Image
            src="/covers/surimi_single.webp"
            alt="수리미 캐릭터"
            width={880}
            height={500}
            className="rounded-xl"
            />
            <figcaption className="text-center text-sm text-zinc-500">
            수림 스튜디오 대표 캐릭터 ‘수리미’
            </figcaption>
        </figure>

        <h3>수리미</h3>
        <p>
            수리미는 문수림의 긍정적 요소만을 조합하여 만든 결과물이다.
            그러나 역설적으로, 긍정 요소만을 몰아넣으면 오히려 기묘해진다는
            사실이 증명되었다. 고기를 섭취해야 비로소 작업 생산성이 생기며,
            토실이를 ‘부려먹기 위해’ 고용했지만 현실은 정반대다. 매번 토실이의
            꾐에 빠져 손해를 보면서도 크게 개의치 않는, 묘하게 따뜻하고
            엉뚱한 창작자 캐릭터다.
        </p>

        {/* 토실이 솔로 이미지 */}
        <figure className="my-10">
            <Image
            src="/covers/tosilly_single.webp"
            alt="토실이 캐릭터"
            width={880}
            height={500}
            className="rounded-xl"
            />
            <figcaption className="text-center text-sm text-zinc-500">
            수리미의 파트너 ‘토실이’
            </figcaption>
        </figure>

        <h3>토실이</h3>
        <p>
            토실이는 수리미에게 고용된 직원이다. 그러나 계약서 도장이 마르기도
            전에 알파파 무제한 제공, 숙식 기본 제공, 하루 18시간 자유시간 보장 등
            기묘한 특약을 관철시킨 지능형 캐릭터다. 어려운 일은 자연스럽게
            수리미에게 넘기지만, 기본적인 존중과 따뜻함은 유지한다는 점이
            특징이다.
        </p>

        <h3>출근 복장</h3>
        <p>
            두 캐릭터는 브랜드 통일성과 파트너십 유지를 이유로 흰색
            ‘surimstudio’ 후드티를 착용하고 출근한다. 그러나 사실은 수리미가
            “일할 때 옷 고르는 비용을 줄이기 위한 핑계”라는 점이 비공식 설정이다.
        </p>

        <h3>둘의 관계</h3>
        <p>
            수리미는 혼자 일하는 데 익숙한 캐릭터이지만, 토실이가 옆에 있으면
            작업 공간의 온도가 확실히 달라진다. 토실이가 귀찮게 굴어도, 일을
            미뤄도, 결국 수리미는 토실이를 좋아한다. 토실이 역시 수리미의 열정을
            존중하지만, 어려운 일은 자신의 몫이 아니라고 생각한다.
        </p>

        {/* 둘이 함께 있는 일상 이미지 (여기 삽입) */}
        <figure className="reveal-up my-12" style={revealStyle(520)}>
            <Image
            src="/covers/surimi_tosilly_daily.webp"
            alt="수리미와 토실이의 일상 모습"
            width={880}
            height={500}
            className="rounded-xl object-cover"
            />
            <figcaption className="text-center text-sm text-zinc-500">
            스튜디오에서 각자(?)의 방식으로 일하는 수리미와 토실이
            </figcaption>
        </figure>

        {/* 절취선 */}
        <hr className="my-16 border-t border-dashed border-zinc-400" />

        <h2>2. 개발 비하인드</h2>

        <h3>수리미 개발 초기</h3>
        <p>
          수리미는 실제 문수림의 다양한 일상 사진을 기반으로 나노 바나나와 GPT를
          교차 사용하여 생성되었다. 문제는 AI들이 “적당한 나이”라는 개념을
          이해하지 못해, 20대로 어려지거나 혹은 60대처럼 늙어버리는 결과가
          반복되었다는 점이다. 그 때문에 후보정 과정이 필수였고, 현재의
          수리미는 여러 번의 재설계 끝에 자리 잡았다.
        </p>

        <h3>토실이 개발 초기</h3>
        <p>
          토실이는 원래 &lt;토실토실 프로젝트&gt;의 일부였으나, 세계관 확장을 위해
          수리미의 파트너로 재배치되었다. 본직은 ‘특수 소동물군 보호’ 영역에
          있으며, 수리미의 조수라는 설정은 어디까지나 부가적인 요소다.
        </p>

        {/* 테스트 프로토타입 이미지 (여기 삽입) */}
        <figure className="my-12">
            <Image
            src="/covers/testprototype00.webp"
            alt="수리미와 토실이의 테스트 프로토타입"
            width={880}
            height={500}
            className="rounded-xl object-cover"
            />
            <figcaption className="text-center text-sm text-zinc-500">
            수리미와 토실이의 테스트 프로토타입, 초기에는 나노 바나나 프로의 도움이 컸다.
            </figcaption>
        </figure>

        <h3>투샷·합성 장면 제작 방식</h3>
        <p>
          현재 수리미와 토실이의 합성 장면은 기본적으로 GPT 기반 이미지 생성
          흐름을 통해 만들어지고 있다. 나노 바나나 프로를 사용하면 높은 정확도를
          얻을 수 있으나, 브랜드 특유의 따뜻함과 서사적 질감이 약해지는 문제가
          있다. 그렇기 때문에 기본 감정선은 GPT 모델에서 잡고, 그 결과물을 기반으로
          전체 톤을 조성하는 방식을 고집하고 있다.
        </p>
      </article>

       {/* 현장 실제 작업 이미지 (여기 삽입) */}
        <figure className="my-12">
            <Image
            src="/covers/theloverbigyo.webp"
            alt="실제 현장 작업 이미지"
            width={880}
            height={500}
            className="rounded-xl object-cover"
            />
            <figcaption className="text-center text-sm text-zinc-500">
            실제 현장 작업 이미지, 타로카드 덱의 패러디를 수리미와 토실이가 연출하기 위해 노력중
            </figcaption>
        </figure>

      {/* 푸터 */}
      <footer className="reveal-up text-center text-xs text-zinc-400" style={revealStyle(620)}>
        © 2025 수림 스튜디오. All rights reserved.
      </footer>
    </main>
  );
}
