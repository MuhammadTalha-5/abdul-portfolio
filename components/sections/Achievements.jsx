"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import SectionHeading from "../SectionHeading";
import { RevealGroup, RevealItem } from "../Reveal";

// Split "180+" -> {prefix:"", number:180, decimals:0, suffix:"+"}
function parseStat(raw) {
  const str = String(raw ?? "").trim();
  const match = str.match(/(\d[\d,]*\.?\d*)/);
  if (!match) return { numeric: false, text: str };
  const numStr = match[1].replace(/,/g, "");
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return {
    numeric: true,
    prefix: str.slice(0, match.index),
    number: parseFloat(numStr),
    decimals,
    suffix: str.slice(match.index + match[1].length),
  };
}

function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);
  const stat = parseStat(value);

  useEffect(() => {
    if (!stat.numeric || !inView) return;
    const controls = animate(0, stat.number, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, stat.numeric, stat.number]);

  if (!stat.numeric) {
    return (
      <span ref={ref} className="text-2xl font-medium leading-tight">
        {stat.text}
      </span>
    );
  }

  return (
    <span ref={ref}>
      {stat.prefix}
      {display.toFixed(stat.decimals)}
      {stat.suffix}
    </span>
  );
}

export default function Achievements({ achievements }) {
  return (
    <section id="achievements" className="section mx-auto max-w-6xl px-6 py-24 md:py-32">
      <SectionHeading
        eyebrow="Impact"
        title="Numbers that matter"
        intro="Measurable outcomes from leading safety and operations on the ground."
      />

      <RevealGroup className="grid grid-cols-2 gap-4 md:grid-cols-4" stagger={0.1}>
        {achievements.map((a) => (
          <RevealItem key={a.id}>
            <div className="group h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent">
              <div className="font-serif text-5xl font-medium text-ink">
                <Counter value={a.number} />
              </div>
              <p className="mt-3 text-sm leading-snug text-muted">{a.label}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
