"use client";

import { Expand, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useId, useMemo, useRef, useState } from "react";
import { Lightbox, type Slide } from "@/components/lightbox";
import { Diamond } from "@/components/ui/diamond";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { mainStory, sideStories, type Chapter } from "@/lib/story";
import { TRAILER_EVENT, type TrailerRequest } from "@/lib/trailers";

const tabs = [
  { id: "main", label: "Main story" },
  { id: "side", label: "Side chapters" },
] as const;

type TabId = (typeof tabs)[number]["id"];

/** Only chapters with artwork appear in a gallery. */
const toSlides = (chapters: Chapter[]): Slide[] =>
  chapters.flatMap((chapter) =>
    chapter.scene ? [{ ...chapter.scene, title: chapter.title, meta: `${chapter.who} · ${chapter.year}` }] : [],
  );

/** Hands the video to the trailers section further down the page and scrolls there. */
function playTrailer(chapter: Chapter) {
  if (!chapter.trailer) return;
  const detail: TrailerRequest = { id: chapter.trailer, title: chapter.title };
  window.dispatchEvent(new CustomEvent(TRAILER_EVENT, { detail }));
  document.getElementById("trailers")?.scrollIntoView();
}

function TrailerButton({ chapter }: { chapter: Chapter }) {
  if (!chapter.trailer) return null;
  return (
    <button
      type="button"
      onClick={() => playTrailer(chapter)}
      className="group/btn mt-4 inline-flex min-h-10 items-center gap-2.5 rounded-full border border-line px-4 text-sm font-medium transition-colors duration-300 hover:border-violet hover:text-violet"
    >
      <Play aria-hidden="true" className="size-3.5 fill-current transition-transform duration-300 ease-glide group-hover/btn:scale-125" />
      Watch trailer
      <span className="sr-only">for {chapter.title}</span>
    </button>
  );
}

type SceneProps = { chapter: Chapter; sizes: string; onOpen: (src: string) => void; className?: string };

/** A chapter's artwork as a button that opens the gallery, or a patterned panel when there is none. */
function SceneImage({ chapter, sizes, onOpen, className = "rounded-2xl ring-1 ring-line" }: SceneProps) {
  if (!chapter.scene) {
    return (
      <div aria-hidden="true" className={`relative grid aspect-video place-items-center overflow-hidden bg-wash ${className}`}>
        <div className="lattice absolute inset-0" />
        {chapter.upcoming ? (
          <span className="relative font-serif text-5xl italic text-lilac">?</span>
        ) : (
          <Diamond className="relative size-4 text-lilac" />
        )}
      </div>
    );
  }
  const { src, alt } = chapter.scene;
  return (
    <button
      type="button"
      onClick={() => onOpen(src)}
      aria-haspopup="dialog"
      aria-label={`View artwork: ${chapter.title}`}
      className={`group/scene relative block aspect-video w-full overflow-hidden bg-wash ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1200ms] ease-glide group-hover/scene:scale-105"
      />
      <span
        aria-hidden="true"
        className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-white/85 text-[#1d0f3d] opacity-0 transition duration-300 ease-glide group-hover/scene:opacity-100 group-focus-visible/scene:opacity-100"
      >
        <Expand className="size-4" />
      </span>
    </button>
  );
}

function Meta({ chapter }: { chapter: Chapter }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.18em] text-ink-soft">
      <span>{chapter.who}</span>
      <Diamond className="size-1.5 text-lilac" />
      <span className="tabular-nums">{chapter.year}</span>
    </p>
  );
}

function MainStory({ onOpen }: { onOpen: (src: string) => void }) {
  return (
    <div className="space-y-20">
      {mainStory.map((arc) => (
        <div key={arc.id} className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h3 className="font-serif text-5xl font-medium leading-none md:text-6xl">{arc.title}</h3>
              <p className="mt-4 max-w-xs text-ink-soft">
                {arc.note}
              </p>
            </div>
          </div>

          <ol className="relative lg:col-span-8">
            {/* The thread the chapter markers sit on */}
            <span
              aria-hidden="true"
              className="absolute bottom-6 left-[1.35rem] top-6 w-px bg-gradient-to-b from-arc-blue via-violet to-arc-pink opacity-50"
            />
            {arc.chapters.map((chapter) => (
              <li key={chapter.title} className="group relative grid grid-cols-[2.75rem_1fr] gap-x-5 pb-10 last:pb-0 md:gap-x-8">
                <span className="relative z-10 mt-1 grid size-11 place-items-center">
                  <span className="absolute inset-1 rotate-45 border border-violet bg-paper transition-colors duration-500 group-hover:bg-violet" />
                  <span className="relative text-[0.65rem] font-semibold tracking-wide text-violet transition-colors duration-500 group-hover:text-paper">
                    {chapter.mark}
                  </span>
                </span>
                <div className="grid gap-5 sm:grid-cols-[1fr_14.3rem] sm:gap-7 md:grid-cols-[1fr_17.6rem]">
                  <div>
                    <Meta chapter={chapter} />
                    <h4 className="mt-2 font-serif text-3xl font-medium leading-tight transition-colors duration-300 group-hover:text-violet md:text-[2.2rem]">
                      {chapter.title}
                    </h4>
                    <p className="mt-2 max-w-md text-ink-soft">{chapter.summary}</p>
                    <TrailerButton chapter={chapter} />
                  </div>
                  <SceneImage chapter={chapter} onOpen={onOpen} sizes="(min-width: 768px) 282px, (min-width: 640px) 229px, 80vw" />
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

function SideStories({ onOpen }: { onOpen: (src: string) => void }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {sideStories.map((chapter) => (
        <li
          key={chapter.title}
          className={`group flex flex-col overflow-hidden rounded-[1.75rem] border bg-surface transition duration-500 ease-glide hover:-translate-y-1.5 hover:border-lilac hover:shadow-[0_30px_60px_-30px_rgb(76_44_140/0.45)] ${
            chapter.upcoming ? "border-dashed border-lilac" : "border-line"
          }`}
        >
          {/* Full-bleed, so the artwork is as large as the card allows */}
          <SceneImage chapter={chapter} onOpen={onOpen} className="" sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" />
          <div className="flex flex-1 flex-col p-6">
            <Meta chapter={chapter} />
            <h3
              className={`mt-2 font-serif text-3xl font-medium leading-tight transition-colors duration-300 group-hover:text-violet ${
                chapter.upcoming ? "italic" : ""
              }`}
            >
              {chapter.title}
            </h3>
            <p className="mt-2 flex-1 text-ink-soft">{chapter.summary}</p>
            <div>
              <TrailerButton chapter={chapter} />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function Story() {
  const [tab, setTab] = useState<TabId>("main");
  // One gallery per tab. Each remembers nothing between openings.
  const [gallery, setGallery] = useState<{ tab: TabId; index: number } | null>(null);
  const baseId = useId();
  const tabRefs = useRef<Partial<Record<TabId, HTMLButtonElement | null>>>({});

  const slides = useMemo(
    () => ({ main: toSlides(mainStory.flatMap((arc) => arc.chapters)), side: toSlides(sideStories) }),
    [],
  );

  const openIn = (target: TabId) => (src: string) => {
    const index = slides[target].findIndex((slide) => slide.src === src);
    if (index >= 0) setGallery({ tab: target, index });
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next: TabId = tab === "main" ? "side" : "main";
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="story" aria-labelledby="story-title" className="relative bg-wash/60 py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="story-title"
            index="04"
            label="Story"
            ja="ストーリー"
            title={
              <>
                A story you <em className="text-violet">earn</em>, one song at a time.
              </>
            }
            lead="Clear songs with the right partner and another page unlocks. Summaries here are kept light on spoilers, though the artwork shows moments from each chapter. Select any image to view it larger."
          />

          <Reveal delay={0.1}>
            <div
              role="tablist"
              aria-label="Story type"
              onKeyDown={onKeyDown}
              className="inline-flex rounded-full border border-line bg-surface p-1"
            >
              {tabs.map((item) => {
                const selected = tab === item.id;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[item.id] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${baseId}-tab-${item.id}`}
                    aria-selected={selected}
                    aria-controls={`${baseId}-panel-${item.id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTab(item.id)}
                    className={`relative min-h-11 rounded-full px-6 text-sm font-medium transition-colors duration-300 ${
                      selected ? "text-btn-fg" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {selected ? (
                      <motion.span
                        layoutId={`${baseId}-pill`}
                        className="absolute inset-0 rounded-full bg-btn-bg"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <div className="mt-14 md:mt-20">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={tab}
              role="tabpanel"
              id={`${baseId}-panel-${tab}`}
              aria-labelledby={`${baseId}-tab-${tab}`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === "main" ? <MainStory onOpen={openIn("main")} /> : <SideStories onOpen={openIn("side")} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Lightbox
        label={gallery?.tab === "side" ? "Side chapter artwork" : "Main story artwork"}
        slides={slides[gallery?.tab ?? "main"]}
        index={gallery?.index ?? null}
        onClose={() => setGallery(null)}
        onChange={(index) => setGallery((current) => (current ? { ...current, index } : current))}
      />
    </section>
  );
}
