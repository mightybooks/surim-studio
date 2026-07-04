"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="flex w-full flex-col gap-3 border-b border-[var(--border)] px-6 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/admin" className="text-sm font-semibold text-slate-700">
            ADMIN PANEL
          </Link>
          <nav className="flex flex-wrap gap-3 text-xs text-slate-600">
            <Link href="/admin/blog/new" className="hover:text-emerald-700">
              블로그 작성
            </Link>
            <Link href="/admin/news" className="hover:text-emerald-700">
              뉴스관리
            </Link>
            <Link href="/admin/orders" className="hover:text-emerald-700">
              주문관리
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-fit rounded-full border border-slate-300 px-3 py-1 text-xs hover:bg-slate-100"
        >
          Logout
        </button>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
