import type { Metadata } from "next";
import { BADGES } from "@/lib/data";
import { PageIntro } from "@/components/page-intro";
import { ContributorLadder } from "@/components/contributor-ladder";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "徽章体系",
  description:
    "YutuHub 徽章体系：记录你在社区做过的具体事情。每枚徽章都有明确的获得条件。",
  path: "/badges",
});

const TONE_STYLES = {
  accent: "bg-accent-soft text-accent",
  info: "bg-info-soft text-info",
  positive: "bg-positive-soft text-positive",
  warning: "bg-warning-soft text-warning",
} as const;

export default function BadgesPage() {
  return (
    <>
      <PageIntro
        eyebrow="BADGES"
        title="徽章体系"
        description="等级反映整体贡献量，徽章记录具体做了什么。每一枚都有明确的获得条件，不做随机掉落。"
        meta={`${BADGES.length} 枚徽章`}
      />

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {BADGES.map((badge) => (
            <li key={badge.id} className="surface-card flex flex-col p-5">
              <span
                className={`inline-flex size-9 items-center justify-center rounded-lg text-sm font-semibold ${TONE_STYLES[badge.tone]}`}
                aria-hidden="true"
              >
                {badge.name.slice(0, 1)}
              </span>
              <h2 className="editorial mt-4 text-base font-semibold tracking-tight">
                {badge.name}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {badge.description}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <ContributorLadder />
    </>
  );
}