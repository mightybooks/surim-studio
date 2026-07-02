"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import AuthCard from "@/components/auth/AuthCard";
import { isSafeInternalRedirect } from "@/lib/inAppBrowser";

function isValidPassword(pw: string): boolean {
  if (pw.length < 8) return false;

  const hasLetter = /[a-zA-Z]/.test(pw);
  const hasNumber = /\d/.test(pw);
  const hasSpecial = /[^a-zA-Z0-9]/.test(pw);

  return hasLetter && hasNumber && hasSpecial;
}

export default function SignupForm({ returnTo = "/my" }: { returnTo?: string }) {
  const router = useRouter();
  const supabase = supabaseBrowser();
  const safeReturnTo = isSafeInternalRedirect(returnTo) ? returnTo : "/my";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const [isAdult, setIsAdult] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSignup(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setErrMsg(null);

    if (!isAdult) {
      setErrMsg("만 14세 이상만 회원가입이 가능합니다.");
      return;
    }

    if (!agreeTerms) {
      setErrMsg("이용약관 및 개인정보처리방침에 동의해야 합니다.");
      return;
    }

    if (!isValidPassword(password)) {
      setErrMsg("비밀번호는 8자 이상이며, 영문자, 숫자, 특수문자를 모두 포함해야 합니다.");
      return;
    }

    if (password !== password2) {
      setErrMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    setLoading(true);

    const emailRedirectTo = `${window.location.origin}/auth/callback?returnTo=${encodeURIComponent(safeReturnTo)}`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo,
        data: {
          username,
          phone,
        },
      },
    });

    setLoading(false);

    if (error) {
      setErrMsg(error.message);
      return;
    }

    router.replace(`/verify-email?returnTo=${encodeURIComponent(safeReturnTo)}`);
    router.refresh();
  }

  return (
    <AuthCard
      title="회원가입"
      footer={
        <>
          <span>이미 계정이 있으신가요? </span>
          <a href={`/login?returnTo=${encodeURIComponent(safeReturnTo)}`} className="underline">
            로그인
          </a>
        </>
      }
    >
      <form onSubmit={onSignup} className="space-y-3">
        <label className="block text-sm">
          이메일
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
            autoComplete="new-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="mt-1 text-xs text-zinc-500">
            8자 이상, 영문자, 숫자, 특수문자를 모두 포함해야 합니다.
          </p>
        </label>

        <label className="block text-sm">
          비밀번호 확인
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            type="password"
            autoComplete="new-password"
            required
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          표시 이름
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <label className="block text-sm">
          연락처
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>

        <div className="space-y-2 pt-2">
          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={isAdult}
              onChange={(e) => setIsAdult(e.target.checked)}
            />
            <span>본인은 만 14세 이상입니다. (필수)</span>
          </label>

          <label className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
            />
            <span>
              <a
                href="/legal/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                이용약관
              </a>{" "}
              및{" "}
              <a
                href="/legal/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                개인정보처리방침
              </a>
              에 동의합니다. (필수)
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded bg-black px-3 py-2 text-white disabled:opacity-60"
        >
          {loading ? "가입 중..." : "가입하기"}
        </button>

        {errMsg && <p className="text-sm text-red-600">{errMsg}</p>}
      </form>
    </AuthCard>
  );
}
