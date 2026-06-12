"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { RevealGroup, RevealItem } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1];

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function ExperienceGallery({ images = [] }) {
  const [index, setIndex] = useState(null);
  const lenis = useLenis();
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [open, close, prev, next, lenis]);

  if (!images.length) return null;

  return (
    <>
      {/* Uniform thumbnail grid */}
      <RevealGroup
        className="grid grid-cols-3 gap-2.5 md:grid-cols-2"
        stagger={0.05}
      >
        {images.map((img, i) => (
          <RevealItem key={i}>
            <motion.button
              type="button"
              onClick={() => setIndex(i)}
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-white shadow-sm transition-shadow hover:shadow-md"
              aria-label="View photo"
            >
              <Image
                src={img.url}
                alt={img.alt || "Experience photo"}
                fill
                draggable={false}
                sizes="(max-width: 768px) 30vw, 180px"
                className="no-img-actions object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span aria-hidden className="absolute inset-0 z-10" />
              <span className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25">
                <span className="flex h-9 w-9 scale-75 items-center justify-center rounded-full bg-white/95 text-ink opacity-0 shadow transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  <SearchIcon />
                </span>
              </span>
            </motion.button>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Lightbox carousel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-xl text-white transition-colors hover:bg-white/10"
            >
              &#10005;
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous"
                  className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-xl text-white transition-colors hover:bg-white/10 sm:left-6"
                >
                  &#8592;
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next"
                  className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-xl text-white transition-colors hover:bg-white/10 sm:right-6"
                >
                  &#8594;
                </button>
              </>
            )}

            <div
              className="flex max-h-full w-full max-w-4xl flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="relative inline-block max-h-[80vh] overflow-hidden rounded-xl bg-white p-2 sm:p-3"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={images[index].url}
                    alt={images[index].alt || "Experience photo"}
                    draggable={false}
                    className="no-img-actions block max-h-[72vh] w-auto max-w-full object-contain"
                  />
                  <span aria-hidden className="absolute inset-0 z-10" />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <p className="mt-4 text-sm text-white/70">
                  {index + 1} / {images.length}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
