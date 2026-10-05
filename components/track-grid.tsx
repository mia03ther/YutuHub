import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { TRACK_ICONS } from "@/lib/track-icons";
import type { TrackMeta } from "@/lib/types";

const ACCENT_STYLES: Record<TrackMeta["accent"], string> = {
  accent: "text-accent bg-accent-soft",
  info: "text-info bg-info-soft",
  positive: "text-positive bg-positive-soft",
  warning: "text-warning bg-warning-soft",
  destructive: "text-destructive bg-destructive-soft",
};

export type TrackGridEntry = TrackMeta & { Icon: LucideIcon };

export function TrackGrid({ tracks }: { tracks: TrackMeta[] }) {
  return (
    <section aria-labelledby="tracks-heading" className="py-16 sm:py-20">
      <h2 id="tracks-heading" className="sr-only">
        平台功能
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tracks.map(({ id, label, tagline, description, href, icon, accent }) => {
          const Icon = TRACK_ICONS[icon];

          return (
          <Link
            key={id}
            href={href}
            className="group surface-card flex flex-col p-5 transition hover:border-border-strong hover:shadow-float"
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`inline-flex size-9 items-center justify-center rounded-lg ${ACCENT_STYLES[accent]}`}
              >
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <ArrowUpRight
                className="size-4 shrink-0 text-muted-soft transition group-hover:text-accent"
                aria-hidden="true"
              />
            </div>

            <h3 className="mt-4 text-base font-semibold tracking-tight">
              {label}
            </h3>
            <p className="mt-0.5 text-xs text-muted-soft">{tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {description}
            </p>
          </Link>
          );
        })}

        <div className="flex flex-col justify-center rounded-lg border border-dashed border-border-line p-5">
          <p className="text-sm font-medium">还有更多在孵化</p>
          <p className="mt-1 text-sm text-muted">
            课程 AI 助手、组队匹配、校园服务号。带着需求来，我们一起做。
          </p>
          <Link
            href="/community"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            去社区提需求
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}