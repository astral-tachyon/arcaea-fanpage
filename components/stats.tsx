"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { stats } from "@/lib/content";

function Counter({ value, from, suffix }: { value: number; from: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  const reduceMotion = useReducedMotion();
  // Starts at the final value so the number is correct without JavaScript.
  const [display, setDisplay] = useState<number>(value);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(from, value, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, from, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-label="Arcaea in numbers" className="mx-auto max-w-7xl px-5 md:px-10">
      <RevealGroup as="dl" className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
        {stats.map((stat, i) => (
          <RevealItem
            key={stat.label}
            className={`flex flex-col-reverse gap-1 px-2 py-9 text-center md:py-12 ${
              i % 2 === 1 ? "border-l border-line" : ""
            } ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
          >
            <dt className="text-xs uppercase tracking-[0.22em] text-ink-soft">{stat.label}</dt>
            <dd className="font-serif text-5xl font-medium leading-none md:text-7xl">
              <Counter value={stat.value} from={stat.from} suffix={stat.suffix} />
            </dd>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
