"use client";

import { CalendarDays, Cat, Handshake, ShoppingBag } from "lucide-react";
import { useHomeI18n } from "@/components/home/home-i18n";

const MARKET_ICONS = [ShoppingBag, Handshake, CalendarDays, Cat];

export function CampusMarketSection() {
  const { copy } = useHomeI18n();
  return (
    <section
      id="campus-market"
      className="home-section relative overflow-hidden px-5 py-32 sm:px-8 sm:py-44"
    >
      <div className="mx-auto max-w-6xl">
        <div className="scroll-reveal">
          <p className="hx-caption">{copy.market.chapter}</p>
          <h2 className="mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
            {copy.market.titleLead}
            <span className="block hx-outline">{copy.market.titleAccent}</span>
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[#8a8a8a] sm:text-xl">
            {copy.market.description}
          </p>
        </div>

        <div className="mt-24 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {copy.market.items.map(({ index, title, en, desc }, itemIndex) => {
            const Icon = MARKET_ICONS[itemIndex];
            return (
            <article
              key={title}
              className="market-entry group border-t border-[rgba(245,245,245,0.1)] pt-6"
            >
              <div className="market-reveal flex items-center justify-between">
                <Icon className="size-5 text-[var(--home-fg)]" aria-hidden="true" />
                <span
                  className="size-1.5 rounded-full bg-[var(--klein)] opacity-40 transition-opacity duration-500 group-hover:opacity-100"
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
                {copy.market.preview}
              </p>

              <span
                className="hx-outline market-reveal mt-6 block text-[5.5rem] font-semibold leading-none"
                aria-hidden="true"
              >
                {index}
              </span>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
