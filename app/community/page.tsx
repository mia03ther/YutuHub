import type { Metadata } from "next";
import { activities } from "@/lib/repository";
import { PageIntro } from "@/components/page-intro";
import { LevelBadge } from "@/components/level-badge";
import { ContributorLadder } from "@/components/contributor-ladder";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "社区动态",
  description:
    "YutuHub 社区动态：提问、组队、开源、需求。AI 生成内容一律标注来源，欢迎带着问题来。",
  path: "/community",
});

export default function CommunityPage() {
  const feed = activities();

  return (
    <>
      <PageIntro
        eyebrow="COMMUNITY"
        title="社区动态"
        description="提问、组队、开源、提需求。每条动态都带作者等级，AI 生成内容单独标注来源。"
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