"use client";

import { useEffect, useState } from "react";
import { getComments } from "@/lib/comments";
import type { Comment } from "@/lib/comments";
import { supabaseBrowser } from "@/lib/supabase/client";

import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import LoginGate from "./LoginGate";

type Props = {
  targetType: string;
  targetId: string;
};

export default function Comments({ targetType, targetId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const supabase = supabaseBrowser();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      const data = await getComments(targetType, targetId);
      setComments(data);
      setLoading(false);
    };

    init();
  }, [targetType, targetId]);

  if (loading) {
    return <div className="text-sm text-zinc-400">댓글 불러오는 중…</div>;
  }

  return (
    <section className="mt-10">
      <h3 className="text-sm font-semibold mb-4">
        댓글 {comments.length}
      </h3>

      {user ? (
        <CommentForm
          targetType={targetType}
          targetId={targetId}
          user={user}
          onSuccess={() =>
            getComments(targetType, targetId).then(setComments)
          }
        />
      ) : (
        <LoginGate />
      )}

      <CommentList
        comments={comments}
        currentUser={user}
        onDelete={() =>
          getComments(targetType, targetId).then(setComments)
        }
      />
    </section>
  );
}
