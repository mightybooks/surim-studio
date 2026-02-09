// src/app/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";
import MainRollingBanner, {
  MainBannerItem,
} from "@/components/home/MainRollingBanner";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = supabaseBrowser();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const isEmailVerified = !!user?.email_confirmed_at;

  const banners: MainBannerItem[] = useMemo(() => {
    const arr: MainBannerItem[] = [
      {
        label: "펀딩 참여",
        title: "수림서가 첫 도서, 문수림의 『500자 소설』",
        href: "/funding/books/500",
      },
      {
        label: "문예경연대회",
        title: "문수림배 제3회 문예경연대회 참가",
        href: "/contest/2026",
      },
      {
        label: "500자 챌린지 웹앱",
        title: "수림봇의 냉정한 평가를 견뎌낼 수 있다면",
        href: "https://500challenge.vercel.app/",
        external: true,
      },
    ];

    // 로그인 배너 분기
    if (!user) {
      arr.push({
        label: "로그인 안내",
        title: "모든 활동의 시작은 로그인과 메일 인증",
        href: "/login",
      });
    } else if (user && !isEmailVerified) {
      arr.push({
        label: "로그인 안내",
        title: "메일 인증이 필요합니다",
        href: "/my",
      });
    }
    // user && isEmailVerified => 배너 숨김(추가 안 함)

    return arr;
  }, [user, isEmailVerified]);

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

      <main className="flex flex-col items-center space-y-4 mt-12">
        <h1 className="text-4xl font-bold text-emerald-900 mb-2">
          수림 스튜디오
        </h1>

        <p className="text-zinc-600 mb-8">
          감정의 미립자를 기록하는 작은 출판 실험실.
        </p>

        <p className="text-sm text-zinc-500 mb-4 text-center">
          웹과 AI 도구를 활용해 글을 쓰고, 구조를 만들고, 기록을 남기는 문수림.
        </p>

        <p className="text-sm text-zinc-500 italic">since 2025</p>

        {/* ✅ 히어로 아래(빨간 박스 자리): 롤링 배너 삽입 */}
        <div className="w-full mt-2">
          <MainRollingBanner items={banners} />
        </div>
      </main>
    </>
  );
}
