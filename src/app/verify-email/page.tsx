import Link from "next/link";
import { isSafeInternalRedirect } from "@/lib/inAppBrowser";

export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  const next = isSafeInternalRedirect(searchParams?.next) ? searchParams.next : "/my";

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h1 className="text-xl font-semibold text-amber-900">
          메일 인증이 완료되어야 이용할 수 있습니다.
        </h1>
        <p className="mt-2 text-sm text-amber-800">
          인증 후 자동으로 원래 페이지로 돌아갑니다.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/login?from=verify&next=${encodeURIComponent(next)}`}
            className="inline-flex rounded-xl bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
          >
            인증 완료 후 계속하기
          </Link>
          <Link
            href="/my"
            className="inline-flex rounded-xl border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
          >
            my로 이동
          </Link>
        </div>
      </div>
    </main>
  );
}
