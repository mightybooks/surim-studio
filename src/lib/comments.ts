// /src/lib/comments.ts

import { supabaseBrowser } from "@/lib/supabase/client";

/* =========================
   Types
   ========================= */

export type Comment = {
  id: string;
  target_type: string;
  target_id: string;
  user_id: string;
  content: string;
  created_at: string;
};

/* =========================
   Queries
   ========================= */

export async function getComments(
  targetType: string,
  targetId: string
): Promise<Comment[]> {
  const supabase = supabaseBrowser();

  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("getComments error:", error);
    return [];
  }

  return data ?? [];
}

export async function addComment(params: {
  targetType: string;
  targetId: string;
  content: string;
  userId: string;
}) {
  const supabase = supabaseBrowser();

  const { targetType, targetId, content, userId } = params;

  const { error } = await supabase.from("comments").insert({
    target_type: targetType,
    target_id: targetId,
    content,
    user_id: userId,
  });

  if (error) {
    console.error("addComment error:", error);
    throw error;
  }
}

export async function deleteComment(commentId: string) {
  const supabase = supabaseBrowser();  
  
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    console.error("deleteComment error:", error);
    throw error;
  }
}

