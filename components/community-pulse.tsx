import Link from "next/link";
import type { ActivityItem } from "@/lib/types";

interface CommunityPulseProps {
  stats: ReadonlyArray<{ value: string; label: string }>;
  activities: ActivityItem[];
}

export function CommunityPulse({ stats, activities }: CommunityPulseProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
            COMMUNITY
          </p>
          <h2 className="editorial mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            一个人的困惑，<br />
            变成所有人的起点
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            提问、组队、开源、招人。每条动态都标注作者等级与内容来源。
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs text-muted-soft">{stat.label}</dt>
                <dd className="mt-1 text-xl font-semibold tabular-nums tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>

          <Link
            href="/community"
            className="mt-8 inline-flex items-center gap-1.5 rounded-lg border border-border-line px-4 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent"
          >
            进入社区
          </Link>
        </div>

        <ul className="divide-y divide-[var(--border)] overflow-hidden rounded-lg border border-border-line bg-surface">
          {activities.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex items-start gap-3 p-4 transition hover:bg-surface-hover"
              >
                <span
                  className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-medium text-accent"
                  aria-hidden="true"
                >
                  {item.actor.avatar}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm">
                    <span className="font-medium">{item.actor.name}</span>
                    <span className="text-muted-soft">{` ${item.action} `}</span>
                    <span className="font-medium">{item.target}</span>
                  </span>
                  <span className="mt-1 block text-xs text-muted-soft">
                    {item.at} · {item.actor.school}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}