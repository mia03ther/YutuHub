import Link from "next/link";
import { TrackGrid } from "@/components/track-grid";
import { ProjectCard } from "@/components/project-card";
import { CommunityPulse } from "@/components/community-pulse";
import { ContributorLadder } from "@/components/contributor-ladder";
import { Hero } from "@/components/hero";
import { COMMUNITY_STATS } from "@/lib/data";
import { activities, listPopularProjects, tracks } from "@/lib/repository";

export default async function HomePage() {
  const projects = await listPopularProjects();

  return (
    <>
      <Hero />

      <section className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <TrackGrid tracks={tracks()} />
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
              BUILDERS
            </p>
            <h2 className="editorial mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              学生 Builder 的作品集
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              从课程作业到能上线的产品。看看同校的人正在做什么，也许下一个队友就在这里。
            </p>
          </div>

          <Link
            href="/projects"
            className="shrink-0 text-sm font-medium text-accent hover:underline"
          >
            浏览全部项目
          </Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <ContributorLadder />

      <CommunityPulse stats={COMMUNITY_STATS} activities={activities()} />
    </>
  );
}