import LoginForm from "@/components/auth/LoginForm";
import { isSafeInternalRedirect } from "@/lib/inAppBrowser";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; next?: string; returnTo?: string }>;
}) {
  const query = await searchParams;
  const fromVerify = query.from === "verify";
  const requestedPath = query.returnTo ?? query.next;
  const nextPath = isSafeInternalRedirect(requestedPath) ? requestedPath : "/my";

  return (
    <main className="p-6">
      <h1 className="mb-4 text-xl">로그인</h1>
      <LoginForm fromVerify={fromVerify} nextPath={nextPath} />
    </main>
  );
}
