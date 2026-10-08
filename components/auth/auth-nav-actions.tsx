"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { AuthApiResponse, AuthUser } from "@/lib/user-types";

type AuthNavLabels = { login: string; register: string; profile: string };

export function AuthNavActions({ variant = "default", labels = { login: "登录", register: "注册", profile: "个人中心" } }: { variant?: "default" | "home"; labels?: AuthNavLabels }) {
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
            ? "border border-[var(--home-line)] text-[var(--home-fg)] hover:border-[var(--home-fg)]/30"
            : "border border-border text-foreground hover:bg-card-hover"
        }`}
      >
        <span className={`flex size-6 items-center justify-center rounded-full text-[11px] font-semibold ${variant === "home" ? "bg-[var(--klein)] text-white" : "bg-foreground text-background"}`}>
          {user.displayName.slice(0, 1).toUpperCase()}
        </span>
        <span className="max-w-24 truncate">{user.displayName}</span>
        <span className={variant === "home" ? "text-[var(--home-muted)]" : "text-muted"}>{labels.profile}</span>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <Link
        href="/login"
        className={
          variant === "home"
            ? "rounded-full px-3 py-1.5 text-[13px] font-medium text-[var(--home-muted)] transition-colors hover:text-[var(--home-fg)]"
            : "rounded-lg px-2.5 py-1.5 text-xs font-medium text-muted transition hover:text-foreground"
        }
      >
        {labels.login}
      </Link>
      <Link
        href="/register"
        className={
          variant === "home"
            ? "rounded-full bg-[var(--home-fg)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--home-bg)] transition-opacity hover:opacity-85"
            : "rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background transition hover:opacity-90"
        }
      >
        {labels.register}
      </Link>
    </div>
  );
}
