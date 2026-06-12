"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import SectionHeading from "../SectionHeading";
import { RevealGroup, RevealItem } from "../Reveal";

export default function Certifications({ certifications }) {
  const [active, setActive] = useState(null);
  const lenis = useLenis();

  // Lock background scroll + close on Escape while the lightbox is open.
  useEffect(() => {
    if (!active) return;
    lenis?.stop();
    const onKey = (e) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [active, lenis]);

  const blockSave = {
    onContextMenu: (e) => e.preventDefault(),
    onDragStart: (e) => e.preventDefault(),
  };

  return (
    <section id="certifications" className="section bg-surface/60">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <SectionHeading
          eyebrow="Credentials"
          title="Certifications"
          intro="Recognized qualifications backing every safety decision."
        />

        <RevealGroup
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.06}
        >
          {certifications.map((c) => {
            const clickable = Boolean(c.image);
            return (
              <RevealItem key={c.id}>
                <button
                  type="button"
                  onClick={() => clickable && setActive(c)}
                  className={`group block w-full overflow-hidden rounded-2xl border border-line bg-bg text-left transition-all hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/5 ${
                    clickable ? "cursor-zoom-in" : "cursor-default"
                  }`}
                >
                  {/* Framed, fully-visible certificate (no cropping) */}
                  <div
                    className="relative flex aspect-[4/3] items-center justify-center bg-white p-3"
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
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                          className="no-img-actions object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <span aria-hidden className="absolute inset-0 z-10" />
                        <span className="pointer-events-none absolute bottom-2 right-2 z-20 flex items-center gap-1 rounded-full bg-ink/80 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                          Click to view
                        </span>
                      </>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-4xl text-accent/40">
                        &#11041;
                      </div>
                    )}
                  </div>

                  <div className="border-t border-line p-4">
                    <h3 className="text-sm font-semibold leading-snug text-ink">
                      {c.title}
                    </h3>
                    {c.issuer && (
                      <p className="mt-1 text-xs text-muted">{c.issuer}</p>
                    )}
                  </div>
                </button>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-xl text-white transition-colors hover:bg-white/10"
            >
              &#10005;
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-full w-full max-w-4xl flex-col items-center justify-center"
            >
              <div
                className="relative inline-block max-h-[80vh] overflow-hidden rounded-xl bg-white p-2 sm:p-3"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.image.url}
                  alt={active.image.alt || active.title}
                  draggable={false}
                  className="no-img-actions block max-h-[74vh] w-auto max-w-full object-contain"
                />
                <span aria-hidden className="absolute inset-0 z-10" />
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-serif text-xl font-medium text-white">
                  {active.title}
                </h3>
                {active.issuer && (
                  <p className="mt-1 text-sm text-white/70">{active.issuer}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
