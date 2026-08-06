import WelcomeClient from "@/components/welcome/WelcomeClient";
import { isSafeInternalRedirect } from "@/lib/inAppBrowser";

type WelcomePageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function WelcomePage({ searchParams }: WelcomePageProps) {
  const query = await searchParams;
  const safeNext = isSafeInternalRedirect(query.next)
    ? query.next
    : "/my";

  return <WelcomeClient next={safeNext} />;
}
