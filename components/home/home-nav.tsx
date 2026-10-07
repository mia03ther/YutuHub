"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AuthNavActions } from "@/components/auth/auth-nav-actions";

const navItems = [
  { label: "信息", href: "#campus-signals" },
  { label: "选课", href: "#course-guide" },
  { label: "干饭", href: "#food-guide" },
  { label: "校园经济", href: "#campus-market" },
  { label: "社区", href: "#community" },
];

export function HomeNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[rgba(245,245,245,0.08)] bg-[rgba(8,8,8,0.72)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="#top"
          className="flex shrink-0 items-center gap-2.5 text-sm font-semibold tracking-tight text-[#f5f5f5]"
        >
          <span className="flex size-6 items-center justify-center rounded-md bg-[var(--lime)] text-[11px] font-bold text-[#080808]">
            Y
          </span>
          <span>屿途知汇</span>
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-[#8a8a8a] transition-colors hover:text-[#f5f5f5]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <AuthNavActions variant="home" />
          <Link
            href="/community"
            className="hidden rounded-full border border-white/15 px-3.5 py-1.5 text-[13px] font-medium text-[#f5f5f5] transition-colors hover:border-white/30 sm:inline-flex"
          >
            发布内容
          </Link>
        </div>
      </div>
    </header>
  );
}
