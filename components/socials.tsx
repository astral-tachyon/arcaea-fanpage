"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { socials } from "@/lib/site";

/** Brand glyphs, drawn as single-path icons so they take the text colour. */
const glyphs: Record<(typeof socials)[number]["id"], string> = {
  x: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  facebook:
    "M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z",
  discord:
    "M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z",
};

/** The closing band: the same layout as the top hero, mirrored. Art on the left, words on the right. */
export function Socials() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const artY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} id="socials" aria-labelledby="socials-title" className="relative isolate overflow-hidden">
      {/*
        On wide screens the art is a fixed-height band on the left, so it is never zoomed in far enough
        to push Hikari's face under the text. Its top and bottom edges fade out through the mask.
      */}
      <motion.div
        style={{ y: artY }}
        className="hero-art socials-art absolute inset-x-0 -top-[6%] -z-20 h-[58svh] lg:right-auto lg:top-[calc(50%-18rem)] lg:h-[36rem] lg:w-[60%]"
      >
        <Image
          src="/art/hero-bottom.webp"
          alt="Tairitsu and Hikari side by side beneath a deep blue sky filled with falling glass"
          fill
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover object-[42%_30%] lg:object-[66%_30%]"
        />
      </motion.div>
      {/* Veil: the mirror image of the top hero's, fading the art into the page just before the midline */}
      <div
        aria-hidden="true"
        className="grain absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--paper)_0%,transparent_12%,color-mix(in_srgb,var(--paper)_30%,transparent)_34%,var(--paper)_52%)] lg:bg-[linear-gradient(270deg,var(--paper)_0%,var(--paper)_48%,transparent_57%)]"
      />

      <div className="mx-auto flex min-h-[46rem] max-w-7xl flex-col justify-end px-5 pb-20 pt-[44svh] md:px-10 lg:grid lg:min-h-[44rem] lg:grid-cols-2 lg:items-center lg:py-24">
        {/* The text starts at the middle of the page */}
        <div className="w-full max-w-xl lg:col-start-2 lg:pl-6">
          <SectionHeading
            id="socials-title"
            index="09"
            label="Socials"
            ja="公式SNS"
            title={
              <>
                Keep up with the <em className="text-violet">sky</em>.
              </>
            }
            lead="New songs, events and collaborations are announced on Arcaea's official pages first. Pick the one you already use."
          />

          <RevealGroup as="ul" className="mt-10 border-t border-line">
            {socials.map((item) => (
              <RevealItem as="li" key={item.id} className="border-b border-line">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 py-5 transition-colors duration-300 hover:text-violet"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-full border border-line bg-surface/80 backdrop-blur-md transition duration-500 ease-glide group-hover:border-violet group-hover:bg-btn-bg group-hover:text-btn-fg">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
                      <path d={glyphs[item.id]} />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-serif text-3xl font-medium leading-tight">{item.name}</span>
                    <span className="block truncate text-sm text-ink-soft">{item.handle}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-5 shrink-0 transition-transform duration-300 ease-glide group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-6 text-sm text-ink-soft">
            Prefer Japanese? The team also posts at{" "}
            <a
              href="https://x.com/arcaea_jp"
              target="_blank"
              rel="noopener noreferrer"
              lang="en"
              className="text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-violet"
            >
              @arcaea_jp
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            .
          </Reveal>
        </div>
      </div>
    </section>
  );
}
