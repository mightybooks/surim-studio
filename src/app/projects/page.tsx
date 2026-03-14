import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects – 수림 스튜디오",
  description:
    "수림 스튜디오의 진행중/예정/아카이브 프로젝트를 한눈에 확인하세요.",
  openGraph: {
    title: "Projects – 수림 스튜디오",
    description:
      "진행중 캠페인부터 실험 앱, 출판 프로젝트까지 전체 목록.",
    images: ["/og/projects.jpg"],
  },
  alternates: { canonical: "/projects" },
};

type Status = "active" | "planned" | "archive" | "application";

type Project = {
  slug: string;
  title: string;
  summary: string;
  status: Status;
  tags: string[];
  thumb?: string;
  href?: string;
};

const PROJECTS: Project[] = [
  {
    slug: "tosiltosil",
    title: "토실토실 프로젝트",
    summary: "유기동물 문제를 이야기와 행동으로 연결하는 참여형 캠페인 페이지",
    status: "active",
    tags: ["캠페인", "돌봄", "출판"],
    thumb: "/projects/tosiltosil_thumb.webp",
  },
  {
    slug: "500_fiction",
    title: "500자 소설 프로젝트",
    summary:
      "과연 500자 안에 얼마나 밀도 있는 서사 생성이 가능할까? 개인 창작 실험에서 시작된 독자 참여형 프로젝트",
    status: "active",
    tags: ["캠페인", "500자", "출판"],
    thumb: "/projects/500_fiction_thumb.webp",
  },
  {
    slug: "surimitosilly",
    title: "수리미와 토실이",
    summary: "수림 스튜디오 마스코트 캐릭터, 수리미와 토실이 탄생과 활동",
    status: "active",
    tags: ["캠페인", "500자", "출판"],
    thumb: "/projects/surimitosilly_hero.webp",
  },
  {
    slug: "winterwas",
    title: "겨울이었다",
    summary: "이미 끝난 사건 이후의 세계를 기록하는 감정 서술형 마이크로 픽션 실험",
    status: "active",
    tags: ["겨울이었다", "구조화", "패턴"],
    thumb: "/projects/winterwas_hero.webp",
  },
  {
    slug: "500fiction_app",
    title: "500자소설 앱",
    summary:
      "독자 참여형 초단편 생성/평가 웹앱. 작품 공유 → 프로젝트 카테고리 연동까지 목표.",
    status: "application",
    tags: ["웹앱", "참여"],
    thumb: "/projects/500fiction_app_thumb.webp",
  },
  {
    slug: "tosiltosil-care",
    title: "토실토실 돌봄에너지 앱",
    summary:
      "나의 돌봄에너지를 키우고, 확산해 보자! → 돌봄에너지 자가 측정 앱",
    status: "application",
    tags: ["캠페인", "참여"],
    thumb: "/projects/tosil_care_thumb.webp",
  },
  {
    slug: "500fiction_archive",
    title: "500자소설 독자 참여 아카이브",
    summary: "초단편 500자 서사 실험...",
    status: "archive",
    tags: ["서사실험", "문체연구"],
    thumb: "/projects/500fiction_archive_thumb.webp",
  },
  {
    slug: "tosiltosil-archive",
    title: "돌봄에너지 확산 응원 아카이브",
    summary: "돌봄에너지 자가측정 앱을 사용한 이용자들의 응원메시지 모음",
    status: "archive",
    tags: ["캠페인", "에너지확산"],
    thumb: "/projects/tosiltosil_archive_thumb.webp",
  },
  {
    slug: "500funding-archive",
    title: "500자소설 펀딩 도전 아카이브",
    summary: "수림서가 첫 펀딩 도전의 기록",
    status: "archive",
    tags: ["펀딩", "500자소설", "도전 기록"],
    thumb: "/projects/500funding_archive_thumb.webp",
  },
];

const groups: { key: Status; label: string; desc: string }[] = [
  { key: "active", label: "진행중", desc: "현재 운영 중인 프로젝트" },
  { key: "application", label: "웹앱", desc: "사용자들 이용, 공유 목적" },
  { key: "planned", label: "예정", desc: "준비 및 개발 예정" },
  { key: "archive", label: "아카이브", desc: "완료·중단·기록 목적" },
];

function revealStyle(delay: number) {
  return {
    animationDelay: `${delay}ms`,
  };
}

export default function ProjectIndexPage() {
  return (
    <>
      <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        <div className="space-y-14 md:space-y-16">
          {/* 헤더 */}
          <header className="space-y-4">
            <div
              className="reveal-up"
              style={revealStyle(80)}
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-800/80">
                Literary Studio / Projects Archive
              </p>
            </div>

            <div
              className="reveal-up"
              style={revealStyle(180)}
            >
              <h1 className="text-3xl font-semibold tracking-[-0.03em] text-emerald-900 md:text-4xl">
                Projects
              </h1>
            </div>

            <div
              className="reveal-up"
              style={revealStyle(300)}
            >
              <p className="max-w-2xl text-[15px] leading-7 text-zinc-600 md:text-base">
                수림 스튜디오의 캠페인, 앱, 출판 프로젝트를 모았습니다.
                진행중인 실험부터 기록 보관용 아카이브까지 한눈에 확인할 수 있습니다.
              </p>
            </div>
          </header>

          {/* 그룹 섹션 */}
          {groups.map(({ key, label, desc }, groupIndex) => {
            const items = PROJECTS.filter((p) => p.status === key);
            if (items.length === 0) return null;

            const sectionBaseDelay = 420 + groupIndex * 180;

            return (
              <section key={key} className="space-y-5">
                <div
                  className="reveal-up flex items-baseline justify-between border-b border-zinc-200/80 pb-3"
                  style={revealStyle(sectionBaseDelay)}
                >
                  <h2 className="text-2xl font-semibold tracking-[-0.03em] text-emerald-800">
                    {label}
                  </h2>
                  <p className="text-sm text-zinc-500">{desc}</p>
                </div>

                <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((p, itemIndex) => {
                    const cardDelay = sectionBaseDelay + 100 + itemIndex * 90;

                    return (
                      <li
                        key={p.slug}
                        className="reveal-up"
                        style={revealStyle(cardDelay)}
                      >
                        <Link
                          href={p.href ?? `/projects/${p.slug}`}
                          className="group block overflow-hidden rounded-2xl border border-zinc-200 bg-white/65 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_14px_34px_rgba(0,0,0,0.06)]"
                        >
                          {/* 썸네일 */}
                          <div className="relative h-44 w-full bg-zinc-100">
                            {p.thumb ? (
                              <Image
                                src={p.thumb}
                                alt={p.title}
                                fill
                                className="object-cover transition duration-500 group-hover:scale-[1.02]"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            ) : (
                              <div className="absolute inset-0 grid place-items-center text-sm text-zinc-400">
                                이미지 준비중
                              </div>
                            )}
                            <StatusBadge status={p.status} />
                          </div>

                          {/* 텍스트 */}
                          <div className="space-y-3 p-5">
                            <h3 className="text-lg font-semibold tracking-[-0.02em] text-zinc-900 transition group-hover:text-emerald-800">
                              {p.title}
                            </h3>

                            <p className="line-clamp-3 text-sm leading-relaxed text-zinc-600">
                              {p.summary}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-1">
                              {p.tags.map((t) => (
                                <span
                                  key={t}
                                  className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-xs text-emerald-700"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { label: string; className: string }> = {
    active: {
      label: "진행중",
      className:
        "bg-emerald-600/90 text-white border border-white/30 shadow-sm",
    },
    planned: {
      label: "예정",
      className:
        "bg-amber-500/90 text-white border border-white/30 shadow-sm",
    },
    application: {
      label: "웹앱",
      className:
        "bg-purple-600/70 text-white border border-white/30 shadow-sm",
    },
    archive: {
      label: "아카이브",
      className:
        "bg-zinc-700/80 text-white border border-white/30 shadow-sm",
    },
  };

  const { label, className } = map[status];

  return (
    <span
      className={`absolute left-3 top-3 rounded-full px-2 py-0.5 text-xs ${className}`}
    >
      {label}
    </span>
  );
}