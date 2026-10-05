import type { Metadata } from "next";
import { listSkills } from "@/lib/repository";
import { SkillCard } from "@/components/skill-card";
import { PageIntro } from "@/components/page-intro";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "技能交换",
  description:
    "用会的东西换不会的技能。LaTeX 排版、Prompt 工程、UI 诊断、Solidity 陪跑，积分结算。",
  path: "/skills",
});

export default async function SkillsPage() {
  const skills = await listSkills();

  return (
    <>
      <PageIntro
        eyebrow="SKILL EXCHANGE"
        title="技能交换"
        description="不接单，只换技能。发布你擅长的，同时写清想换什么，匹配成功后一对一约时间。"
        meta={`${skills.length} 个进行中的交换`}
      />

      <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid gap-3 sm:grid-cols-2">
          {skills.map((skill) => (
            <SkillCard key={skill.slug} skill={skill} />
          ))}
        </div>

        <aside className="mt-10 rounded-lg border border-border-line bg-surface-sunken p-6">
          <h2 className="editorial text-base font-semibold tracking-tight">
            交换规则
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
            <li>积分仅用于记录贡献，不可提现、不可转让、不可购买。</li>
            <li>双方确认完成后积分才结算，中途取消不扣分。</li>
            <li>不接商业单、不代写作业、不代考。发现即封禁。</li>
            <li>每次交换结束后双方互评，评分公开可查。</li>
          </ul>
        </aside>
      </section>
    </>
  );
}