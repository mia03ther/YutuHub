import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface WikiCardProps {
  href: string;
  title: string;
  summary: string;
  meta: string;
  tags: string[];
  footer?: string;
}

export function WikiCard({
  href,
  title,
  summary,
  meta,
  tags,
  footer,
}: WikiCardProps) {
  return (
    <Link
      href={href}
      className="group surface-card flex flex-col p-5 transition hover:border-border-strong hover:shadow-float"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="editorial text-base font-semibold tracking-tight">
          {title}
        </h2>
        <ArrowUpRight
          className="size-4 shrink-0 text-muted-soft transition group-hover:text-accent"
          aria-hidden="true"
        />
      </div>

      <p className="mt-1 text-xs text-accent">{meta}</p>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
        {summary}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li
            key={tag}
            className="rounded-md border border-border-line px-2 py-0.5 text-xs text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>

      {footer ? (
        <p className="mt-4 text-xs tabular-nums text-muted-soft">{footer}</p>
      ) : null}
    </Link>
  );
}