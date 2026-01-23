// src/components/my/ContactEmailForm.tsx

"use client";

import { useState } from "react";

export default function ContactEmailForm({
    defaultEmail = "",
  }: {
    defaultEmail?: string;
  }) {
  const [email, setEmail] = useState(defaultEmail);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function requestVerify() {
    setLoading(true);
    setMsg(null);
    try {
      const res = await fetch("/api/contact-email/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMsg(json?.error ?? "인증 메일 발송에 실패했습니다.");
        return;
      }
      setMsg("인증 메일을 발송했습니다. 스팸함도 함께 확인해 주세요.");
      setEmail("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-[color:var(--border)] p-4 space-y-3">
      <div className="space-y-1">
        <div className="text-sm font-medium">연락용 이메일(선택)</div>
        <p className="text-sm text-[color:var(--fg)]/60">
          펀딩/배송/공지/경연 결과 알림을 받기 위해 인증할 수 있습니다.<br/>
        <span className="block mt-1">
          ※ 일부 메일 서비스(Outlook 등)에서는 인증 메일이 스팸으로 분류될 수 있습니다.
          메일이 보이지 않는 경우 스팸함을 함께 확인해 주세요.
        </span>
        </p>
      </div>

      <div className="flex gap-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          className="flex-1 rounded-lg border border-[color:var(--border)] px-3 py-2 text-sm bg-transparent"
        />
        <button
          onClick={requestVerify}
          disabled={loading || !email}
          className="rounded-lg border border-[color:var(--border)] px-3 py-2 text-sm hover:bg-black/5 disabled:opacity-50"
        >
          {loading ? "발송 중" : "인증 메일 보내기"}
        </button>
      </div>

      {msg ? <p className="text-sm text-[color:var(--fg)]/70">{msg}</p> : null}
    </div>
  );
}
