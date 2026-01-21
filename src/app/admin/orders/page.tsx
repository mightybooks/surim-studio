import { cookies } from "next/headers";
import ShipButton from "./ShipButton";

async function getOrders() {
  const res = await fetch("/api/orders", {
    cache: "no-store",
    headers: {
      Cookie: cookies().toString(),
    },
  });

  if (!res.ok) {
    throw new Error("주문 목록을 불러오지 못했습니다.");
  }

  return res.json();
}

const STATUS_LABEL: Record<string, string> = {
  pending: "결제대기",
  paid: "결제완료",
  shipped: "발송완료",
  cancelled: "취소",
  expired: "만료",
};

export default async function AdminOrdersPage() {
  const { orders } = await getOrders();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">주문 관리</h1>

      <table className="w-full border text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-2">주문ID</th>
            <th className="p-2">상품명</th>
            <th className="p-2">금액</th>
            <th className="p-2">상태</th>
            <th className="p-2">주문시각</th>
            <th className="p-2">처리</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o: any) => (
            <tr key={o.id} className="border-b">
              <td className="p-2">{o.id.slice(0, 8)}</td>
              <td className="p-2">{o.product_name}</td>
              <td className="p-2">{o.amount.toLocaleString()}원</td>
              <td className="p-2">{STATUS_LABEL[o.status]}</td>
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
