import { Suspense } from "react";
import AdminBlogNewClient from "./AdminBlogNewClient";

export default function AdminBlogNewPage() {
  return (
    <Suspense fallback={null}>
      <AdminBlogNewClient />
    </Suspense>
  );
}