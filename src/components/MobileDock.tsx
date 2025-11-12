// src/components/MobileDock.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileDock() {
  const pathname = usePathname();

  // 6개 네비 + 마지막은 Top 액션
  const items: Array<
    | { kind: "link"; href: string; label: string }
    | { kind: "action"; label: string }
  > = [
    { kind: "link", href: "/about",     label: "About"    },
    { kind: "link", href: "/projects",  label: "Projects" },
    { kind: "link", href: "/news",      label: "News"     },
    { kind: "link", href: "/brands",    label: "Brands"   },
    { kind: "link", href: "/surimzine", label: "Zine"     },
    { kind: "link", href: "/standby1",  label: "Contest"  },
    { kind: "action",                   label: "↑ Top"    },
  ];

  // 4의 배수 칸을 맞추기 위한 스페이서
  const fillers = (4 - (items.length % 4)) % 4;

  const baseBtn =
    "block w-full text-center text-[13px] leading-none py-2 rounded-full " +
    "border border-[var(--border)] bg-[var(--bg-elev)] text-[color:var(--fg)]/80 " +
    "hover:bg-[#F5EEDC] transition focus:outline-none focus:ring-2 focus:ring-emerald-600/30";

  const activeBtn =
    "bg-emerald-700 text-white border-emerald-700 hover:bg-emerald-700";

  return (
    <nav
      aria-label="하단 빠른 메뉴"
      className="fixed inset-x-0 bottom-0 z-[55] sm:hidden
                 border-t border-[var(--border)]
                 bg-[var(--bg-elev)]/95 backdrop-blur"
    >
      <div className="pt-2 pb-[calc(.6rem+env(safe-area-inset-bottom))]">
        <ul className="mx-auto grid max-w-screen-sm grid-cols-4 gap-2 px-3">
          {items.map((it, i) => {
            if (it.kind === "link") {
              const active = pathname?.startsWith(it.href);
              return (
                <li key={`${it.href}-${i}`}>
                  <Link
                    href={it.href}
                    aria-current={active ? "page" : undefined}
                    className={`${baseBtn} ${active ? activeBtn : ""}`}
                  >
                    {it.label}
                  </Link>
                </li>
              );
            }
            // Top 액션
            return (
              <li key={`top-${i}`}>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className={baseBtn}
                  aria-label="맨 위로"
                >
                  {it.label}
                </button>
              </li>
            );
          })}
          {/* 그리드 채우기용 빈 칸 */}
          {Array.from({ length: fillers }).map((_, idx) => (
            <li key={`filler-${idx}`} aria-hidden="true" />
          ))}
        </ul>
      </div>
    </nav>
  );
}
