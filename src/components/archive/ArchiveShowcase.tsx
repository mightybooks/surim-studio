// src/components/archive/ArchiveShowcase.tsx
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ArchiveItem } from "@/types/archive";
import ArchiveTopCards from "./ArchiveTopCards";
import ArchiveRotationStage from "./ArchiveRotationStage";

/* -------------------------
 * Utilities
 * ------------------------- */

function shuffle<T>(arr: T[]): T[] {
  // NOTE: sort-random은 완전한 균등 랜덤은 아니지만, 현재 목적(연출)에는 충분합니다.
  // 추후 진짜 랜덤이 필요하면 Fisher–Yates로 교체하면 됩니다.
  return [...arr].sort(() => Math.random() - 0.5);
}

function buildLoopDeck<T>(items: T[], size: number): T[] {
  // items가 0이면 빈 배열
  if (items.length === 0) return [];
  const out: T[] = [];
  let i = 0;
  while (out.length < size) {
    out.push(items[i % items.length]);
    i++;
  }
  return out;
}

function pickRandomN<T>(items: T[], n: number): T[] {
  // n개를 뽑되, 데이터가 적으면 순환으로 채워서 항상 n개를 반환
  if (items.length === 0) return [];
  const shuffled = shuffle(items);
  if (shuffled.length >= n) return shuffled.slice(0, n);
  return buildLoopDeck(shuffled, n);
}

function summarizeResultTypes(items: ArchiveItem[]): string {
  const map = new Map<string, number>();
  for (const it of items) {
    map.set(it.result_type, (map.get(it.result_type) ?? 0) + 1);
  }
  // 상위 6개만 요약
  const sorted = [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  return sorted.map(([k, v]) => `${k}:${v}`).join(", ");
}

/* -------------------------
 * Component
 * ------------------------- */

export default function ArchiveShowcase({
  archives,
}: {
  archives: ArchiveItem[];
}) {

  const [topCards, setTopCards] = useState<ArchiveItem[]>([]);
  const [rotationSource, setRotationSource] = useState<ArchiveItem[]>([]);

  // 로테이션은 “한 번 세팅하면 계속 유지”가 목표.
  // (archives가 바뀌어도, 연출 흔들리지 않게)
  const rotationInitializedRef = useRef(false);

  /* -------------------------
   * Init: top + rotation
   * ------------------------- */

  useEffect(() => {
    if (!archives || archives.length === 0) {
      // 데이터가 없으면 초기화
      setTopCards([]);
      setRotationSource([]);
      rotationInitializedRef.current = false;
      return;
    }

    // 상단 3장은 항상 랜덤 3장
    setTopCards(pickRandomN(archives, 3));

    // 하단 5장 로테이션은 최초 1회만 세팅 (계속 돌아만 가게)
    if (!rotationInitializedRef.current) {
      setRotationSource(pickRandomN(archives, 5));
      rotationInitializedRef.current = true;
    }
  }, [archives]);

  /* -------------------------
   * Actions
   * ------------------------- */

  const reshuffleTop = useCallback(() => {
    if (!archives || archives.length === 0) return;
    setTopCards(pickRandomN(archives, 3));
  }, [archives]);

  /**
   * ArchiveRotationStage의 버튼(onSelect)을 “상단 재셔플 트리거”로만 사용.
   * - 하단 로테이션 데이터는 유지 (계속 회전)
   * - 버튼만 눌렀을 때 상단만 바뀜
   */
  const handleSelectFromRotation = useCallback(() => {
    reshuffleTop();
  }, [reshuffleTop]);

  /* -------------------------
   * Render guards
   * ------------------------- */

  if (!archives || archives.length === 0) return null;
  if (topCards.length === 0) return null;

  return (
    <section className="space-y-24">

      {/* 상단: 랜덤 3장 (버튼 누를 때마다 바뀜) */}
      <ArchiveTopCards items={topCards} />

      {/* 하단: 5장 회전 무대 (계속 회전만) */}
      {rotationSource.length >= 5 && (
        <ArchiveRotationStage
          items={rotationSource}
          onSelect={handleSelectFromRotation}
        />
      )}
    </section>
  );
}
