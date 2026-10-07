const MANIFESTO_PARTS = [
  { text: "校园里真正有价值的", accent: false },
  { text: "信息，应该", accent: false },
  { text: "流动起来", accent: true },
  { text: "。", accent: false },
];

const signals = [
  "这门课适合想认真打基础的人。",
  "老师讲得细，但作业需要提前规划。",
  "食堂二楼新窗口适合赶课前快速吃。",
  "毕业季的二手书和小电器值得集中整理。",
];

const MANIFESTO_CHARS = MANIFESTO_PARTS.flatMap((part) =>
  [...part.text].map((ch) => ({ ch, accent: part.accent })),
);

export function ScrollStory() {
  return (
    <section
      id="campus-signals"
      className="manifesto-scene relative flex h-screen items-center overflow-hidden border-t border-[rgba(245,245,245,0.08)] bg-[#080808] text-[#f5f5f5]"
    >
      <div className="manifesto-halo" aria-hidden="true" />

      {/* Fragmented parallax ghost word */}
      <span
        className="manifesto-ghost hx-outline pointer-events-none absolute left-0 top-[7%] select-none whitespace-nowrap text-[clamp(5rem,16vw,14rem)] font-semibold leading-none"
        aria-hidden="true"
      >
        SIGNALS SIGNALS SIGNALS
      </span>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="hx-caption">01 — Campus Signals</p>

        <h2 className="mt-8 text-[clamp(2.4rem,7vw,5.5rem)] font-semibold leading-[1.08] tracking-[-0.02em]">
          {MANIFESTO_CHARS.map(({ ch, accent }, i) => (
            <span
              key={`${ch}-${i}`}
              className={`m-char ${accent ? "hx-accent" : ""}`.trim()}
            >
              {ch}
            </span>
          ))}
        </h2>

        <p className="manifesto-sub mt-10 max-w-xl text-lg leading-8 text-[#8a8a8a] sm:text-xl">
          经验不该散落在聊天记录里。让它们沉淀下来、被找到、被再次使用。
        </p>
      </div>

      <div className="scene-marquee absolute inset-x-0 bottom-10 overflow-hidden">
        <div className="story-marquee flex w-max gap-4">
          {[...signals, ...signals].map((signal, index) => (
            <span
              key={`${signal}-${index}`}
              className="whitespace-nowrap rounded-full border border-[rgba(245,245,245,0.12)] px-5 py-2.5 text-sm text-[#8a8a8a]"
            >
              {signal}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
