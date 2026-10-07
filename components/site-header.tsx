import Link from "next/link";
import { SITE } from "@/lib/site";
import { TRACK_LINKS } from "@/lib/nav";
import { ThemeToggle } from "./theme-toggle";
import { AuthNavActions } from "./auth/auth-nav-actions";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-line bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex size-6 items-center justify-center rounded-md bg-foreground text-[11px] font-bold text-background">
            屿
          </span>
          <span className="text-sm font-semibold tracking-tight">
            {SITE.name}
          </span>
        </Link>

        <nav aria-label="主导航" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {TRACK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-2.5 py-1.5 text-sm text-muted transition hover:bg-surface-hover hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <AuthNavActions />
        </div>
      </div>

      <nav aria-label="功能导航" className="no-scrollbar overflow-x-auto border-t border-border-line md:hidden">
        <ul className="flex w-max items-center gap-1 px-5 py-2">
          {TRACK_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block whitespace-nowrap rounded-md px-2.5 py-1 text-sm text-muted"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
