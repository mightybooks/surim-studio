import { Suspense } from "react";
import AuthVerifyClient from "./AuthVerifyClient";

export default function AuthVerifyPage() {
  return (
    <Suspense fallback={null}>
      <AuthVerifyClient />
    </Suspense>
  );
}