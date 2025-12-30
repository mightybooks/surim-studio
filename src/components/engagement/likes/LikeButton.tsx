"use client";

import { useEffect, useState } from "react";
import {
  getLikeCount,
  hasLiked,
  like,
  unlike,
} from "@/lib/likes";
import { supabaseBrowser } from "@/lib/supabase/client";

type Props = {
  targetType: string;
  targetId: string;
};

export default function LikeButton({ targetType, targetId }: Props) {
  const [count, setCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      const supabase = supabaseBrowser();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      const c = await getLikeCount(targetType, targetId);
      setCount(c);

      if (user) {
        const liked = await hasLiked(
          targetType,
          targetId,
          user.id
        );
        setLiked(liked);
      }
    };

    init();
  }, [targetType, targetId]);

  const toggle = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      if (liked) {
        await unlike(targetType, targetId, user.id);
        setLiked(false);
        setCount((c) => c - 1);
      } else {
        await like(targetType, targetId, user.id);
        setLiked(true);
        setCount((c) => c + 1);
      }
    } catch {
      alert("처리에 실패했습니다.");
    }
  };

  return (
    <button
    onClick={toggle}
    className="
        flex items-center gap-1
        text-sm text-zinc-500
        hover:text-zinc-800
        transition
    "
    >
    <span className="text-base leading-none">
        {liked ? "♥" : "♡"}
    </span>
    <span>{count}</span>
    </button>
  );
}
