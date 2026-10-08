import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PageIntro } from "@/components/page-intro";
import { TRACKS } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "关于",
  description: `${SITE.name} 的定位、边界与内容规范。`,
  path: "/about",
});

const PRINCIPLES = [
  {
    title: "知识优先于流量",
    body: "排序看沉淀量与引用量，不看点赞。所有页面都不做无限下拉的信息流设计。",
  },
  {
    title: "AI 辅助必须标注",
    body: "AI 生成或改写的内容一律标注，涉及事实引用的部分必须逐条核对原文。",
  },
  {
    title: "不接商业单",
    body: "平台不做付费推广位、不做课程分销。技能交换只换技能，不换钱。",
  },
  {
    title: "贡献不可交易",
    body: "贡献值只用于记录沉淀量，不可提现、转让或购买。这是审核激励不失效的前提。",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="ABOUT"
        title="关于 YutuHub"
        description="一个面向大学生的校园生活共创平台。我们想解决的不是信息缺失，而是有价值的经验总被困在群聊、口头与个人笔记里。"
      />

      <section className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8">
        <div className="space-y-10">
          <div>
            <h2 className="editorial text-xl font-semibold tracking-tight">
              当前已实现的五个共建方向
            </h2>
            <ul className="mt-4 space-y-3">
              {TRACKS.map((track) => (
                <li key={track.id} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  <p className="text-sm leading-relaxed text-muted">
                    <span className="font-medium text-foreground">{track.label}</span>
                    {" — "}
                    {track.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="editorial text-xl font-semibold tracking-tight">
              四条原则
            </h2>
            <dl className="mt-4 space-y-4">
              {PRINCIPLES.map((item) => (
                <div key={item.title} className="surface-card p-5">
                  <dt className="text-sm font-semibold">{item.title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                    {item.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
