import { HeroCta, HeroSearch } from "@/components/hero-interactive";
import { COMMUNITY_STATS } from "@/lib/data";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border-line">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-20 pt-20 sm:px-8 sm:pb-28 sm:pt-28">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border-line bg-surface px-3 py-1 text-xs text-muted">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            AI Native Campus Knowledge &amp; Service Hub
          </span>

          <h1 className="display-tight mt-6 max-w-3xl text-4xl font-bold sm:text-5xl lg:text-6xl">
            连接校园知识，
            <br className="hidden sm:block" />
            让 AI 加速成长
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            面向高校学生的新一代 AI 驱动知识与服务社区
          </p>

          <HeroSearch />
          <HeroCta />
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border-line bg-border-line sm:mt-20 lg:grid-cols-4">
          {COMMUNITY_STATS.map((stat) => (
            <div key={stat.label} className="bg-surface px-5 py-6">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-2xl font-semibold tabular-nums tracking-tight">
                  {stat.value}
                </span>
                <span className="mt-1 block text-xs text-muted-soft">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}