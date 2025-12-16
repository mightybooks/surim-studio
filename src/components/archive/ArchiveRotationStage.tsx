// src/components/archive/ArchiveRotationStage.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ArchiveItem } from "@/types/archive";
import RESULT_MAP from "@/lib/archive/resultMap";

const POSITIONS = [
  { x: -160, scale: 0.7, z: 1, opacity: 0.65 },
  { x: -80, scale: 0.85, z: 2, opacity: 0.85 },
  { x: 0, scale: 1, z: 3, opacity: 1 },
  { x: 80, scale: 0.85, z: 2, opacity: 0.85 },
  { x: 160, scale: 0.7, z: 1, opacity: 0.65 },
];

export default function ArchiveRotationStage({
  items,
  onSelect,
}: {
  items: ArchiveItem[];
  onSelect: (selected: ArchiveItem[]) => void;
}) {
  const [cards, setCards] = useState<ArchiveItem[]>([]);

  // 🔹 items 변경 시 항상 5장으로 초기화
  useEffect(() => {
    if (items.length < 5) return;
    setCards(items.slice(0, 5));
  }, [items]);

  // 🔹 자동 로테이션 (5장일 때만)
  useEffect(() => {
    if (cards.length < 5) return;

    const timer = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        next.push(next.shift()!);
        return next;
      });
    }, 2400);

    return () => clearInterval(timer);
  }, [cards.length]);

  function handleSelect() {
    if (cards.length < 5) return;
    onSelect([cards[1], cards[2], cards[3]]);
  }

  if (cards.length < 5) return null;

  return (
    <section className="flex flex-col items-center gap-12">
      {/* 로테이션 무대 */}
      <div className="relative h-[260px] w-full flex justify-center items-center overflow-hidden">
        {cards.map((item, i) => {
          const pos = POSITIONS[i];
          const meta = RESULT_MAP[item.result_type];

          if (!meta) return null; // 방어

          return (
            <div
              key={`${item.id}-${i}`}
              className="absolute transition-all duration-700 ease-in-out"
              style={{
                transform: `translateX(${pos.x}px) scale(${pos.scale})`,
                zIndex: pos.z,
                opacity: pos.opacity,
              }}
            >
              <Image
                src={meta.image}
                alt={meta.title}
                width={160}
                height={160}
                className="rounded-xl"
              />
            </div>
          );
        })}
      </div>

      {/* 셔플 버튼 */}
      <button
        onClick={handleSelect}
        className="px-6 py-3 rounded-full border border-zinc-400 text-zinc-700 hover:bg-zinc-100"
      >
        다른 이야기 더 보기
      </button>
    </section>
  );
}
