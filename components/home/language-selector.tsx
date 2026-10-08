"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { LOCALE_NAMES, SUPPORTED_LOCALES } from "@/lib/i18n/home";
import { useHomeI18n } from "@/components/home/home-i18n";

export function LanguageSelector() {
  const { locale, setLocale, copy } = useHomeI18n();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const focusOption = (index: number) => {
    window.requestAnimationFrame(() => optionRefs.current[index]?.focus());
  };

  const openMenu = (index = SUPPORTED_LOCALES.indexOf(locale)) => {
    setOpen(true);
    focusOption(Math.max(index, 0));
  };

  const closeMenu = (restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  };

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) closeMenu();
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu(true);
    };
    window.addEventListener("pointerdown", closeOnOutside);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("pointerdown", closeOnOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        className="glass-control flex min-h-11 items-center gap-2 px-3 text-xs font-medium"
        aria-label={copy.controls.language}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls="home-language-listbox"
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            openMenu();
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            openMenu(SUPPORTED_LOCALES.length - 1);
          }
        }}
      >
        <Languages className="size-4" aria-hidden="true" />
        <span className="hidden lg:inline">{LOCALE_NAMES[locale]}</span>
        <ChevronDown className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open ? (
        <div
          id="home-language-listbox"
          className="glass-popover absolute right-0 top-[calc(100%+0.65rem)] min-w-48 p-1.5"
          role="listbox"
          aria-label={copy.controls.language}
          onKeyDown={(event) => {
            const activeIndex = optionRefs.current.findIndex(
              (option) => option === document.activeElement,
            );

            if (event.key === "ArrowDown" || event.key === "ArrowUp") {
              event.preventDefault();
              const direction = event.key === "ArrowDown" ? 1 : -1;
              const nextIndex =
                (Math.max(activeIndex, 0) + direction + SUPPORTED_LOCALES.length) %
                SUPPORTED_LOCALES.length;
              focusOption(nextIndex);
            } else if (event.key === "Home" || event.key === "End") {
              event.preventDefault();
              focusOption(event.key === "Home" ? 0 : SUPPORTED_LOCALES.length - 1);
            } else if (event.key === "Escape") {
              event.preventDefault();
              event.stopPropagation();
              closeMenu(true);
            } else if (event.key === "Tab") {
              closeMenu();
            }
          }}
        >
          {SUPPORTED_LOCALES.map((item, index) => (
            <button
              key={item}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              type="button"
              role="option"
              aria-selected={item === locale}
              tabIndex={item === locale ? 0 : -1}
              className="flex min-h-11 w-full items-center justify-between rounded-[0.85rem] px-3 text-left text-sm transition hover:bg-[var(--glass-hover)] focus-visible:bg-[var(--glass-hover)]"
              onClick={() => {
                setLocale(item);
                closeMenu(true);
              }}
            >
              <span>{LOCALE_NAMES[item]}</span>
              {item === locale ? <Check className="size-4 text-[var(--accent)]" aria-hidden="true" /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
