"use client";

import { useEffect, useMemo, useState } from "react";

function isInAppBrowser() {
  if (typeof navigator === "undefined") return false;

  const ua = navigator.userAgent || "";

  const isAndroid = /Android/i.test(ua);
  const isAndroidWebView = isAndroid && /\bwv\b/i.test(ua);

  // ✅ 안드로이드 "진짜 크롬"
  const isAndroidRealChrome =
    isAndroid && /Chrome\/\d+/i.test(ua) && /Safari\/\d+/i.test(ua) && !isAndroidWebView;

  const strongInAppPatterns = [/KAKAOTALK/i, /Instagram/i, /FBAN/i, /FBAV/i, /FB_IAB/i];
  const weakInAppPatterns = [/NAVER/i, /DaumApps/i, /Line/i];

  const hitStrong = strongInAppPatterns.some((p) => p.test(ua));
  const hitWeak = weakInAppPatterns.some((p) => p.test(ua));

  if (hitStrong) return true;
  if (isAndroidRealChrome && hitWeak) return false;
  if (hitWeak) return true;
  if (isAndroidWebView) return true;

  return false;
}

export default function InAppBrowserNotice() {
  const [ua, setUa] = useState("");
  const show = useMemo(() => {
    if (!ua) return false;
    // navigator 기반 함수라, ua 세팅 이후에만 실행
    return isInAppBrowser();
  }, [ua]);

  const isIOS = useMemo(() => /iPhone|iPad|iPod/i.test(ua), [ua]);
  const isAndroid = useMemo(() => /Android/i.test(ua), [ua]);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setUa(navigator.userAgent || "");
      console.log("UA:", navigator.userAgent);
    }
  }, []);

  if (!show) return null;

  const browserGuide = isIOS
    ? "사파리"
    : isAndroid
      ? "크롬"
      : "외부 브라우저";

  return (
    <p className="text-xs text-neutral-500 leading-relaxed">
      카카오톡·인스타그램·네이버 등 인앱 브라우저에서는 일부 결제가 실패할 수 있습니다.
      <br />
      문제가 생기면 <b>{browserGuide}</b>에서 다시 시도해 주세요.
    </p>
  );
}
