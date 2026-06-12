"use client";

import SectionHeading from "../SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "../Reveal";

function RatingDots({ rating }) {
  return (
    <span className="flex gap-1" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-2 w-2 rounded-full ${
            n <= rating ? "bg-accent" : "bg-line"
          }`}
        />
      ))}
    </span>
  );
}

export default function About({ about }) {
  const languages = about.languages || [];

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

        <div className="space-y-10">
          {/* Languages (above Core Skills) */}
          {languages.length > 0 && (
            <div>
              <Reveal>
                <h3 className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-muted">
                  Languages
                </h3>
              </Reveal>
              <RevealGroup className="space-y-3" stagger={0.06}>
                {languages.map((lang, i) => (
                  <RevealItem key={i}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm text-ink">{lang.name}</span>
                      {lang.rating > 0 && <RatingDots rating={lang.rating} />}
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          )}

          {/* Core Skills */}
          <div>
            <Reveal>
              <h3 className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-muted">
                Core Skills
              </h3>
            </Reveal>
            <RevealGroup className="flex flex-wrap gap-2.5" stagger={0.05}>
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
      </div>
    </section>
  );
}
