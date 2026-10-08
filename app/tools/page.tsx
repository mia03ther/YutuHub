import type { Metadata } from "next";
import { listTools } from "@/lib/repository";
import { ToolCard } from "@/components/tool-card";
import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "校园工具实测",
  description:
    "按学科与场景整理的 AI 工具清单，含定价、上手成本与学生实测心得，不收录无实测的条目。",
  path: "/tools",
});

export default async function ToolsPage() {
  const tools = await listTools();

  return (
    <>
      <PageIntro
        eyebrow="CAMPUS TOOLS"
        title="校园工具实测"
        description="从学习到创作，每一条都来自真实使用记录。标注学生认证额度、付费门槛和上手成本，不做无实测推荐。"
        meta={`${tools.length} 个已实测工具`}
      />

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>
    </>
  );
}
