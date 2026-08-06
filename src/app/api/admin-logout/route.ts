import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { hasValidOrigin } from "@/lib/securityServer";

export async function POST(req: Request) {
  if (!hasValidOrigin(req)) {
    return NextResponse.json({ ok: false, error: "FORBIDDEN_ORIGIN" }, { status: 403 });
  }
  const supabase = await supabaseServer();
  const { error } = await supabase.auth.signOut();
  if (error) return NextResponse.json({ ok: false, error: "SIGN_OUT_FAILED" }, { status: 500 });
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin_auth", "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
  return res;
}
