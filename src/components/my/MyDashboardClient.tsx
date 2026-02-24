"use client";

import { useEffect, useState } from "react";
import ContactEmailForm from "@/components/my/ContactEmailForm";
import { formatMoney } from "@/lib/formatMoney";

type MyProfile = {
  contact_email_pending: string | null;
  contact_email_verified_at: string | null;
};

type Submission = {
  id: string;
  contest_year: number;
  work_title: string;
  pen_name: string;
  status: string;
  submitted_at: string;
};

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

type MySummaryResponse = {
  profile: MyProfile | null;
  submissions: Submission[];
  orders: Order[];
};

export default function MyDashboardClient() {
  const [data, setData] = useState<MySummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/my/summary", { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`HTTP_${res.status}`);
        }

        const json = (await res.json()) as MySummaryResponse;
        if (!cancelled) {
          setData(json);
        }
      } catch {
        if (!cancelled) {
          setError("대시보드 데이터를 불러오지 못했습니다.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <section className="rounded-xl border border-[color:var(--border)] p-4 text-sm text-[color:var(--fg)]/70">
        대시보드를 준비하고 있습니다…
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="rounded-xl border border-[color:var(--border)] p-4 text-sm text-red-600">
        문제가 발생하여 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.
      </section>
    );
  }

  const { profile, orders, submissions } = data;

  return (
    <>
      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">계정</h2>
        <div className="rounded-xl border border-[color:var(--border)] p-4 text-sm text-[color:var(--fg)]/70">
          보안을 위해 계정 정보 일부는 표시되지 않습니다.
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">이메일 인증</h2>
        {profile?.contact_email_verified_at ? (
          <div className="rounded-xl border border-[color:var(--border)] p-4 text-sm space-y-1">
            <p className="font-medium text-green-600">이메일 인증이 완료되었습니다.</p>
            <p className="text-xs text-[color:var(--fg)]/60">인증된 이메일은 변경하실 수 없습니다.</p>
          </div>
        ) : (
          <ContactEmailForm defaultEmail={profile?.contact_email_pending ?? ""} />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">주문 및 배송 내역</h2>
        {orders.length === 0 ? (
          <p className="text-sm text-neutral-500">아직 주문 내역이 없습니다.</p>
        ) : (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li key={order.id} className="rounded-xl border bg-white p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{order.product_name}</p>
                  <span className="text-sm font-medium">{getUserFacingOrderStatus(order)}</span>
                </div>
                <p className="text-sm text-neutral-600">
                  주문일: {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-neutral-600">
                  금액: {formatMoney({ amount_minor: order.amount_minor ?? 0, currency: order.currency ?? "KRW" })}
                </p>
                {!order.is_digital && order.tracking_number && (
                  <p className="text-sm text-neutral-600">
                    배송사: {order.shipping_carrier ?? "-"} / 송장번호: {order.tracking_number}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">경연대회 제출 내역</h2>
        {submissions.length === 0 ? (
          <p className="text-sm text-neutral-500">아직 제출한 내역이 없습니다.</p>
        ) : (
          <ul className="space-y-3">
            {submissions.map((item) => (
              <li key={item.id} className="rounded-xl border bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">경연대회 ({item.contest_year})</p>
                    <p className="text-sm text-neutral-600">작품명: {item.work_title}</p>
                    <p className="text-sm text-neutral-600">필명: {item.pen_name}</p>
                  </div>
                  <span className="text-sm font-medium">{getStatusLabel(item.status)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">펀딩</h2>
        <div className="rounded-xl border border-dashed border-[color:var(--border)] p-4 text-sm text-[color:var(--fg)]/50">
          현재 참여 중인 펀딩이 없습니다.
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">이벤트</h2>
        <div className="rounded-xl border border-dashed border-[color:var(--border)] p-4 text-sm text-[color:var(--fg)]/50">
          현재 참여 중인 이벤트가 없습니다.
        </div>
      </section>
    </>
  );
}

function getStatusLabel(status: string) {
  switch (status) {
    case "submitted":
      return "접수 완료";
    case "reviewed":
      return "심사 완료";
    case "selected":
      return "선정";
    case "not_selected":
      return "참여 완료";
    default:
      return "확인 중";
  }
}

function getUserFacingOrderStatus(order: {
  is_digital: boolean;
  status: string;
  tracking_number: string | null;
}) {
  if (order.is_digital) {
    return "디지털 열람 가능";
  }

  if (order.status === "shipped") {
    return "배송 완료";
  }

  if (order.tracking_number) {
    return "배송 중";
  }

  if (order.status === "paid") {
    return "배송 준비 중";
  }

  return "결제 완료";
}
