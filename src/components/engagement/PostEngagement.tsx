// /src/components/engagement/PostEngagement.tsx
"use client";

import { useState } from "react";
import LikeButton from "@/components/engagement/likes/LikeButton";
import Comments from "@/components/engagement/comments/Comments";

type Props = {
  targetType: string;
  targetId: string;
  mode?: "default" | "archive";
};

export default function PostEngagement({
  targetType,
  targetId,
  mode = "default",
}: Props) {
  const [open, setOpen] = useState(mode !== "archive");

  return (
    <section className="mt-10 space-y-4">
      {/* 반응 바 */}
      <div className="flex items-center gap-4">
        <LikeButton
          targetType={targetType}
          targetId={targetId}
        />

        {mode === "archive" && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="text-sm text-slate-500 hover:text-slate-800 transition"
          >
            {open ? "댓글 닫기" : "댓글 보기"}
          </button>
        )}
      </div>

      {/* 댓글 영역 */}
      {open && (
        <div className="pt-4 border-t border-slate-200">
          <Comments
            targetType={targetType}
            targetId={targetId}
          />
        </div>
      )}
    </section>
  );
}
