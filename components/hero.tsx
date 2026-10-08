const fragments = [
  { label: "这门课怎么选？", code: "COURSE / 014", className: "signal-fragment fragment-a" },
  { label: "二饭今天排队吗", code: "FOOD / 072", className: "signal-fragment fragment-b" },
  { label: "出一盏宿舍台灯", code: "MARKET / 031", className: "signal-fragment fragment-c" },
  { label: "周四拼车去大学城", code: "SERVICE / 008", className: "signal-fragment fragment-d" },
];

function SignalArchipelago() {
  return (
    <div className="hero-device" aria-hidden="true">
      <svg className="signal-map" viewBox="0 0 700 700" role="presentation">
        <defs>
          <filter id="soft-grain" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence baseFrequency="0.025" numOctaves="2" seed="11" type="fractalNoise" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
          </filter>
        </defs>

        <circle className="map-orbit orbit-a" cx="350" cy="350" r="250" />
        <circle className="map-orbit orbit-b" cx="350" cy="350" r="164" />
        <path className="signal-route route-a" d="M102 189 C235 74 238 296 362 314 C497 334 475 169 615 146" />
        <path className="signal-route route-b" d="M74 487 C184 553 260 450 340 412 C431 369 505 479 637 526" />
        <path className="signal-route route-c" d="M218 634 C219 505 298 505 354 397 C406 296 391 192 471 68" />

        <g className="signal-island island-a" filter="url(#soft-grain)">
          <path d="M96 160 C142 101 234 109 256 170 C278 231 226 282 159 270 C94 259 57 212 96 160Z" />
        </g>
        <g className="signal-island island-b" filter="url(#soft-grain)">
          <path d="M451 104 C509 70 601 111 607 180 C614 253 539 282 477 251 C419 223 399 135 451 104Z" />
        </g>
        <g className="signal-island island-c" filter="url(#soft-grain)">
          <path d="M91 443 C125 386 215 377 253 433 C292 491 245 568 172 574 C105 579 57 502 91 443Z" />
        </g>
        <g className="signal-island island-d" filter="url(#soft-grain)">
          <path d="M452 447 C510 400 602 430 620 499 C637 565 574 622 505 600 C440 579 399 491 452 447Z" />
        </g>

        <g className="signal-core" filter="url(#soft-grain)">
          <path d="M258 274 C302 216 399 214 447 267 C497 323 463 422 389 447 C316 471 229 419 230 344 C230 319 240 295 258 274Z" />
        </g>

        <g className="map-node node-a"><circle cx="102" cy="189" r="7" /><circle cx="102" cy="189" r="18" /></g>
        <g className="map-node node-b"><circle cx="615" cy="146" r="7" /><circle cx="615" cy="146" r="18" /></g>
        <g className="map-node node-c"><circle cx="74" cy="487" r="7" /><circle cx="74" cy="487" r="18" /></g>
        <g className="map-node node-d"><circle cx="637" cy="526" r="7" /><circle cx="637" cy="526" r="18" /></g>

        <text className="map-core-type" x="348" y="335" textAnchor="middle">YUTU</text>
        <text className="map-core-type map-core-type-small" x="348" y="373" textAnchor="middle">INFO COMMONS</text>
      </svg>

      {fragments.map((fragment) => (
        <span key={fragment.code} className={fragment.className}>
          <b>{fragment.label}</b>
          <small>{fragment.code}</small>
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section id="top" className="hero-stage relative isolate min-h-[100svh] overflow-hidden">
      <div className="hx-grid" aria-hidden="true" />
      <div className="hx-noise" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[90rem] grid-rows-[auto_1fr_auto] px-5 pb-8 pt-24 sm:px-8 sm:pt-28 lg:px-12">
        <div className="hero-fade flex items-center justify-between border-b border-white/10 pb-4 font-mono text-[9px] uppercase tracking-[0.22em] text-white/45">
          <span>GDUFS · 23.1345° N</span>
          <span>Campus information commons</span>
        </div>

        <div className="relative grid items-center py-12 lg:grid-cols-[1.08fr_0.92fr] lg:py-8">
          <div className="relative z-20">
            <p className="hero-fade mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/55">
              <span className="inline-block size-1.5 bg-[var(--lime)]" />
              YutuHub / 屿途知汇
            </p>
            <h1 className="hero-title select-none font-bold leading-[0.72] tracking-[-0.09em]">
              <span className="hero-word block">YUTU</span>
              <span className="hero-word hx-outline block pl-[0.3em]">HUB</span>
              <span className="sr-only">屿途知汇，让校园里的真实信息重新流动起来</span>
            </h1>
            <p className="hero-cn-mark hero-fade">屿途知汇</p>
          </div>

          <SignalArchipelago />
        </div>

        <div className="hero-copy hero-fade grid gap-7 border-t border-white/10 pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="max-w-2xl text-[clamp(1.35rem,2.6vw,2.7rem)] font-medium leading-[1.15] tracking-[-0.035em]">
              让校园里的真实信息，<span className="text-[var(--lime)]">重新流动起来。</span>
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/48">
              从一条课程经验到一次校园互助，把散落的信息连成每个人都能抵达的路。
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a href="#campus-signals" className="cta-primary">进入信息流 <span aria-hidden="true">↓</span></a>
            <a href="/community" className="cta-ghost">加入共建</a>
          </div>
        </div>
      </div>

      <div className="hero-recompose pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-[#f2f0e9] px-5 text-[#0a0a0a] opacity-0">
        <p className="max-w-5xl text-center text-[clamp(2.8rem,7vw,7rem)] font-bold leading-[0.92] tracking-[-0.065em]">
          分散的经验，<br /><span className="text-[var(--lime)]">正在成为共同的路。</span>
        </p>
      </div>
    </section>
  );
}
