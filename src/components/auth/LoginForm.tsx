"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Provider } from "@supabase/supabase-js";
import AuthCard from "@/components/auth/AuthCard";
import InAppGate from "@/components/inapp/InAppGate";
import { supabaseBrowser } from "@/lib/supabase/client";
import { isSafeInternalRedirect } from "@/lib/inAppBrowser";

export default function LoginForm({
  fromVerify,
  nextPath = "/my",
}: {
  fromVerify?: boolean;
  nextPath?: string;
}) {
  const router = useRouter();
  const supabase = supabaseBrowser();
  const safeNext = isSafeInternalRedirect(nextPath) ? nextPath : "/my";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [oauthLoadingProvider, setOauthLoadingProvider] = useState<Provider | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrMsg(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrMsg("이메일 또는 비밀번호를 확인해 주세요.");
      setLoading(false);
      return;
    }

    const isVerified = Boolean(data.user?.email_confirmed_at);
    if (!isVerified) {
      router.replace(`/verify-email?next=${encodeURIComponent(safeNext)}`);
      router.refresh();
      return;
    }

    router.replace(safeNext);
    router.refresh();
  }

  async function signInWithOAuth(provider: Provider) {
    if (oauthLoadingProvider) return;

    setErrMsg(null);
    setOauthLoadingProvider(provider);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(safeNext)}`,
      },
    });

    if (error) {
      setOauthLoadingProvider(null);
      setErrMsg("소셜 로그인 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
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
      {fromVerify && (
        <p className="mb-4 text-sm text-green-700">
          인증이 확인되었습니다.
          <br />
          로그인하시면 자동으로 원래 페이지로 이동합니다.
        </p>
      )}

      <InAppGate />

      <form onSubmit={onLogin} className="space-y-3">
        <label className="block text-sm">
          이메일(로그인 ID)
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
          disabled={loading || Boolean(oauthLoadingProvider)}
          className="w-full rounded bg-black px-3 py-2 text-white disabled:opacity-60"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>

        {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}
      </form>

      <div className="space-y-2 pt-6">
        <button
          type="button"
          onClick={() => signInWithOAuth("kakao")}
          disabled={Boolean(oauthLoadingProvider)}
          className="w-full rounded border px-3 py-2 text-sm disabled:opacity-60"
        >
          카카오로 계속하기
        </button>

        <button
          type="button"
          onClick={() => signInWithOAuth("google")}
          disabled={Boolean(oauthLoadingProvider)}
          className="flex w-full items-center justify-center gap-2 rounded border px-3 py-2 text-sm disabled:opacity-60"
        >
          {oauthLoadingProvider === "google" ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-800" />
              <span>구글로 이동 중</span>
            </>
          ) : (
            <span>구글로 계속하기</span>
          )}
        </button>
      </div>
    </AuthCard>
  );
}
