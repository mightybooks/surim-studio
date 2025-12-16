"use client";

import { useState } from "react";
import Image from "next/image";
import RESULT_MAP from "@/lib/archive/resultMap";

type ArchiveItem = {
  id: string;
  result_type: string;
  message: string | null;
};

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function ArchiveShowcase({
  archives,
}: {
  archives: ArchiveItem[];
}) {
  const [, force] = useState(0);

  const shuffled = shuffle(archives);
  const foreground = shuffled.slice(0, 3);
  const background = shuffled.slice(3, 12);

  return (
    <section className="relative mt-16">
      {/* 배경 카드 */}
      <div className="absolute inset-0 z-0 flex flex-wrap gap-6 justify-center">
        {background.map((item) => {
          const meta = RESULT_MAP[item.result_type];
          if (!meta) return null;

          return (
            <div
              key={item.id}
              className="w-44 opacity-25 blur-md rotate-[-3deg] pointer-events-none"
            >
              <Image
                src={meta.image}
                alt=""
                width={300}
                height={300}
                className="rounded-xl"
              />
            </div>
          );
        })}
      </div>

      {/* 전면 카드 */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {foreground.map((item) => {
          const meta = RESULT_MAP[item.result_type];
          if (!meta) return null;

          return (
            <article
              key={item.id}
              className="rounded-2xl border bg-white p-4 shadow-sm space-y-3"
            >
              <Image
                src={meta.image}
                alt={meta.title}
                width={400}
                height={400}
                className="rounded-xl"
              />

              <h3 className="font-semibold text-sm">
                {meta.title}
              </h3>

              {item.message && (
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {item.message}
                </p>
              )}
            </article>
          );
        })}
      </div>

      {/* 셔플 버튼 */}
      <div className="relative z-10 mt-10 text-center">
        <button
          onClick={() => force((v) => v + 1)}
          className="inline-flex items-center gap-2 rounded-full border px-6 py-2 text-sm hover:bg-zinc-50"
        >
          다른 이야기 더 보기
        </button>
      </div>
    </section>
  );
}
