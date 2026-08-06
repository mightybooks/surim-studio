import { Suspense } from "react";
import DebugCompleteClient from "./DebugCompleteClient";
import { notFound } from "next/navigation";

export default function Page() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <Suspense fallback={<div>loading...</div>}>
      <DebugCompleteClient />
    </Suspense>
  );
}
