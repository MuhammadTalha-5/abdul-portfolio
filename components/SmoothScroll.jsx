"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Drives Lenis from GSAP's ticker so Lenis + ScrollTrigger stay in sync.
 * Using the `useLenis` hook (instead of a ref) guarantees the Lenis instance
 * exists before we start the ticker — otherwise the rAF loop never runs and
 * wheel scrolling / scrollTo() silently do nothing.
 */
function GsapLenisSync() {
  // Re-run ScrollTrigger on every Lenis scroll; also returns the instance.
  const lenis = useLenis(() => ScrollTrigger.update());

  useEffect(() => {
    if (!lenis) return;
    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
      }}
    >
      <GsapLenisSync />
      {children}
    </ReactLenis>
  );
}
