"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function DebugComplete() {
  const params = useSearchParams();

  useEffect(() => {
    fetch("/api/debug", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stage: "success_url_hit",
        traceId: params.get("trace"),
        payload: {
          href: window.location.href,
          userAgent: navigator.userAgent,
        },
      }),
    });
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>SUCCESS URL HIT</h1>
      <pre>{window.location.href}</pre>
    </div>
  );
}
