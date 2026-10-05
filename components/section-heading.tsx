import type { ReactNode } from "react";
import Link from "next/link";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: { label: string; href: string } | ReactNode;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
          {eyebrow}
        </p>
        <h2 className="editorial mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
      </div>

      {action && typeof action === "object" && "href" in action ? (
        <Link
          href={action.href}
          className="shrink-0 text-sm font-medium text-accent hover:underline"
        >
          {action.label}
        </Link>
      ) : (
        action
      )}
    </div>
  );
}