import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { StoreButtons } from "@/components/ui/store-buttons";
import { site } from "@/lib/site";

export function Download() {
  return (
    <section id="download" aria-labelledby="download-title" className="px-5 pb-24 md:px-10 md:pb-32">
      <Reveal className="mx-auto max-w-7xl">
        <div className="relative isolate overflow-hidden rounded-[2.25rem] ring-1 ring-line">
          <div aria-hidden="true" className="cta-art absolute inset-0 -z-20" />
          <div
            aria-hidden="true"
            className="grain absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--paper)_90%,transparent)_0%,color-mix(in_srgb,var(--paper)_62%,transparent)_70%)]"
          />

          <div className="flex flex-col items-center px-6 py-20 text-center md:px-12 md:py-28">
            <SectionLabel label="Download" ja="ダウンロード" className="justify-center" />
            <h2
              id="download-title"
              className="mt-6 max-w-3xl font-serif text-[clamp(2.75rem,7.5vw,5.75rem)] font-medium leading-[0.95] tracking-tight text-balance"
            >
              The sky is waiting. <em className="text-violet">Come and play.</em>
            </h2>
            <p className="mt-6 max-w-lg text-ink-soft md:text-lg">
              Pick your platform and you can be tapping along to your first song in a couple of minutes.
            </p>
            <StoreButtons className="mt-10 justify-center" />
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto mt-5 max-w-7xl">
        <a
          href={site.merch}
          target="_blank"
          rel="noopener noreferrer"
          className="group grain relative flex flex-col justify-between gap-8 overflow-hidden rounded-[2.25rem] bg-plum p-8 text-white transition duration-500 ease-glide hover:-translate-y-1 md:flex-row md:items-end md:p-12"
        >
          <span
            aria-hidden="true"
            className="absolute -right-16 -top-24 size-80 rotate-45 border border-white/15 transition-transform duration-[1200ms] ease-glide group-hover:rotate-[60deg]"
          />
          <span
            aria-hidden="true"
            className="absolute -right-4 -top-10 size-52 rotate-45 border border-white/10 transition-transform duration-[1200ms] ease-glide group-hover:rotate-[30deg]"
          />
          <span className="relative">
            <span className="text-xs font-medium uppercase tracking-[0.28em] text-[#cdbdf7]">Official merchandise</span>
            <span className="mt-4 block max-w-xl font-serif text-4xl font-medium leading-[1.05] md:text-5xl">
              Bring a piece of the world home.
            </span>
            <span className="mt-4 block max-w-md text-[#d6ccee]">
              Soundtracks, art books and keepsakes from the official lowiro store.
            </span>
          </span>
          <span className="relative inline-flex min-h-13 items-center gap-3 self-start rounded-full bg-white px-7 font-medium text-[#1d0f3d] md:self-auto">
            Visit the store
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-glide group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </span>
        </a>
      </Reveal>
    </section>
  );
}
