import Link from "next/link";
import { redirect } from "next/navigation";
import LibraryListClient, { type LibraryItem } from "@/components/my/LibraryListClient";
import { supabaseServer } from "@/lib/supabase/server";

export default async function MyLibraryPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?returnTo=%2Fmy%2Flibrary");
  }

  const { data: items, error } = await supabase
    .from("orders")
    .select("id, product_id, product_name, status, created_at, source")
    .eq("user_id", user.id)
    .eq("is_digital", true)
    .in("status", ["paid", "shipped"])
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <header className="space-y-2">
        <Link href="/my" className="text-sm underline text-[color:var(--fg)]/60">
          MY로 돌아가기
        </Link>
        <h1 className="text-2xl font-semibold">내 보관함</h1>
        <p className="text-sm text-[color:var(--fg)]/60">구매한 수림지, 전자책, 열람 가능한 콘텐츠를 확인합니다.</p>
      </header>

      {error ? (
        <EmptyState>보관함을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</EmptyState>
      ) : !items || items.length === 0 ? (
        <EmptyState>아직 보관함에 표시할 콘텐츠가 없습니다.</EmptyState>
      ) : (
        <LibraryListClient items={items as LibraryItem[]} />
      )}
    </main>
  );
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-dashed border-[color:var(--border)] p-6 text-sm text-[color:var(--fg)]/50">
      {children}
    </section>
  );
}
