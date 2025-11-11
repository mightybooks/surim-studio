export default function Page({ params }: { params: any }) {
  return <pre suppressHydrationWarning>{JSON.stringify(params, null, 2)}</pre>;
}
