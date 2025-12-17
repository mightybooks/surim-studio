"use client";

import { useState } from "react";
import Link from "next/link";
import { ArcanaDeck } from "@/components/500challenge/ArcanaDeck";
import { FictionViewer } from "@/components/500challenge/FictionViewer";
import type { FictionEntry } from "@/components/500challenge/types";

type ArcanaCard = { id: string; ogImageSrc: string };


export default function ArchiveClient({
  cards,
  entries,
  initialIndex,
}: {
  cards: ArcanaCard[];
  entries: FictionEntry[];
  initialIndex: number;
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const moveTo = (next: number) => {
    setActiveIndex(next);
  };

  return (
    <>
      {/* ================= 1층 : 카드 덱 ================= */}
      <section className="mb-10 flex justify-center">
        <ArcanaDeck
          cards={cards}
          activeIndex={activeIndex}
          onChangeActive={moveTo}
        />
      </section>

      {/* ================= 2층 : 컨트롤 + 구분선 ================= */}
      <section className="relative z-50 mb-16 flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
        <button
            onClick={() => moveTo((activeIndex - 1 + cards.length) % cards.length)}
            className="
            w-10 h-10 rounded-full
            border border-slate-300
            text-slate-500
            hover:bg-slate-100 hover:text-slate-700
            transition
            "
            aria-label="이전 카드"
        >
            ‹
        </button>

        <button
            onClick={() => moveTo(Math.floor(Math.random() * cards.length))}
            className="
            px-6 py-2 rounded-full
            bg-emerald-400 text-white text-sm font-medium
            shadow-md shadow-emerald-600/30
            hover:bg-emerald-500
            hover:scale-[1.03]
            active:scale-[0.97]
            transition
            "
        >
            카드 셔플
        </button>

        <button
            onClick={() => moveTo((activeIndex + 1) % cards.length)}
            className="
            w-10 h-10 rounded-full
            border border-slate-300
            text-slate-500
            hover:bg-slate-100 hover:text-slate-700
            transition
            "
            aria-label="다음 카드"
        >
            ›
        </button>
        </div>

        <hr className="w-full max-w-4xl border-slate-200" />
      </section>

      {/* ================= 3층 : 본문 ================= */}
        <section>
        <FictionViewer entry={entries[activeIndex] ?? null} />
        </section>

      {/* ================= CTA ================= */}
      <section className="mt-20 flex flex-col md:flex-row gap-4 justify-center">
        <Link
          href="/projects/500_fiction"
          className="
            px-6 py-3 rounded-xl
            border border-emerald-600
            text-emerald-700 font-medium
            hover:bg-emerald-50
            text-center
          "
        >
          관련 프로젝트 읽기
        </Link>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="mt-16 text-center text-xs text-zinc-400">
        © 2025 수림 스튜디오. All rights reserved.
      </footer>
    </>
  );
}
