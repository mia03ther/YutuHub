import type { Metadata } from "next";
import { listWiki } from "@/lib/repository";
import { WikiCard } from "@/components/wiki-card";
import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "学习 Wiki",
  description:
    "课程笔记、竞赛经验、开题指南的可修订文档库，由社区共同维护，每次修订都留痕。",
  path: "/wiki",
});

export default async function WikiIndexPage() {
  const entries = await listWiki();

  return (
    <>
      <PageIntro
        eyebrow="WIKI"
        title="学习 Wiki"
        description="写下来就不用再查一遍。每个词条都可修订，修订历史公开，AI 辅助整理的部分单独标注。"
        meta={`${entries.length} 个词条`}
      />

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {entries.map((entry) => (
            <WikiCard
              key={entry.slug}
              href={`/wiki/${entry.slug}`}
              title={entry.title}
              summary={entry.summary}
              meta={entry.category}
              tags={entry.tags}
              footer={`${entry.revision} 次修订 · 更新于 ${entry.updatedAt}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}