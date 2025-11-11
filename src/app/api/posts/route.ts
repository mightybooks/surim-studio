import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js"; // ✅ 브라우저 X, 직접 임포트

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // ✅ 서버 환경에서는 createClient 직접 호출
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    const { data, error } = await supabase
      .from("posts")
      .select("slug,title,summary,category,published_at")
      .order("published_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error.message);
      return NextResponse.json({ items: [], error: error.message }, { status: 500 });
    }

    return NextResponse.json({ items: data ?? [] });
  } catch (e: any) {
    console.error("Unhandled:", e);
    return NextResponse.json({ items: [], error: e?.message || "unknown error" }, { status: 500 });
  }
}
