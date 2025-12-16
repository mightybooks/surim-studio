// src/components/archive/ArchiveShowcase.tsx
"use client";

import { useEffect, useState } from "react";
import type { ArchiveItem } from "@/types/archive";
import ArchiveTopCards from "./ArchiveTopCards";
import ArchiveRotationStage from "./ArchiveRotationStage";

export default function ArchiveShowcase({
  archives,
}: {
  archives: ArchiveItem[];
}) {
  const [topCards, setTopCards] = useState<ArchiveItem[]>([]);
  const [rotationSource, setRotationSource] = useState<ArchiveItem[]>([]);

  // 초기 세팅
  useEffect(() => {
    if (archives.length < 5) return;

    const shuffled = [...archives].sort(() => 0.5 - Math.random());
    setTopCards(shuffled.slice(0, 3));
    setRotationSource(shuffled.slice(3));
  }, [archives]);

  function handleShuffleFromRotation(selected: ArchiveItem[]) {
    setTopCards(selected);
  }

  if (topCards.length === 0 || rotationSource.length === 0) return null;

  return (
    <section className="space-y-24">
      {/* 위층: 결과 카드 */}
      <ArchiveTopCards items={topCards} />

      {/* 아래층: 회전 무대 */}
      <ArchiveRotationStage
        items={rotationSource}
        onSelect={handleShuffleFromRotation}
      />
    </section>
  );
}
