// src/components/ScrollTopDesktop.tsx
"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function ScrollTopDesktop() {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const isSurimjiReader = pathname.startsWith("/edition/surimji/issue-0/read/");

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show || isSurimjiReader) return null;

  return (
    <button
      aria-label="맨 위로"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="hidden sm:flex fixed right-6 bottom-6 z-[60]
                 items-center justify-center rounded-full
                 border border-[var(--border)] bg-[var(--bg-elev)]
                 shadow-md px-4 py-2 text-sm text-[var(--fg)]
                 hover:bg-[#F5EEDC] transition"
    >
      ↑ Top
    </button>
  );
}
