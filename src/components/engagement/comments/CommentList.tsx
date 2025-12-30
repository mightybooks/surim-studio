import type { Comment } from "@/lib/comments";
import CommentItem from "./CommentItem";

type Props = {
  comments: Comment[];
  currentUser: any;
  onDelete: () => void;
};

export default function CommentList({
  comments,
  currentUser,
  onDelete,
}: Props) {
  if (comments.length === 0) {
    return (
      <div className="mt-6 text-sm text-zinc-400">
        아직 댓글이 없습니다.
      </div>
    );
  }

  return (
    <ul className="mt-6 space-y-4">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
