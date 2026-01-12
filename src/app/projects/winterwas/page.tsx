import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "겨울이었다 프로젝트 – 수림 스튜디오",
  description:
    "이미 끝난 사건 이후의 세계를 기록하는 감정 비서술형 마이크로 픽션 실험.",
  alternates: {
    canonical: "/projects/winterwas",
  },
  openGraph: {
    title: "겨울이었다 프로젝트 – 수림 스튜디오",
    description:
      "규칙 기반 반복 생산되는 감정 비서술형 마이크로 픽션 실험 프로젝트.",
    images: ["/covers/winterwas_hero.webp"], // 없으면 제거 가능
    type: "article",
    locale: "ko_KR",
  },
};

export default function WinterWasProjectPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-16">
      {/* 히어로 (선택 사항) */}
      <section className="relative w-full h-[300px] md:h-[360px] rounded-3xl overflow-hidden shadow">
        <Image
          src="/covers/winterwas_hero.webp"
          alt="겨울이었다 프로젝트 이미지"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-3xl md:text-5xl font-semibold mb-3">
            프로젝트 《겨울이었다》
          </h1>
          <p className="text-sm md:text-base text-zinc-200">
            감정 비서술형 마이크로 픽션 실험
          </p>
        </div>
      </section>

      {/* 프로젝트 설명 */}
      <article className="prose prose-zinc max-w-none news-body">
        <h2>프로젝트 《겨울이었다》에 대하여</h2>

        <h3>1. 이 프로젝트는 무엇인가</h3>
        <p>
          《겨울이었다》는 이미 끝난 사건 이후의 세계를 기록하는
          감정 비서술형 마이크로 픽션 실험이다.
        </p>
        <p>
          이 프로젝트에서 중요한 것은 사건이 아니다.
          무엇이 있었는지는 설명되지 않으며,
          독자는 오직 남아 있는 환경과 인물의 상태를 통해
          어떤 일이 지나갔는지를 추정하게 된다.
        </p>
        <p>
          작품은 짧고, 명확한 결말을 갖지 않는다.
          대신 모든 텍스트는 하나의 상태 판정 문장으로 종료된다.
        </p>
        <p><strong>“겨울이었다.”</strong></p>

        <h3>2. 왜 이런 형식인가</h3>
        <p>
          이 형식은 우연히 만들어진 것이 아니다.
          웹에서 반복 소비되던 ‘여름이었다’ 밈이
          정서적 분위기만을 소비하는 방식에 머무르는 것에 대한
          의식적인 반발에서 출발했다.
        </p>
        <p>
          이 프로젝트는 감정을 직접 언급하지 않고,
          인물의 반응과 공간의 잔여물만을 남기는 방식을 택한다.
        </p>
        <p>
          독자는 인물의 감정을 ‘이해’하지 않는다.
          대신 자신이 경험한 유사한 기억과 감각을 호출하게 된다.
          이 지점에서 텍스트는 전달물이 아니라
          촉발 장치로 기능한다.
        </p>

        <h3>3. 작동 규칙</h3>
        <p>
          《겨울이었다》는 임의적 글쓰기가 아니다.
          모든 텍스트는 아래의 규칙을 따른다.
        </p>
        <ul>
          <li>감정 단어를 직접 사용하지 않는다.</li>
          <li>사건의 전말을 설명하지 않는다.</li>
          <li>인과 접속사를 최소화한다.</li>
          <li>인물은 자신의 상태를 해석하지 않는다.</li>
          <li>마지막 문장은 반드시 단독으로 “겨울이었다.”로 끝난다.</li>
        </ul>

        <h3>4. 이 프로젝트가 아닌 것</h3>
        <p>
          이 프로젝트는 치유를 목적으로 하지 않는다.
          심리 진단이나 자기계발을 제공하지도 않는다.
        </p>
        <p>
          또한 위로를 전제한 서사나
          감정의 해소를 목표로 하지 않는다.
          결과는 제공되지 않으며,
          해석은 독자에게 전적으로 남겨진다.
        </p>

        <h3>5. 기록과 반복</h3>
        <p>
          《겨울이었다》는 단발 작품이 아니라
          동일한 규칙 아래 반복 생산되는 기록의 집합이다.
        </p>
        <p>
          개별 텍스트는 독립적이지만,
          프로젝트 전체는 하나의 실험 로그로 작동한다.
          축적되는 것은 이야기보다
          반응의 패턴과 감각의 분포다.
        </p>

        <h3>6. 확장 가능성</h3>
        <p>
          본 프로젝트는 다언어 번역,
          자동 생성 실험,
          웹 기반 상호작용 구조로의 확장이 가능하도록 설계되었다.
        </p>
        <p>
          다만 현재 단계에서 중요한 것은
          확장이 아니라 규칙의 유지와 반복이다.
        </p>
      </article>

      {/* 작성자 블록 */}
      <aside className="mt-10 rounded-2xl border border-zinc-200 p-5 bg-white/60">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 overflow-hidden rounded-full">
            <Image
              src="/profile/moonsurim.png"
              alt="문수림"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-zinc-800">문수림</p>
            <p className="text-sm text-zinc-500">
              수림 스튜디오 총괄자 · 소설가
            </p>
          </div>
        </div>
      </aside>

      {/* 푸터 */}
      <footer className="text-center text-xs text-zinc-400">
        © 2025 수림 스튜디오. All rights reserved.
      </footer>
    </main>
  );
}
