"use client";

import { useHomeI18n } from "@/components/home/home-i18n";

function YutuPortal() {
  const { copy } = useHomeI18n();
  return (
    <div className="portal-device" aria-hidden="true">
      <div className="portal-shadow" />
      <div className="portal-orbit portal-orbit-a" />
      <div className="portal-orbit portal-orbit-b" />
      <div className="portal-ring portal-ring-outer"><span /></div>
      <div className="portal-ring portal-ring-inner"><span /></div>
      <div className="portal-fold portal-fold-a" />
      <div className="portal-fold portal-fold-b" />
      <div className="portal-aperture"><span className="portal-pulse" /></div>
      <div className="portal-index portal-index-top">23°08′ / 113°17′</div>
      <div className="portal-index portal-index-bottom"><b>{copy.hero.portalLabel}</b><span>{copy.hero.portalStatus}</span></div>
    </div>
  );
}

export default function HeroPortal() {
  const { copy } = useHomeI18n();
  return (
    <section id="top" className="hero-stage relative isolate min-h-[100svh] overflow-hidden">
      <div className="hx-grid" aria-hidden="true" />
      <div className="hx-noise" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid min-h-[100svh] w-full max-w-[90rem] grid-rows-[auto_1fr_auto] px-5 pb-8 pt-24 sm:px-8 sm:pt-28 lg:px-12">
        <div className="hero-fade flex items-center justify-between border-b border-[var(--home-line)] pb-4 font-mono text-[9px] uppercase tracking-[0.22em] text-[var(--home-muted)]">
          <span>{copy.hero.location}</span><span className="hidden sm:inline">{copy.hero.commons}</span>
        </div>
        <div className="relative grid min-h-[32rem] items-center py-12 lg:grid-cols-[1.02fr_0.98fr] lg:py-8">
          <div className="relative z-20">
            <p className="hero-fade mb-5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--home-muted)]"><span className="inline-block size-1.5 bg-[var(--klein)]" />{copy.hero.eyebrow}</p>
            <h1 className="hero-title select-none font-bold leading-[0.72] tracking-[-0.09em]">
              <span className="hero-word block">YUTU</span>
              <span className="hero-word hx-outline block pl-[0.3em]">HUB</span>
              <span className="sr-only">YutuHub 屿途知汇</span>
            </h1>
            <p className="hero-cn-mark hero-fade">屿途知汇</p>
          </div>
          <YutuPortal />
        </div>
        <div className="hero-copy hero-fade grid gap-7 border-t border-[var(--home-line)] pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <p className="hero-tagline max-w-3xl text-[clamp(1.35rem,2.6vw,2.7rem)] font-medium leading-[1.15] tracking-[-0.035em]">{copy.hero.taglineLead} <span className="text-[var(--home-accent)]">{copy.hero.taglineAccent}</span></p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--home-muted)]">{copy.hero.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="#campus-signals" className="cta-primary">{copy.hero.explore}<span aria-hidden="true">↓</span></a>
            <a href="/community" className="cta-ghost">{copy.hero.join}</a>
          </div>
        </div>
      </div>
      <div className="hero-recompose pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-[var(--story-bg)] px-5 text-[var(--story-fg)] opacity-0">
        <p className="max-w-5xl text-center text-[clamp(2.8rem,7vw,7rem)] font-bold leading-[0.92] tracking-[-0.065em]">{copy.hero.transitionLead}<br /><span className="text-[var(--klein)]">{copy.hero.transitionAccent}</span></p>
      </div>
    </section>
  );
}
