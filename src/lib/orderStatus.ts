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
