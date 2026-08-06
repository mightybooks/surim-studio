import InAppGuideClient from "@/components/gate/InAppGuideClient";

export default async function InAppGuidePage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string | string[] }>;
}) {
  const query = await searchParams;
  const redirectParam = Array.isArray(query.redirect)
    ? query.redirect[0]
    : query.redirect;

  return <InAppGuideClient redirectParam={redirectParam} />;
}
