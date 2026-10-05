import { Repeat, Star } from "lucide-react";
import type { Skill } from "@/lib/types";
import { LevelBadge } from "./level-badge";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <article className="surface-card flex flex-col p-5 transition hover:border-border-strong hover:shadow-float">
      <div className="flex items-start justify-between gap-3">
        <h2 className="editorial text-base font-semibold tracking-tight">
          {skill.title}
        </h2>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-surface-sunken px-2 py-0.5 text-xs tabular-nums text-muted">
          <Star className="size-3 fill-current" aria-hidden="true" />
          {skill.rate.toFixed(1)}
        </span>
      </div>

      <p className="mt-1 text-xs text-accent">{skill.category}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{skill.summary}</p>

      <p className="mt-4 inline-flex items-start gap-2 rounded-md border border-border-line bg-surface-sunken p-3 text-xs leading-relaxed text-muted">
        <Repeat
          className="mt-0.5 size-3.5 shrink-0 text-accent"
          aria-hidden="true"
        />
        {skill.exchange}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {skill.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-border-line px-2 py-0.5 text-xs text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between gap-3 pt-4 text-xs">
        <span className="flex min-w-0 items-center gap-2">
          <LevelBadge level={skill.author.level} compact />
          <span className="truncate text-muted">{skill.author.name}</span>
        </span>
        <span className="shrink-0 tabular-nums text-muted-soft">
          {skill.sessions} 次完成
        </span>
      </div>
    </article>
  );
}