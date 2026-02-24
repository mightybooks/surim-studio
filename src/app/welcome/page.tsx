import WelcomeClient from "@/components/welcome/WelcomeClient";
import { isSafeInternalRedirect } from "@/lib/inAppBrowser";

type WelcomePageProps = {
  searchParams: {
    next?: string;
  };
};

export default function WelcomePage({ searchParams }: WelcomePageProps) {
  const safeNext = isSafeInternalRedirect(searchParams?.next)
    ? searchParams.next
    : "/my";

  return <WelcomeClient next={safeNext} />;
}
