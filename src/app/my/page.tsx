// src/app/my/page.tsx
import { supabaseServer } from "@/lib/supabase/server";

const providerLabelMap: Record<string, string> = {
  naver: "네이버",
  kakao: "카카오",
  google: "구글",
  email: "이메일",
};

export default async function MyPage() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ✅ 반드시 먼저
  if (!user) return null;

  let provider: string | undefined;

  if (
    user.app_metadata &&
    typeof user.app_metadata === "object" &&
    "provider" in user.app_metadata
  ) {
    provider = String(
      (user.app_metadata as Record<string, unknown>).provider
    );
  }

  const providerLabel = provider
    ? providerLabelMap[provider] ?? "알 수 없음"
    : "알 수 없음";

  // 🔹 연락용 이메일(profile) 조회 — 반드시 여기
  const { data: profile } = await supabase
    .from("profiles")
    .select("contact_email, contact_email_pending, contact_email_verified_at")
    .eq("id", user.id)
    .maybeSingle();  

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">MY</h1>
        <p className="text-sm text-[color:var(--fg)]/60">
          계정 정보 및 참여 내역을 확인할 수 있는 공간입니다.
        </p>
      </header>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">
          Account
        </h2>
        <div className="rounded-xl border border-[color:var(--border)] p-4 text-sm">
          <p>
            <span className="text-[color:var(--fg)]/60">
              로그인 방식
            </span>
            <br />
            {providerLabel}
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">
          Fundings
        </h2>
        <div className="rounded-xl border border-dashed border-[color:var(--border)] p-4 text-sm text-[color:var(--fg)]/50">
          참여 중인 펀딩이 없습니다.
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">
          Events
        </h2>
        <div className="rounded-xl border border-dashed border-[color:var(--border)] p-4 text-sm text-[color:var(--fg)]/50">
          참여 중인 이벤트가 없습니다.
        </div>
      </section>
    </main>
  );
}
