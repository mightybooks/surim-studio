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
          setError("MY data fetch failed");
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
        Loading your dashboard...
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="rounded-xl border border-[color:var(--border)] p-4 text-sm text-red-600">
        Failed to load dashboard data. Please refresh.
      </section>
    );
  }

  const { profile, orders, submissions } = data;

  return (
    <>
      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">Account</h2>
        <div className="rounded-xl border border-[color:var(--border)] p-4 text-sm text-[color:var(--fg)]/70">
          Account details are protected for security reasons.
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">Email Verification</h2>
        {profile?.contact_email_verified_at ? (
          <div className="rounded-xl border border-[color:var(--border)] p-4 text-sm space-y-1">
            <p className="font-medium text-green-600">Email verification is complete.</p>
            <p className="text-xs text-[color:var(--fg)]/60">The verified email cannot be changed.</p>
          </div>
        ) : (
          <ContactEmailForm defaultEmail={profile?.contact_email_pending ?? ""} />
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Orders</h2>
        {orders.length === 0 ? (
          <p className="text-sm text-neutral-500">No order history found.</p>
        ) : (
          <ul className="space-y-3">
            {orders.map((order) => (
              <li key={order.id} className="rounded-xl border bg-white p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{order.product_name}</p>
                  <span className="text-sm font-medium">{getUserFacingOrderStatus(order)}</span>
                </div>
                <p className="text-sm text-neutral-600">
                  Date: {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-neutral-600">
                  Amount: {formatMoney({ amount_minor: order.amount_minor ?? 0, currency: order.currency ?? "KRW" })}
                </p>
                {!order.is_digital && order.tracking_number && (
                  <p className="text-sm text-neutral-600">
                    Shipping: {order.shipping_carrier ?? "-"} / Tracking: {order.tracking_number}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Contest Submissions</h2>
        {submissions.length === 0 ? (
          <p className="text-sm text-neutral-500">No submission history found.</p>
        ) : (
          <ul className="space-y-3">
            {submissions.map((item) => (
              <li key={item.id} className="rounded-xl border bg-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Contest ({item.contest_year})</p>
                    <p className="text-sm text-neutral-600">Title: {item.work_title}</p>
                    <p className="text-sm text-neutral-600">Pen name: {item.pen_name}</p>
                  </div>
                  <span className="text-sm font-medium">{getStatusLabel(item.status)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">Fundings</h2>
        <div className="rounded-xl border border-dashed border-[color:var(--border)] p-4 text-sm text-[color:var(--fg)]/50">
          No active funding participation.
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-sm font-semibold uppercase tracking-wide">Events</h2>
        <div className="rounded-xl border border-dashed border-[color:var(--border)] p-4 text-sm text-[color:var(--fg)]/50">
          No active event participation.
        </div>
      </section>
    </>
  );
}

function getStatusLabel(status: string) {
  switch (status) {
    case "submitted":
      return "Submitted";
    case "reviewed":
      return "Reviewed";
    case "selected":
      return "Selected";
    case "not_selected":
      return "Completed";
    default:
      return "Processing";
  }
}

function getUserFacingOrderStatus(order: {
  is_digital: boolean;
  status: string;
  tracking_number: string | null;
}) {
  if (order.is_digital) {
    return "Digital item";
  }

  if (order.status === "shipped") {
    return "Shipped";
  }

  if (order.tracking_number) {
    return "In transit";
  }

  if (order.status === "paid") {
    return "Preparing shipment";
  }

  return "Paid";
}
