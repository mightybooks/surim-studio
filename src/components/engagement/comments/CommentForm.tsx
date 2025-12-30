"use client";

import { useState } from "react";
import { addComment } from "@/lib/comments";

type Props = {
  targetType: string;
  targetId: string;
  user: any;
  onSuccess: () => void;
};

export default function CommentForm({
  targetType,
  targetId,
  user,
  onSuccess,
}: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);

    try {
      await addComment({
        targetType,
        targetId,
        content,
        userId: user.id,
      });

      setContent("");
      onSuccess();
    } catch (e) {
      alert("댓글 작성에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 남겨보세요."
        rows={3}
        className="w-full border border-zinc-300 rounded-md p-3 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-zinc-400"
        disabled={loading}
      />

      <div className="mt-2 flex justify-end">
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="text-sm px-4 py-1.5 rounded-md border border-zinc-300 hover:bg-zinc-50 disabled:opacity-50"
        >
          {loading ? "등록 중…" : "등록"}
        </button>
      </div>
    </form>
  );
}
