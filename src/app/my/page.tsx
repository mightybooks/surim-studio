import MyDashboardClient from "@/components/my/MyDashboardClient";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function MyPage() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?error=auth_required&next=%2Fmy");
  }

  return (
    <main className="mx-auto max-w-3xl space-y-10 px-4 py-10">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">MY</h1>
        <p className="text-sm text-[color:var(--fg)]/60">계정 정보와 참여 내역을 확인하실 수 있습니다.</p>
      </header>
      <MyDashboardClient />
    </main>
  );
}
