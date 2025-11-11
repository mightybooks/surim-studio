// app/debug/[id]/page.tsx
export default function Page({ params }: { params: { id: string } }) {
  return <pre>{JSON.stringify(params, null, 2)}</pre>;
}
