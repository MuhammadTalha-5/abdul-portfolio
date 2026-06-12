"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionHeading from "../SectionHeading";
import { Reveal } from "../Reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// ACF Date Picker returns ISO strings; show a clean "Mon YYYY".
// Non-date values (e.g. "Present") are passed through untouched.
function fmtDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function Experience({ experience }) {
  const container = useRef(null);
  const line = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        line.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <section id="experience" className="section bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading eyebrow="Career" title="Where I've worked" />

        <div ref={container} className="relative pl-8 md:pl-10">
          <div className="absolute left-[7px] top-2 h-full w-px bg-line md:left-[11px]" />
          <div
            ref={line}
            className="absolute left-[7px] top-2 h-full w-px origin-top bg-accent md:left-[11px]"
          />

          <div className="space-y-12">
            {experience.map((job, i) => {
              const dates = [fmtDate(job.start), fmtDate(job.end)]
                .filter(Boolean)
                .join(" — ");
              return (
                <Reveal key={job.id} delay={i * 0.05}>
                  <div className="relative">
                    <span className="absolute -left-8 top-1.5 flex h-4 w-4 items-center justify-center md:-left-10">
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg" />
                    </span>

                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-xl font-semibold text-ink">{job.title}</h3>
                      {dates && (
                        <span className="text-sm font-medium text-muted">{dates}</span>
                      )}
                    </div>

                    <p className="mt-1 text-sm font-medium text-accent">
                      {[job.company, job.location].filter(Boolean).join(" · ")}
                    </p>

                    {job.responsibilities.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {job.responsibilities.map((r, j) => (
                          <li
                            key={j}
                            className="relative pl-5 text-[0.95rem] leading-relaxed text-muted before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-accent"
                          >
                            {r}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
