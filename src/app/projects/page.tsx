// src/app/project/page.tsx
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
    images: ["/og/projects.jpg"], // 선택: 없으면 제거 가능
  },
  alternates: { canonical: "/projects" },
};

type Status = "active" | "planned" | "archive";

type Project = {
  slug: string;
  title: string;
  summary: string;
  status: "active" | "planned" | "archive";
  tags: string[];
  thumb?: string;
  href?: string; // ← 있으면 이 경로로 이동
};

// 파일 위치: src/app/projects/page.tsx  ← 복수형으로!

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
    slug: "500chars",
    title: "500자소설 프로젝트",
    summary: "초단편 500자 서사 실험...",
    status: "archive",
    tags: ["서사실험", "문체연구"],
    thumb: "/projects/500novel_thumb.webp",
  },
  {
    slug: "500novel",
    title: "500자소설 앱",
    summary:
      "독자 참여형 초단편 생성/평가 웹앱. 작품 공유 → 프로젝트 카테고리 연동까지 목표.",
    status: "planned",
    tags: ["웹앱", "참여"],
    thumb: "/projects/500novel_app_thumb.webp",
    href: "/news/500novel", 
  },
  {
    slug: "tosiltosil-care",
    title: "토실토실 돌봄에너지 앱",
    summary:
      "나의 돌봄에너지를 키우고, 확산해 보자! → 돌봄에너지 자가 측정 앱",
    status: "planned",
    tags: ["캠페인", "참여"],
    thumb: "/projects/tosil_care_thumb.webp",
  },
  // 필요 시 자유롭게 추가
];

// 상태별 그룹화
const groups: { key: Status; label: string; desc: string }[] = [
  { key: "active", label: "진행중", desc: "현재 운영 중인 프로젝트" },
  { key: "planned", label: "예정", desc: "준비 및 개발 예정" },
  { key: "archive", label: "아카이브", desc: "완료·중단·기록 목적" },
];

export default function ProjectIndexPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12 space-y-14">
      {/* 헤더 */}
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-emerald-900">Projects</h1>
        <p className="text-zinc-600">
          수림 스튜디오의 캠페인, 앱, 출판 프로젝트를 모았습니다.
        </p>
      </header>

      {/* 그룹 섹션 */}
      {groups.map(({ key, label, desc }) => {
        const items = PROJECTS.filter((p) => p.status === key);
        if (items.length === 0) return null;

        return (
          <section key={key} className="space-y-4">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold text-emerald-800">{label}</h2>
              <p className="text-sm text-zinc-500">{desc}</p>
            </div>

            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <li key={p.slug}>
<Link
  href={p.href ?? `/projects/${p.slug}`} 
  className="group block rounded-2xl overflow-hidden border border-zinc-200 hover:border-emerald-200 bg-white/60 shadow-sm hover:shadow-md transition"
>
                    {/* 썸네일 */}
                    <div className="relative w-full h-44 bg-zinc-100">
                      {p.thumb ? (
                        <Image
                          src={p.thumb}
                          alt={p.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 grid place-items-center text-zinc-400 text-sm">
                          이미지 준비중
                        </div>
                      )}
                      <StatusBadge status={p.status} />
                    </div>

                    {/* 텍스트 */}
                    <div className="p-5 space-y-2">
                      <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-emerald-800">
                        {p.title}
                      </h3>
                      <p className="text-sm text-zinc-600 leading-relaxed line-clamp-3">
                        {p.summary}
                      </p>

                      {/* 태그 */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {p.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </main>
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
    archive: {
      label: "아카이브",
      className:
        "bg-zinc-700/80 text-white border border-white/30 shadow-sm",
    },
  };

  const { label, className } = map[status];
  return (
    <span
      className={`absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full ${className}`}
    >
      {label}
    </span>
  );
}
