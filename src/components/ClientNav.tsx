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
    <ul className="flex gap-5 text-sm">
      {navLinks.map(link => {
        const active = pathname?.startsWith(link.href);
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={active ? "text-emerald-800 font-medium" : "text-zinc-700 hover:text-zinc-900"}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
