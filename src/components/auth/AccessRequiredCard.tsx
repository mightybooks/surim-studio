import Link from "next/link";

type AccessRequiredCardProps = {
  mode: "login" | "verify";
  next: string;
};

export default function AccessRequiredCard({ mode, next }: AccessRequiredCardProps) {
  if (mode === "verify") {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <h1 className="text-xl font-semibold text-amber-900">메일 인증 후 이용할 수 있습니다.</h1>
          <p className="mt-2 text-sm text-amber-800">
            인증을 마치면 원래 페이지로 돌아갑니다.
          </p>
          <div className="mt-4">
            <Link
              href={`/verify-email?returnTo=${encodeURIComponent(next)}`}
              className="inline-flex rounded-xl bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
            >
              메일 인증 계속하기
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6">
        <h1 className="text-xl font-semibold text-zinc-900">로그인 후 이용할 수 있습니다.</h1>
        <p className="mt-2 text-sm text-zinc-600">로그인하면 원래 페이지로 돌아갑니다.</p>
        <div className="mt-4">
          <Link
            href={`/login?returnTo=${encodeURIComponent(next)}`}
            className="inline-flex rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
          >
            로그인하고 계속하기
          </Link>
        </div>
      </div>
    </main>
  );
}
