import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseServer } from "@/lib/supabase/server";

function b64url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function sign(payloadB64: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(payloadB64).digest("base64url");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const email = String(body?.email ?? "").trim().toLowerCase();

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "INVALID_EMAIL" }, { status: 400 });
  }

  const secret = process.env.AUTH_BRIDGE_SECRET;
  if (!secret) return NextResponse.json({ error: "MISSING_SECRET" }, { status: 500 });

  // 토큰: stateless (DB에 토큰 저장 안 함)
  const exp = Date.now() + 1000 * 60 * 30; // 30분
  const payload = { uid: user.id, email, exp };
  const payloadB64 = b64url(JSON.stringify(payload));
  const sig = sign(payloadB64, secret);
  const token = `${payloadB64}.${sig}`;

  // pending 저장 (verified는 초기화)
  const { error: upsertErr } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        role: "user", // ✅ 반드시 명시
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

  const origin = new URL(req.url).origin;
  const verifyUrl = `${origin}/auth/contact-email/verify?token=${encodeURIComponent(token)}`;

  // 메일 발송(Resend)
  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!resendKey || !from) {
    return NextResponse.json({
      error: "EMAIL_NOT_CONFIGURED",
      verifyUrl, // 개발 중 확인용. 운영에서는 제거 권장.
    }, { status: 500 });
  }

  const subject = "[Surim Studio] 이메일 인증";
  const text =
`아래 링크를 클릭하면 연락용 이메일 인증이 완료됩니다.
(30분 내 유효)

${verifyUrl}

본인이 요청하지 않았다면 이 메일을 무시해 주세요.`;

  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: email,
      subject,
      text,
    }),
  });

  if (!resp.ok) {
    const detail = await resp.text().catch(() => "");
    return NextResponse.json({ error: "EMAIL_SEND_FAILED", detail }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
