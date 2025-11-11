"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";

export default function LoginForm() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const base = process.env.NEXT_PUBLIC_SITE_URL!; // 로컬/배포 공통 기반 URL

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setErrMsg(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${base}/account`,
      },
    });

    if (error) {
      setErrMsg(`로그인 메일 전송 실패: ${error.message}`);
      setSending(false);
      return;
    }

    setSent(true);
    setSending(false);
  }

  if (sent) {
    return (
      <div className="max-w-sm text-sm">
        <p>로그인 링크를 이메일로 보냈습니다.</p>
        <p className="mt-1">받은편지함에 없다면 스팸함도 확인해 주세요. 슬픈 현실입니다.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-sm">
      <label className="block text-sm">
        이메일
        <input
          className="w-full border rounded px-3 py-2 mt-1"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded px-3 py-2 border disabled:opacity-60"
      >
        {sending ? "전송 중..." : "매직링크 보내기"}
      </button>

      {errMsg && <p className="text-red-600 text-sm">{errMsg}</p>}

      <p className="text-xs text-gray-500">
        비밀번호는 없습니다. 잊을 것도, 털릴 것도 줄이는 것이 인생의 지혜죠.
      </p>
    </form>
  );
}
