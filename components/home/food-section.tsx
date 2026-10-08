"use client";

import { useHomeI18n } from "@/components/home/home-i18n";

export function FoodSection() {
  const { copy } = useHomeI18n();
  return (
    <section
      id="food-guide"
      className="home-section relative overflow-hidden"
    >
      <div className="food-track relative">
        <div className="mx-auto max-w-6xl px-5 py-32 sm:px-8 sm:py-44">
          <div className="scroll-reveal">
            <p className="hx-caption">{copy.food.chapter}</p>
            <h2 className="mt-6 max-w-4xl text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[1.04] tracking-[-0.02em]">
              {copy.food.titleLead}
              <span className="block hx-outline">{copy.food.titleAccent}</span>
            </h2>
          </div>

          {/* Big poster block — zooms into place like a film shot */}
          <figure className="food-poster hx-poster mt-20 rounded-[2rem] px-6 py-24 text-center sm:px-12 sm:py-36">
            <div
              className="hx-halo left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 opacity-70"
              aria-hidden="true"
            />
            <figcaption className="food-fade hx-caption relative">
              {copy.food.posterLabel}
            </figcaption>
            <p className="food-giant relative mt-10 text-[clamp(4rem,14vw,11rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
              {copy.food.posterMain}
              <span className="hx-accent">{copy.food.posterAccent}</span>
            </p>
            <p className="food-fade relative mx-auto mt-10 max-w-md text-base leading-7 text-[#8a8a8a]">
              {copy.food.description}
            </p>
          </figure>

          {/* Horizontal drifting stall strip */}
          <div className="mt-20 overflow-hidden">
            <div className="food-strip flex w-max min-w-0 gap-5">
              {copy.food.stalls.map((stall) => (
                <article
                  key={stall.index}
                  className="home-card w-[min(78vw,24rem)] shrink-0 p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="hx-accent font-mono text-sm">
                      {stall.index}
                    </span>
                    <span className="hx-caption">{stall.tag}</span>
                  </div>
                  <h3 className="mt-10 text-3xl font-semibold tracking-tight sm:text-4xl">
                    {stall.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#8a8a8a]">
                    {stall.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
