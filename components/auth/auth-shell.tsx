import Link from "next/link";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/theme-toggle";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthShell({ eyebrow, title, description, children }: AuthShellProps) {
  return (
    <main className="auth-stage relative min-h-screen overflow-hidden">
      <div className="hx-grid opacity-65" aria-hidden="true" />
      <div className="hx-noise opacity-[0.035]" aria-hidden="true" />
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-25" viewBox="0 0 1440 960" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-80 800 C270 640 410 780 660 510 C870 284 1082 343 1510 70" fill="none" stroke="currentColor" strokeDasharray="3 14" strokeWidth="2" />
        <circle cx="658" cy="512" r="8" fill="currentColor" />
        <circle cx="658" cy="512" r="24" fill="none" stroke="currentColor" />
      </svg>

      <header className="relative z-20 border-b border-white/[0.12]">
        <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold">
            <span className="brand-glyph border-white text-white" aria-hidden="true"><i /><i /><i /></span>
            <span className="leading-none"><b className="block text-[13px]">YUTUHUB</b><small className="mt-1 block text-[8px] tracking-[0.24em] text-white/45">屿途知汇</small></span>
          </Link>
          <div className="flex items-center gap-3"><ThemeToggle /><Link href="/" className="border-b border-[var(--border-strong)] pb-1 text-xs text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--foreground)]">返回首页 ↗</Link></div>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-[90rem] lg:grid-cols-[minmax(0,1.05fr)_minmax(34rem,0.72fr)]">
        <section className="relative flex min-h-[43vh] flex-col justify-between border-b border-white/[0.12] px-5 py-12 sm:px-8 lg:min-h-0 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#002FA7]">{eyebrow}</p>
            <h1 className="mt-7 max-w-2xl text-[clamp(2.8rem,5.8vw,6.7rem)] font-bold leading-[0.91] tracking-[-0.065em]">{title}</h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-white/50">{description}</p>
          </div>

          <div className="mt-8 lg:mt-14">
            <p className="hidden select-none text-[clamp(5rem,12vw,12rem)] font-bold leading-[0.68] tracking-[-0.09em] text-white/[0.055] lg:block" aria-hidden="true">YUTU<br /><span className="pl-[.3em]">HUB</span></p>
            <div className="flex items-center gap-3 border-t border-white/10 pt-4 font-mono text-[9px] uppercase tracking-[0.18em] text-white/38 lg:mt-9">
              <span className="size-1.5 bg-[#002FA7]" />
              当前仅向广东外语外贸大学开放
            </div>
          </div>
        </section>

        <section className="flex items-center bg-[#0d0d0d]/92 px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
          <div className="w-full border border-white/[0.13] bg-[#111]/92 p-5 shadow-[18px_18px_0_rgba(255,255,255,0.035)] sm:p-8">
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
