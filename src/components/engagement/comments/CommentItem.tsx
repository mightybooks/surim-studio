"use client";

import type { Comment } from "@/lib/comments";
import { deleteComment } from "@/lib/comments";

type Props = {
  comment: Comment;
  currentUser: any;
  onDelete: () => void;
};

export default function CommentItem({
  comment,
  currentUser,
  onDelete,
}: Props) {
  const isOwner = currentUser?.id === comment.user_id;

  const handleDelete = async () => {
    if (!confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      await deleteComment(comment.id);
      onDelete();
    } catch (e) {
      alert("댓글 삭제에 실패했습니다.");
    }
  };

  return (
    <li className="border border-zinc-200 rounded-md p-4">
      <div className="flex justify-between items-start">
        <div className="text-xs text-zinc-500">
          {comment.user_id.slice(0, 6)}***
        </div>

        {isOwner && (
          <button
            onClick={handleDelete}
            className="text-xs text-zinc-400 hover:text-red-500"
          >
            삭제
          </button>
        )}
      </div>

      <p className="mt-2 text-sm whitespace-pre-wrap">
        {comment.content}
      </p>

      <div className="mt-2 text-xs text-zinc-400">
        {new Date(comment.created_at).toLocaleString()}
      </div>
    </li>
  );
}
