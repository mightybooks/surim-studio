"use client";

import Link from "next/link";

export default function InAppMicroPrompt({
  isLoggedIn,
  isEmailVerified,
  nextPath,
  loginHref,
  verifyGuideHref = "/notice/email-verification",
}: {
  isLoggedIn: boolean;
  isEmailVerified: boolean;
  nextPath?: string;
  loginHref?: string;
  verifyGuideHref?: string;
}) {
  const resolvedLoginHref =
    loginHref ?? `/login${nextPath ? `?returnTo=${encodeURIComponent(nextPath)}` : ""}`;

  if (!isLoggedIn) {
    return (
      <div className="rounded-md border border-neutral-200 bg-white p-2 text-[11px] text-neutral-700">
        <p>이 기능은 로그인 후 이용할 수 있습니다.</p>
        <Link href={resolvedLoginHref} className="mt-1 inline-block font-semibold underline underline-offset-2">
          로그인
        </Link>
      </div>
    );
  }

  if (!isEmailVerified) {
    return (
      <div className="rounded-md border border-neutral-200 bg-white p-2 text-[11px] text-neutral-700">
        <p>이 기능은 이메일 인증 후 이용할 수 있습니다.</p>
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
