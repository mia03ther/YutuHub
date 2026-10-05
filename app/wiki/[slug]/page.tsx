import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWikiEntry, listWiki } from "@/lib/repository";
import { Markdown } from "@/components/markdown";
import { LevelBadge, LEVEL_NAMES } from "@/components/level-badge";
import { WikiCard } from "@/components/wiki-card";
import { pageMetadata } from "@/lib/seo";

interface WikiEntryPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const entries = await listWiki();
  return entries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: WikiEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getWikiEntry(slug);
  if (!entry) return { title: "词条不存在" };

  return pageMetadata({
    title: entry.title,
    description: entry.summary,
    path: `/wiki/${entry.slug}`,
    type: "article",
  });
}

export default async function WikiEntryPage({ params }: WikiEntryPageProps) {
  const { slug } = await params;
  const entry = await getWikiEntry(slug);
  if (!entry) notFound();

  const related = (await listWiki())
    .filter((item) => item.slug !== entry.slug)
    .slice(0, 2);

  return (
    <>
      <article className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <header className="border-b border-border-line pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-positive-soft px-2.5 py-0.5 text-xs text-positive">
              {entry.category}
            </span>
            <span className="text-xs tabular-nums text-muted-soft">
              第 {entry.revision} 次修订 · {entry.updatedAt}
            </span>
          </div>

          <h1 className="editorial mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {entry.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            {entry.summary}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <LevelBadge level={entry.author.level} compact />
            <span className="text-sm text-muted">
              {entry.author.name} · {LEVEL_NAMES[entry.author.level]} ·{" "}
              {entry.author.school}
            </span>
          </div>
        </header>

        <div className="pt-8">
          <Markdown>{entry.body}</Markdown>
        </div>

        <footer className="mt-12 rounded-lg border border-border-line bg-surface-sunken p-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
            参与修订
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            发现内容过时或有错？在社区提交修订建议，通过审核后计入贡献值。
            所有修订记录公开可查。
          </p>
        </footer>
      </article>

      <section className="border-t border-border-line bg-surface-sunken">
        <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
          <h2 className="editorial text-lg font-semibold tracking-tight">
            相关词条
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {related.map((item) => (
              <WikiCard
                key={item.slug}
                href={`/wiki/${item.slug}`}
                title={item.title}
                summary={item.summary}
                meta={item.category}
                tags={item.tags}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}