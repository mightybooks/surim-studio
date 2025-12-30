import { supabaseBrowser } from "@/lib/supabase/client";

/* =========================
   Queries
   ========================= */

// 좋아요 개수
export async function getLikeCount(
  targetType: string,
  targetId: string
): Promise<number> {
  const supabase = supabaseBrowser();

  const { count, error } = await supabase
    .from("likes")
    .select("*", { count: "exact", head: true })
    .eq("target_type", targetType)
    .eq("target_id", targetId);

  if (error) {
    console.error("getLikeCount error:", error);
    return 0;
  }

  return count ?? 0;
}

// 내가 눌렀는지 여부
export async function hasLiked(
  targetType: string,
  targetId: string,
  userId: string
): Promise<boolean> {
  const supabase = supabaseBrowser();

  const { data, error } = await supabase
    .from("likes")
    .select("id")
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("hasLiked error:", error);
    return false;
  }

  return !!data;
}

// 좋아요
export async function like(
  targetType: string,
  targetId: string,
  userId: string
) {
  const supabase = supabaseBrowser();

  const { error } = await supabase.from("likes").insert({
    target_type: targetType,
    target_id: targetId,
    user_id: userId,
  });

  if (error) {
    console.error("like error:", error);
    throw error;
  }
}

// 언라이크
export async function unlike(
  targetType: string,
  targetId: string,
  userId: string
) {
  const supabase = supabaseBrowser();

  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("target_type", targetType)
    .eq("target_id", targetId)
    .eq("user_id", userId);

  if (error) {
    console.error("unlike error:", error);
    throw error;
  }
}
