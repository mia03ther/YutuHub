"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { TRACK_LINKS } from "@/lib/nav";
import { ThemeToggle } from "./theme-toggle";
import { AuthNavActions } from "./auth/auth-nav-actions";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-border-line bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center gap-8 px-5 sm:px-8 lg:px-12">
        <Link href="/" className="brand-lockup group flex shrink-0 items-center gap-3" aria-label="返回 YutuHub 首页">
          <span className="brand-glyph" aria-hidden="true"><i /><i /><i /></span>
          <span className="leading-none">
            <span className="block text-[15px] font-bold tracking-[-0.04em]">YUTUHUB</span>
            <span className="mt-1 block text-[9px] font-medium tracking-[0.28em] text-muted">屿途知汇</span>
          </span>
        </Link>

        <nav aria-label="主导航" className="hidden lg:block">
          <ul className="flex items-center gap-5">
            {TRACK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className={`site-nav-link ${pathname === link.href ? "is-active" : ""}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:block"><AuthNavActions /></div>
          <button type="button" className="glass-control flex size-10 items-center justify-center lg:hidden" aria-label={open ? "关闭导航" : "打开导航"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? <div className="glass-popover mx-4 mb-3 p-3 lg:hidden">
        <nav aria-label="功能导航">
          <ul className="grid sm:grid-cols-2">
          {TRACK_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`site-nav-link flex min-h-11 items-center border-b border-border-line px-2 ${pathname === link.href ? "is-active" : ""}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          </ul>
        </nav>
        <div className="mt-3 border-t border-border-line pt-3 sm:hidden"><AuthNavActions /></div>
      </div> : null}
    </header>
  );
}
