"use client";
import { useEffect } from "react";

export default function KakaoLoader() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ((window as any).Kakao) return;

    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.onload = () => {
      const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
      if (!(window as any).Kakao.isInitialized()) {
        (window as any).Kakao.init(key);
      }
    };
    document.body.appendChild(script);
  }, []);

  return null;
}
