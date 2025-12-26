// src/lib/storage/uploadContentImage.ts

import { SupabaseClient } from "@supabase/supabase-js";

function formatDate(d = new Date()) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    d.getFullYear().toString() +
    pad(d.getMonth() + 1) +
    pad(d.getDate()) +
    "-" +
    pad(d.getHours()) +
    pad(d.getMinutes()) +
    pad(d.getSeconds())
  );
}

function randomId(len = 4) {
  return Math.random().toString(36).slice(2, 2 + len);
}

export async function uploadContentImage(
  supabase: SupabaseClient,
  file: File,
  slug: string
): Promise<{ url: string } | { error: string }> {
  if (!slug.trim()) {
    return { error: "슬러그를 먼저 입력해 주세요." };
  }

  if (!file.type.startsWith("image/")) {
    return { error: "이미지 파일만 업로드할 수 있습니다." };
  }

  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext) {
    return { error: "파일 확장자를 확인할 수 없습니다." };
  }

  const filename = `${formatDate()}-${randomId()}.${ext}`;
  const path = `posts/${slug}/${filename}`;

  const { error: uploadError } = await supabase.storage
    .from("blog-images")
    .upload(path, file, {
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    console.error(uploadError);
    return { error: "본문 이미지 업로드에 실패했습니다." };
  }

  const { data } = supabase.storage
    .from("blog-images")
    .getPublicUrl(path);

  return { url: data.publicUrl };
}
