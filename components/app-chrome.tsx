"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const IMMERSIVE_ROUTES = new Set([
  "/",
  "/login",
  "/register",
  "/profile",
  "/terms",
  "/privacy",
]);

export function AppChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const immersive = IMMERSIVE_ROUTES.has(pathname);

  if (immersive) return children;

  return (
    <div className="site-page min-h-screen">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
