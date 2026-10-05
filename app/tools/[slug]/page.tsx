import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTool, listTools } from "@/lib/repository";
import { Markdown } from "@/components/markdown";
import { LevelBadge, LEVEL_NAMES } from "@/components/level-badge";
import { WikiCard } from "@/components/wiki-card";
import { pageMetadata } from "@/lib/seo";

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const tools = await listTools();
  return tools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getTool(slug);
  if (!tool) return { title: "工具不存在" };

  return pageMetadata({
    title: `${tool.name} 实测笔记`,
    description: `${tool.summary} ${tool.pricing}，由 ${tool.author.name} 提交实测。`,
    path: `/tools/${tool.slug}`,
    type: "article",
  });
}

export default async function ToolDetailPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = await getTool(slug);
  if (!tool) notFound();

  const related = (await listTools())
    .filter((item) => item.slug !== tool.slug && item.category === tool.category)
    .slice(0, 2);

  return (
    <>
      <article className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
        <header className="border-b border-border-line pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-xs text-accent">
              {tool.category}
            </span>
            <span className="text-xs text-muted-soft">{tool.vendor}</span>
          </div>

          <h1 className="editorial mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {tool.name}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted">
            {tool.summary}
          </p>

          <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <div>
              <dt className="text-xs text-muted-soft">成本</dt>
              <dd className="mt-0.5">{tool.pricing}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-soft">收藏</dt>
              <dd className="mt-0.5 tabular-nums">
                {tool.saves.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-soft">提交者</dt>
              <dd className="mt-0.5 flex items-center gap-1.5">
                <LevelBadge level={tool.author.level} compact />
                {tool.author.name} · {LEVEL_NAMES[tool.author.level]}
              </dd>
            </div>
          </dl>
        </header>

        <div className="pt-8">
          <Markdown>{tool.body}</Markdown>
        </div>

        <footer className="mt-12 rounded-lg border border-border-line bg-surface-sunken p-5">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
            内容声明
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            本笔记为 {tool.author.name} 的个人实测记录，可能包含 AI 辅助整理。
            定价与额度信息以官方页面为准，提交于社区后不可自行修改，如需更正请在社区提交反馈。
          </p>
        </footer>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-border-line bg-surface-sunken">
          <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
            <h2 className="editorial text-lg font-semibold tracking-tight">
              同类工具
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {related.map((item) => (
                <WikiCard
                  key={item.slug}
                  href={`/tools/${item.slug}`}
                  title={item.name}
                  summary={item.bodyPreview}
                  meta={item.vendor}
                  tags={item.tags}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}