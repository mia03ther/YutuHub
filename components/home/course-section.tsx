"use client";

import { useHomeI18n } from "@/components/home/home-i18n";

export function CourseSection() {
  const { copy } = useHomeI18n();
  return (
    <section
      id="course-guide"
      className="home-section relative overflow-hidden px-5 py-32 sm:px-8 sm:py-44"
    >
      <div className="section-head mx-auto max-w-6xl">
        <p className="head-fade hx-caption">{copy.course.chapter}</p>
        <h2 className="head-fade mt-6 text-[clamp(2.6rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.02em]">
          {copy.course.titleLead}<span className="hx-accent">{copy.course.titleAccent}</span>
        </h2>
        <p className="head-fade hx-caption mt-6">{copy.course.disclaimer}</p>
      </div>

      <div className="mx-auto mt-24 max-w-6xl space-y-32 sm:space-y-44">
        {copy.course.items.map((course, index) => (
          <article
            key={course.id}
            className="world-course border-t border-[rgba(245,245,245,0.08)] pt-10"
          >
            <div className="world-detail flex items-baseline justify-between gap-4">
              <span className="hx-caption">{course.id}</span>
              <span className="hx-caption tabular-nums">0{index + 1} / 03</span>
            </div>

            {/* Giant magazine headline — keyword collapses into story */}
            <h3
              className={`world-name mt-6 text-[clamp(3.2rem,9vw,8rem)] font-semibold leading-[1.04] tracking-[-0.02em] ${
                index === 1 ? "hx-outline" : ""
              }`}
            >
              {course.name}
            </h3>
            <p className="world-detail hx-caption mt-2">{course.nameEn}</p>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <p className="world-detail font-mono text-[13px] leading-6 text-[#8a8a8a]">
                {course.meta}
              </p>
              <blockquote className="world-detail border-l-2 border-[var(--klein)] pl-5 text-lg leading-8 text-[var(--home-fg)] sm:text-xl sm:leading-9">
                {course.note}
              </blockquote>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
