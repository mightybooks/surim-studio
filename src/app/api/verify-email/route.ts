import { NextResponse } from "next/server";
import { supabaseServerPublic } from "@/lib/supabase/server-public";
import { sendVerifyEmail } from "@/lib/mail/send";

export async function POST(req: Request) {
  const supabase = supabaseServerPublic();

  // 1. 요청 바디
  const { email, userId } = await req.json();

  if (!email || !userId) {
    return NextResponse.json(
      { message: "잘못된 요청입니다." },
      { status: 400 }
    );
  }

  // 2. 프로필 조회 (락 체크)
  const { data: profile, error } = await supabase
    .from("profiles")
    .select(
      "contact_email_verified_at"
    )
    .eq("id", userId)
    .single();

  if (error || !profile) {
    return NextResponse.json(
      { message: "사용자를 찾을 수 없습니다." },
      { status: 404 }
    );
  }

  // 🔒 이미 인증된 경우 → 여기서 차단
  if (profile.contact_email_verified_at) {
    return NextResponse.json(
      { message: "이미 인증이 완료된 이메일이 있습니다." },
      { status: 403 }
    );
  }

  // 3. 인증 토큰 생성
  const token = crypto.randomUUID();

  // 4. 인증 대기 이메일 저장
  await supabase
    .from("profiles")
    .update({
      contact_email_pending: email,
      contact_email_requested_at: new Date().toISOString(),
    })
    .eq("id", userId);

  // 5. 토큰 저장
  await supabase
    .from("email_verifications")
    .insert({
      user_id: userId,
      email,
      token,
      created_at: new Date().toISOString(),
    });

  // 6. 인증 메일 발송
  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/verify-email?token=${token}`;

  await sendVerifyEmail(email, verifyUrl);

  return NextResponse.json({ success: true });

}
