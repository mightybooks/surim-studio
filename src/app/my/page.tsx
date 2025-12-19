// src/app/my/page.tsx
import { redirect } from "next/navigation";
import { supabaseServerPublic } from "@/lib/supabase/server-public";

export default async function MyPage() {
  const supabase = supabaseServerPublic();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인 안 했으면 로그인 페이지로
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">MY</h1>
        <p className="text-sm text-[color:var(--fg)]/60">
          계정 정보 및 참여 내역을 확인할 수 있는 공간입니다.
        </p>
      </header>

      {/* 계정 정보 */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">
          Account
        </h2>
        <div className="rounded-xl border border-[color:var(--border)] p-4 text-sm">
          <p>
            <span className="text-[color:var(--fg)]/60">이메일</span><br />
            {user.email}
          </p>
        </div>
      </section>

      {/* 참여 중인 펀딩 */}
      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">
          Fundings
        </h2>
        <div className="rounded-xl border border-dashed border-[color:var(--border)] p-4 text-sm text-[color:var(--fg)]/50">
          참여 중인 펀딩이 없습니다.
        </div>
      </section>

      {/* 참여 중인 이벤트 */}
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
