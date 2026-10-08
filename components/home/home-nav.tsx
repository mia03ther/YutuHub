"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AuthNavActions } from "@/components/auth/auth-nav-actions";
import { LanguageSelector } from "@/components/home/language-selector";
import { useHomeI18n } from "@/components/home/home-i18n";
import { ThemeToggle } from "@/components/theme-toggle";

export function HomeNav() {
  const { copy } = useHomeI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { label: copy.nav.information, href: "#campus-signals" },
    { label: copy.nav.course, href: "#course-guide" },
    { label: copy.nav.food, href: "#food-guide" },
    { label: copy.nav.market, href: "#campus-market" },
    { label: copy.nav.community, href: "#community" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    const onEscape = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <header className={`home-nav fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ${scrolled ? "home-nav-scrolled" : ""}`}>
      <div className="home-nav-shell mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="#top" className="flex shrink-0 items-center gap-3 text-sm font-semibold tracking-tight text-[var(--home-fg)]">
          <span className="brand-glyph border-current" aria-hidden="true"><i /><i /><i /></span>
          <span className="leading-none"><b className="block text-[13px] tracking-[-0.03em]">YUTUHUB</b><small className="mt-1 block text-[8px] font-medium tracking-[0.24em] text-[var(--home-muted)]">屿途知汇</small></span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Homepage">
          {navItems.map((item) => <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 text-[12px] font-medium text-[var(--home-muted)] transition hover:bg-[var(--glass-hover)] hover:text-[var(--home-fg)]">{item.label}</Link>)}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5">
          <div className="hidden xl:block"><AuthNavActions variant="home" labels={copy.nav} /></div>
          <Link href="/community" className="glass-control hidden min-h-11 items-center px-4 text-xs font-semibold sm:inline-flex xl:hidden 2xl:inline-flex">{copy.nav.publish}</Link>
          <LanguageSelector />
          <div className="hidden md:block"><ThemeToggle labels={copy.controls.theme} /></div>
          <button type="button" className="glass-control flex size-11 items-center justify-center lg:hidden" aria-label={menuOpen ? copy.controls.close : copy.controls.menu} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="glass-popover mx-4 mt-2 p-3 lg:hidden">
          <nav className="grid" aria-label="Homepage mobile">
            {navItems.map((item, index) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center justify-between border-b border-[var(--glass-border)] px-2 text-sm last:border-0"><span>{item.label}</span><span className="font-mono text-[10px] text-[var(--home-muted)]">0{index + 1}</span></Link>)}
          </nav>
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[var(--glass-border)] pt-3 md:hidden"><ThemeToggle labels={copy.controls.theme} /></div>
          <div className="mt-3 border-t border-[var(--glass-border)] pt-3"><AuthNavActions variant="home" labels={copy.nav} /></div>
        </div>
      ) : null}
    </header>
  );
}
