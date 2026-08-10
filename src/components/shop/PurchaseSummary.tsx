"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { formatMajorMoney, formatMoney, majorToMinor } from "@/lib/formatMoney";
import { detectDevicePlatform, isInAppBrowser } from "@/lib/inAppBrowser";
import { isGoodsProduct, type EditionProduct } from "@/lib/editionProducts";

export default function PurchaseSummary({
  product,
  extraQuery = {},
}: {
  product: EditionProduct;
  ctaLabel?: string;
  extraQuery?: Record<string, string>;
}) {
  const router = useRouter();
  const [ua, setUa] = useState("");

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (active) setUa(navigator.userAgent || "");
    });
    return () => {
      active = false;
    };
  }, []);

  const platform = useMemo(() => detectDevicePlatform(ua), [ua]);
  const isMobile = useMemo(() => /Android|iPhone|iPad|iPod/i.test(ua), [ua]);
  const isIOS = platform === "ios";
  const isAndroid = platform === "android";
  const isInApp = useMemo(() => isInAppBrowser(ua), [ua]);
  const isGoods = useMemo(() => isGoodsProduct(product), [product]);
  const isDigital = product.type === "DIGITAL";
  const hasUsdPrice = Number.isFinite(product.priceUsd) && Number(product.priceUsd) > 0;

  async function copyCurrentUrl() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (!url) return;

    const guide = isIOS
      ? "링크를 복사했습니다.\nSafari 주소창에 붙여 넣어 주세요."
      : isAndroid
        ? "링크를 복사했습니다.\nChrome 주소창에 붙여 넣어 주세요."
        : "링크를 복사했습니다.\n일반 브라우저 주소창에 붙여 넣어 주세요.";

    try {
      await navigator.clipboard.writeText(url);
      alert(guide);
      return;
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = url;
        textarea.style.position = "fixed";
        textarea.style.top = "0";
        textarea.style.left = "0";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert(guide);
      } catch {
        window.prompt("자동 복사에 실패했습니다. 아래 주소를 복사해 주세요.", url);
      }
    }
  }

  function goOrder(path: "/order" | "/order/intl", paramsObj: Record<string, string>) {
    const params = new URLSearchParams({
      productId: String(product.id ?? "test-product"),
      productName: product.name,
      source: extraQuery.source ?? "shop",
      ...paramsObj,
      ...extraQuery,
      ua_mobile: isMobile ? "1" : "0",
      ua_inapp: isInApp ? "1" : "0",
    });

    router.push(`${path}?${params.toString()}`);
  }

  function guardInAppForPay() {
    if (isMobile && isInApp) {
      const browserGuide = isIOS ? "사파리" : isAndroid ? "크롬" : "일반 브라우저";
      const ok = window.confirm(
        "인앱 브라우저에서는 결제가 실패할 수 있습니다.\n\n" +
          `${browserGuide}에서 결제를 진행해 주세요.\n\n` +
          "확인을 누르면 현재 페이지 링크를 복사합니다."
      );
      if (ok) void copyCurrentUrl();
      return true;
    }
    return false;
  }

  return (
    <div className="space-y-4 rounded-2xl border bg-white p-6">
      <div className="text-sm text-zinc-500">{product.type}</div>
      <h1 className="text-2xl font-semibold">{product.name}</h1>

      <div className="text-xl font-bold">
        {formatMoney({
          amount_minor: Number(product.price ?? 0),
          currency: "KRW",
        })}
      </div>
      {hasUsdPrice && (
        <div className="text-sm text-zinc-500">
          {isDigital ? "PayPal USD " : "약 "}
          {formatMajorMoney({ amount_major: Number(product.priceUsd), currency: "USD" })}
          {!isDigital && " USD"}
        </div>
      )}

      {isMobile && isInApp && (
        <button
          type="button"
          onClick={() => void copyCurrentUrl()}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 font-semibold transition hover:bg-zinc-50"
        >
          {isIOS ? "링크 복사 (Safari에서 열기)" : "링크 복사 (Chrome에서 열기)"}
        </button>
      )}

      <button
        onClick={() => {
          if (guardInAppForPay()) return;
          goOrder("/order", {
            amount_minor: String(Number(product.price ?? 0)),
            currency: "KRW",
            payRegion: "KOREA",
            pg: "inicis",
            payment: "bank_transfer",
          });
        }}
        className="mt-3 w-full rounded-xl bg-[#8b3a62] px-4 py-3 font-semibold text-white transition hover:bg-[#7a3256] disabled:opacity-50"
      >
        {isDigital ? "디지털판 구매 · 계좌이체" : "국내주문 계좌이체"}
      </button>

      <button
        onClick={() => {
          if (guardInAppForPay()) return;
          goOrder("/order", {
            amount_minor: String(Number(product.price ?? 0)),
            currency: "KRW",
            payRegion: "KOREA",
            pg: "inicis",
            payment: "card",
          });
        }}
        className="w-full rounded-xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-50"
      >
        {isDigital ? "디지털판 구매 · 카드결제" : "국내주문 카드결제"}
      </button>

      {!isGoods && hasUsdPrice && (
        <button
          onClick={() => {
            if (guardInAppForPay()) return;
            const usdMinor = majorToMinor(Number(product.priceUsd), "USD");
            if (!usdMinor || usdMinor <= 0) return;
            goOrder(isDigital ? "/order" : "/order/intl", {
              amount_minor: String(usdMinor),
              currency: "USD",
              payRegion: "OVERSEAS",
              pg: "paypal",
              payment: "paypal",
            });
          }}
          className="w-full rounded-xl bg-[#003087] px-4 py-3 font-semibold text-white transition hover:bg-[#001f5c] disabled:opacity-50"
        >
          {isDigital
            ? `PayPal · ${formatMajorMoney({ amount_major: Number(product.priceUsd), currency: "USD" })}`
            : "해외주문 PayPal"}
        </button>
      )}

      {isDigital ? (
        <div className="text-xs text-zinc-500">결제 완료 후 계정에 디지털 열람 권한이 부여됩니다.</div>
      ) : isGoods ? (
        <div className="text-xs text-zinc-500">이 상품은 국내 배송 전용입니다.</div>
      ) : (
        <div className="text-xs text-zinc-500">해외결제는 USD로 진행됩니다.</div>
      )}
    </div>
  );
}
