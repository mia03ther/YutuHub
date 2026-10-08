interface PageIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  meta?: string;
}

export function PageIntro({ eyebrow, title, description, meta }: PageIntroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border-line bg-background">
      <span className="pointer-events-none absolute -right-[0.04em] bottom-[-0.28em] select-none text-[clamp(7rem,20vw,19rem)] font-bold leading-none tracking-[-0.08em] text-foreground/[0.035]" aria-hidden="true">
        YUTU
      </span>
      <div className="relative mx-auto grid w-full max-w-[90rem] gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.38fr)] lg:px-12 lg:py-28">
        <div>
          <p className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-muted-soft">
            <span className="mr-3 inline-block size-1.5 bg-[var(--signal)] align-middle" />
            {eyebrow}
          </p>
          <h1 className="editorial mt-7 max-w-5xl text-[clamp(3.4rem,8vw,8rem)] font-bold leading-[0.84] tracking-[-0.07em]">
            {title}
          </h1>
        </div>

        <div className="self-end border-t border-border-line pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="max-w-xl text-[15px] leading-7 text-muted sm:text-base">
            {description}
          </p>
          {meta ? (
            <span className="mt-6 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-soft">{meta}</span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
