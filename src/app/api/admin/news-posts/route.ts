import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase/server";

const adminSupabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function assertAdmin() {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false as const, status: 401, message: "Unauthorized" };
  }

  const { data: admin, error } = await adminSupabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .single();

  if (error || !admin) {
    return { ok: false as const, status: 403, message: "Forbidden" };
  }

  return { ok: true as const };
}

export async function POST(req: Request) {
  try {
    const admin = await assertAdmin();
    if (!admin.ok) {
      return NextResponse.json(
        { message: admin.message },
        { status: admin.status },
      );
    }

    const payload = await req.json();

    if (!payload?.slug || !payload?.title || !payload?.content_markdown) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    if (!["draft", "published"].includes(payload.status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 });
    }

    const now = new Date().toISOString();
    const slug = String(payload.slug).trim();
    const originalSlug = payload.original_slug
      ? String(payload.original_slug).trim()
      : null;

    if (originalSlug && originalSlug !== slug) {
      const { data: existing, error: existingError } = await adminSupabase
        .from("news_posts")
        .select("slug")
        .eq("slug", slug)
        .maybeSingle();

      if (existingError) {
        console.error("ADMIN NEWS_POSTS DUPLICATE CHECK ERROR", existingError);
        return NextResponse.json({ message: "Save failed" }, { status: 500 });
      }

      if (existing) {
        return NextResponse.json(
          { message: "이미 사용 중인 뉴스 slug입니다." },
          { status: 409 },
        );
      }
    }

    const record = {
      slug,
      title: String(payload.title).trim(),
      summary: payload.summary ? String(payload.summary).trim() : null,
      content_markdown: String(payload.content_markdown),
      status: payload.status,
      published_at:
        payload.status === "published"
          ? payload.published_at || now
          : payload.published_at || null,
      updated_at: now,
    };

    const query = originalSlug
      ? adminSupabase
          .from("news_posts")
          .update(record)
          .eq("slug", originalSlug)
          .select("slug")
          .maybeSingle()
      : adminSupabase.from("news_posts").insert(record).select("slug").single();

    const { data, error } = await query;

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { message: "이미 사용 중인 뉴스 slug입니다." },
          { status: 409 },
        );
      }

      console.error("ADMIN NEWS_POSTS SAVE ERROR", error);
      return NextResponse.json({ message: "Save failed" }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ message: "News not found" }, { status: 404 });
    }

    return NextResponse.json({ ok: true, slug }, { status: 200 });
  } catch (err) {
    console.error("ADMIN NEWS_POSTS API ERROR", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
