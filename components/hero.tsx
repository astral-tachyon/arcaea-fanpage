"use client";

import { motion, useScroll, useTransform, type Variants } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Diamond } from "@/components/ui/diamond";
import { StoreButtons } from "@/components/ui/store-buttons";

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
};

const line: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 1.1, ease: EASE } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  return (
    <section ref={ref} id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Key art: across the top on phones, held to the right on wide screens */}
      <motion.div
        style={{ y: artY }}
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
        className="hero-art absolute inset-x-0 top-0 -z-20 h-[62svh] lg:inset-y-0 lg:left-auto lg:h-auto lg:w-[66%]"
      >
        <Image
          src="/art/hero.webp"
          alt="Hikari and Tairitsu drifting toward each other, one upside down, surrounded by butterflies, chess pieces and falling ribbons"
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover object-[55%_22%] lg:object-[50%_30%]"
        />
      </motion.div>
      {/* Veil: fades the art into the page and keeps the copy readable in both themes */}
      <div
        aria-hidden="true"
        className="grain absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--paper)_10%,transparent)_0%,color-mix(in_srgb,var(--paper)_35%,transparent)_30%,var(--paper)_56%)] lg:bg-[linear-gradient(90deg,var(--paper)_0%,var(--paper)_34%,color-mix(in_srgb,var(--paper)_55%,transparent)_52%,transparent_72%),linear-gradient(to_top,var(--paper)_0%,transparent_18%)]"
      />

      <div className="mx-auto flex min-h-svh max-w-7xl flex-col justify-end px-5 pb-16 pt-[44svh] md:px-10 lg:justify-center lg:pb-24 lg:pt-36">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.p
            variants={rise}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.28em] text-violet"
          >
            <span>3D rhythm game</span>
            <Diamond className="size-1.5" />
            <span>iOS</span>
            <Diamond className="size-1.5" />
            <span>Android</span>
            <Diamond className="size-1.5" />
            <span>Nintendo Switch</span>
          </motion.p>

          <h1
            id="hero-title"
            className="mt-7 font-serif text-[clamp(2.75rem,11.5vw,5rem)] font-medium leading-[0.94] tracking-tight lg:text-[clamp(5rem,6.5vw,6.25rem)]"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <motion.span variants={line} className="block">
                Play the ground.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.14em]">
              <motion.span variants={line} className="block italic text-violet">
                Trace the sky.
              </motion.span>
            </span>
          </h1>

          <motion.p variants={rise} className="mt-7 max-w-xl text-base text-ink-soft md:text-lg">
            Arcaea is a rhythm game played on two levels at once. Tap notes as they glide across the floor, follow
            arcs of light as they curve overhead, and piece together a story hidden in shards of glass.
          </motion.p>

          <motion.div variants={rise} className="mt-10">
            <StoreButtons />
            <p className="mt-5 text-sm text-ink-soft">Free to start on mobile. No rhythm game experience needed.</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
