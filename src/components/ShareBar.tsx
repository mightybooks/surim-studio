"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";

type ShareBarProps = {
  /** 아래쪽에 쓸 때: 위에 여백 + 구분선 추가 */
  withDivider?: boolean;
};

export default function ShareBar({ withDivider = false }: ShareBarProps) {
  const pathname = usePathname();
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://surimstudio.com";
  const url = `${baseUrl}${pathname || ""}`;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
      alert("링크 복사에 실패했습니다. 주소창에서 직접 복사해 주세요.");
    }
  };

  const handleSystemShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url,
        });
      } catch {
        // 사용자가 취소한 경우 등은 조용히 무시
      }
    } else {
      // 지원 안 되면 그냥 복사로 대체
      await handleCopy();
    }
  };

  return (
    <section
      className={
        withDivider
          ? "mt-12 border-t border-slate-200 pt-6"
          : "mt-4"
      }
    >
      <div className="flex justify-end">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="hidden sm:inline mr-1">
            이 글, 함께 보고 싶은 분께
          </span>

          <button
            type="button"
            onClick={handleCopy}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] hover:bg-slate-50"
          >
            링크 복사
          </button>

          <button
            type="button"
            onClick={handleSystemShare}
            className="rounded-full bg-slate-900 px-3 py-1 text-[11px] font-medium text-white hover:bg-slate-800"
          >
            디바이스로 공유…
          </button>

          {copied && (
            <span className="text-[11px] text-emerald-600">
              복사되었습니다
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
