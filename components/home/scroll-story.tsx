"use client";

import { useHomeI18n } from "@/components/home/home-i18n";

const NOTE_POSITIONS = ["left-[5%] top-[18%]", "right-[6%] top-[22%]", "left-[9%] bottom-[16%]", "right-[8%] bottom-[13%]"];

export function ScrollStory() {
  const { copy } = useHomeI18n();
  const manifestoChars = copy.story.titleParts.flatMap((text, partIndex) => [...text].map((ch) => ({ ch, accent: partIndex === 2 })));
  return (
    <section
      id="campus-signals"
      className="manifesto-scene relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--story-bg)] text-[var(--story-fg)]"
    >
      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-black/15 px-5 py-4 font-mono text-[9px] uppercase tracking-[0.2em] text-black/45 sm:px-8 lg:px-12">
        <span>{copy.story.chapter}</span>
        <span>{copy.story.kicker}</span>
      </div>

      <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        {copy.story.notes.map((note, index) => (
          <div key={note.code} className={`manifesto-fragment absolute w-56 border border-[var(--story-line)] bg-[var(--story-paper)] p-4 shadow-[8px_8px_0_var(--story-shadow)] ${NOTE_POSITIONS[index]}`}>
            <span className="font-mono text-[9px] tracking-[0.18em] text-[var(--signal)]">{note.code}</span>
            <p className="mt-3 text-sm leading-6 text-black/62">{note.text}</p>
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-5 text-center sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--story-muted)]">{copy.story.eyebrow}</p>
        <h2 className="mt-8 text-[clamp(2.7rem,7.6vw,7.3rem)] font-bold leading-[0.93] tracking-[-0.065em]">
          {manifestoChars.map(({ ch, accent }, index) => (
            <span key={`${ch}-${index}`} className={`m-char ${accent ? "text-[var(--signal)]" : ""}`}>{ch}</span>
          ))}
        </h2>
        <p className="manifesto-sub mx-auto mt-9 max-w-2xl text-[clamp(1rem,1.7vw,1.3rem)] leading-8 text-[var(--story-muted)]">{copy.story.body}</p>
      </div>

      <div className="absolute inset-x-0 bottom-0 grid grid-cols-2 border-t border-black/15 sm:grid-cols-4">
        {copy.story.categories.map((item, index) => (
          <span key={item} className="border-r border-black/15 px-4 py-3 font-mono text-[9px] tracking-[0.18em] text-black/45 last:border-r-0">
            0{index + 1} / {item}
          </span>
        ))}
      </div>
    </section>
  );
}
