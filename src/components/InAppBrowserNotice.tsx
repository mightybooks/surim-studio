"use client";

import { useEffect, useState } from "react";

function isInAppBrowser() {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent || "";

  const isAndroid = /Android/i.test(ua);
  const isAndroidWebView = isAndroid && /\bwv\b/i.test(ua);

  // ✅ 안드로이드 "진짜 크롬" (대부분 Chrome + Safari 토큰 동시 존재)
  const isAndroidRealChrome =
    isAndroid && /Chrome\/\d+/i.test(ua) && /Safari\/\d+/i.test(ua) && !isAndroidWebView;

  // 1) 강한 인앱 신호: 이건 맞으면 그냥 인앱으로 봅니다.
  const strongInAppPatterns = [
    /KAKAOTALK/i,
    /Instagram/i,
    /FBAN/i,
    /FBAV/i,
    /FB_IAB/i,
  ];

  // 2) 약한 인앱 신호: 종종 정상 브라우저에도 섞여 들어옵니다.
  const weakInAppPatterns = [
    /NAVER/i,
    /DaumApps/i,
    /Line/i,
  ];

  const hitStrong = strongInAppPatterns.some((p) => p.test(ua));
  const hitWeak = weakInAppPatterns.some((p) => p.test(ua));

  // 강한 신호면 인앱
  if (hitStrong) return true;

  // ✅ Android 진짜 크롬이면 약한 신호는 무시 (여기서 오탐 방지)
  if (isAndroidRealChrome && hitWeak) return false;

  // 약한 신호만 맞으면 인앱으로 처리 (실제 인앱 브라우저 케이스)
  if (hitWeak) return true;

  // Android WebView는 인앱으로 처리
  if (isAndroidWebView) return true;

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
      카카오톡·인스타그램·네이버 등 인앱 브라우저에서는 일부 결제가 실패할 수 있습니다.
      <br />
      문제가 생기면 외부 브라우저(크롬 또는 사파리)로 다시 시도해 주세요.
    </p>
  );
}
