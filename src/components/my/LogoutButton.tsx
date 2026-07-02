"use client";

import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={logout}
      className="rounded-lg border border-[color:var(--border)] px-4 py-2 text-sm hover:bg-black/5"
    >
      로그아웃
    </button>
  );
}
