// src/app/my/page.tsx
import { supabaseServer } from "@/lib/supabase/server";
import ContactEmailForm from "@/components/my/ContactEmailForm";

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

  const { error: ensureProfileError } = await supabase
    .from("profiles")
    .upsert(
      { id: user.id, role: "user" },
      { onConflict: "id" }
    );

  if (ensureProfileError) {
    console.error("ensure profile failed", ensureProfileError);
    // 필요하면 여기서 return null; 또는 에러 UI
  }

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

        <div className="rounded-xl border border-[color:var(--border)] p-4 text-sm space-y-2">
          <p className="text-[color:var(--fg)]/70">
            보안을 위해 계정 정보 일부는 노출되지 않습니다.
          </p>
          <p className="text-[color:var(--fg)]/70">
            실제 사용 중인 이메일을 인증하시면 알림, 배송, 공지 등
            주요 서비스를 더 안전하고 안정적으로 이용하실 수 있습니다.
          </p>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">
          Email Verification
        </h2>

        {/* 상태 표시 */}
        {profile?.contact_email_verified_at ? (
          <div className="rounded-xl border border-[color:var(--border)] p-4 text-sm">
            <p>인증 완료: {profile.contact_email}</p>
          </div>
        ) : profile?.contact_email_pending ? (
          <div className="rounded-xl border border-[color:var(--border)] p-4 text-sm">
            <p>
              인증 대기 중: {profile.contact_email_pending}
              <br />
              메일함에서 인증 링크를 확인해 주세요.
            </p>
          </div>
        ) : (
          <ContactEmailForm />
        )}
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
