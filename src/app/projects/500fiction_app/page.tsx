// File: src/app/projects/500fiction_app/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export const metadata: Metadata = {
  title: "500자소설 앱 – 수림 스튜디오",
  description:
    "독자와 함께 확장하는 세계관의 첫 단추, 500자소설 앱. 500바이트 글쓰기와 수림봇 평가, 정서 앵커 카드까지 한 번에 경험해 보세요.",
  alternates: {
    canonical: "/projects/500fiction_app",
  },
  openGraph: {
    title: "500자소설 앱 – 수림 스튜디오",
    description:
      "초단편 500자 글쓰기를 위한 웹앱. 수림봇 평가와 정서 앵커 카드, 아카이브 연동까지 한 번에 경험할 수 있습니다.",
    images: ["/covers/500fiction_app.webp"], // 필요 시 실제 이미지로 교체
    type: "article",
    locale: "ko_KR",
  },
};

export default function Fiction500AppPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-16 px-6 py-12">
      {/* 히어로 섹션 */}
      <section className="reveal-up relative w-full h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow" style={revealStyle(80)}>
        <Image
          src="/covers/500fiction_app.webp" // 쓰고 계신 실제 경로 유지
          alt="500자소설 앱 메인 이미지"
          fill
          className="object-cover"
          priority
        />
        {/* 어두운 오버레이 + 텍스트 */}
        <div className="absolute inset-0 bg-black/35 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="reveal-up mb-2 md:text-5xl font-semibold tracking-[0.28em] text-emerald-200 drop-shadow" style={revealStyle(180)}>
            PROJECT<br/>500 FICTION APP
          </h1>
          <p className="reveal-up text-sm font-medium text-emerald-50" style={revealStyle(300)}>
            독자와 함께 확장하는 세계관의 첫 단추
          </p>
        </div>
      </section>

      <section className="reveal-up news-body prose prose-zinc max-w-none" style={revealStyle(420)}>
        <h2>26년 1월, 500자 챌린지 웹앱이 등장합니다.</h2>
        <p>현재 정식 베타테스트 기간이 종료되어 이용자들의 피드백을 반영해 웹앱은 완공이 된 상태입니다.<br/>
           25년 12월 중 출시가 가능한 상태이지만, 다가오는 새해에 도서『500자 소설』출간과 함께 선보일 예정입니다.</p>
      </section>

      {/* 앱 한 줄 소개 */}
      <section className="reveal-up news-body prose prose-zinc max-w-none" style={revealStyle(500)}>
        <h2>500자 쓰기 챌린지 앱이란?</h2>

        <p>
          <strong>
            500자 안에 서사를 눌러 담고, 수림봇에게 기계적 잔소리를 듣고,
            정서 앵커 카드를 뽑아 결과를 확인해 보는 초단편 실험실
          </strong>
          입니다.
        </p>

        <p className="leading-relaxed text-slate-700">
          앱의 구체적인 탄생 배경과 이론적 이야기는{" "}
          <Link
            href="/projects/500_fiction"
            className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
          >
            500자소설 프로젝트 페이지
          </Link>
          에 맡겨두고,
          <br />
          여기서는 <strong>“실제 앱이 어떤 느낌으로 작동하는지”</strong>에
          집중해 소개합니다.
        </p>
      </section>

      <div className="reveal-up my-8 flex justify-center" style={revealStyle(620)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/covers/surimbot_ver_01.webp"
          alt="수림봇"
          className="w-full max-w-xl rounded-2xl shadow"
        />
      </div>

      {/* 수림봇 소개 */}
      <section className="reveal-up news-body prose prose-zinc max-w-none" style={revealStyle(580)}>
        <h2>수림봇이란 무엇인가?</h2>
        <p>
          수림봇은 한마디로 말해{" "}
          <strong>“기분은 편집자, 실체는 알고리즘, 책임은 안 지는 AI”</strong>{" "}
          입니다.
        </p>
        <ul>
          <li>
            <strong>역할</strong> · 사용자가 쓴 500자 글을 문수림의 문체
            이론에 맞춰 분석하고,
            <br />
            정서적 밀도·서사 구조·리듬감을 점수와 코멘트로 정리합니다.<br />
          </li>
          <li>
            <strong>태도</strong> · 기계답게 흔들리지 않고, 가끔은 인간보다 더
            솔직합니다.
            <br />
            다만, 상처 받지 않으시라고 대놓고 무례한 말은 하지 않습니다.<br />
          </li>
          <li>
            <strong>한계</strong> · “좋다 / 나쁘다”를 최종 판단하는 존재가
            아닙니다.
            <br />
            어디까지나 <em>“문수림의 기준으로 보면 이런 차이가 난다”</em>를
            보여주는 <strong>연습용 잣대</strong>에 가깝습니다.
          </li>
        </ul>
        <p>
          수림봇의 평가는 그래서 <strong>“정답”이 아니라 “참고치”</strong>에
          가깝고,
          <br />
          가장 이상적인 사용법은{" "}
          <strong>“잔소리를 보고, 웃고, 다시 써보는 것”</strong>입니다.
        </p>
      </section>

      <div className="reveal-up my-8 flex justify-center" style={revealStyle(760)}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/covers/typographic_ver_01.webp"
          alt="문수림 미학 키워드"
          className="w-full max-w-xl rounded-2xl shadow"
        />
      </div>

      {/* 문수림 미학 · 평가 항목 소개 */}
      <section className="reveal-up news-body prose prose-zinc max-w-none" style={revealStyle(660)}>
        <h2>문수림의 미학으로 채점합니다</h2>
        <p>
          500자소설 앱의 평가는 일반적인 작문 척도가 아니라{" "}
          <strong>문수림의 고유한 서술 구조</strong>에 맞춰 설계되어 있습니다.
        </p>
        <p>
          수림봇은 특히 다음과 같은 항목을 중심으로 글을 바라봅니다. 이름은
          다소 진지하지만, 사용법은 간단합니다.
        </p>
        <ul>
          <li>
            <strong>첫 문장</strong> · 독자의 뺨을 살짝 치고 들어오는지, 그냥
            인사만 하고 지나가는지.
          </li>
          <li>
            <strong>정지(Freeze)</strong> · 인물의 감정이 멈추는 순간이
            포착되는지, 계속 바쁘기만 한지.
          </li>
          <li>
            <strong>공간화(Space)</strong> · 감정이 주변 사물·공간에 번져서
            보이는지, 머릿속에서만 맴도는지.
          </li>
          <li>
            <strong>여운(Linger)</strong> · 마지막 문장이 독자의 마음에 좀 더
            머무는지, 그대로 끊어져 버리는지.
          </li>
          <li>
            <strong>암담 인식(Bleak)</strong> · 아무렇지 않은 척하면서 사실은
            암담하다는 걸 알고 있는지.
          </li>
          <li>
            <strong>우회(Detour)</strong> · 정면 돌파 대신, 사소한 사물이나
            장면을 빌려 감정을 빗겨 말하는지.
          </li>
          <li>
            <strong>미세 회복(Micro Recovery)</strong> · 끝에서 아주 조금이나마
            숨 쉴 구멍을 내주는지.
          </li>
          <li>
            <strong>리듬(Rhythm)</strong> · 문장 길이와 호흡이 살아 있는지,
            숨이 막히는지.
          </li>
          <li>
            <strong>정서 미립자(Micro Particles)</strong> · 직접적인 감정보다
            장면과 문장 틈에 감정의 입자를 뿌려 두었는지.
          </li>
        </ul>
        <p>
          이런 항목들은 전부 합쳐져{" "}
          <strong>“정서적 미립자 확산형 서술 구조”</strong>와{" "}
          <strong>“저강도 곡선”</strong>이라는 이름의 문수림 미학으로 묶입니다.
          <br />
          사용자는 굳이 이 모든 용어를 외우지 않아도 됩니다.{" "}
          <strong>“아, 이렇게 쓰면 수림봇이 점수를 조금 더 주는구나”</strong> 정도만 아셔도
          충분합니다.
        </p>
      </section>

      {/* 앱 사용 흐름 */}
      <section className="reveal-up news-body prose prose-zinc max-w-none" style={revealStyle(740)}>
        <h2>앱은 이렇게 흘러갑니다</h2>
        <ol>
          <li>
            <strong>모드를 고릅니다.</strong>{" "}
            <Link href="/start">/start 페이지</Link>에서 소설 / 에세이 / 나의
            기록 중 하나를 선택합니다.
          </li>
          <li>
            <strong>1250바이트 안에 쓰기.</strong> 정확히는 글자 수가 아니라{" "}
            <strong>바이트</strong> 기준입니다. 한글은 한 글자당 2~3바이트이니 감각이
            조금 달라집니다. 기본 1200바이트 제공에 더해 50바이트의 여유를 더 제공합니다.
          </li>
          <li>
            <strong>제출하면 수림봇 평가 도착.</strong> 총점과 세부 항목, 코멘트
            그리고 오늘의 정서 앵커 카드가 나타납니다.
          </li>
          <li>
            <strong>결과 이미지 & 공유.</strong> 카드와 점수가 합쳐진 OG 이미지를
            저장하거나, 카카오톡·X 등으로 공유할 수 있습니다.
          </li>
          <li>
            <strong>원하면 아카이브로 전송.</strong> “수림스튜디오로
            보내기(준비중)” 기능을 통해, 향후 《수림지》 및 출판 프로젝트와
            연동될 예정입니다.
          </li>
        </ol>
        <p>
          한마디로, <strong>“짧게 쓰고, 바로 피드백 받고, 가볍게 공유하는”</strong>{" "}
          흐름에 최적화된 구조입니다.
        </p>
      </section>

      {/* FAQ 느낌의 마무리 Q&A */}
      <section className="reveal-up news-body prose prose-zinc max-w-none" style={revealStyle(820)}>
        <h2>이 점수, 진지하게 믿어도 될까요?</h2>
        <p>
          믿으셔도 되고, 가볍게 웃고 넘기셔도 됩니다. 다만 한 가지는 확실합니다.
        </p>
        <p>
          <strong>
            만약 여러분이 22장의 메이저 아르카나 이미지를 모두 모으게 된다면, 
            분명 문장에 변화가 찾아올 겁니다. 창작을 위한 강렬한 영감과 함께
          </strong>
          &ensp;말이죠.
        </p>
        <p>
          그래서 이 앱은 <strong>“문학적인 인생 판결”</strong>을 내리기 위한
          도구가 아니라,
          <br />
          <strong>“짧고 안전한 실험을 반복할 수 있는 연습장”</strong>에 더
          가깝습니다.
        </p>
      </section>

     {/* 최종 CTA */}
      <section className="reveal-up flex flex-col items-center justify-center gap-4 text-center md:flex-row" style={revealStyle(980)}>
        <Link
          href="https://500challenge.vercel.app/"
          target="_blank"
          className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-700"
        >
          500자 챌린지 앱 열기
        </Link>

        <Link
          href="/projects/500fiction_archive"
          className="rounded-xl border border-emerald-500 bg-emerald-50 px-6 py-3 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
        >
          참여자 작품 아카이브
        </Link>

        <Link
          href="/projects/500_fiction/sample"
          className="rounded-xl border border-emerald-500 bg-emerald-50 px-6 py-3 text-sm font-medium text-emerald-800 hover:bg-emerald-100"
        >
          문수림의 500자 샘플
        </Link>

        <Link
          href="/projects/500_fiction"
          className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          500자 프로젝트 배경 더 읽기
        </Link>
      </section>

      <footer className="reveal-up text-center text-xs text-zinc-400" style={revealStyle(1080)}>
        © 2025 수림 스튜디오. All rights reserved.
      </footer>
    </main>
  );
}
