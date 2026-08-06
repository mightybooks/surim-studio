import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      ok: false,
      error: "LEGACY_ADMIN_LOGIN_RETIRED",
      message: "Supabase 로그인 후 관리자 권한을 확인해 주세요.",
    },
    { status: 410 },
  );
}
