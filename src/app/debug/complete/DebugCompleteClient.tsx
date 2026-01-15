"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function DebugCompleteClient() {
  const params = useSearchParams();
  const trace = params.get("trace");

  useEffect(() => {
    fetch("/api/debug", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stage: "success_url_hit",
        traceId: trace,
        payload: {
          href: window.location.href,
          ua: navigator.userAgent,
        },
      }),
    });
  }, [trace]);

  return (
    <main style={{ padding: 32 }}>
      <h1>SUCCESS URL HIT</h1>
      <p>trace: {trace}</p>
    </main>
  );
}
