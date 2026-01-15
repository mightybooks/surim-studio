import { Suspense } from "react";
import DebugCompleteClient from "./DebugCompleteClient";

export default function Page() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <DebugCompleteClient />
    </Suspense>
  );
}
