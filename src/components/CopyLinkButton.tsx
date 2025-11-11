// src/components/CopyLinkButton.tsx
"use client";

import { useState } from "react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // 무시: 권한 문제 등
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-3 py-1 rounded-full border border-zinc-300 hover:bg-zinc-50"
      aria-label="링크 복사"
    >
      {copied ? "복사됨" : "링크 복사"}
    </button>
  );
}
