"use client";

import Image from "next/image";
import SectionHeading from "../SectionHeading";
import { Reveal } from "../Reveal";

export default function Projects({ projects }) {
  return (
    <section id="projects" className="section mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Selected work"
        title="Projects"
        intro="A selection of projects I've led or supported on the ground."
      />

      <div className="space-y-6">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.04}>
            <article className="group grid items-center gap-6 overflow-hidden rounded-3xl border border-line bg-surface p-5 transition-colors hover:border-accent md:grid-cols-2 md:gap-10 md:p-6">
              <div
                className={`relative aspect-[16/10] overflow-hidden rounded-2xl bg-accent-soft ${
                  i % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                {p.image ? (
                  <Image
                    src={p.image.url}
                    alt={p.image.alt || p.title}
                    fill
                    sizes="(max-width: 768px) 90vw, 45vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-serif text-6xl text-accent/30">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                )}
              </div>

              <div className={i % 2 === 1 ? "md:order-1" : ""}>
                {p.role && (
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                    {p.role}
                  </span>
                )}
                <h3 className="mt-2 font-serif text-2xl font-medium text-ink md:text-3xl">
                  {p.title}
                </h3>
                {p.description && (
                  <p className="mt-3 leading-relaxed text-muted">{p.description}</p>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
