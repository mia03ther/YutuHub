import Link from "next/link";
import { BookmarkCheck, Check } from "lucide-react";
import type { ToolListItem } from "@/lib/types";
import { LEVEL_NAMES } from "./level-badge";

export function ToolCard({ tool }: { tool: ToolListItem }) {
  return (
    <article className="surface-card flex flex-col p-5 transition hover:border-border-strong hover:shadow-float">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="editorial truncate text-base font-semibold tracking-tight">
            {tool.name}
          </h2>
          <p className="mt-0.5 text-xs text-muted-soft">{tool.vendor}</p>
        </div>
        {tool.verified ? (
          <span
            title="已实测"
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-positive-soft px-2 py-0.5 text-xs text-positive"
          >
            <Check className="size-3" aria-hidden="true" />
            实测
          </span>
        ) : null}
      </div>

      <p className="mt-1 text-xs text-accent">{tool.category}</p>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
        {tool.bodyPreview}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {tool.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-border-line px-2 py-0.5 text-xs text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-1 items-end justify-between gap-3 pt-4">
        <span className="text-xs text-muted-soft">
          <span className="text-foreground">{tool.pricing}</span>
          {" · "}
          Lv.{tool.author.level} {LEVEL_NAMES[tool.author.level]}
        </span>
        <span className="flex shrink-0 items-center gap-1 text-xs tabular-nums text-muted-soft">
          <BookmarkCheck className="size-3" aria-hidden="true" />
          {tool.saves.toLocaleString()}
        </span>
      </div>

      <Link
        href={`/tools/${tool.slug}`}
        className="mt-4 text-sm font-medium text-accent hover:underline"
      >
        查看实测笔记 →
      </Link>
    </article>
  );
}