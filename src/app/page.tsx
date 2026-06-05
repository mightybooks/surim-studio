"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

type HeroCard = {
  label: string;
  title: string;
  href: string;
  description: string;
  external?: boolean;
};

const revealTiming = {
  eyebrow: 200,
  headline: 600,
  description: 900,
  footer: 1020,
  card1: 1100,
  card2: 1200,
  card3: 1300,
  auth: 1420,
} as const;

function EditorialCard({
  card,
  delay,
  ready,
  reduceMotion,
}: {
  card: HeroCard;
  delay: number;
  ready: boolean;
  reduceMotion: boolean;
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-emerald-800/80">
            {card.label}
          </p>
          <h3 className="mt-3 text-xl font-medium tracking-[-0.02em] text-[color:var(--fg)]">
            {card.title}
          </h3>
        </div>
        <span className="pt-1 text-sm text-emerald-800/70 transition-transform duration-300 group-hover:translate-x-0.5">
          ↗
        </span>
      </div>
      <p className="mt-4 max-w-xs text-sm leading-6 text-[color:var(--muted)]">
        {card.description}
      </p>
    </>
  );

  const className = [
    "group block rounded-[1.75rem] border border-[color:var(--border)] bg-[color:var(--bg-elev)]/88 px-6 py-6 shadow-[0_10px_30px_rgba(26,26,26,0.05)] backdrop-blur-[2px]",
    "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
    "hover:-translate-y-[3px] hover:shadow-[0_18px_36px_rgba(26,26,26,0.09)]",
    ready || reduceMotion ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0",
  ].join(" ");

  const style = reduceMotion ? undefined : { transitionDelay: `${delay}ms` };

  if (card.external) {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={card.href} className={className} style={style}>
      {content}
    </Link>
  );
}

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [ready, setReady] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReduceMotion(mediaQuery.matches);

    updateMotion();
    mediaQuery.addEventListener?.("change", updateMotion);

    const frame = window.requestAnimationFrame(() => {
      setReady(true);
    });

    return () => {
      mediaQuery.removeEventListener?.("change", updateMotion);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const isEmailVerified = !!user?.email_confirmed_at;

  const cards = useMemo<HeroCard[]>(
    () => [
      {
        label: "수림지 창간호",
        title: "수림지 vol.0",
        description: "수림 스튜디오의 웹매거진 《수림지》 창간호 안내 페이지입니다.",
        href: "/edition/surimji/issue-0",
      },
      {
        label: "소설 성립을 위한 최소한의 단위를 실험하다",
        title: "500자 소설 프로젝트",
        description: "프로젝트 '500자 소설' 안내 페이지입니다.",
        href: "/projects/500_fiction",
      },
      {
        label: "Web App",
        title: "500자 챌린지 웹앱",
        description: "수림봇의 냉정한 평가를 견딜 자신이 있다면 도전해 보세요.",
        href: "https://500challenge.vercel.app/",
        external: true,
      },      
    ],
    [],
  );

  const authMessage = !user
    ? {
        href: "/login",
        label: "로그인 안내",
        text: "기록을 이어가려면 로그인과 메일 인증이 필요합니다.",
      }
    : !isEmailVerified
      ? {
          href: "/my",
          label: "메일 인증",
          text: "계정을 활성화하려면 메일 인증을 먼저 완료해 주세요.",
        }
      : null;

  const revealClass = (delay: number) =>
    [
      "transition-all duration-[560ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
      ready || reduceMotion ? "translate-y-0 opacity-100" : "translate-y-[10px] opacity-0",
    ].join(" ");

  const revealStyle = (delay: number) =>
    reduceMotion ? undefined : { transitionDelay: `${delay}ms` };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Surim Studio",
            url: "https://surimstudio.com",
            founder: {
              "@type": "Person",
              name: "Mun Surim",
            },
            description:
              "Mun Surim is an independent creator who uses web applications and AI tools to experiment with how writing is structured, accumulated, and distributed, rather than focusing only on the written text itself. This site is not a general blog, news outlet, or software company.",
            sameAs: ["https://surimstudio.com"],
          }),
        }}
      />

      <main className="mt-4">
        <section className="relative overflow-hidden rounded-[2rem] border border-[color:var(--border)] bg-[color:var(--bg)] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-emerald-100/35 via-transparent to-transparent" />
          <div className="pointer-events-none absolute -right-24 top-12 h-56 w-56 rounded-full bg-emerald-100/20 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(320px,2fr)] lg:gap-12">
            <div className="flex min-h-[28rem] flex-col justify-between">
              <div>
                <div
                  className={revealClass(revealTiming.eyebrow)}
                  style={revealStyle(revealTiming.eyebrow)}
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.32em] text-emerald-800/80">
                    Literary Studio / Editorial Archive
                  </p>
                </div>

                <div
                  className={revealClass(revealTiming.headline)}
                  style={revealStyle(revealTiming.headline)}
                >
                  <h1 className="mt-8 font-serif text-[clamp(3rem,8vw,6.4rem)] leading-[0.92] tracking-[0.1em] text-[color:var(--fg)]">
                    감정의
                    <br />
                    <span className="italic bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
                      미립자
                    </span>를
                    <br />
                    기록하다
                  </h1>
                </div>

                <div
                  className={revealClass(revealTiming.description)}
                  style={revealStyle(revealTiming.description)}
                >
                  <div className="mt-10 max-w-xl border-l border-emerald-900/15 pl-5">
                    <p className="text-base leading-8 text-[color:var(--muted)] sm:text-[1.05rem]">
                      웹과 AI 도구를 활용해 글을 쓰고,
                      <br />
                      구조를 만들고,
                      <br />
                      기록을 남기는 실험적 서사의 공간.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={revealClass(revealTiming.footer)}
                style={revealStyle(revealTiming.footer)}
              >
                <div className="mt-12 flex items-center gap-4 text-[0.78rem] uppercase tracking-[0.24em] text-[color:var(--muted)]">
                  <span>Est. 2025</span>
                  <span className="h-px w-8 bg-[color:var(--border)]" />
                  <span>Daegu, KR</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:pl-4">
              {cards.map((card, index) => (
                <EditorialCard
                  key={card.href}
                  card={card}
                  delay={revealTiming[`card${(index + 1) as 1 | 2 | 3}`]}
                  ready={ready}
                  reduceMotion={reduceMotion}
                />
              ))}

              {authMessage ? (
                <Link
                  href={authMessage.href}
                  className={[
                    "rounded-[1.5rem] border border-dashed border-emerald-900/15 bg-white/45 px-5 py-4 text-sm leading-6 text-[color:var(--muted)]",
                    revealClass(revealTiming.auth),
                  ].join(" ")}
                  style={revealStyle(revealTiming.auth)}
                >
                  <span className="mr-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-emerald-800/75">
                    {authMessage.label}
                  </span>
                  {authMessage.text}
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
