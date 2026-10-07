const TITLE_LINES = [
  ["校", "园", "，"],
  ["重", "新", "连", "接", "。"],
];

/* Char descriptors are computed once at module scope (pure, deterministic). */
const TITLE_CHARS: Array<Array<{ ch: string; i: number }>> = (() => {
  let i = 0;
  return TITLE_LINES.map((line) => line.map((ch) => ({ ch, i: i++ })));
})();

function Char({ ch, i }: { ch: string; i: number }) {
  return (
    <span className="char-mask">
      <span className="char" style={{ "--i": i } as React.CSSProperties}>
        {ch}
      </span>
    </span>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="hx-grid" aria-hidden="true" />
      <div className="hx-noise" aria-hidden="true" />
      <div className="hx-particles" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="hx-particle"
            style={{
              left: `${(i * 71) % 100}%`,
              top: `${30 + ((i * 37) % 65)}%`,
            }}
          />
        ))}
      </div>
      <div
        className="hx-halo left-1/2 top-[58%] h-[26rem] w-[40rem] -translate-x-1/2"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-24 pt-36 sm:px-8">
        <p className="hx-caption hero-fade mb-10 flex items-center gap-3">
          <span className="inline-block size-1.5 rounded-full bg-[var(--lime)]" />
          YuTuHub · Campus OS
        </p>

        <h1 className="hero-line select-none text-[clamp(4rem,13vw,11.25rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          {TITLE_CHARS.map((line, lineIdx) => (
            <span key={lineIdx} className="block">
              {line.map(({ ch, i }) => (
                <Char key={`${lineIdx}-${i}`} ch={ch} i={i} />
              ))}
            </span>
          ))}
        </h1>

        <p className="hero-fade mt-10 text-xl font-medium text-[#8a8a8a] sm:text-2xl">
          让校园里的真实信息流动起来。
        </p>

        <div className="hero-fade mt-14 flex flex-col gap-3 sm:flex-row">
          <a href="#campus-signals" className="cta-primary">
            开始探索
            <span aria-hidden="true">↓</span>
          </a>
          <a href="/community" className="cta-ghost">
            发布第一条内容
          </a>
        </div>
      </div>

      {/* Revealed mid-scroll, after the title scatters */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-5">
        <p className="hero-recompose text-center text-[clamp(1.8rem,5.5vw,4rem)] font-semibold leading-[1.2] tracking-[-0.02em] opacity-0">
          课程 · 干饭 · 交易 · 社区
          <span className="hx-accent block">四个世界，一个校园。</span>
        </p>
      </div>

      <div className="hero-fade relative z-10 mx-auto flex w-full max-w-6xl items-end justify-between px-5 pb-10 sm:px-8">
        <p className="hx-caption">Future Campus Life OS</p>
        <div className="flex flex-col items-center gap-3">
          <span className="hx-caption">Scroll</span>
          <span className="scroll-line" aria-hidden="true" />
        </div>
        <p className="hx-caption">© 2026</p>
      </div>
    </section>
  );
}
