"use client";

import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="w-full border-b border-[var(--border)] px-6 py-3 flex items-center justify-between">
        <h1 className="text-sm font-semibold text-slate-700">ADMIN PANEL</h1>

        <button
          onClick={handleLogout}
          className="text-xs rounded-full border border-slate-300 px-3 py-1 hover:bg-slate-100"
        >
          Logout
        </button>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}
