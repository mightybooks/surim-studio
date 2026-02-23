import LoginForm from "@/components/auth/LoginForm";
import { isSafeInternalRedirect } from "@/lib/inAppBrowser";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { from?: string; next?: string };
}) {
  const fromVerify = searchParams?.from === "verify";
  const nextPath = isSafeInternalRedirect(searchParams?.next) ? searchParams.next : "/my";

  return (
    <main className="p-6">
      <h1 className="mb-4 text-xl">로그인</h1>
      <LoginForm fromVerify={fromVerify} nextPath={nextPath} />
    </main>
  );
}
