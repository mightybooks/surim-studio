"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const h = document.documentElement;
      const scrolled =
        (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, scrolled)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-zinc-200">
      <div
        className="h-full bg-emerald-600 transition-[width] duration-150 ease-linear"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
