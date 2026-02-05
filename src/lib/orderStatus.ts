// src/lib/orderStatus.ts

export type OrderStatus =
  | "pending"
  | "paid"
  | "failed"
  | "expired"
  | "shipped";

export const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "결제대기",
  paid: "결제완료",
  failed: "결제실패",
  expired: "만료",
  shipped: "발송완료",
};

// 혹시 DB에 이상한 값이 들어와도 UI가 터지지 않게 방어
export function normalizeOrderStatus(v: any): OrderStatus {
  const s = String(v ?? "").trim();
  if (
    s === "pending" ||
    s === "paid" ||
    s === "failed" ||
    s === "expired" ||
    s === "shipped"
  ) {
    return s;
  }
  return "pending";
}

export function statusLabel(v: any): string {
  const s = normalizeOrderStatus(v);
  return STATUS_LABEL[s];
}
