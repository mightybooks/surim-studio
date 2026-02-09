// src/components/home/MainRollingBanner.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export type MainBannerItem = {
  label: string;
  title: string;
  href: string;
  external?: boolean;
};

type Props = {
  items: MainBannerItem[];
  /** 자동 전환 간격(ms). 기본 4500 */
  intervalMs?: number;
};

function BannerLink({ item }: { item: MainBannerItem }) {
  const cls =
    "group block w-full rounded-2xl border border-emerald-200/70 bg-white/70 " +
    "px-8 py-6 shadow-sm backdrop-blur " +
    "hover:bg-white transition-colors";

  const content = (
    <div className="flex items-center justify-between gap-4">
      <div className="min-w-0">
        <div className="inline-flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800">
            {item.label}
          </span>
        </div>

        <div className="mt-3 text-base font-semibold text-zinc-800 leading-snug">
          {item.title}
        </div>
      </div>

      <div className="shrink-0 text-zinc-400 group-hover:text-zinc-600 transition-colors">
        →
      </div>
    </div>
  );

  if (item.external) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        aria-label={`${item.label}: ${item.title} (새창)`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={item.href} className={cls} aria-label={`${item.label}: ${item.title}`}>
      {content}
    </Link>
  );
}

export default function MainRollingBanner({ items, intervalMs = 4500 }: Props) {
  const safeItems = useMemo(() => (items ?? []).filter(Boolean), [items]);
  const [idx, setIdx] = useState(0);
  const hoverPauseRef = useRef(false);

  // prefers-reduced-motion: 자동전환 최소화
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduceMotion(!!mq.matches);
    onChange();
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (safeItems.length <= 1) return;
    if (reduceMotion) return;

    const t = window.setInterval(() => {
      if (hoverPauseRef.current) return;
      setIdx((v) => (v + 1) % safeItems.length);
    }, intervalMs);

    return () => window.clearInterval(t);
  }, [safeItems.length, intervalMs, reduceMotion]);

  if (!safeItems.length) return null;

  // idx가 길이를 넘어가면 방어
  const active = safeItems[idx % safeItems.length];

  return (
    <section className="w-full">
      {/* ✅ 센터 고정 + 적당한 비율 */}
      <div
        className="mx-auto w-full max-w-5xl px-6"
        onMouseEnter={() => (hoverPauseRef.current = true)}
        onMouseLeave={() => (hoverPauseRef.current = false)}
      >
        <div className="relative rounded-3xl bg-emerald-50/40 border border-emerald-100 px-8 py-7">
          {/* 카드 1개 고정 노출: 페이드 전환 */}
          <div className="relative min-h-[120px]">
            {safeItems.map((item, i) => {
              const isActive = i === (idx % safeItems.length);
              return (
                <div
                  key={`${item.href}-${i}`}
                  className={[
                    "absolute inset-0 transition-all duration-500 ease-out",
                    isActive
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 translate-y-1 pointer-events-none",
                  ].join(" ")}
                  aria-hidden={!isActive}
                >
                  <BannerLink item={item} />
                </div>
              );
            })}
          </div>

          {/* 하단: 구획감(인덱스 닷 + 수동 전환) */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {safeItems.map((_, i) => {
                const on = i === (idx % safeItems.length);
                return (
                  <button
                    key={i}
                    type="button"
                    className={[
                      "h-2 w-2 rounded-full transition-all",
                      on ? "bg-emerald-700" : "bg-emerald-200 hover:bg-emerald-300",
                    ].join(" ")}
                    aria-label={`배너 ${i + 1}로 이동`}
                    onClick={() => setIdx(i)}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-full border border-emerald-200 bg-white/70 px-3 py-1 text-xs text-zinc-700 hover:bg-white transition-colors"
                onClick={() =>
                  setIdx((v) => (v - 1 + safeItems.length) % safeItems.length)
                }
                aria-label="이전 배너"
              >
                이전
              </button>
              <button
                type="button"
                className="rounded-full border border-emerald-200 bg-white/70 px-3 py-1 text-xs text-zinc-700 hover:bg-white transition-colors"
                onClick={() => setIdx((v) => (v + 1) % safeItems.length)}
                aria-label="다음 배너"
              >
                다음
              </button>
            </div>
          </div>

          {/* 현재 배너 텍스트(디버그용 아니고 '구획감' 강화용) */}
          <div className="mt-2 text-[11px] text-zinc-500">
            {active.label}
          </div>
        </div>
      </div>
    </section>
  );
}
