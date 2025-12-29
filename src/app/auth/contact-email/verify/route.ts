import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabase/server";

console.log("CONTACT EMAIL VERIFY ROUTE HIT");

function verifySig(payloadB64: string, sig: string, secret: string) {
  const expected = crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";

  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL("/my?email_verify=unauthorized", url.origin));

  const secret = process.env.AUTH_BRIDGE_SECRET;
  if (!secret) return NextResponse.redirect(new URL("/my?email_verify=server_error", url.origin));

  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) {
    return NextResponse.redirect(new URL("/my?email_verify=invalid", url.origin));
  }

  try {
    if (!verifySig(payloadB64, sig, secret)) {
      return NextResponse.redirect(new URL("/my?email_verify=invalid", url.origin));
    }

    const payloadJson = Buffer.from(payloadB64, "base64url").toString("utf8");
    const payload = JSON.parse(payloadJson) as { uid: string; email: string; exp: number };

    if (payload.uid !== user.id) {
      return NextResponse.redirect(new URL("/my?email_verify=wrong_user", url.origin));
    }
    if (Date.now() > payload.exp) {
      return NextResponse.redirect(new URL("/my?email_verify=expired", url.origin));
    }

    // pending 일치 확인 후 확정
    const { data: profile } = await supabase
      .from("profiles")
      .select("contact_email_pending")
      .eq("id", user.id)
      .single();

    const pending = (profile?.contact_email_pending ?? "").toLowerCase();
    if (pending !== payload.email.toLowerCase()) {
      return NextResponse.redirect(new URL("/my?email_verify=mismatch", url.origin));
    }

    const { error } = await supabase
      .from("profiles")
      .update({
        contact_email: pending,
        contact_email_pending: null,
        contact_email_verified_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .is("contact_email_verified_at", null);

    if (error) {
      return NextResponse.redirect(new URL("/my?email_verify=server_error", url.origin));
    }

    return NextResponse.redirect(new URL("/my?email_verify=ok", url.origin));
  } catch {
    return NextResponse.redirect(new URL("/my?email_verify=invalid", url.origin));
  }
}
