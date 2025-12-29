import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabase/server";
import { sendVerifyEmail } from "@/lib/mail/send";

function b64url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function sign(payloadB64: string, secret: string) {
  return crypto
    .createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const email = String(body?.email ?? "").trim().toLowerCase();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "INVALID_EMAIL" }, { status: 400 });
  }

  const secret = process.env.AUTH_BRIDGE_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "MISSING_SECRET" }, { status: 500 });
  }

  // 🔹 stateless token (30분)
  const exp = Date.now() + 1000 * 60 * 30;
  const payload = { uid: user.id, email, exp };
  const payloadB64 = b64url(JSON.stringify(payload));
  const sig = sign(payloadB64, secret);
  const token = `${payloadB64}.${sig}`;

  // 1️⃣ profiles upsert
  const { error: upsertErr } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        role: "user",
        contact_email_pending: email,
        contact_email_verified_at: null,
        contact_email_requested_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );

  if (upsertErr) {
    console.error("contact email upsert failed", upsertErr);
    return NextResponse.json(
      { error: "DB_UPSERT_FAILED" },
      { status: 500 }
    );
  }

  // 2️⃣ verify URL
  const origin = new URL(req.url).origin;
  const verifyUrl = `${origin}/auth/contact-email/verify?token=${encodeURIComponent(
    token
  )}`;

  // 3️⃣ send mail
  try {
    await sendVerifyEmail(email, verifyUrl);
  } catch (err) {
    console.error("email send failed", err);
    return NextResponse.json(
      { error: "EMAIL_SEND_FAILED" },
      { status: 500 }
    );
  }

  // 4️⃣ success
  return NextResponse.json({ ok: true });
}
