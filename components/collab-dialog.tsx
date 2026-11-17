"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { Diamond } from "@/components/ui/diamond";
import { collabArt, collabLogo, type Collab } from "@/lib/collabs";

type Props = {
  /** The collaborations currently on the timeline, in order. Previous/next step through these. */
  items: Collab[];
  /** Index into `items`, or null when closed. */
  index: number | null;
  onClose: () => void;
  onStep: (delta: 1 | -1) => void;
};

/** The other game's logo if one has been supplied, otherwise its name set as a wordmark. */
export function CollabMark({ collab, className = "" }: { collab: Collab; className?: string }) {
  const logo = collabLogo(collab.id);
  if (logo) {
    return <Image src={logo} alt={`${collab.name} logo`} width={480} height={240} sizes="240px" className={`h-auto max-h-full w-auto max-w-full object-contain ${className}`} />;
  }
  return <span className={`text-balance text-center font-serif font-semibold italic leading-none ${className}`}>{collab.name}</span>;
}

export function CollabDialog({ items, index, onClose, onStep }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const collab = index === null ? null : (items[index] ?? null);
  const open = collab !== null;

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

  useEffect(() => {
    ref.current?.querySelector("[data-scroll]")?.scrollTo({ top: 0 });
    ref.current?.firstElementChild?.scrollTo({ top: 0 });
  }, [index]);

  const total = items.length;
  const prev = index === null ? null : items[(index - 1 + total) % total];
  const next = index === null ? null : items[(index + 1) % total];
  const art = collab ? collabArt(collab.id) : null;

  return (
    <dialog
      ref={ref}
      aria-labelledby="collab-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") onStep(1);
        if (event.key === "ArrowLeft") onStep(-1);
      }}
      className="profile-dialog m-auto h-dvh max-h-none w-screen max-w-none overflow-hidden bg-paper p-0 text-ink backdrop:bg-[#120a24]/70 backdrop:backdrop-blur-sm md:h-[min(40rem,calc(100dvh-3rem))] md:w-[min(66rem,calc(100vw-3rem))] md:rounded-[2rem]"
    >
      {collab && prev && next && index !== null ? (
        <div className="relative h-full overflow-y-auto md:grid md:grid-cols-[0.85fr_1.15fr] md:overflow-hidden">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close details"
            className="fixed right-4 top-4 z-20 grid size-11 place-items-center rounded-full border border-line bg-surface/80 text-ink backdrop-blur-md transition-colors hover:border-violet hover:text-violet md:absolute"
          >
            <X aria-hidden="true" className="size-5" />
          </button>

          {/* Visual panel: the year, the other game's mark, and artwork once it has been added */}
          <div
            key={collab.id}
            className={`grain profile-swap relative flex h-[22rem] shrink-0 flex-col items-center justify-center overflow-hidden p-8 text-white md:h-full ${
              collab.kind === "other" ? "bg-[linear-gradient(150deg,#e9a8cd,#7d3fb8)]" : "bg-[linear-gradient(150deg,#b9a4f2,#4a2f9e)]"
            }`}
          >
            <div className="lattice absolute inset-0 opacity-70" aria-hidden="true" />
            <span aria-hidden="true" className="absolute left-5 top-3 font-serif text-[7rem] font-semibold italic leading-none text-white/25 md:text-[9rem]">
              {collab.year}
            </span>
            {art ? (
              <Image
                src={art}
                alt={`Artwork for the ${collab.name} collaboration`}
                fill
                sizes="(min-width: 768px) 440px, 100vw"
                className="object-contain px-6 pb-24 pt-10 drop-shadow-[0_24px_30px_rgb(18_10_36/0.4)]"
              />
            ) : null}
            <div className={`relative flex w-full items-center justify-center ${art ? "mt-auto h-16" : "h-32"}`}>
              <CollabMark collab={collab} className={art ? "text-3xl" : "text-5xl md:text-6xl"} />
            </div>
          </div>

          <div data-scroll className="flex flex-col md:h-full md:overflow-y-auto">
            <div key={collab.id} className="profile-swap flex-1 px-6 pb-8 pt-8 md:px-10 md:pt-10">
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 pr-12 text-xs font-medium uppercase tracking-[0.24em] text-violet">
                <span className="tabular-nums">
                  {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </span>
                <Diamond className="size-1.5" />
                <span className="tabular-nums">{collab.year}</span>
                <Diamond className="size-1.5" />
                <span>{collab.genre}</span>
              </p>

              <h2 id="collab-dialog-title" className="mt-6 font-serif text-5xl font-medium leading-[0.95] tracking-tight md:text-6xl">
                <span className="sr-only">Arcaea with </span>
                <span aria-hidden="true" className="mr-3 text-lilac">
                  ×
                </span>
                {collab.name}
              </h2>
              {collab.by ? <p className="mt-3 font-serif text-2xl italic text-violet">by {collab.by}</p> : null}

              <p className="mt-6 text-ink-soft">{collab.description}</p>

              <dl className="mt-8 border-t border-line">
                <div className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-line py-4 text-sm">
                  <dt className="text-xs uppercase leading-6 tracking-[0.18em] text-ink-soft">Guest partners</dt>
                  <dd className="font-normal">
                    {collab.partners.length > 0 ? (
                      <ul className="flex flex-wrap gap-2">
                        {collab.partners.map((partner) => (
                          <li key={partner} className="rounded-full border border-line bg-surface px-3.5 py-1">
                            {partner}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      "None: this one was songs only"
                    )}
                  </dd>
                </div>
                <div className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-line py-4 text-sm">
                  <dt className="text-xs uppercase leading-6 tracking-[0.18em] text-ink-soft">Songs added</dt>
                  <dd className="font-normal">
                    {collab.songs === null ? (
                      "Not confirmed yet"
                    ) : (
                      <>
                        <span className="font-serif text-3xl font-medium leading-none tabular-nums">{collab.songs}</span>
                        {collab.songsNote ? <span className="ml-2 text-ink-soft">{collab.songsNote}</span> : null}
                        {collab.songList.length > 0 ? (
                          <ol className="mt-3 space-y-1.5">
                            {collab.songList.map((title, n) => (
                              <li key={title} className="flex gap-3">
                                <span className="w-5 shrink-0 text-xs tabular-nums leading-6 text-ink-soft">{String(n + 1).padStart(2, "0")}</span>
                                <span>{title}</span>
                              </li>
                            ))}
                          </ol>
                        ) : null}
                      </>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            <nav aria-label="Other collaborations" className="sticky bottom-0 grid grid-cols-2 border-t border-line bg-paper/90 backdrop-blur-md">
              <button
                type="button"
                onClick={() => onStep(-1)}
                className="group flex min-h-16 items-center gap-3 px-6 text-left transition-colors hover:text-violet md:px-10"
              >
                <ArrowLeft aria-hidden="true" className="size-4 shrink-0 transition-transform duration-300 ease-glide group-hover:-translate-x-1" />
                <span className="min-w-0">
                  <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">Earlier</span>
                  <span className="block truncate font-serif text-lg font-medium">{prev.name}</span>
                </span>
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                className="group flex min-h-16 items-center justify-end gap-3 border-l border-line px-6 text-right transition-colors hover:text-violet md:px-10"
              >
                <span className="min-w-0">
                  <span className="block text-[0.65rem] uppercase tracking-[0.2em] text-ink-soft">Later</span>
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
