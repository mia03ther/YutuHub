import type { Metadata } from "next";
import { activities } from "@/lib/repository";
import { PageIntro } from "@/components/page-intro";
import { LevelBadge } from "@/components/level-badge";
import { ContributorLadder } from "@/components/contributor-ladder";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "社区动态",
  description:
    "YutuHub 校园社区：提问、组队、经验分享与同学互助，欢迎带着真实问题来。",
  path: "/community",
});

export default function CommunityPage() {
  const feed = activities();

  return (
    <>
      <PageIntro
        eyebrow="COMMUNITY"
        title="社区动态"
        description="提问、组队、分享经验、发起互助。每条动态都保留作者与来源，让有用的信息能够继续流动。"
        meta={`${feed.length} 条最新动态`}
      />

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <ol className="divide-y divide-[var(--border)] overflow-hidden rounded-lg border border-border-line bg-surface">
          {feed.map((item) => (
            <li key={item.id} className="flex items-start gap-4 p-5">
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-medium text-accent"
                aria-hidden="true"
              >
                {item.actor.avatar}
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-sm">
                  <span className="font-medium">{item.actor.name}</span>
                  <span className="text-muted"> {item.action} </span>
                  <span className="font-medium">{item.target}</span>
                </p>
                <p className="mt-1 text-xs text-muted-soft">
                  {item.at} · {item.actor.school} · 贡献值{" "}
                  <span className="tabular-nums">
                    {item.actor.contribution.toLocaleString()}
                  </span>
                </p>
              </div>

              <LevelBadge level={item.actor.level} compact />
            </li>
          ))}
        </ol>
      </section>

      <ContributorLadder />
    </>
  );
}
