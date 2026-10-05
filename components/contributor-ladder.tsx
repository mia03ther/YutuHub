import { levels } from "@/lib/repository";
import { SectionHeading } from "./section-heading";
import { LEVEL_BG } from "./level-badge";

export function ContributorLadder() {
  const ladder = levels();

  return (
    <section className="border-y border-border-line bg-surface-sunken">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="CONTRIBUTOR LEVEL"
          title="贡献越多，等级越高，解锁越多"
          description="所有内容都带 AI 生成标识。等级由社区审核后的有效贡献决定，不可以购买。"
        />

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {ladder.map((item) => (
            <li
              key={item.level}
              className="surface-card flex flex-col p-4"
            >
              <span
                className={`inline-flex w-fit items-center rounded-full px-2 py-0.5 text-xs font-medium tabular-nums text-white ${LEVEL_BG[item.level]}`}
              >
                Lv.{item.level}
              </span>
              <h3 className="editorial mt-3 text-sm font-semibold">
                {item.name}
              </h3>
              <p className="mt-1 text-xs tabular-nums text-muted-soft">
                {item.minContribution === 0
                  ? "注册即得"
                  : `${item.minContribution.toLocaleString()} 贡献值`}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.perk}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}