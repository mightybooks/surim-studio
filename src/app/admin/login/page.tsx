// src/app/admin/login/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const next = searchParams.get("next") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, next }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data?.error === "INVALID_PASSWORD") {
          setError("비밀번호가 올바르지 않습니다.");
        } else {
          setError("로그인 중 오류가 발생했습니다.");
        }
        setLoading(false);
        return;
      }

      const data = await res.json();
      router.push(data.redirectTo ?? "/admin");
    } catch (err) {
      console.error(err);
      setError("로그인 요청에 실패했습니다.");
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm items-center px-4">
      <div className="w-full space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-6 shadow-sm">
        <h1 className="text-lg font-semibold">Admin Login</h1>
        <p className="text-xs text-slate-600">
          수림 스튜디오 관리자 전용 로그인입니다.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-medium text-slate-600">
              관리자 비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm"
              placeholder="********"
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-emerald-700 py-2 text-sm font-semibold text-white disabled:opacity-60"
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
}
