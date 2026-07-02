import SignupForm from "@/components/auth/SignupForm";
import { isSafeInternalRedirect } from "@/lib/inAppBrowser";

export default function SignupPage({
  searchParams,
}: {
  searchParams?: { next?: string; returnTo?: string };
}) {
  const requestedPath = searchParams?.returnTo ?? searchParams?.next;
  const returnTo = isSafeInternalRedirect(requestedPath) ? requestedPath : "/my";

  return <SignupForm returnTo={returnTo} />;
}
