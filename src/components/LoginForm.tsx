// components/auth/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import AuthCard from "@/components/auth/AuthCard";

export default function LoginForm() {  
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrMsg(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrMsg("이메일 또는 비밀번호를 확인해 주세요.");
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  async function onLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <AuthCard
      title="로그인"
      footer={
        <>
          <span>아직 계정이 없으신가요? </span>
          <a href="/signup" className="underline">회원가입</a>
        </>
      }
    >
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

      {/* 테스트용 로그아웃 */}
      <div className="pt-3">
        <button
          type="button"
          onClick={onLogout}
          className="w-full rounded border px-3 py-2 text-sm"
        >
          (테스트) 로그아웃
        </button>
      </div>
    </AuthCard>
  );
}
