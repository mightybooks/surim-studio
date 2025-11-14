// src/components/MobileDock.tsx
"use client";

import { useEffect, useState } from "react";

export default function MobileDock() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // 어느 정도 내려갔을 때만 표시 (원하면 숫자 조정 가능)
      const y = window.scrollY || window.pageYOffset;
      setVisible(y > 200);
    };

    onScroll(); // 초기 상태 체크
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!visible) return null;

  const baseBtn =
    "block w-full text-center text-[13px] leading-none py-2 rounded-full " +
    "border border-[var(--border)] bg-[var(--bg-elev)] text-[color:var(--fg)]/80 " +
    "hover:bg-[#F5EEDC] transition focus:outline-none focus:ring-2 focus:ring-emerald-600/30";

  return (
    <nav
      aria-label="맨 위로 가기"
      className="fixed inset-x-0 bottom-0 z-[55] sm:hidden
                 border-t border-[var(--border)]
                 bg-[var(--bg-elev)]/65 backdrop-blur-sm shadow-[0_-6px_20px_rgba(15,23,42,0.10)]"
    >
      <div className="pt-2 pb-[calc(.6rem+env(safe-area-inset-bottom))]">
        <div className="mx-auto max-w-xs px-3">
          <button
            type="button"
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className={baseBtn}
            aria-label="맨 위로"
          >
            ↑ Top
          </button>
        </div>
      </div>
    </nav>
  );
}
