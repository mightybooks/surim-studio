// src/components/archive/ArchiveRotationStage.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { ArchiveItem } from "@/types/archive";

const POSITIONS = [
  { x: -160, scale: 0.7, z: 1, opacity: 0.65 },
  { x: -80, scale: 0.85, z: 2, opacity: 0.85 },
  { x: 0, scale: 1, z: 3 },
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
  const [cards, setCards] = useState<ArchiveItem[]>(items.slice(0, 5));

  // 자동 로테이션
  useEffect(() => {
    const timer = setInterval(() => {
      setCards((prev) => {
        const copy = [...prev];
        copy.push(copy.shift()!);
        return copy;
      });
    }, 2400);

    return () => clearInterval(timer);
  }, []);

  function handleSelect() {
    onSelect(cards.slice(1, 4)); // 중앙 3장
  }

  return (
    <section className="flex flex-col items-center gap-12">
      {/* 로테이션 무대 */}
      <div className="relative h-[260px] w-full flex justify-center items-center overflow-hidden">
        {cards.map((item, i) => {
          const pos = POSITIONS[i];
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
                src={`/archive/dolbom/${item.image_key}.webp`}
                alt=""
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
