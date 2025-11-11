import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";
import CopyLinkButton from "@/components/CopyLinkButton";

const TITLE = "왜 문수림은 500자소설을 연구했는가";
const DESCRIPTION =
  "초단편 500자 서사 실험의 배경, 101편 연재 완료까지의 과정, 그리고 독자 참여형 생태계 구상.";
const PUBLISHED_AT = "2025-11-10";
const UPDATED_AT = "2025-11-10";
const HERO = "/covers/500novel_hero.webp";
const TAGS = ["500자소설", "실험 서사", "문체 연구", "수림 스튜디오"];

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "article",
    locale: "ko_KR",
    images: HERO ? [{ url: HERO }] : [],
  },
  alternates: { canonical: "/news/500novel" },
};

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  } catch {
    return dateStr;
  }
}

      
export default function News500NovelPage() {
  return (
     <>
      <ReadingProgress />
    <main className="max-w-3xl mx-auto px-5 py-10 space-y-10">
      <nav className="text-sm text-zinc-500">
        <Link href="/news" className="hover:underline">News</Link>
        <span className="mx-1">/</span>
        <span className="text-zinc-700">500자소설</span>
      </nav>

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-emerald-900">{TITLE}</h1>
        <p className="text-zinc-600">{DESCRIPTION}</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500">
          <time dateTime={PUBLISHED_AT}>발행 {formatDate(PUBLISHED_AT)}</time>
          <span>•</span>
          <time dateTime={UPDATED_AT}>수정 {formatDate(UPDATED_AT)}</time>
          <span>•</span>
          <div className="flex gap-2">
            {TAGS.map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">#{t}</span>
            ))}
          </div>
          <span className="ml-auto" />
          {/* @ts-expect-error Server Component에서 Client Component import */}
          <CopyLinkButton />
        </div>
      </header>

      {HERO && (
        <figure className="relative w-full h-[260px] md:h-[360px] rounded-2xl overflow-hidden shadow">
          <Image src={HERO} alt="500자소설 히어로" fill className="object-cover" priority />
        </figure>
      )}

      <article className="prose prose-zinc max-w-none news-body">
        <h2>왜 ‘500자’였는가?</h2>

        <h3>1. 연구배경</h3>
        <p>이미 웹문화의 발전과 함께 프로와 아마추어의 경계는 상당히 모호해진 상태다.</p>
        <p>팔리지 않기 시작한 문학 작품들 덕에 문단은 권위를 잃어가고 있고, 도전적으로 글을 쓰는 사람들은 플랫폼 시스템에 기대고 있다.</p>
        <p>이런 상황에서 ‘스레드’라는 SNS가 새롭게 등장했다. 500자 이내로 자신을 드러내야 하는 플랫폼의 확고한 스타일.</p>
        <p>그렇다면, 500자 이내로 서사가 완성된다는 걸 보여줄 수 있다면, 그 자체로 하나의 놀이나 새로운 웹문화가 될 수 있지 않을까?</p>

        <h3>2. 명확한 목적지, 101편.</h3>
        <p>월화수목금, ‘1일 1마감 형태 평일 연재로 101편을 채워보자’가 1차 목표였다. 여기에 특별한 목적이 있지는 않았다.</p>
        <p>그 정도면 충분히 데이터가 쌓일 수 있을 거란 확신이 있었고, 500자 정도는 스스로 정해둔 스케줄 안에서 소화 가능하리라 판단했었다.</p><br/>
        <p>물론, 그 판단은 오만이었다.</p>

        <h3>3. 연재 중단과 점점 구체화 되는 실험</h3>
        <p>최초에는 ‘시가 아닌 소설을 써야 한다’라는 압박 외에는 없었지만, 과중한 업무로 중간중간 원치 않는 휴식기에 접어들 때마다 스스로 규칙을 더 다듬어 나가게 되었다.</p>
        <ul>
          <li>시가 아닌 소설이다. 등장인물이 있고, 갈등이나 욕망이 있어야 한다.</li>
          <li>최대한 간결한 문장으로 담백하게 쓴다.</li>
          <li>대중을 위해 어려운 단어나 배경 지식이 없어도 직관적으로 이해가 될 법한 이야기만을 쓴다.</li>
          <li>메시지는 명확하지만 그에 따른 해석은 최대한 여러 갈래가 되도록 한다.</li>
        </ul>

        <h3>4. 문체와 이론</h3>
        <p>위 규칙을 기본으로 하면서 스스로 정립한 스타일이 자연스럽게 녹아들 수 있게 노력을 기울였다. 이런 노력은 창작 과정이 나만의 고유한 행위라는 것을 명확히 하기 위함이다.</p>
        <ul>
          <li><strong>세계관</strong> - 단절된 개체들의 집합이 아니라, 시간·장소·언어·문명·종(種)을 초월하여 인간의 근원적 욕망과 기억이 서로를 반향하는 ‘연결망’으로 구성되어 있다는 인식.</li>
          <li><strong>Aggro to Art</strong> - 자극적이거나 황당한 ‘어그로’적 요소를 문학적 서사로 환원시키는 문수림 고유의 변환 템플릿이다. 첫 문장부터 모순적 배치나 정서적 간극이 있는 소재를 삽입한 후, 변환을 통해 서사를 종결로 이끈다.</li>
          <li><strong>저강도곡선</strong> - 감정의 극단이 아닌 결핍의 인정과 우회적인 미세 회복의 곡선으로 서사를 구성하는 문수림식 정서 구조다.</li>
          <li><strong>정서적 미립자 확산형 서술 구조</strong> - 등장인물의 심리적 정지, 그에 따른 주변 공간의 형상화, 뒤늦게 이어지는 여운의 3단 구성을 통해 입체적인 감정 곡선을 그리게 한다.</li>
        </ul>

        <h3>5. 독자 참여 생태계</h3>
        <p>그렇다면, ‘500자소설’은 특정 플랫폼에서나 먹힐 법한 웹문화로 마감되는 것일까?</p>
        <p>창작과 독서는 이미 그 자체로 인정받은 내밀한 정서적 소통 방식이다. 현대 사회에서는 이걸 어떻게 더 확장하느냐에 따라 작품의 가치가 달리진다.</p>
        <p>클래식한 종이책에서부터 앱, SNS, 홈페이지 프로젝트로 연동되는 순환 설계를 통해 보다 많은 독자들에게 실시간으로 다가갈 수 있는 콘텐츠로 제작하는 게 핵심이다.</p>
        <ul>
          <li>종이책 단행본 발매 - 책에는 작품 별로 다양한 물음을 직접적으로 제시.</li>
          <li>단행본 발매와 함께 온라인 웹앱 출시.</li>
          <li>앱을 통해 독자들도 500자소설쓰기에 도전하고, AI를 통해 실시간으로 문수림의 작품들과 어떤 면에서 차이가 나는지 평가 받을 수 있다.</li>
          <li>앱의 결과를 SNS를 통해 친구, 지인들과 공유한다.</li>
          <li>공유 결과를 수림 스튜디오 홈페이지 프로젝트 카테고리로 보내면, 작품들 중 일부를 선정하여 매월 발행되는 《월간 수림지》에 수록한다.</li>
        </ul>
      </article>

      <aside className="mt-10 rounded-2xl border border-zinc-200 p-5 bg-white/60">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 overflow-hidden rounded-full">
            <Image src="/profile/moonsurim.png" alt="문수림" fill className="object-cover" />
          </div>
          <div>
            <p className="font-medium text-zinc-800">문수림</p>
            <p className="text-sm text-zinc-500">수림 스튜디오 총괄자 · 소설가</p>
          </div>
        </div>
      </aside>

      <section className="rounded-2xl border border-emerald-100 p-6 bg-emerald-50/60">
  <h3 className="text-lg font-semibold text-emerald-900 mb-2">더 읽기</h3>
  <p className="text-zinc-700 mb-4">
    500자소설의 앱, 아카이브, 책으로 확장되는 여정을 확인하세요.
  </p>

  <div className="flex flex-wrap gap-3">
    {/* 1. 앱 도전해보기 */}
    <Link
      href="#"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition"
    >
      앱 도전해보기
    </Link>

    {/* 2. 아카이브 보러가기 */}
    <Link
      href="/projects/500chars"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-white hover:bg-emerald-600 transition"
    >
      아카이브 보러가기
    </Link>

    {/* 3. 책 보러가기 */}
    <Link
      href="#"
      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-400 text-white hover:bg-emerald-500 transition"
    >
      책 보러가기
    </Link>
  </div>
</section>

      <nav className="flex justify-between text-sm text-emerald-800">
        <Link href="/news" className="hover:underline">← 목록으로</Link>
        <div className="flex gap-4">
          <Link href="/news/tosiltosil-care-energy" className="hover:underline">다음 글: 돌봄의 에너지 확장</Link>
        </div>
      </nav>

      <footer className="text-center text-xs text-zinc-400">© 2025 수림 스튜디오. All rights reserved.</footer>
    </main>
    </>
  );
}