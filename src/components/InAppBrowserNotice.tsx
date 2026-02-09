"use client";

import { useEffect, useState } from "react";

function isInAppBrowser() {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent || "";

  // ✅ iOS 실브라우저 판별
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isIOSRealBrowser = /(CriOS|FxiOS|EdgiOS)/i.test(ua);

  // 1️⃣ 명시적으로 인앱임이 확실한 UA
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

  const hitInAppToken = inAppPatterns.some((p) => p.test(ua));

  // ✅ iOS 크롬/엣지/파폭 + 인앱 토큰 없음 → 정상 브라우저
  if (isIOS && isIOSRealBrowser && !hitInAppToken) {
    return false;
  }

  // 인앱 토큰이 있으면 인앱으로 간주
  if (hitInAppToken) return true;

  // 2️⃣ Android WebView만 예외 처리
  if (/Android/i.test(ua) && /\bwv\b/i.test(ua)) return true;

  return false;
}

export default function InAppBrowserNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("UA:", navigator.userAgent);
    setShow(isInAppBrowser());
  }, []);

  if (!show) return null;

  return (
    <p className="text-xs text-neutral-500 leading-relaxed">
      카카오톡·인스타그램·네이버 등 인앱 브라우저에서는 결제가 실패할 수 있습니다.
      <br />
      원활한 이용을 위해 외부 브라우저(크롬 또는 사파리)로 접속해 주세요.
    </p>
  );
}
