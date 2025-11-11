"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const baseClasses = "rounded-xl border px-5 py-3";
  const active = "bg-emerald-700 text-white";
  const inactive = "hover:bg-emerald-100";

  return (
    <div className="mt-6 flex gap-4 justify-center shadow-sm p-3 rounded-2xl bg-white/70 backdrop-blur">
      <Link href="/about" className={`${baseClasses} ${pathname === "/about" ? active : inactive}`}>About</Link>
      <Link href="/projects" className={`${baseClasses} ${pathname === "/projects" ? active : inactive}`}>Projects</Link>
      <Link href="/news" className={`${baseClasses} ${pathname === "/news" ? active : inactive}`}>News</Link>
      <Link href="/brands" className={`${baseClasses} ${pathname === "/brands" ? active : inactive}`}>Brands</Link>
      <Link href="/surimzine" className={`${baseClasses} ${pathname === "/surimzine" ? active : inactive}`}>SurimZine</Link>
      <Link href="/standby1" className={`${baseClasses} ${pathname === "/contest" ? active : inactive}`}>contest</Link>
    </div>
  );
}
