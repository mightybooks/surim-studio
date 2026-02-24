// src/app/my/fundings/page.tsx
import { redirect } from "next/navigation";
import { supabaseServerPublic } from "@/lib/supabase/server-public";
import Link from "next/link";
import { formatMoney } from "@/lib/formatMoney";

export default async function MyFundingsPage() {
  const supabase = supabaseServerPublic();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ✅ 펀딩 참여 내역 = orders 중 source가 funding_500인 것
  const { data: fundings } = await supabase
    .from("orders")
    .select(`
      id,
      product_name,
      amount_minor,
      currency,
      status,
      created_at,
      quantity,
      tracking_number,
      shipping_carrier,
      is_digital
    `)
    .eq("user_id", user.id)
    .eq("source", "funding_500")
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">참여 중인 펀딩</h1>
        <p className="text-sm text-[color:var(--fg)]/60">
          현재 참여하고 있는 펀딩 내역을 확인할 수 있습니다.
        </p>
      </header>

      {!fundings || fundings.length === 0 ? (
        <section className="rounded-xl border border-dashed border-[color:var(--border)] p-6 text-sm text-[color:var(--fg)]/50">
          참여 중인 펀딩이 없습니다.
        </section>
      ) : (
        <ul className="space-y-3">
          {fundings.map((o) => (
            <li key={o.id} className="rounded-xl border bg-white p-4 space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">{o.product_name}</p>
                <span className="text-sm text-[color:var(--fg)]/70">
                  {o.status}
                </span>
              </div>

              <p className="text-sm text-neutral-600">
                참여일: {new Date(o.created_at).toLocaleDateString()}
              </p>

              <p className="text-sm text-neutral-600">
                수량: {o.quantity ?? 1}권
              </p>

              <p className="text-sm text-neutral-600">
                금액: {formatMoney({ amount_minor: o.amount_minor ?? 0, currency: o.currency ?? "KRW" })}
              </p>

              {!o.is_digital && o.tracking_number && (
                <p className="text-sm text-neutral-600">
                  배송사: {o.shipping_carrier ?? "-"} / 송장번호: {o.tracking_number}
                </p>
              )}
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
