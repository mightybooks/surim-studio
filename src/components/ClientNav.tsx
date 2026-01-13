// src/components/ClientNav.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

type NavItem = {
  href: string;
  label: string;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const NAV_GROUPS: NavGroup[] = [
  {
    label: "ABOUT",
    items: [
      { href: "/about", label: "About" },
      { href: "/writer", label: "Writer" },
      { href: "/brands", label: "Brands" },
      { href: "/findus", label: "Find Us" },
    ],
  },
  {
    label: "WORKS",
    items: [
      { href: "/projects", label: "Projects" },
      { href: "/surimzine", label: "SurimZine" },
      { href: "/contest/2026", label: "Contest" },
    ],
  },
  {
    label: "MEDIA",
    items: [
      { href: "/news", label: "News" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    label: "SHOP",
    items: [
      { href: "/shop/surimji", label: "SurimZine" },
      { href: "/shop/books/tosil", label: "Books" },
      { href: "/shop/goods/8cut", label: "Goods" },
    ],
  },
];

const MY_GROUP: NavGroup = {
  label: "MY",
  items: [
    { href: "/my", label: "내 정보" },
    { href: "/my/fundings", label: "참여 중인 펀딩" },
    { href: "/my/events", label: "참여 중인 이벤트" },
    { href: "/logout", label: "로그아웃" },
  ],
};

export default function ClientNav() {
  const pathname = usePathname();
  const router = useRouter(); 
  const supabase = supabaseBrowser(); 

  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const groupsToRender = isLoggedIn
    ? [...NAV_GROUPS, MY_GROUP]
    : NAV_GROUPS;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };  
  
  useEffect(() => {
    // 초기 세션 체크
    supabase.auth.getSession().then(({ data }) => {
      setIsLoggedIn(!!data.session);
    });

    // 로그인 / 로그아웃 실시간 감지
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // 경로가 바뀌면 드롭다운 닫기
  useEffect(() => {
    setOpenGroup(null);
  }, [pathname]);

  // 바깥 아무 곳이나 클릭하면 닫기
  useEffect(() => {
    if (!openGroup) return;

    const handleClickOutside = () => {
      setOpenGroup(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openGroup]);

  const handleToggle = (
    label: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    // 버튼 자체 클릭은 버블링 막아서 바로 닫히지 않게
    e.stopPropagation();
    setOpenGroup((prev) => (prev === label ? null : label));
  };

  return (
    <ul className="relative flex max-w-full flex-wrap items-center justify-end gap-x-6 gap-y-2 text-sm sm:text-[0.95rem]">
      {groupsToRender.map((group) => {
        const groupActive = group.items.some((item) =>
          isActive(item.href),
        );
        const isOpen = openGroup === group.label;

        return (
          <li key={group.label} className="relative min-w-0">
            {/* 상단 1뎁스 버튼: ABOUT / WORKS / MEDIA */}
            <button
              type="button"
              onClick={(e) => handleToggle(group.label, e)}
              aria-haspopup="true"
              aria-expanded={isOpen}
              className={[
                "cursor-pointer rounded-full px-3 py-1 text-[0.8rem] font-semibold uppercase tracking-[0.18em]",
                "transition-colors duration-150 border",
              isOpen || groupActive
                ? "bg-slate-900 text-white border-transparent"
                : "text-[color:var(--fg)]/80 hover:text-slate-900 hover:bg-[#E8F0FF] hover:border-[#C5D9FF]"
              ].join(" ")}
            >
              {group.label}
            </button>

            {/* 드롭다운: 클릭 시 열림 (PC/모바일 공통) */}
            {isOpen && (
              <div
                className="absolute right-0 top-full z-40 mt-2 w-40 rounded-xl 
                           border border-[color:var(--border)] 
                           bg-[color:var(--bg-elev)] py-2 text-sm shadow-lg"
                // 드롭다운 내부 클릭 시에는 닫히지 않도록
                onClick={(e) => e.stopPropagation()}
              >
               {group.items.map((item) =>
                item.label === "로그아웃" ? (
                  <button
                    key="logout"
                    type="button"
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setIsLoggedIn(false);
                      setOpenGroup(null);
                      router.push("/");
                      router.refresh();
                    }}
                    className="block w-full truncate px-4 py-2 text-left text-[color:var(--fg)]/75 hover:bg-[#F5EEDC]"
                  >
                    로그아웃
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpenGroup(null)}
                    className={`block truncate px-4 py-2 ${
                      isActive(item.href)
                        ? "font-semibold text-emerald-900"
                        : "text-[color:var(--fg)]/75 hover:bg-[#F5EEDC]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ),
              )}                
              </div>
            )}
          </li>
        );
      })}
    {!isLoggedIn && (
      <li className="relative min-w-0">
        <Link
        href="/login"
        className={[
        "cursor-pointer rounded-full px-3 py-1 text-[0.8rem] font-semibold uppercase tracking-[0.18em]",
        "transition-colors duration-150 border",
        isActive("/login")
        ? "bg-slate-900 text-white border-transparent"
        : "text-[color:var(--fg)]/80 hover:text-slate-900 hover:bg-[#E8F0FF] hover:border-[#C5D9FF]",
        ].join(" ")}
        >
        LOGIN
       </Link>
     </li>
    )}
  </ul>
 );
}
