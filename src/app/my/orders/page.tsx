import Link from "next/link";
import { redirect } from "next/navigation";
import { formatMoney } from "@/lib/formatMoney";
import { supabaseServer } from "@/lib/supabase/server";

type Order = {
  id: string;
  product_name: string;
  amount_minor: number | null;
  currency: string | null;
  status: string;
  created_at: string;
  shipping_carrier: string | null;
  tracking_number: string | null;
  is_digital: boolean;
};

export default async function MyOrdersPage() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?returnTo=%2Fmy%2Forders");
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, product_name, amount_minor, currency, status, created_at, shipping_carrier, tracking_number, is_digital")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-10">
      <header className="space-y-2">
        <Link href="/my" className="text-sm underline text-[color:var(--fg)]/60">
          MY로 돌아가기
        </Link>
        <h1 className="text-2xl font-semibold">주문/결제 내역</h1>
        <p className="text-sm text-[color:var(--fg)]/60">주문 상태, 결제 금액, 주문일, 배송 상태를 확인합니다.</p>
      </header>

      {error ? (
        <EmptyState>주문 내역을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.</EmptyState>
      ) : !orders || orders.length === 0 ? (
        <EmptyState>아직 주문 내역이 없습니다.</EmptyState>
      ) : (
        <ul className="space-y-3">
          {(orders as Order[]).map((order) => (
            <li key={order.id} className="rounded-lg border border-[color:var(--border)] bg-white p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium">{order.product_name}</p>
                <span className="text-sm font-medium">{orderStatusLabel(order)}</span>
              </div>
              <p className="text-sm text-neutral-600">주문일: {new Date(order.created_at).toLocaleDateString()}</p>
              <p className="text-sm text-neutral-600">
                결제 금액: {formatMoney({ amount_minor: order.amount_minor ?? 0, currency: order.currency ?? "KRW" })}
              </p>
              {!order.is_digital ? (
                <p className="text-sm text-neutral-600">
                  배송 상태: {order.tracking_number ? `${order.shipping_carrier ?? "배송"} / ${order.tracking_number}` : "배송 준비 중"}
                </p>
              ) : null}
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

function orderStatusLabel(order: Pick<Order, "is_digital" | "status" | "tracking_number">) {
  if (order.is_digital && order.status === "paid") return "열람 가능";
  if (order.status === "shipped") return "배송 완료";
  if (order.tracking_number) return "배송 중";
  if (order.status === "paid") return "결제 완료";
  if (order.status === "pending") return "결제 대기";
  if (order.status === "failed") return "결제 실패";
  if (order.status === "expired") return "만료";
  return "상태 확인 중";
}
