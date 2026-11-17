"use client";

import { ArrowUpRight, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { Diamond } from "@/components/ui/diamond";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { channelUrl, TRAILER_EVENT, trailers, type TrailerRequest } from "@/lib/trailers";

/** YouTube serves a tiny grey placeholder when a video has no high-resolution poster. */
function Poster({ id }: { id: string }) {
  const [fallback, setFallback] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- remote thumbnail, already sized by YouTube
    <img
      key={`${id}-${fallback}`}
      src={`https://i.ytimg.com/vi/${id}/${fallback ? "hqdefault" : "maxresdefault"}.jpg`}
      alt=""
      loading="lazy"
      onLoad={(event) => {
        if (!fallback && event.currentTarget.naturalWidth <= 120) setFallback(true);
      }}
      onError={() => setFallback(true)}
      className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-glide group-hover:scale-105"
    />
  );
}

export function Trailers() {
  const [current, setCurrent] = useState<TrailerRequest>(trailers[0]);
  const [playing, setPlaying] = useState(false);
  const [frameReady, setFrameReady] = useState(false);

  const play = (request: TrailerRequest) => {
    setFrameReady(false);
    setCurrent(request);
    setPlaying(true);
  };

  // Story chapters can ask this section to play their trailer.
  useEffect(() => {
    const onRequest = (event: Event) => play((event as CustomEvent<TrailerRequest>).detail);
    window.addEventListener(TRAILER_EVENT, onRequest);
    return () => window.removeEventListener(TRAILER_EVENT, onRequest);
  }, []);

  return (
    <section id="trailers" aria-labelledby="trailers-title" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          id="trailers-title"
          index="08"
          label="Trailers"
          ja="トレーラー"
          title={
            <>
              See it in <em className="text-violet">motion</em>.
            </>
          }
          lead="Official trailers from lowiro's YouTube channel. The video player loads only when you press play."
        />

        <div className="mt-14 grid gap-6 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-8">
            <div className="relative aspect-video overflow-hidden rounded-[1.75rem] bg-plum shadow-[0_40px_80px_-40px_rgb(43_18_89/0.7)] ring-1 ring-line">
              {playing ? (
                <>
                  {!frameReady ? (
                    <div role="status" className="absolute inset-0 grid place-items-center text-white">
                      <Diamond className="size-5 animate-pulse" />
                      <span className="sr-only">Loading video</span>
                    </div>
                  ) : null}
                  <iframe
                    key={current.id}
                    src={`https://www.youtube-nocookie.com/embed/${current.id}?autoplay=1&rel=0`}
                    title={`${current.title} (YouTube video)`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    onLoad={() => setFrameReady(true)}
                    className="absolute inset-0 size-full"
                  />
                </>
              ) : (
                <button type="button" onClick={() => play(current)} className="group absolute inset-0 block text-left text-white">
                  <Poster id={current.id} />
                  <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgb(18_10_36/0.85),rgb(18_10_36/0.1)_55%)]" />
                  <span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#1d0f3d] shadow-2xl transition-transform duration-500 ease-glide group-hover:scale-110 md:size-24">
                    <Play aria-hidden="true" className="ml-1 size-7 fill-current" />
                  </span>
                  <span className="absolute inset-x-0 bottom-0 block p-6 md:p-8">
                    <span className="text-xs font-medium uppercase tracking-[0.24em] text-white/80">Play trailer</span>
                    <span className="mt-1 block font-serif text-3xl font-medium md:text-4xl">{current.title}</span>
                  </span>
                </button>
              )}
            </div>

            <p className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
              <a
                href={`https://www.youtube.com/watch?v=${current.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink underline decoration-1 underline-offset-4 transition-colors hover:text-violet"
              >
                Watch “{current.title}” on YouTube
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <a
                href={channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 underline decoration-1 underline-offset-4 transition-colors hover:text-violet"
              >
                More on lowiro's channel
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-4">
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {trailers.map((trailer) => {
                const selected = trailer.id === current.id;
                return (
                  <li key={trailer.id}>
                    <button
                      type="button"
                      onClick={() => play(trailer)}
                      aria-pressed={selected}
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-2.5 text-left transition duration-300 ease-glide ${
                        selected ? "border-violet bg-wash" : "border-transparent hover:border-line hover:bg-wash/70"
                      }`}
                    >
                      <span className="relative block aspect-video w-28 shrink-0 overflow-hidden rounded-xl bg-plum">
                        {/* eslint-disable-next-line @next/next/no-img-element -- remote thumbnail */}
                        <img
                          src={`https://i.ytimg.com/vi/${trailer.id}/mqdefault.jpg`}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-glide group-hover:scale-110"
                        />
                        <span className="absolute inset-0 grid place-items-center bg-[#120a24]/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <Play aria-hidden="true" className="size-5 fill-white text-white" />
                        </span>
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.65rem] uppercase tracking-[0.18em] text-ink-soft">
                          {trailer.kind} · {trailer.year}
                        </span>
                        <span className={`mt-0.5 block font-serif text-xl font-medium leading-tight ${selected ? "text-violet" : ""}`}>
                          {trailer.title}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
