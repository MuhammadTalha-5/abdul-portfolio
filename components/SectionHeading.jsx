"use client";

import { Reveal } from "./Reveal";

/** Consistent eyebrow + title block used at the top of each section. */
export default function SectionHeading({ eyebrow, title, intro }) {
  return (
    <div className="mb-14 max-w-2xl">
      {eyebrow && (
        <Reveal y={16}>
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            <span className="h-px w-6 bg-accent" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="font-serif text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
