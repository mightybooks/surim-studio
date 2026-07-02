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
    redirect("/login?returnTo=%2Fmy%2Fevents");
  }

  // ✅ 이벤트 참여 내역 조회 (경연대회 투고)
  const { data: submissions } = await supabase
    .from("contest_submissions")
    .select(`
      id,
      contest_year,
      work_title,
      pen_name,
      status,
      submitted_at
    `)
    .eq("user_id", user.id)
    .order("submitted_at", { ascending: false });

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">참여 중인 이벤트</h1>
        <p className="text-sm text-[color:var(--fg)]/60">
          경연대회 및 이벤트 참여 내역을 확인할 수 있습니다.
        </p>
      </header>

      {!submissions || submissions.length === 0 ? (
        <section className="rounded-xl border border-dashed border-[color:var(--border)] p-6 text-sm text-[color:var(--fg)]/50">
          참여 중인 이벤트가 없습니다.
        </section>
      ) : (
        <ul className="space-y-3">
          {submissions.map((s) => (
            <li
              key={s.id}
              className="rounded-xl border bg-white p-4 space-y-1"
            >
              <p className="font-medium">
                문수림배 문예경연대회 ({s.contest_year})
              </p>
              <p className="text-sm text-neutral-600">
                작품명: {s.work_title}
              </p>
              <p className="text-sm text-neutral-600">
                필명: {s.pen_name}
              </p>
              <p className="text-sm text-neutral-500">
                접수일: {new Date(s.submitted_at).toLocaleDateString()}
              </p>
              <p className="text-sm font-medium">
                상태: {statusLabel(s.status)}
              </p>
            </li>
          ))}
        </ul>
      )}

      <footer>
        <Link href="/my" className="text-sm underline text-[color:var(--fg)]/70">
          ← my로 돌아가기
        </Link>
      </footer>
    </main>
  );
}

function statusLabel(status: string) {
  switch (status) {
    case "submitted":
      return "접수 완료";
    case "reviewed":
      return "심사 완료";
    case "selected":
      return "🎉 수상";
    case "not_selected":
      return "참여 기록";
    default:
      return "상태 확인 중";
  }
}
