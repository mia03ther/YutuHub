"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

type Selection = "light" | "dark" | "system";
type Resolved = "light" | "dark";

const STORAGE_KEY = "theme";
const CHANGE_EVENT = "yutuhub-theme-change";

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function readSelection(): Selection {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

function readResolved(): Resolved {
  const selection = readSelection();
  if (selection !== "system") return selection;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", listener);
  window.addEventListener(CHANGE_EVENT, listener);
  window.addEventListener("storage", listener);

  return () => {
    listeners.delete(listener);
    media.removeEventListener("change", listener);
    window.removeEventListener(CHANGE_EVENT, listener);
    window.removeEventListener("storage", listener);
  };
}

export function ThemeToggle() {
  const selection = useSyncExternalStore(
    subscribe,
    readSelection,
    () => "system" as Selection,
  );
  const resolved = useSyncExternalStore(
    subscribe,
    readResolved,
    () => "light" as Resolved,
  );

  const select = useCallback((next: Selection) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures; the theme still applies for this session.
    }

    const resolved: Resolved =
      next === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : next;

    document.documentElement.classList.toggle("dark", resolved === "dark");
    document.documentElement.dataset.theme = resolved;

    emit();
  }, []);

  const options: Array<{
    value: Selection;
    label: string;
    Icon: typeof Sun;
  }> = [
    { value: "light", label: "浅色", Icon: Sun },
    { value: "dark", label: "深色", Icon: Moon },
    { value: "system", label: "跟随系统", Icon: Monitor },
  ];

  // Keep the DOM attribute in sync (covers system-preference changes too).
  useEffect(() => {
    document.documentElement.classList.toggle("dark", resolved === "dark");
    document.documentElement.dataset.theme = resolved;
  }, [resolved]);

  return (
    <div
      role="group"
      aria-label="主题"
      data-resolved={resolved}
      className="inline-flex items-center gap-0.5 rounded-lg border border-border-line p-0.5"
    >
      {options.map(({ value, label, Icon }) => (
        <button
          key={value}
          type="button"
          aria-pressed={selection === value}
          aria-label={label}
          title={label}
          onClick={() => select(value)}
          className={`rounded-md p-1.5 transition ${
            selection === value
              ? "bg-surface-sunken text-foreground"
              : "text-muted-soft hover:text-foreground"
          }`}
        >
          <Icon className="size-3.5" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}