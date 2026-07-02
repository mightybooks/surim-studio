import Link from "next/link";
import { redirect } from "next/navigation";
import ContactEmailForm from "@/components/my/ContactEmailForm";
import LogoutButton from "@/components/my/LogoutButton";
import { supabaseServer } from "@/lib/supabase/server";

type Profile = {
  contact_email_pending: string | null;
  contact_email_verified_at: string | null;
};

export default async function MyProfilePage() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?returnTo=%2Fmy%2Fprofile");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("contact_email_pending, contact_email_verified_at")
    .eq("id", user.id)
    .maybeSingle();

  const displayName =
    user.user_metadata?.name ??
    user.user_metadata?.full_name ??
    user.user_metadata?.nickname ??
    null;

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <header className="space-y-2">
        <Link href="/my" className="text-sm underline text-[color:var(--fg)]/60">
          MY로 돌아가기
        </Link>
        <h1 className="text-2xl font-semibold">회원 정보</h1>
        <p className="text-sm text-[color:var(--fg)]/60">계정 정보와 연락처 인증을 관리합니다.</p>
      </header>

      <section className="rounded-lg border border-[color:var(--border)] bg-white p-4 space-y-2 text-sm">
        <div>
          <span className="block text-[color:var(--fg)]/50">이메일</span>
          <span className="font-medium">{user.email ?? "-"}</span>
        </div>
        {displayName ? (
          <div>
            <span className="block text-[color:var(--fg)]/50">표시 이름</span>
            <span className="font-medium">{displayName}</span>
          </div>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">연락처 이메일</h2>
        {(profile as Profile | null)?.contact_email_verified_at ? (
          <div className="rounded-lg border border-[color:var(--border)] bg-white p-4 text-sm space-y-1">
            <p className="font-medium text-green-700">연락처 이메일 인증이 완료되었습니다.</p>
            <p className="text-[color:var(--fg)]/60">변경이 필요하면 새 이메일로 인증을 다시 요청해 주세요.</p>
            <ContactEmailForm defaultEmail={(profile as Profile).contact_email_pending ?? ""} />
          </div>
        ) : (
          <ContactEmailForm defaultEmail={(profile as Profile | null)?.contact_email_pending ?? ""} />
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">계정</h2>
        <LogoutButton />
      </section>
    </main>
  );
}
