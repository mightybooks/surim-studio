// src/components/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  // 공통 버튼 스타일(전역 변수 기반)
  const base =
    "inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elev)] " +
    "px-4 py-2 text-[0.95rem] leading-none shadow-sm transition hover:bg-[#F5EEDC] " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-600/30";

  const active =
    "bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-700";

  // 현재 경로와 일치/포함 판단
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const links = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/news", label: "News" },
    { href: "/brands", label: "Brands" },
    { href: "/surimzine", label: "SurimZine" },
    // 실제 경로가 /standby1인데 active 비교는 /contest로 되어 있었습니다. 일관되게 /standby1로 맞춥니다.
    { href: "/standby1", label: "Contest" },
  ];

  return (
    <div className="mt-6 flex flex-wrap justify-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-3 shadow-sm">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`${base} ${isActive(href) ? active : ""}`}
          aria-current={isActive(href) ? "page" : undefined}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
