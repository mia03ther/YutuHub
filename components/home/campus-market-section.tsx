import { CalendarDays, Cat, Handshake, ShoppingBag } from "lucide-react";

const entries = [
  {
    index: "01",
    title: "二手交易",
    en: "Marketplace",
    desc: "课本、数码、日用品，让闲置在同校流转。",
    Icon: ShoppingBag,
  },
  {
    index: "02",
    title: "校园服务",
    en: "Services",
    desc: "代取、拼车、临时协作，需求有明确去处。",
    Icon: Handshake,
  },
  {
    index: "03",
    title: "校园活动",
    en: "Events",
    desc: "讲座、社团、比赛、招募，重要信息不被刷走。",
    Icon: CalendarDays,
  },
  {
    index: "04",
    title: "校园猫咪",
    en: "Campus Cats",
    desc: "记录熟悉的小身影，也记录校园共同记忆。",
    Icon: Cat,
  },
];

export function CampusMarketSection() {
  return (
    <section
      id="campus-market"
      className="relative overflow-hidden bg-[#080808] px-5 py-32 text-[#f5f5f5] sm:px-8 sm:py-44"
    >
      <div className="mx-auto max-w-6xl">
        <div className="scroll-reveal">
          <p className="hx-caption">04 — Campus Economy</p>
          <h2 className="mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            校园里的需求，
            <span className="block hx-outline">应该被看见。</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[#8a8a8a] sm:text-xl">
            从一笔闲置流转到一个活动入口——生态正在生长，这里是预告。
          </p>
        </div>

        <div className="mt-24 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map(({ index, title, en, desc, Icon }) => (
            <article
              key={title}
              className="market-entry group border-t border-[rgba(245,245,245,0.1)] pt-6"
            >
              <div className="market-reveal flex items-center justify-between">
                <Icon className="size-5 text-[#f5f5f5]" aria-hidden="true" />
                <span
                  className="size-1.5 rounded-full bg-[var(--lime)] opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>

              <h3 className="market-reveal mt-10 text-3xl font-semibold tracking-tight">
                {title}
              </h3>
              <p className="market-reveal hx-caption mt-2">{en}</p>
              <p className="market-reveal mt-4 text-[15px] leading-7 text-[#8a8a8a]">
                {desc}
              </p>
              <p className="market-reveal hx-caption mt-8">
                展示入口 · 敬请期待
              </p>

              <span
                className="hx-outline market-reveal mt-6 block text-[5.5rem] font-semibold leading-none"
                aria-hidden="true"
              >
                {index}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
