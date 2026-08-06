export const PAYMENT_ID_PATTERN = /^[A-Za-z0-9_-]{6,64}$/;

export function isValidPaymentId(value: unknown): value is string {
  return typeof value === "string" && PAYMENT_ID_PATTERN.test(value);
}
