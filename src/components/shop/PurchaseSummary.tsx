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
  const isIOS = useMemo(() => /iPhone|iPad|iPod/i.test(ua), [ua]);
  const isAndroid = useMemo(() => /Android/i.test(ua), [ua]);

  const isInApp = useMemo(() => {
    if (!ua) return false;

    // ✅ "진짜 인앱 브라우저" 시그니처만 잡는다.
    // (iOS Chrome(CriOS), Edge(EdgiOS)는 정상 브라우저이므로 인앱 취급 금지)
    const inAppPatterns = [
      /KAKAOTALK/i,
      /Instagram/i,
      /FBAN/i,
      /FBAV/i,
      /FB_IAB/i,
      /NAVER/i,
      /DaumApps/i,
      /Line/i,
    ];
    if (inAppPatterns.some((p) => p.test(ua))) return true;

    // Android WebView 힌트 (앱 내 웹뷰에서 흔함)
    if (/Android/i.test(ua) && /\bwv\b/i.test(ua)) return true;

    return false;
  }, [ua]);

  async function copyCurrentUrl() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (!url) return;

    const guide = isIOS
      ? "주소를 복사했습니다.\n사파리에서 붙여넣기 후 다시 시도해 주세요."
      : isAndroid
        ? "주소를 복사했습니다.\n크롬에서 붙여넣기 후 다시 시도해 주세요."
        : "주소를 복사했습니다.\n외부 브라우저에서 다시 시도해 주세요.";

    try {
      // ✅ 최신 브라우저
      await navigator.clipboard.writeText(url);
      alert(guide);
      return;
    } catch {
      // ✅ 폴백 1: execCommand
      try {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.top = "0";
        ta.style.left = "0";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        alert(guide);
      } catch {
        // ✅ 폴백 2: prompt (사용자가 길게 눌러 복사)
        prompt("복사가 제한되어 있습니다. 아래 주소를 길게 눌러 복사해 주세요.", url);
      }
    }
  }

  function goOrder(path: "/order" | "/order/intl", paramsObj: Record<string, string>) {
    const params = new URLSearchParams({
      productId: String(product.id ?? "test-product"),
      productName: product.name,
      ...paramsObj,
      ...extraQuery,
      // ✅ 디버그 증거(짧게)
      ua_mobile: isMobile ? "1" : "0",
      ua_inapp: isInApp ? "1" : "0",
    });

    router.push(`${path}?${params.toString()}`);
  }

  function guardInAppForPay() {
    // ✅ 인앱에서 결제 실패가 실제로 발생: 인앱은 선제 차단 + 주소 복사 유도
    if (isMobile && isInApp) {
      const browserGuide = isIOS ? "사파리" : isAndroid ? "크롬" : "외부 브라우저";

      const ok = confirm(
        "앱 내부 브라우저(카카오톡/인스타 등)에서는 결제가 실패할 수 있습니다.\n\n" +
          `${browserGuide}에서 결제해 주세요.\n\n` +
          "확인: 현재 페이지 주소를 복사합니다.\n" +
          "취소: 닫기"
      );
      if (ok) void copyCurrentUrl();
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

      {/* ✅ 인앱에서만 "주소 복사" 버튼 노출 */}
      {isMobile && isInApp && (
        <button
          type="button"
          onClick={() => void copyCurrentUrl()}
          className="
            w-full rounded-xl px-4 py-3 font-semibold
            border border-zinc-300 bg-white hover:bg-zinc-50
            transition
          "
        >
          {isIOS ? "주소 복사 (사파리에서 열기)" : "주소 복사 (크롬에서 열기)"}
        </button>
      )}

      {/* ✅ 국내 주문 */}
      <button
        onClick={() => {
          if (guardInAppForPay()) return;
          goOrder("/order", {
            amount_minor: String(Number(product.price ?? 0)),
            currency: "KRW",
            payRegion: "KOREA",
            pg: "",
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

      {/* ✅ 해외 결제 (PayPal) */}
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

      <div className="text-xs text-zinc-500">해외결제는 USD로 진행됩니다.</div>
    </div>
  );
}
