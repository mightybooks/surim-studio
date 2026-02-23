// src/app/my/page.tsx
import { supabaseServerPublic } from "@/lib/supabase/server-public";
import ContactEmailForm from "@/components/my/ContactEmailForm";
import { redirect } from "next/navigation";
import { formatMoney } from "@/lib/formatMoney";

export default async function MyPage() {
  const supabase = supabaseServerPublic();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  
   if (!user) {
    redirect("/login?error=auth_required&next=%2Fmy");
  }

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

  const { data: submissions } = await supabase
    .from("contest_submissions")
    .select("id, contest_year, work_title, pen_name, status, submitted_at")
    .order("submitted_at", { ascending: false });

  // 🔹 내 주문 · 배송 내역 조회
  const { data: orders } = await supabase
    .from("orders")
    .select(`
      id,
      product_name,
      amount_minor,      
      currency,
      status,
      created_at,
      shipping_carrier,
      tracking_number,
      shipped_at,
      is_digital      
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });
    
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

        {profile?.contact_email_verified_at ? (
          // ✅ 인증 완료 (완전 락)
          <div className="rounded-xl border border-[color:var(--border)] p-4 text-sm space-y-1">
            <p className="font-medium text-green-600">
              이메일 인증이 완료되었습니다.
            </p>
            <p className="text-xs text-[color:var(--fg)]/60">
              인증된 이메일은 변경할 수 없습니다.
            </p>

            {/* 2층 진입 */}
            <div className="pt-2">
              <a
                href="https://open.kakao.com/o/guwemdsg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[color:var(--fg)] hover:underline"
              >
                문수림과 함께 하는 책쓰기 커뮤니티 바로가기
              </a>
            </div>
          </div>
        ) : (
          // ✏️ 미인증 상태 = 언제든 재입력/재발송 가능
          <ContactEmailForm
            defaultEmail={profile?.contact_email_pending ?? ""}
          />
        )}
      </section>

    {/* 주문 · 배송 내역 */}
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">
        주문 · 배송 내역
      </h2>

      {!orders || orders.length === 0 ? (
        <p className="text-sm text-neutral-500">
          주문 내역이 없습니다.
        </p>
      ) : (
        <ul className="space-y-3">
          {orders.map((order) => (
            <li
              key={order.id}
              className="rounded-xl border bg-white p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {order.product_name}
                </p>
                  <span className="text-sm font-medium">
                    {getUserFacingOrderStatus(order)}
                  </span>
              </div>

              <p className="text-sm text-neutral-600">
                주문일: {new Date(order.created_at).toLocaleDateString()}
              </p>
             
              <p className="text-sm text-neutral-600">
                금액: {formatMoney({ amount_minor: order.amount_minor ?? 0, currency: order.currency ?? "KRW" })}
              </p>

              {!order.is_digital && order.tracking_number && (
                <p className="text-sm text-neutral-600">
                  배송사: {order.shipping_carrier ?? "-"} / 송장번호:{" "}
                  {order.tracking_number}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>

    {/* 경연대회 투고 이력 */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">
          경연대회 투고 이력
        </h2>

        {!submissions || submissions.length === 0 ? (
          <p className="text-sm text-neutral-500">
            아직 경연대회 투고 이력이 없습니다.
          </p>
        ) : (
          <ul className="space-y-3">
            {submissions.map((item) => (
              <li
                key={item.id}
                className="rounded-xl border bg-white p-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      문수림배 문예경연대회 ({item.contest_year})
                    </p>
                    <p className="text-sm text-neutral-600">
                      작품명: {item.work_title}
                    </p>
                    <p className="text-sm text-neutral-600">
                      필명: {item.pen_name}
                    </p>
                  </div>

                  <span className="text-sm font-medium">
                    {getStatusLabel(item.status)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
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

  function getStatusLabel(status: string) {
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
      return "기록 확인 중";
  }
}

  function getOrderStatusLabel(status: string) {
    switch (status) {
      case "pending":
        return "결제 대기";
      case "paid":
        return "결제 완료";
      case "shipped":
        return "배송 완료";
      case "failed":
        return "결제 실패";
      case "expired":
        return "결제 만료";
      default:
        return "상태 확인 중";
    }
  }

  function getUserFacingOrderStatus(order: {
  is_digital: boolean;
  status: string;
  tracking_number: string | null;
  }) {
    // 1️⃣ 디지털 열람권
    if (order.is_digital) {
      return "열람 가능";
    }

    // 2️⃣ 배송 완료
    if (order.status === "shipped") {
      return "배송 완료";
    }

    // 3️⃣ 배송 중
    if (order.tracking_number) {
      return "배송 중";
    }

    // 4️⃣ 배송 대기
    if (order.status === "paid") {
      return "배송 대기";
    }

    // 5️⃣ 기타
    return "결제 완료";
  }
}
