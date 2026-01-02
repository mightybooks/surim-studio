"use client";

import { useEffect, useState } from "react";

function isInAppBrowser() {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent || "";

// 1. 명시적 인앱 브라우저
  const inAppPatterns = [
    /KAKAOTALK/i,
    /Instagram/i,    
    /FBAN/i,
    /FBAV/i,
    /FB_IAB/i,
  ];

  if (inAppPatterns.some((p) => p.test(ua))) {
    return true;
  }

// 2. Android WebView (Threads 포함)
  if (
    /Android/i.test(ua) &&
    /wv/i.test(ua)
  ) {
    return true;
  }

// 3. iOS WebView 감지 (Threads 핵심)
    const isIOS = /iPhone|iPad|iPod/i.test(ua);
    const isSafari =
    /Safari/i.test(ua) &&
    !/CriOS|FxiOS|EdgiOS|OPiOS|FBAN|FBAV|Instagram/i.test(ua);

    if (isIOS && !isSafari) {
    return true;
    }

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
      카카오톡·인스타그램·스레드 등 인앱 브라우저에서는 로그인 과정에서 문제가 발생할 수 있습니다.
      <br />
      원활한 이용을 위해 외부 브라우저 크롬, 또는 사파리 등에서 접속해 주세요.
    </p>
  );
}
