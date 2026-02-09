"use client";

import { useEffect, useState } from "react";

function isInAppBrowser() {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent || "";

  // 1️⃣ 명시적으로 "인앱임이 확실한 것"만 잡는다
  const inAppPatterns = [
    /KAKAOTALK/i,
    /Instagram/i,
    /FBAN/i,
    /FBAV/i,
    /FB_IAB/i,
    /NAVER/i,      // 네이버 앱 인앱
    /DaumApps/i,   // 다음 앱 인앱
    /Line/i,       // 라인 인앱
  ];

  if (inAppPatterns.some((p) => p.test(ua))) return true;

  // 2️⃣ Android WebView만 예외적으로 추가
  if (/Android/i.test(ua) && /\bwv\b/i.test(ua)) return true;

  // ❌ iOS는 Safari/Chrome/Edge/Firefox 모두 정상 브라우저로 취급
  return false;
}

export default function InAppBrowserNotice() {
  const [show, setShow] = useState(false);

  useEffect(() => {
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
