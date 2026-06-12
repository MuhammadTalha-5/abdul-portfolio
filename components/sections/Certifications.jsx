"use client";

import Image from "next/image";
import SectionHeading from "../SectionHeading";
import { RevealGroup, RevealItem } from "../Reveal";

export default function Certifications({ certifications }) {
  return (
    <section id="certifications" className="section bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          intro="Recognized qualifications backing every safety decision."
        />

        <RevealGroup
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          stagger={0.06}
        >
          {certifications.map((c) => (
            <RevealItem key={c.id}>
              <div className="group overflow-hidden rounded-2xl border border-line bg-bg transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/5">
                <div
                  className="relative aspect-[4/3] overflow-hidden bg-accent-soft"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                >
                  {c.image ? (
                    <>
                      <Image
                        src={c.image.url}
                        alt={c.image.alt || c.title}
                        fill
                        draggable={false}
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="no-img-actions object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Transparent shield: intercepts right-click / drag / long-press */}
                      <span aria-hidden className="absolute inset-0 z-10" />
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-4xl text-accent/40">
                      ⬡
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold leading-snug text-ink">
                    {c.title}
                  </h3>
                  {c.issuer && (
                    <p className="mt-1 text-xs text-muted">{c.issuer}</p>
                  )}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
