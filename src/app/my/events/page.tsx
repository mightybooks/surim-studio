// src/app/my/events/page.tsx
import { redirect } from "next/navigation";
import { supabaseServerPublic } from "@/lib/supabase/server-public";
import Link from "next/link";

export default async function MyEventsPage() {
  const supabase = supabaseServerPublic();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">참여 중인 이벤트</h1>
        <p className="text-sm text-[color:var(--fg)]/60">
          경연대회 및 이벤트 참여 내역을 확인할 수 있습니다.
        </p>
      </header>

      <section className="rounded-xl border border-dashed border-[color:var(--border)] p-6 text-sm text-[color:var(--fg)]/50">
        참여 중인 이벤트가 없습니다.
      </section>

      <footer>
        <Link
          href="/my"
          className="text-sm underline text-[color:var(--fg)]/70"
        >
          ← MY로 돌아가기
        </Link>
      </footer>
    </main>
  );
}
