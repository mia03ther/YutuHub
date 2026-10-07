const MARQUEE_WORDS = [
  "YuTuHub",
  "未来校园生活操作系统",
  "让真实信息流动起来",
  "Campus OS",
];

export function FinalCTA() {
  return (
    <section className="final-cta relative overflow-hidden bg-[var(--lime)] text-[#080808]">
      {/* Fragmented ghost word behind */}
      <span
        className="pointer-events-none absolute -bottom-[3vw] left-0 select-none whitespace-nowrap text-[clamp(5rem,16vw,14rem)] font-semibold leading-none text-[#080808]/8"
        aria-hidden="true"
      >
        YuTuHub · YuTuHub
      </span>

      <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-40">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-[#080808]/60">
          Ready to explore
        </p>

        <h2 className="mt-8 text-[clamp(3rem,10vw,8.5rem)] font-semibold leading-[1.0] tracking-[-0.03em]">
          <span className="final-line block">校园，</span>
          <span className="final-line block">重新连接。</span>
        </h2>

        <p className="final-fade mt-8 max-w-xl text-lg font-medium leading-8 text-[#080808]/75 sm:text-xl">
          每一条真实经验，都会成为下一个人的路标。
        </p>

        <div className="final-fade mt-12 flex flex-col gap-3 sm:flex-row">
          <a href="#campus-signals" className="cta-lime-ghost">
            开始探索
            <span aria-hidden="true">↑</span>
          </a>
          <a href="/community" className="cta-lime">
            发布第一条内容
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Full-bleed marquee */}
      <div className="relative overflow-hidden border-t border-[#080808]/15 py-5">
        <div className="story-marquee marquee-fast flex w-max items-center gap-8">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="flex items-center gap-8 whitespace-nowrap text-2xl font-semibold tracking-tight text-[#080808]/85 sm:text-3xl"
            >
              {word}
              <span
                className="size-2 rounded-full bg-[#080808]/40"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
