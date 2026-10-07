"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AuthApiResponse, AuthUser } from "@/lib/user-types";

export function AuthNavActions({ variant = "default" }: { variant?: "default" | "home" }) {
  const [user, setUser] = useState<AuthUser | null | undefined>(undefined);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me", { cache: "no-store" });
        const result = (await response.json()) as AuthApiResponse<{ user: AuthUser }>;
        if (active) setUser(result.ok ? result.data.user : null);
      } catch {
        if (active) setUser(null);
      }
    }

    void loadUser();
    return () => {
      active = false;
    };
  }, []);

  if (user === undefined) {
    return <span className="h-8 w-24" aria-hidden="true" />;
  }

  if (user) {
    return (
      <Link
        href="/profile"
        className={`flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-xs font-medium transition ${
          variant === "home"
            ? "border border-white/15 text-[#f5f5f5] hover:border-white/30"
            : "border border-border text-foreground hover:bg-card-hover"
        }`}
      >
        <span className={`flex size-6 items-center justify-center rounded-full text-[11px] font-semibold ${variant === "home" ? "bg-[#b7ff3c] text-[#080808]" : "bg-foreground text-background"}`}>
          {user.displayName.slice(0, 1).toUpperCase()}
        </span>
        <span className="max-w-24 truncate">{user.displayName}</span>
        <span className={variant === "home" ? "text-[#8a8a8a]" : "text-muted"}>个人中心</span>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <Link
        href="/login"
        className={
          variant === "home"
            ? "rounded-full px-3 py-1.5 text-[13px] font-medium text-[#a0a0a0] transition-colors hover:text-[#f5f5f5]"
            : "rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted transition hover:text-foreground"
        }
      >
        登录
      </Link>
      <Link
        href="/register"
        className={
          variant === "home"
            ? "rounded-full bg-[#f5f5f5] px-3.5 py-1.5 text-[13px] font-medium text-[#080808] transition-opacity hover:opacity-85"
            : "rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background transition hover:opacity-90"
        }
      >
        注册
      </Link>
    </div>
  );
}
