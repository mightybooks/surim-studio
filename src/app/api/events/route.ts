import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: Request) {
  const { event_type, referrer } = await req.json();
  if (!event_type) return NextResponse.json({ ok:false }, { status: 400 });
  await supabase.from("events").insert({ event_type, referrer });
  return NextResponse.json({ ok: true });
}
