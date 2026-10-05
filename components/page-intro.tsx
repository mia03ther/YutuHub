interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
}

export function PageIntro({ eyebrow, title, description, meta }: PageIntroProps) {
  return (
    <section className="border-b border-border-line">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-soft">
          {eyebrow}
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h1 className="editorial text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          {meta ? (
            <span className="text-sm tabular-nums text-muted-soft">{meta}</span>
          ) : null}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}