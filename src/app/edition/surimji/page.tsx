import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "수림지 | 문수림이 쓰고 편집하는 디지털 문예지",
  description:
    "《수림지》는 작가 문수림이 수림 스튜디오에서 발행하는 디지털 문예지입니다. 500자 소설, PPL 소설, 메타버스 원고, 문예경연대회 수상작과 창작 실험 기록을 수록합니다.",
  alternates: {
    canonical: "https://surimstudio.com/edition/surimji",
  },
  openGraph: {
    title: "수림지 | 문수림이 쓰고 편집하는 디지털 문예지",
    description:
      "500자 소설, PPL 소설, 메타버스 원고, 창작 실험 기록을 담는 수림 스튜디오의 디지털 문예지입니다.",
    url: "https://surimstudio.com/edition/surimji",
    siteName: "수림 스튜디오",
    type: "website",
    images: [
      {
        url: "https://surimstudio.com/og/surimji-og.png",
        alt: "수림지 Vol.0 창간호 표지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "수림지 | 문수림이 쓰고 편집하는 디지털 문예지",
    description:
      "500자 소설, PPL 소설, 메타버스 원고, 창작 실험 기록을 담는 수림 스튜디오의 디지털 문예지입니다.",
    images: ["https://surimstudio.com/surimji/issue-0/cover.webp"],
  },
};

function revealStyle(delay: number) {
  return { animationDelay: `${delay}ms` };
}

export default function EditionSurimjiPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 px-6 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold text-emerald-900">수림지</h1>
        <p className="reveal-up text-zinc-700" style={revealStyle(300)}>
          수림 스튜디오가 발행하는 읽을거리들을 모아두는 곳입니다.
        </p>
      </header>

      <section
        className="reveal-up overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)]"
        style={revealStyle(420)}
      >
        <div className="grid gap-6 p-6 md:grid-cols-[220px_1fr] md:items-center">
          <div className="mx-auto w-full max-w-[220px] overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-sm">
            <Image
              src="/surimji/issue-0/cover.webp"
              alt="수림지 vol.0 표지"
              width={440}
              height={620}
              className="h-auto w-full object-cover"
              priority
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm font-medium text-emerald-800">
                창간호
              </p>
              <h2 className="text-2xl font-semibold text-emerald-950">
                수림지 vol.0
              </h2>
              <p className="max-w-2xl text-sm leading-6 text-zinc-700">
                로그인 후 무료로 전체 열람할 수 있는 수림지 창간호입니다.
                문학, 기술, 사람의 사이에서 시작된 수림 스튜디오의 첫 번째
                실험 기록을 확인하실 수 있습니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/edition/surimji/issue-0"
                className="inline-flex items-center rounded-full border border-emerald-900 bg-emerald-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                수림지 vol.0 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div
        className="reveal-up rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-6"
        style={revealStyle(520)}
      >
        <div className="flex flex-wrap gap-3">
          <Link
            href="/edition/surimseoga"
            className="inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[color:var(--fg)] transition hover:bg-[#F5EEDC]"
          >
            수림서가 보러가기
          </Link>
          <Link
            href="/edition/goods"
            className="inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[color:var(--fg)] transition hover:bg-[#F5EEDC]"
          >
            굿즈 보러가기
          </Link>
        </div>
      </div>
    </main>
  );
}
