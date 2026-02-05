// lib/formatMoney.ts
export type Currency = "KRW" | "USD" | string;

function formatNumber(n: number) {
  return new Intl.NumberFormat("ko-KR").format(n);
}

export function formatMoney(params: {
  amount_minor: number | null | undefined;
  currency: Currency | null | undefined;
  /** KRW: 0, USD: 2 기본 */
  fractionDigits?: number;
}) {
  const { amount_minor, currency } = params;

  const c = (currency ?? "KRW").toUpperCase();
  const minor = Number(amount_minor ?? 0);

  if (!Number.isFinite(minor)) {
    return c === "KRW" ? "0원" : "$0.00";
  }

  // KRW는 minor가 곧 원 단위
  if (c === "KRW") {
    return `${formatNumber(Math.trunc(minor))}원`;
  }

  // USD는 센트 기준
  if (c === "USD") {
    const v = minor / 100;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(v);
  }

  // 기타 통화(안 쓰더라도 안전장치)
  // 기본: minor를 100으로 나눠서 2자리로 표기
  const v = minor / 100;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: c,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(v);
}
