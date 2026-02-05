// src/components/funding/FundingProgressSection.tsx

"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  /** 집계 대상 식별자 (예: "funding_500") */
  source: string;
  /** 목표 권수 (예: 150) */
  targetBooks: number;
  /** 1회 주문 최대 수량 (표시/안내용) */
  maxQtyPerOrder?: number;
  /** 폴링 간격(ms). 기본 10초 */
  pollIntervalMs?: number;
};

type ProgressResponse = {
  currentBooks: number;
  targetBooks?: number;
};

export default function FundingProgressSection({
  source,
  targetBooks,
  maxQtyPerOrder = 100,
  pollIntervalMs = 10_000,
}: Props) {
  const [currentBooks, setCurrentBooks] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [justUpdated, setJustUpdated] = useState(false);

  const pct = useMemo(() => {
    if (!targetBooks || targetBooks <= 0) return 0;
    const raw = (currentBooks / targetBooks) * 100;
    // UI 안정성을 위해 0~100 범위로 클램프    
    return Math.max(0, Math.min(100, raw));
  }, [currentBooks, targetBooks]);

  const isOverTarget = currentBooks >= targetBooks;

  async function fetchProgress() {
    try {
      setError(null);

      const res = await fetch(
        `/api/funding/progress?source=${encodeURIComponent(source)}`,
        { cache: "no-store" }
      );

      if (!res.ok) {
        throw new Error(`progress fetch failed: ${res.status}`);
      }

      const data = (await res.json()) as ProgressResponse;

      setCurrentBooks((prev) => {
        const next = Number.isFinite(data.currentBooks) ? data.currentBooks : 0;
        // 증가/변화가 감지되면 짧게 하이라이트
        if (next !== prev) {
          setJustUpdated(true);
          window.setTimeout(() => setJustUpdated(false), 650);
        }
        return next;
      });
    } catch (e: any) {
      setError(e?.message ?? "알 수 없는 오류");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let timer: number | null = null;
    let alive = true;

    (async () => {
      if (!alive) return;
      await fetchProgress();

      timer = window.setInterval(() => {
        fetchProgress();
      }, pollIntervalMs);
    })();

    return () => {
      alive = false;
      if (timer) window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source, pollIntervalMs]);

  return (
    <section className="rounded-2xl border bg-white p-6 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm text-zinc-500">펀딩 진행 현황</div>

          <div className="text-2xl font-semibold">
            <span className={justUpdated ? "animate-pulse" : ""}>
              현재 {currentBooks.toLocaleString()}권
            </span>{" "}
            <span className="text-zinc-400">/</span>{" "}
            <span className="text-zinc-700">
              목표 {targetBooks.toLocaleString()}권
            </span>

            {isOverTarget && (
              <span className="ml-2 text-emerald-600 text-base font-medium">
                🎉 초과 달성
              </span>
            )}
          </div>

          <div className="text-sm text-zinc-500">
            1회 주문 최대 {maxQtyPerOrder.toLocaleString()}권
          </div>
        </div>

        <div className="text-sm text-zinc-500">
          {loading ? "갱신 중…" : error ? "일시적 오류" : "실시간 반영"}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="h-3 w-full rounded-full bg-emerald-100 overflow-hidden">
          <div
            className={`
              h-full
              rounded-full
              bg-gradient-to-r
              from-emerald-400
              via-teal-400
              to-emerald-600
              transition-[width]
              duration-700
              ease-out
              relative
              ${justUpdated ? "opacity-95" : "opacity-100"}
            `}
            style={{ width: `${pct}%` }}
            aria-label="펀딩 진행률"
            aria-valuenow={Math.round(pct)}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          >
            {/* ✨ subtle shimmer */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-transparent
                via-white/40
                to-transparent
                animate-[shimmer_2.5s_infinite]
              "
            />
          </div>
        </div>      

        {/* 보조 텍스트: 퍼센트는 작게(원하면 제거 가능) */}
        <div className="flex justify-between text-xs text-zinc-500">
          <span>0권</span>
          <span>{isOverTarget ? "100%+" : `${Math.round(pct)}%`}</span>
          <span>{targetBooks.toLocaleString()}권</span>
        </div>

        {error && (
          <div className="text-xs text-red-600">
            진행 현황을 불러오지 못했습니다. ({error})
          </div>
        )}
      </div>

      {/* 안내 문구 (짧게) */}
      <div className="text-sm text-zinc-600 leading-relaxed">
        금액이 아니라 <b>실제 구매된 도서 권수</b>만 집계합니다. 결제 완료
        건부터 반영됩니다.
      </div>
    </section>
  );
}
