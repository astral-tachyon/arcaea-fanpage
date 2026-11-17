"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

/** Two arcs that draw themselves across the page as the divider scrolls through view. */
export function ArcDivider({ flip = false }: { flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 35%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <div ref={ref} aria-hidden="true" className={`relative mx-auto max-w-7xl px-5 md:px-10 ${flip ? "-scale-x-100" : ""}`}>
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" fill="none" className="h-14 w-full md:h-24">
        <motion.path
          d="M0 92 C 280 92, 430 18, 600 60 S 920 112, 1200 28"
          stroke="var(--arc-blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
        <motion.path
          d="M0 28 C 280 28, 430 102, 600 60 S 920 8, 1200 92"
          stroke="var(--arc-pink)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
      </svg>
      <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-violet bg-paper" />
    </div>
  );
}
