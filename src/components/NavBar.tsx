// src/components/NavBar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  href: string;
  label: string;
};

type NavGroup = {
  label: string; // ABOUT / WORKS / MEDIA
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "ABOUT",
    items: [
      { href: "/about", label: "About" },
      { href: "/brands", label: "Brands" },
    ],
  },
  {
    label: "WORKS",
    items: [
      { href: "/projects", label: "Projects" },
      { href: "/surimzine", label: "SurimZine" },
      // TODO: 실제 공모전 페이지 생기면 "/contest" 로 교체
      { href: "/standby1", label: "Contest" },
    ],
  },
  {
    label: "MEDIA",
    items: [
      { href: "/news", label: "News" },
      { href: "/blog", label: "Blog" },      
    ],
  },
];

export default function NavBar() {
  const pathname = usePathname();

  const base =
    "inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-elev)] " +
    "px-4 py-2 text-[0.95rem] leading-none shadow-sm transition hover:bg-[#F5EEDC] " +
    "focus:outline-none focus:ring-2 focus:ring-emerald-600/30";

  const active =
    "bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-700";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  return (
    <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-elev)] p-4 shadow-sm max-w-xl mx-auto">
      {/* 항상 3단 세로 구조 */}
      <div className="flex flex-col gap-4">
        {NAV_GROUPS.map((group) => (
          <div
            key={group.label}
            className="flex flex-col items-center gap-2"
          >
            {/* 그룹 라벨 */}
            <div className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[color:var(--fg)]/65">
              {group.label}
            </div>

            {/* 그룹별 버튼들 */}
            <div className="flex flex-wrap justify-center gap-2">
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`${base} ${isActive(item.href) ? active : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
