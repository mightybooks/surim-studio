// src/components/NavBar.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function NavBar() {
  const [user, setUser] = useState<any>(null);

   useEffect(() => {
    const supabase = supabaseBrowser();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);
  const isEmailVerified = !!user?.email_confirmed_at;

  const base =
    "inline-flex items-center justify-center rounded-full border " +
    "px-6 py-2.5 text-sm font-medium transition-colors " +
    "bg-emerald-50/60 text-emerald-900 border-emerald-200 " +
    "hover:bg-emerald-100/70";

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      {!user && (
        <>
          <p className="text-sm text-zinc-500">
            로그인이 모든 활동의 시작입니다.
          </p>
          <Link href="/login" className={base}>
            로그인과 메일 인증
          </Link>
        </>
      )}

      {user && !isEmailVerified && (
        <>
          <p className="text-sm text-zinc-500">
            메일 인증을 완료해야 활동을 시작할 수 있습니다.
          </p>
          <Link href="/my" className={base}>
            마이페이지
          </Link>
        </>
      )}

      {user && isEmailVerified && (
        <>
          <p className="text-sm text-zinc-500">
            메일 인증을 하셨다면, 활동 기록을 확인해 보세요.
          </p>
          <Link href="/my" className={base}>
            마이페이지
          </Link>
        </>
      )}

      <Link href="/contest/2026" className={base}>
       문수림배 제3회 문예경연대회
      </Link>

      <Link
        href="https://500challenge.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className={base}
      >
        500자 챌린지 쓰러가기
      </Link>

      <Link href="/blog" className={base}>
        블로그 글 보러가기
      </Link>
    </div>
  );
}