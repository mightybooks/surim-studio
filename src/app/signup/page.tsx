import SignupForm from "@/components/auth/SignupForm";
import { isSafeInternalRedirect } from "@/lib/inAppBrowser";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; returnTo?: string }>;
}) {
  const query = await searchParams;
  const requestedPath = query.returnTo ?? query.next;
  const returnTo = isSafeInternalRedirect(requestedPath) ? requestedPath : "/my";

  return <SignupForm returnTo={returnTo} />;
}
