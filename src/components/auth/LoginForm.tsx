// components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import { supabaseBrowser } from "@/lib/supabase/client";
import type { Provider } from "@supabase/supabase-js";
import InAppBrowserNotice from "@/components/InAppBrowserNotice";


export default function LoginForm() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  type OAuthProvider = "google" | "kakao" | "keycloak"

  /* =========================
     이메일 / 비밀번호 로그인
     ========================= */
  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrMsg("이메일 또는 비밀번호를 확인해 주세요.");
      setLoading(false);
      return;
    }

    router.push("/my");
    router.refresh();
  }

  /* =========================
     OAuth 로그인
     ========================= */
  async function signInWithOAuth(provider: OAuthProvider) {
    setErrMsg(null);

    await supabase.auth.signInWithOAuth({
      provider: provider as OAuthProvider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        
      },
    });
  }

  return (

    <AuthCard
      title="로그인"
      footer={
        <>
          <span>아직 계정이 없으신가요? </span>
          <a href="/signup" className="underline">
            회원가입
          </a>
        </>
      }
    >
      <InAppBrowserNotice />

      {/* =========================
          이메일 로그인 폼
          ========================= */}
      <form onSubmit={onLogin} className="space-y-3">
        <label className="block text-sm">
          이메일 (로그인 ID)
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          비밀번호
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black px-3 py-2 text-white disabled:opacity-60"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>

        {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}
      </form>

      {/* =========================
          OAuth 로그인 영역
          ========================= */}
      <div className="pt-6 space-y-2">
        <button
          type="button"
          onClick={() => signInWithOAuth("kakao")}
          className="w-full rounded border px-3 py-2 text-sm"
        >
          카카오로 계속하기
        </button>

        <button
          type="button"
          onClick={() => (window.location.href = "/auth/naver?returnTo=/my")}
          className="w-full rounded border px-3 py-2 text-sm"
        >
          네이버로 계속하기
        </button>

        <button
          type="button"
          onClick={() => signInWithOAuth("google")}
          className="w-full rounded border px-3 py-2 text-sm"
        >
          구글로 계속하기
        </button>
      </div>
    </AuthCard>
  );
}
