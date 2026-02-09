"use client";

import { useRouter } from "next/navigation";
import { formatMoney } from "@/lib/formatMoney";
import { useEffect, useMemo, useState } from "react";

export default function PurchaseSummary({
  product,
  ctaLabel = "주문하기",
  extraQuery = {},
}: {
  product: any;
  ctaLabel?: string;
  /** /order 로 넘길 query param 추가 (예: { source: "funding_500" }) */
  extraQuery?: Record<string, string>;
}) {
  const router = useRouter();
  const [ua, setUa] = useState<string>("");

  useEffect(() => {
    if (typeof navigator !== "undefined") setUa(navigator.userAgent || "");
  }, []);

  const isMobile = useMemo(() => /Android|iPhone|iPad|iPod/i.test(ua), [ua]);
    const isInApp = useMemo(() => {
      // 기존 InAppBrowserNotice 로직과 동일 계열 (핵심 패턴 + Android wv + iOS webview)
      if (!ua) return false;
      const inAppPatterns = [/KAKAOTALK/i, /Instagram/i, /FBAN/i, /FBAV/i, /FB_IAB/i];
      if (inAppPatterns.some((p) => p.test(ua))) return true;
      if (/Android/i.test(ua) && /wv/i.test(ua)) return true;
      const isIOS = /iPhone|iPad|iPod/i.test(ua);
      const isSafari =
        /Safari/i.test(ua) &&
        !/CriOS|FxiOS|EdgiOS|OPiOS|FBAN|FBAV|Instagram|KAKAOTALK/i.test(ua);
      if (isIOS && !isSafari) return true;
      return false;
    }, [ua]);

  function goOrder(path: "/order" | "/order/intl", paramsObj: Record<string, string>) {
    const params = new URLSearchParams({
      productId: String(product.id ?? "test-product"),
      productName: product.name,
      ...paramsObj,
      ...extraQuery,
      // ✅ “사용자 말” 대신 증거 남기기(너무 길면 안 남길 수도 있으니 짧게만)
      ua_mobile: isMobile ? "1" : "0",
      ua_inapp: isInApp ? "1" : "0",
    });

    router.push(`${path}?${params.toString()}`);
  }

  function guardInAppForPay() {
    // ✅ 지금 이슈는 모바일/인앱에서 결제 실패 케이스가 실제로 발생했으니, 인앱은 선제 차단
    if (isMobile && isInApp) {
      alert(
        "카카오톡/인스타 등 앱 내부 브라우저에서는 결제가 실패할 수 있습니다.\n" +
          "우측 메뉴(…)에서 ‘기본 브라우저로 열기’로 전환 후 다시 시도해 주세요."
      );
      return true; // 막음
    }
    return false;
  }

  return (
    <div className="rounded-2xl border p-6 space-y-4 bg-white">
      <div className="text-sm text-zinc-500">{product.type}</div>
      <h1 className="text-2xl font-semibold">{product.name}</h1>

      {/* 국내 가격 표시 */}
      <div className="text-xl font-bold">
        {formatMoney({
          amount_minor: Number(product.price ?? 0),
          currency: "KRW",
        })}
      </div>

      {/* ✅ 국내 주문 (기존 /order 유지) */}
      <button
        onClick={() => {
          if (guardInAppForPay()) return;
          goOrder("/order", {
            amount_minor: String(Number(product.price ?? 0)), // KRW minor = 원 단위(현재 규칙 유지)
            currency: "KRW",
            payRegion: "KOREA",
            pg: "", // 국내 PG는 confirm에서 선택되므로 공란 유지 가능
          });
        }}
        className="
          mt-3 w-full rounded-xl px-4 py-3 font-semibold text-white
          bg-emerald-700 hover:bg-emerald-800
          transition disabled:opacity-50
        "
      >
        {ctaLabel}
      </button>

      {/* ✅ 해외 결제 (PayPal) -> /order/intl 로 분기 */}
      <button
        onClick={() => {
          if (guardInAppForPay()) return;
          const usd = Number(product.priceUsd ?? 1.0);
          const usdMinor = Math.round(usd * 100);

          goOrder("/order/intl", {
            amount_minor: String(usdMinor),
            currency: "USD",
            payRegion: "OVERSEAS",
            pg: "paypal",
          });
        }}
        className="
          w-full rounded-xl px-4 py-3 font-semibold text-white
          bg-[#003087] hover:bg-[#001f5c]
          transition disabled:opacity-50
        "
      >
        해외결제 (PayPal)
      </button>

      <div className="text-xs text-zinc-500">
        해외결제는 USD로 진행됩니다.
      </div>
    </div>
  );
}
