import Link from "next/link";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

type DownloadOrder = {
  id: string;
  product_name: string;
  status: string;
  created_at: string;
};

export default async function MyDownloadsPage() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?returnTo=%2Fmy%2Fdownloads");
  }

  const { data: items, error } = await supabase
    .from("orders")
    .select("id, product_name, status, created_at")
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
        <h1 className="text-2xl font-semibold">다운로드</h1>
        <p className="text-sm text-[color:var(--fg)]/60">구매 후 제공되는 전자책 파일과 구매자 제공 파일을 확인합니다.</p>
      </header>

      {error ? (
        <EmptyState>다운로드 항목을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</EmptyState>
      ) : !items || items.length === 0 ? (
        <EmptyState>현재 다운로드 가능한 항목이 없습니다.</EmptyState>
      ) : (
        <ul className="space-y-3">
          {(items as DownloadOrder[]).map((item) => (
            <li key={item.id} className="rounded-lg border border-[color:var(--border)] bg-white p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium">{item.product_name}</p>
                  <p className="text-sm text-neutral-600">구매일: {new Date(item.created_at).toLocaleDateString()}</p>
                </div>
                <span className="rounded-full border border-[color:var(--border)] px-3 py-1 text-xs text-neutral-600">
                  준비 중
                </span>
              </div>
              <p className="text-sm text-neutral-500">
                파일 제공 방식이 연결되면 이곳에서 바로 받을 수 있습니다.
              </p>
            </li>
          ))}
        </ul>
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
