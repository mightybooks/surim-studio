"use client";

import { useEffect } from "react";

export default function ProtectContent() {
  useEffect(() => {
    const message = "긁어가지 마라. 나도 좀 먹고 살자";

    const isAdmin = () =>
      document.body.dataset.admin === "true";

    // 1) 본문 우클릭 방지
    const onContextMenu = (e: MouseEvent) => {
      if (isAdmin()) return;

      const target = e.target as HTMLElement;
      if (!target.closest("main")) return;

      e.preventDefault();
      alert(message);
    };

    // 2) 본문 드래그 선택 감지
    const onSelectionChange = () => {
      if (isAdmin()) return;

      const selection = window.getSelection();
      if (!selection || selection.isCollapsed) return;

      const anchorNode = selection.anchorNode as Node | null;
      if (!anchorNode) return;

      const parent =
        anchorNode instanceof HTMLElement
          ? anchorNode
          : anchorNode.parentElement;

      if (!parent?.closest("main")) return;

      selection.removeAllRanges();
      alert(message);
    };

    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("selectionchange", onSelectionChange);

    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("selectionchange", onSelectionChange);
    };
  }, []);

  return null;
}
