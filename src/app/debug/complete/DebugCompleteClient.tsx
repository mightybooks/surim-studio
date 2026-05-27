"use client";

import { useSearchParams } from "next/navigation";

export default function DebugCompleteClient() {
  const params = useSearchParams();
  const trace = params.get("trace");

  return (
    <main style={{ padding: 32 }}>
      <h1>SUCCESS URL HIT</h1>
      <p>trace: {trace}</p>
    </main>
  );
}
