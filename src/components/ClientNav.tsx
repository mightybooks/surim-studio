// src/components/ClientNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientNav() {
  const pathname = usePathname();
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/news", label: "News" },
    { href: "/brands", label: "Brands" },
    { href: "/surimzine", label: "SurimZine" },
    { href: "/standby1", label: "Contest" },
  ];

  return (
    <ul className="flex flex-wrap items-center justify-end gap-x-4 gap-y-2 text-sm sm:text-[0.95rem] max-w-full">
      {navLinks.map((link) => {
        const active = pathname?.startsWith(link.href);
        return (
          <li key={link.href} className="min-w-0">
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? "font-medium text-emerald-900"
                  : "text-[color:var(--fg)]/75 hover:text-[color:var(--fg)]"
              }
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
