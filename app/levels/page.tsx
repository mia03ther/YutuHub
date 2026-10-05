import type { Metadata } from "next";
import { AUTHORS, BADGES, LEVELS } from "@/lib/data";
import { LevelBadge } from "@/components/level-badge";
import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contributor 等级",
  description:
    "YutuHub Contributor 等级体系：贡献值如何累计、每一级解锁什么，以及为什么不可交易。",
  path: "/levels",
});

export default function LevelsPage() {
  return (
    <>
      <PageIntro
        eyebrow="CONTRIBUTOR LEVEL"
        title="Contributor 等级"
        description="等级由社区审核后的有效贡献决定。不可购买、不可转让、不可交易。"
      />

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <ol className="space-y-3">
          {LEVELS.map((level) => {
            const holders = AUTHORS.filter(
              (author) => author.level === level.level,
            );
            const next = LEVELS.find((item) => item.level === level.level + 1);

            return (
              <li key={level.level} className="surface-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <LevelBadge level={level.level} />
                      <h2 className="editorial text-base font-semibold tracking-tight">
                        {level.name}
                      </h2>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {level.perk}
                    </p>
                    {next ? (
                      <p className="mt-1 text-xs tabular-nums text-muted-soft">
                        再积累{" "}
                        {(next.minContribution - level.minContribution).toLocaleString()}{" "}
                        贡献值升到 Lv.{next.level} {next.name}
                      </p>
                    ) : (
                      <p className="mt-1 text-xs text-accent">已达最高等级</p>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-muted-soft">当前贡献值门槛</p>
                    <p className="mt-0.5 text-sm font-medium tabular-nums">
                      {level.minContribution === 0
                        ? "注册即得"
                        : level.minContribution.toLocaleString()}
                    </p>
                  </div>
                </div>

                {holders.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-border-line pt-4">
                    {holders.map((author) => (
                      <span
                        key={author.handle}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border-line px-2.5 py-1 text-xs text-muted"
                      >
                        {author.name}
                        <span className="tabular-nums text-muted-soft">
                          {author.contribution.toLocaleString()}
                        </span>
                      </span>
                    ))}
                  </div>
                ) : null}
              </li>
            );
          })}
        </ol>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <div className="surface-card p-5">
            <h2 className="editorial text-base font-semibold tracking-tight">
              贡献值怎么来
            </h2>
            <ul className="mt-3 space-y-1.5 text-sm text-muted">
              <li>提交 AI 工具实测 +30</li>
              <li>发布 / 修订 Wiki 词条 +20</li>
              <li>发起并完成技能交换 +40</li>
              <li>完成一次被采纳的社区审核 +15</li>
              <li>被举报内容核实 +10</li>
            </ul>
          </div>

          <div className="surface-card p-5">
            <h2 className="editorial text-base font-semibold tracking-tight">
              为什么不可交易
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              一旦贡献值可以买卖，审核激励就会退化成竞价，平台内容质量随之崩塌。
              YutuHub 的贡献值只记录你为社区沉淀了多少有效知识，永远不可提现或转让。
            </p>
          </div>
        </div>

        <aside className="mt-6 rounded-lg border border-border-line bg-surface-sunken p-5">
          <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
            当前已解锁徽章
          </h2>
          <p className="mt-2 text-sm text-muted">
            共 {BADGES.length} 枚。徽章记录具体做了什么，而等级反映整体贡献量。
          </p>
        </aside>
      </section>
    </>
  );
}

