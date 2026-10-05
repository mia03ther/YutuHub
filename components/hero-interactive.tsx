"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";

const SUGGESTIONS = ["AI 论文工具", "LaTeX", "Prompt", "Web3 入门"] as const;

export function HeroSearch() {
  const inputId = useId();
  const [query, setQuery] = useState("");

  return (
    <form
      action="/tools"
      method="GET"
      role="search"
      className="mt-8 w-full max-w-xl"
    >
      <label htmlFor={inputId} className="sr-only">
        搜索 AI 工具、技能或 Wiki 词条
      </label>
      <div className="group flex items-center gap-2 rounded-xl border border-border-line bg-surface px-3 py-2 shadow-subtle transition focus-within:border-accent">
        <Search
          className="size-4 shrink-0 text-muted-soft"
          aria-hidden="true"
        />
        <input
          id={inputId}
          name="q"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="搜索 AI 工具、技能交换或 Wiki 词条"
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-soft"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background transition hover:opacity-90"
        >
          搜索
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-soft">热门</span>
        {SUGGESTIONS.map((item) => (
          <Link
            key={item}
            href={`/tools?q=${encodeURIComponent(item)}`}
            className="rounded-full border border-border-line px-2.5 py-1 text-xs text-muted transition hover:border-accent hover:text-accent"
          >
            {item}
          </Link>
        ))}
      </div>
    </form>
  );
}

export function HeroCta() {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
      >
        加入 Builder 社区
        <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
      <Link
        href="/wiki"
        className="inline-flex items-center gap-1.5 rounded-lg border border-border-line px-4 py-2.5 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
      >
        浏览学习 Wiki
      </Link>
    </div>
  );
}