import Link from "next/link";
import type { ReactNode } from "react";

interface AuthShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function AuthShell({ eyebrow, title, description, children }: AuthShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#080808] text-[#f5f5f5]">
      <div className="hx-grid" aria-hidden="true" />
      <div className="hx-noise opacity-[0.045]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-[12%] top-[18%] size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(183,255,60,0.10),transparent_68%)] blur-3xl"
        aria-hidden="true"
      />

      <header className="relative z-10 border-b border-white/[0.08]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5 text-sm font-semibold">
            <span className="flex size-7 items-center justify-center rounded-md bg-[#b7ff3c] text-xs font-bold text-[#080808]">Y</span>
            <span>屿途知汇</span>
          </Link>
          <Link href="/" className="text-sm text-[#8a8a8a] transition-colors hover:text-[#f5f5f5]">
            返回首页
          </Link>
        </div>
      </header>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-14 px-5 py-12 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
        <section className="max-w-md">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#b7ff3c]">{eyebrow}</p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-[-0.035em] sm:text-5xl">{title}</h1>
          <p className="mt-5 text-base leading-7 text-[#8a8a8a]">{description}</p>
          <div className="mt-10 flex items-center gap-3 text-xs text-[#666]">
            <span className="size-1.5 rounded-full bg-[#b7ff3c]" />
            当前仅向广东外语外贸大学开放
          </div>
        </section>

        <section className="w-full rounded-[28px] border border-white/[0.10] bg-[#111111]/90 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-8 lg:justify-self-end">
          {children}
        </section>
      </div>
    </main>
  );
}
