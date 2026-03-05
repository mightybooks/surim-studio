"use client";

import Link from "next/link";

export default function InAppMicroPrompt({
  isLoggedIn,
  isEmailVerified,
  loginHref = "/login",
  verifyGuideHref = "/notice/email-verification",
}: {
  isLoggedIn: boolean;
  isEmailVerified: boolean;
  loginHref?: string;
  verifyGuideHref?: string;
}) {
  if (!isLoggedIn) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-2 text-xs text-neutral-700">
        <p>이 기능은 로그인 후 이용 가능합니다.</p>
        <Link href={loginHref} className="mt-1 inline-block font-semibold underline underline-offset-2">
          로그인
        </Link>
      </div>
    );
  }

  if (!isEmailVerified) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-2 text-xs text-neutral-700">
        <p>이 기능은 이메일 인증 후 이용 가능합니다.</p>
        <Link
          href={verifyGuideHref}
          className="mt-1 inline-block font-semibold underline underline-offset-2"
        >
          인증 안내
        </Link>
      </div>
    );
  }

  return null;
}
