"use client";

import SectionHeading from "../SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../Reveal";

export default function About({ about }) {
  return (
    <section id="about" className="section mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading eyebrow="About" title="A bit about me" />

      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div
            className="prose-wp text-lg"
            dangerouslySetInnerHTML={{ __html: about.bio }}
          />
        </Reveal>

        <div>
          <Reveal>
            <h3 className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-muted">
              Core Skills
            </h3>
          </Reveal>
          <RevealGroup className="flex flex-wrap gap-2.5" stagger={0.06}>
            {about.skills.map((skill, i) => (
              <RevealItem key={i}>
                <span className="inline-block rounded-full border border-line bg-surface px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent">
                  {skill}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
