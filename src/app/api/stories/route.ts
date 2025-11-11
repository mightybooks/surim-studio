import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data } = await supabase
    .from("stories")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: Request) {
  const { content } = await req.json();
  if (!content || content.length > 50) return NextResponse.json({ ok:false }, { status: 400 });
  await supabase.from("stories").insert({ content });
  return NextResponse.json({ ok:true });
}
