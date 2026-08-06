// src/app/admin/orders/page.tsx

import { cookies, headers } from "next/headers";
import ShipButton from "./ShipButton";
import { STATUS_LABEL } from "@/lib/orderStatus";
import type { OrderStatus } from "@/lib/orderStatus";
import { formatMoney } from "@/lib/formatMoney";

type AdminOrder = {
  id: string;
  recipient_name: string;
  product_name: string;
  amount: number | null;
  amount_minor: number | null;
  currency: string | null;
  status: OrderStatus;
  created_at: string;
};

type AdminOrdersResponse = {
  orders: AdminOrder[];
};

async function getOrders() {
  const requestHeaders = await headers();
  const cookieStore = await cookies();
  const host = requestHeaders.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/admin-orders`, {
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  if (!res.ok) {
    throw new Error("주문 목록을 불러오지 못했습니다.");
  }

  return (await res.json()) as AdminOrdersResponse;
}

export default async function AdminOrdersPage() {
  const { orders } = await getOrders();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">주문 관리</h1>

      <table className="w-full border text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-2">주문ID</th>
            <th className="p-2">주문자명</th>
            <th className="p-2">상품명</th>
            <th className="p-2">금액</th>
            <th className="p-2">상태</th>
            <th className="p-2">주문시각</th>
            <th className="p-2">처리</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-b">
              <td className="p-2">{o.id.slice(0, 8)}</td>
              <td className="p-2">{o.recipient_name}</td>
              <td className="p-2">{o.product_name}</td>              
              <td className="p-2">
                {formatMoney({
                  amount_minor: o.amount_minor ?? o.amount,
                  currency: o.currency,
                })}
              </td>
              <td className="p-2">{STATUS_LABEL[o.status as OrderStatus]}</td>
              <td className="p-2">
                {new Date(o.created_at).toLocaleString()}
              </td>
              <td className="p-2">
                {o.status === "paid" && (
                  <ShipButton orderId={o.id} />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
