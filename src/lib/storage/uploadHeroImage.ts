import { SupabaseClient } from "@supabase/supabase-js";

export async function uploadHeroImage(
  supabase: SupabaseClient,
  file: File,
  slug: string
): Promise<{ url: string } | { error: string }> {
  if (!slug.trim()) {
    return { error: "슬러그를 먼저 입력하세요." };
  }

  if (!file.type.startsWith("image/")) {
    return { error: "이미지 파일만 업로드할 수 있습니다." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext) {
    return { error: "파일 확장자를 확인할 수 없습니다." };
  }

  const path = `hero/${slug}/hero.${ext}`;

  // 기존 hero 교체를 허용
  const { error } = await supabase.storage
    .from("blog-images")
    .upload(path, file, {
      upsert: true,
      contentType: file.type,
    });

  if (error) {
    console.error(error);
    return { error: "히어로 이미지 업로드에 실패했습니다." };
  }

  const { data } = supabase.storage
    .from("blog-images")
    .getPublicUrl(path);

  return { url: data.publicUrl };
}
