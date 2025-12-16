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

  useEffect(() => {
    if (archives.length === 0) return;

    const shuffled = [...archives].sort(() => 0.5 - Math.random());

    // 🔹 위층: 항상 최대 3장
    const top = shuffled.slice(0, Math.min(3, shuffled.length));
    setTopCards(top);

    // 🔹 아래층: 최소 5장 확보 (부족하면 순환으로 채움)
    const rest = shuffled.slice(top.length);

    let rotation: ArchiveItem[] = [];

    if (rest.length >= 5) {
      rotation = rest.slice(0, 5);
    } else {
      // 부족한 만큼 앞에서 다시 가져와 채움
      rotation = [...rest];
      let i = 0;
      while (rotation.length < 5 && shuffled.length > 0) {
        rotation.push(shuffled[i % shuffled.length]);
        i++;
      }
    }

    setRotationSource(rotation);
  }, [archives]);

  function handleShuffleFromRotation(selected: ArchiveItem[]) {
    // 🔹 위층은 항상 3장 유지
    if (selected.length >= 3) {
      setTopCards(selected.slice(0, 3));
    }
  }

  // ❗ 더 이상 null로 날리지 않음
  if (topCards.length === 0) return null;

  return (
    <section className="space-y-24">
      {/* 위층: 결과 카드 (항상 3장) */}
      <ArchiveTopCards items={topCards} />

      {/* 아래층: 회전 무대 (항상 5장 소스) */}
      {rotationSource.length >= 5 && (
        <ArchiveRotationStage
          items={rotationSource}
          onSelect={handleShuffleFromRotation}
        />
      )}
    </section>
  );
}
