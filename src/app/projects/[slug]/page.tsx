import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// 슬러그별 상세 데이터 (초기엔 여기서 관리, 나중에 /src/data/projects.ts로 분리 권장)
type Status = "active" | "planned" | "archive";

type ProjectDetail = {
  title: string;
  summary: string;
  status: Status;
  tags: string[];
  hero?: string; // public 기준 경로
  og?: string;   // OG 이미지 별도 지정시
  // 본문 섹션
  intro: string[];
  highlights?: { title: string; items: string[] }[];
  cta?: { label: string; href: string; variant?: "primary" | "outline" }[];
};

const PROJECT_DETAIL: Record<string, ProjectDetail> = {
  // 예시 1: 토실토실
  tosiltosil: {
    title: "토실토실 프로젝트",
    summary:
      "돌봄의 에너지를 확장해 유기토끼 문제를 이야기와 행동으로 연결하는 현재진행형 프로젝트.",
    status: "active",
    tags: ["캠페인", "돌봄", "출판"],
    hero: "/projects/tosiltosil-hero.jpg",
    og: "/projects/tosiltosil-hero.jpg",
    intro: [
      "『토실토실 토끼를 안았습니다』를 기반으로, 유기동물 문제를 이야기와 예술로 다시 생각합니다.",
      "책·캠페인·디지털 참여 콘텐츠를 잇는 순환 구조로, 누구나 돌봄의 주체가 되도록 설계했습니다.",
    ],
    highlights: [
      {
        title: "핵심 메시지",
        items: [
          "돌봄의 에너지 확장: 개인의 선의에서 사회적 연대로",
          "유기토끼 문제를 생활 동선과 콘텐츠에 연결",
          "출판-웹-오프라인을 잇는 참여 생태계",
        ],
      },
    ],
    cta: [
      { label: "책 정보 보기", href: "/books/tosiltosil", variant: "primary" },
      { label: "캠페인 참여하기", href: "/project/tosiltosil-care", variant: "outline" },
    ],
  },

  // 예시 2: 500자소설
  "500chars": {
    title: "500자소설 프로젝트",
    summary:
      "초단편 500자 서사 실험. 101편 연재와 문체 이론 정리, 단행본 발간까지의 여정.",
    status: "archive",
    tags: ["서사실험", "문체연구"],
    hero: "/projects/500chars-thumb.jpg",
    og: "/covers/500chars-hero.jpg",
    intro: [
      "스레드 500자 제약을 서사 완결 규칙으로 전환해 실험했습니다.",
      "연재 데이터를 축적하며 ‘정서적 미립자 확산형 서술 구조’ 등 문체 이론을 정식화했습니다.",
    ],
    highlights: [
      {
        title: "실험 규칙",
        items: [
          "시가 아닌 소설: 인물, 욕망, 갈등",
          "간결한 문장과 대중적 이해 가능성",
          "명확한 메시지, 다의적 해석",
        ],
      },
    ],
    cta: [{ label: "관련 뉴스 읽기", href: "/news/500novel", variant: "outline" }],
  },

  // 필요 시 다른 프로젝트 계속 추가
};

// ─────────────────────────────────────────────────────────────
//   동적 메타데이터
// ─────────────────────────────────────────────────────────────
type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = PROJECT_DETAIL[params.slug];
  if (!data) return {};
  const title = `${data.title} – 수림 스튜디오`;
  const description = data.summary;
  const og = data.og || data.hero;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: og ? [{ url: og }] : [],
      type: "article",
      locale: "ko_KR",
    },
    alternates: { canonical: `/project/${params.slug}` },
  };
}

// SSG: 빌드 타임에 정적 경로 생성
export async function generateStaticParams() {
  return Object.keys(PROJECT_DETAIL).map((slug) => ({ slug }));
}

// ─────────────────────────────────────────────────────────────
//   UI
// ─────────────────────────────────────────────────────────────
export default function ProjectDetailPage({ params }: Props) {
  const data = PROJECT_DETAIL[params.slug];
  if (!data) notFound();

  const { title, summary, status, tags, hero, intro, highlights, cta } = data;

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-12">
      {/* 브레드크럼 */}
      <nav className="text-sm text-zinc-500">
        <Link href="/project" className="hover:underline">
          Projects
        </Link>
        <span className="mx-1">/</span>
        <span className="text-zinc-700">{title}</span>
      </nav>

      {/* 히어로 */}
      <section className="relative w-full h-[320px] md:h-[420px] rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-100">
        {hero && (
          <Image
            src={hero}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        )}
        <StatusBadge status={status} />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white p-6">
          <h1 className="text-3xl md:text-5xl font-semibold mb-3">{title}</h1>
          <p className="max-w-2xl text-sm md:text-base text-zinc-200">{summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-0.5 rounded-full bg-emerald-50/10 border border-white/30"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 본문 */}
      <section className="prose prose-zinc max-w-none news-body">
        {intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {highlights?.map((blk, i) => (
          <div key={i}>
            <h3>{blk.title}</h3>
            <ul>
              {blk.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* CTA */}
      {cta && cta.length > 0 && (
        <section className="flex flex-col md:flex-row gap-4 justify-center">
          {cta.map((b, i) =>
            b.variant === "outline" ? (
              <Link
                key={i}
                href={b.href}
                className="px-6 py-3 rounded-xl border border-emerald-600 text-emerald-700 font-medium hover:bg-emerald-50 text-center"
              >
                {b.label}
              </Link>
            ) : (
              <Link
                key={i}
                href={b.href}
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 text-center"
              >
                {b.label}
              </Link>
            )
          )}
        </section>
      )}

      {/* 푸터 */}
      <footer className="text-center text-xs text-zinc-400">
        © 2025 수림 스튜디오. All rights reserved.
      </footer>
    </main>
  );
}

// 상태 뱃지
function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; className: string }> = {
    active: {
      label: "진행중",
      className: "bg-emerald-600/90 text-white border border-white/30 shadow-sm",
    },
    planned: {
      label: "예정",
      className: "bg-amber-500/90 text-white border border-white/30 shadow-sm",
    },
    archive: {
      label: "아카이브",
      className: "bg-zinc-700/80 text-white border border-white/30 shadow-sm",
    },
  };
  const { label, className } = map[status];
  return (
    <span className={`absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full ${className}`}>
      {label}
    </span>
  );
}
