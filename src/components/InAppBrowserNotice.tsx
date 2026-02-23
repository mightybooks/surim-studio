"use client";

import { useEffect, useMemo, useState } from "react";
import { detectDevicePlatform, isInAppBrowser } from "@/lib/inAppBrowser";

export default function InAppBrowserNotice() {
  const [ua, setUa] = useState("");

  const show = useMemo(() => {
    if (!ua) return false;
    return isInAppBrowser(ua);
  }, [ua]);

  const platform = useMemo(() => detectDevicePlatform(ua), [ua]);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      setUa(navigator.userAgent || "");
    }
  }, []);

  if (!show) return null;

  const browserGuide = platform === "ios" ? "사파리" : platform === "android" ? "크롬" : "일반 브라우저";

  return (
    <p className="text-xs leading-relaxed text-neutral-500">
      카카오톡, 인스타그램, 네이버앱 인앱 브라우저에서는 결제/인증이 불안정할 수 있습니다.
      <br />
      문제가 생기면 <b>{browserGuide}</b>에서 다시 시도해 주세요.
    </p>
  );
}
