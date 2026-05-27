import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase/server";

const adminSupabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const supabase = supabaseServer();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data: admin, error: adminError } = await adminSupabase
      .from("admins")
      .select("user_id")
      .eq("user_id", user.id)
      .single();

    if (adminError || !admin) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const payload = await req.json();

    if (!payload?.slug || !payload?.title || !payload?.content_md) {
      return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
    }

    const { error } = await adminSupabase
      .from("blog_posts")
      .upsert(payload, { onConflict: "slug" });

    if (error) {
      console.error("ADMIN BLOG_POSTS UPSERT ERROR", error);
      return NextResponse.json({ message: "Save failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error("ADMIN BLOG_POSTS API ERROR", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
