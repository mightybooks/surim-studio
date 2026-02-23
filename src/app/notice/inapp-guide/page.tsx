import InAppGuideClient from "@/components/gate/InAppGuideClient";

export default function InAppGuidePage({
  searchParams,
}: {
  searchParams: { redirect?: string | string[] };
}) {
  const redirectParam = Array.isArray(searchParams.redirect)
    ? searchParams.redirect[0]
    : searchParams.redirect;

  return <InAppGuideClient redirectParam={redirectParam} />;
}
