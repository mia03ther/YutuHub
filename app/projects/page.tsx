import type { Metadata } from "next";
import { listProjects } from "@/lib/repository";
import { ProjectCard } from "@/components/project-card";
import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "项目展示",
  description:
    "学生 AI 与 Web3 作品集。课程作业到上线产品，招队友、招用户、招第一个 star。",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await listProjects();

  return (
    <>
      <PageIntro
        eyebrow="PROJECTS"
        title="项目展示"
        description="学生 Builder 的作品集。写清楚在做什么、技术栈、以及现在最缺什么样的人。"
        meta={`${projects.length} 个公开项目`}
      />

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <aside className="mt-10 rounded-lg border border-dashed border-border-line p-6">
          <h2 className="editorial text-base font-semibold tracking-tight">
            想让别人一起做？
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            发布项目时把「正在招募」写清楚，能显著提高组队成功率。项目页面
            不允许挂商业课程广告，也不允许代写代码接单。
          </p>
        </aside>
      </section>
    </>
  );
}