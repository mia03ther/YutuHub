"use client";

import { useHomeI18n } from "@/components/home/home-i18n";

export function FinalCTA() {
  const { copy } = useHomeI18n();
  return (
    <section className="final-cta relative overflow-hidden bg-[var(--klein)] text-white">
      {/* Fragmented ghost word behind */}
      <span
        className="pointer-events-none absolute -bottom-[3vw] left-0 select-none whitespace-nowrap text-[clamp(5rem,16vw,14rem)] font-semibold leading-none text-white/8"
        aria-hidden="true"
      >
        YuTuHub · YuTuHub
      </span>

      <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-40">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-white/65">{copy.final.eyebrow}</p>

        <h2 className="mt-8 text-[clamp(3rem,10vw,8.5rem)] font-semibold leading-[1.0] tracking-[-0.03em]">
          <span className="final-line block">{copy.final.titleLead}</span>
          <span className="final-line block">{copy.final.titleAccent}</span>
        </h2>

        <p className="final-fade mt-8 max-w-xl text-lg font-medium leading-8 text-white/75 sm:text-xl">{copy.final.description}</p>

        <div className="final-fade mt-12 flex flex-col gap-3 sm:flex-row">
          <a href="#campus-signals" className="cta-lime-ghost">
            {copy.final.explore}
            <span aria-hidden="true">↑</span>
          </a>
          <a href="/community" className="cta-lime">
            {copy.final.publish}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Full-bleed marquee */}
      <div className="relative overflow-hidden border-t border-white/20 py-5">
        <div className="story-marquee marquee-fast flex w-max items-center gap-8">
          {[...copy.final.marquee, ...copy.final.marquee].map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="flex items-center gap-8 whitespace-nowrap text-2xl font-semibold tracking-tight text-white/90 sm:text-3xl"
            >
              {word}
              <span
                className="size-2 rounded-full bg-white/45"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
