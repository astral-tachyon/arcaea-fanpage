"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Diamond } from "@/components/ui/diamond";
import { partners, type Partner } from "@/lib/partners";

/** Short label shown beside the counter in the profile header. */
const groupLabel: Record<Partner["group"], string> = {
  leads: "The two",
  hikari: "Hikari's forms",
  tairitsu: "Tairitsu's forms",
  reunion: "Together",
  cast: "Along the way",
};

type Props = {
  /** Index into `partners`, or null when closed. */
  index: number | null;
  onClose: () => void;
  onStep: (delta: 1 | -1) => void;
};

/** Watermark size steps down as names get longer, so the full name always fits the panel. */
function watermarkSize(name: string) {
  if (name.length <= 8) return "text-[6.5rem] md:text-[8.5rem]";
  if (name.length <= 16) return "text-[4.25rem] md:text-[5.25rem]";
  return "text-[3.25rem] md:text-[4rem]";
}

/** Full-body artwork over a menu background, with a loading placeholder and an error fallback. */
function Artwork({ partner }: { partner: Partner }) {
  const [lookIndex, setLookIndex] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const look = partner.looks[lookIndex];
  const src = `/art/partners/${partner.id}${look.suffix}.webp`;
  const isLight = partner.tone === "light";

  const choose = (next: number) => {
    if (next === lookIndex) return;
    setStatus("loading");
    setLookIndex(next);
  };

  return (
    <div className={`grain relative h-[30rem] shrink-0 overflow-hidden sm:h-[34rem] md:h-full ${isLight ? "bg-[#ece6f8]" : "bg-[#1a0f33]"}`}>
      {/* Light outfits sit on light menu backgrounds, dark outfits on dark ones. */}
      <Image src={partner.scenery} alt="" fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
      <div aria-hidden="true" className={`absolute inset-0 ${isLight ? "bg-white/30" : "bg-[#120a24]/35"}`} />

      <p
        aria-hidden="true"
        className={`absolute inset-x-5 top-5 select-none text-balance font-serif font-semibold italic leading-[0.9] md:inset-x-7 md:top-7 ${watermarkSize(partner.name)} ${
          isLight ? "text-[#2b1259]/15" : "text-white/20"
        }`}
      >
        {partner.name}
      </p>

      {status === "loading" ? (
        <div className="absolute inset-0 grid place-items-center" role="status">
          <Diamond className={`size-5 animate-pulse ${isLight ? "text-[#2b1259]/70" : "text-white/80"}`} />
          <span className="sr-only">Loading artwork</span>
        </div>
      ) : null}

      {status === "error" ? (
        <p className={`absolute inset-0 grid place-items-center px-8 text-center text-sm ${isLight ? "text-[#1d1233]" : "text-white"}`}>
          This artwork couldn't be loaded. Check your connection and try again.
        </p>
      ) : (
        <Image
          key={src}
          src={src}
          alt={`${partner.name}, full-body artwork${lookIndex > 0 ? ` (${look.label})` : ""}`}
          fill
          sizes="(min-width: 768px) 520px, 100vw"
          onLoad={() => setStatus("ready")}
          onError={() => setStatus("error")}
          className={`object-contain px-5 pb-36 pt-6 drop-shadow-[0_24px_30px_rgb(18_10_36/0.4)] transition duration-700 ease-glide md:px-8 md:pb-40 md:pt-8 ${
            status === "ready" ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        />
      )}

      {/* The full name again, below the figure, where the artwork can never cover it. */}
      <div
        className={`absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 px-5 pb-5 pt-12 text-center ${
          isLight
            ? "bg-[linear-gradient(to_top,rgb(255_255_255/0.92)_45%,rgb(255_255_255/0))] text-[#1d1233]"
            : "bg-[linear-gradient(to_top,rgb(18_10_36/0.92)_45%,rgb(18_10_36/0))] text-white"
        }`}
      >
        <p aria-hidden="true" className="font-serif text-2xl font-medium italic leading-tight md:text-[1.7rem]">
          {partner.name}
        </p>
        {partner.looks.length > 1 ? (
          <div role="group" aria-label="Artwork version" className="flex gap-1 rounded-full bg-[#120a24]/70 p-1 backdrop-blur-md">
            {partner.looks.map((option, i) => (
              <button
                key={option.label}
                type="button"
                aria-pressed={lookIndex === i}
                onClick={() => choose(i)}
                className={`min-h-9 rounded-full px-4 text-xs font-medium tracking-wide transition-colors duration-300 focus-visible:outline-white ${
                  lookIndex === i ? "bg-white text-[#1d0f3d]" : "text-white hover:bg-white/15"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function PartnerDialog({ index, onClose, onStep }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const partner = index === null ? null : partners[index];
  const open = partner !== null;

  // The native <dialog> traps focus, closes on Escape and returns focus to the card that opened it.
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Start each profile at the top.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    ref.current?.querySelector("[data-scroll]")?.scrollTo({ top: 0 });
  }, [index]);

  const total = partners.length;
  const prev = index === null ? null : partners[(index - 1 + total) % total];
  const next = index === null ? null : partners[(index + 1) % total];

  return (
    <dialog
      ref={ref}
      aria-labelledby="partner-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        // A click on the backdrop lands on the dialog element itself.
        if (event.target === ref.current) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") onStep(1);
        if (event.key === "ArrowLeft") onStep(-1);
      }}
      className="profile-dialog m-auto h-dvh max-h-none w-screen max-w-none overflow-hidden bg-paper p-0 text-ink backdrop:bg-[#120a24]/70 backdrop:backdrop-blur-sm md:h-[min(46rem,calc(100dvh-3rem))] md:w-[min(70rem,calc(100vw-3rem))] md:rounded-[2rem]"
    >
      {partner && prev && next ? (
        <div ref={scrollRef} className="relative h-full overflow-y-auto md:grid md:grid-cols-[0.9fr_1.1fr] md:overflow-hidden">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="fixed right-4 top-4 z-20 grid size-11 place-items-center rounded-full border border-line bg-surface/80 text-ink backdrop-blur-md transition-colors hover:border-violet hover:text-violet md:absolute"
          >
            <X aria-hidden="true" className="size-5" />
          </button>

          <Artwork key={partner.id} partner={partner} />

          <div data-scroll className="flex flex-col md:h-full md:overflow-y-auto">
            <div key={partner.id} className="profile-swap flex-1 px-6 pb-8 pt-8 md:px-10 md:pt-10">
              <div className="flex items-center gap-4 pr-12">
                <Image
                  src={`/art/partners/${partner.id}-icon.webp`}
                  alt={`${partner.name} icon`}
                  width={64}
                  height={64}
                  className="size-16 rounded-2xl ring-1 ring-line"
                />
                <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-violet">
                  <span className="tabular-nums">
                    {String((index ?? 0) + 1).padStart(2, "0")} / {total}
                  </span>
                  <Diamond className="size-1.5" />
                  <span>{groupLabel[partner.group]}</span>
                </p>
              </div>

              <h2 id="partner-dialog-title" className="mt-6 font-serif text-5xl font-medium leading-[0.95] tracking-tight md:text-6xl">
                {partner.name}
              </h2>
              <p className="mt-3 font-serif text-2xl italic text-violet">{partner.epithet}</p>

              <div className="mt-6 space-y-4 text-ink-soft">
                {partner.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <dl className="mt-8 border-t border-line">
                {partner.facts.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-line py-3.5 text-sm">
                    <dt className="text-xs uppercase leading-6 tracking-[0.18em] text-ink-soft">{fact.label}</dt>
                    <dd className="font-normal">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <h3 className="mt-10 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-violet">
                <Diamond className="size-1.5" />
                Scenes
              </h3>
              <div className={`mt-4 grid gap-4 ${partner.scenes.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {partner.scenes.map((item) => (
                  <figure key={item.src} className="group overflow-hidden rounded-2xl bg-wash ring-1 ring-line">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 768px) 280px, 100vw"
                        className="object-cover transition-transform duration-[1200ms] ease-glide group-hover:scale-105"
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-xs uppercase tracking-[0.18em] text-ink-soft">{item.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </div>

            <nav aria-label="Other partners" className="sticky bottom-0 grid grid-cols-2 border-t border-line bg-paper/90 backdrop-blur-md">
              <button
                type="button"
                onClick={() => onStep(-1)}
                className="group flex min-h-16 items-center gap-3 px-6 text-left transition-colors hover:text-violet md:px-10"
              >
                <ArrowLeft aria-hidden="true" className="size-4 shrink-0 transition-transform duration-300 ease-glide group-hover:-translate-x-1" />
                <span className="min-w-0">
                  <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">Previous</span>
                  <span className="block truncate font-serif text-lg font-medium">{prev.name}</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                className="group flex min-h-16 items-center justify-end gap-3 border-l border-line px-6 text-right transition-colors hover:text-violet md:px-10"
              >
                <span className="min-w-0">
                  <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">Next</span>
                  <span className="block truncate font-serif text-lg font-medium">{next.name}</span>
                </span>
                <ArrowRight aria-hidden="true" className="size-4 shrink-0 transition-transform duration-300 ease-glide group-hover:translate-x-1" />
              </button>
            </nav>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
