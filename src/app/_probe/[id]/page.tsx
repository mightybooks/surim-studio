// app/_probe/[id]/page.tsx
export const dynamic = "force-dynamic";
export default function Page({ params }: { params: { id: string } }) {
  return <pre>{JSON.stringify(params, null, 2)}</pre>;
}
