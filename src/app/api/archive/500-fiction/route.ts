// src/app/api/archive/500-fiction/route.ts

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function normalizeOgImageKey(value: string) {
  return value
    .replace(/^.*\//, "")   // 경로 제거
    .replace(/\.png$/, ""); // 확장자 제거
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      content,
      og_image_key,
      email,
      created_at,
    } = body;

    // 1️⃣ 최소 검증
    if (
      !title ||
      !content ||
      !og_image_key ||
      !email ||
      !created_at
    ) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    // 2️⃣ DB insert
    const { error } = await supabase
      .from("fiction_500_archive")
      .insert([
        {
          title,
          content,
          og_image_key: normalizeOgImageKey(og_image_key),
          email,
          created_at,
        },
      ]);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "DB insert failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
