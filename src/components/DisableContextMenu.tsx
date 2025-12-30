"use client";

import { useEffect } from "react";

export default function DisableContextMenu() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const isAdmin = document.body.dataset.admin === "true";
      if (isAdmin) return;

      e.preventDefault();

      alert("긁지 마라. 나도 좀 먹고 살자.");
    };

    document.addEventListener("contextmenu", handler);

    return () => {
      document.removeEventListener("contextmenu", handler);
    };
  }, []);

  return null;
}
