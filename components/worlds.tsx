"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Reveal } from "@/components/ui/reveal";
import { worlds } from "@/lib/content";

/** Interlude between gameplay and music: five panels that drift at different speeds. */
export function Worlds() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const up = useTransform(scrollYProgress, [0, 1], ["9%", "-9%"]);
  const down = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section aria-labelledby="worlds-title" className="overflow-hidden py-10 md:py-16">
      <Reveal className="mx-auto max-w-3xl px-5 text-center md:px-10">
        <h2 id="worlds-title" className="font-serif text-[clamp(1.9rem,4.4vw,3.25rem)] font-medium italic leading-tight text-balance">
          In a world of white, memories drift as shards of glass. They call them{" "}
          <span className="not-italic text-violet">Arcaea</span>.
        </h2>
      </Reveal>

      <div ref={ref} className="mx-auto mt-14 grid max-w-7xl grid-cols-3 gap-3 px-5 py-[4%] md:mt-20 md:grid-cols-5 md:gap-5 md:px-10">
        {worlds.map((world, i) => (
          <motion.figure
            key={world.src}
            style={{ y: i % 2 === 0 ? up : down }}
            className={`group relative aspect-[9/16] overflow-hidden rounded-2xl ring-1 ring-line md:rounded-3xl ${
              i > 2 ? "hidden md:block" : ""
            }`}
          >
            <Image
              src={world.src}
              alt={world.alt}
              fill
              sizes="(min-width: 768px) 19vw, 31vw"
              className="object-cover transition-transform duration-[1200ms] ease-glide group-hover:scale-[1.06]"
            />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
