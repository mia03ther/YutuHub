import { Star } from "lucide-react";
import type { Project } from "@/lib/types";
import { LevelBadge } from "./level-badge";

const STAGE_LABELS: Record<Project["stage"], string> = {
  idea: "构想中",
  building: "开发中",
  beta: "公测中",
  shipped: "已上线",
};

const STAGE_STYLES: Record<Project["stage"], string> = {
  idea: "text-muted-soft bg-surface-sunken",
  building: "text-info bg-info-soft",
  beta: "text-warning bg-warning-soft",
  shipped: "text-positive bg-positive-soft",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="surface-card flex flex-col p-5 transition hover:border-border-strong hover:shadow-float">
      <div className="flex items-start justify-between gap-3">
        <h3 className="editorial text-base font-semibold tracking-tight">
          {project.name}
        </h3>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs ${STAGE_STYLES[project.stage]}`}
        >
          {STAGE_LABELS[project.stage]}
        </span>
      </div>

      <p className="mt-1 text-xs text-muted-soft">{project.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {project.summary}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-md border border-border-line px-2 py-0.5 font-mono text-xs text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      {project.lookingFor.length > 0 ? (
        <p className="mt-4 text-xs text-muted-soft">
          <span className="text-accent">招募中</span>
          {" · "}
          {project.lookingFor.join(" / ")}
        </p>
      ) : null}

      <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-xs">
        <span className="flex min-w-0 items-center gap-2">
          <LevelBadge level={project.author.level} compact />
          <span className="truncate text-muted">{project.author.name}</span>
        </span>
        <span className="flex shrink-0 items-center gap-1 tabular-nums text-muted-soft">
          <Star className="size-3" aria-hidden="true" />
          {project.stars}
        </span>
      </div>
    </article>
  );
}