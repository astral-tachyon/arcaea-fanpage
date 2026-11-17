"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Diamond } from "@/components/ui/diamond";

export type Slide = { src: string; alt: string; title: string; meta: string };

type Props = {
  /** Names the gallery for assistive tech, e.g. "Main story artwork". */
  label: string;
  slides: Slide[];
  /** Index of the open slide, or null when closed. */
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
};

/** A modal image viewer that doubles as a carousel: arrows, arrow keys, or the thumbnail strip. */
export function Lightbox({ label, slides, index, onClose, onChange }: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);
  const [loaded, setLoaded] = useState<string | null>(null);
  const open = index !== null;
  const slide = index === null ? null : slides[index];

  // The native <dialog> traps focus, closes on Escape and returns focus to the image that opened it.
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

  // Keep the current thumbnail in view.
  useEffect(() => {
    if (index === null) return;
    stripRef.current?.children[index]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [index]);

  const step = (delta: 1 | -1) => {
    if (index !== null) onChange((index + delta + slides.length) % slides.length);
  };

  const arrow =
    "grid size-12 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition duration-300 ease-glide hover:border-white hover:bg-white hover:text-[#1d0f3d] focus-visible:outline-white";

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") step(1);
        if (event.key === "ArrowLeft") step(-1);
      }}
      className="lightbox m-0 h-dvh max-h-none w-screen max-w-none bg-[#0d0719]/95 p-0 text-white backdrop:bg-transparent"
    >
      {slide && index !== null ? (
        <div className="flex h-full flex-col">
          <div className="flex shrink-0 items-center justify-between gap-4 px-5 py-4 md:px-8">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.24em] text-white/80">
              <span className="tabular-nums">
                {String(index + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
              </span>
              <Diamond className="size-1.5" />
              <span>{label}</span>
            </p>
            <button type="button" onClick={onClose} aria-label="Close gallery" className={`${arrow} size-11`}>
              <X aria-hidden="true" className="size-5" />
            </button>
          </div>

          <div className="flex min-h-0 flex-1 items-center gap-3 px-3 md:gap-6 md:px-8">
            <button type="button" onClick={() => step(-1)} aria-label="Previous image" className={`${arrow} max-md:hidden`}>
              <ArrowLeft aria-hidden="true" className="size-5" />
            </button>

            <figure className="flex h-full min-w-0 flex-1 flex-col justify-center">
              <div className="relative min-h-0 flex-1">
                {loaded !== slide.src ? (
                  <div role="status" className="absolute inset-0 grid place-items-center">
                    <Diamond className="size-5 animate-pulse text-white/80" />
                    <span className="sr-only">Loading image</span>
                  </div>
                ) : null}
                <Image
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(min-width: 768px) 80vw, 100vw"
                  onLoad={() => setLoaded(slide.src)}
                  className={`lightbox-image object-contain transition-opacity duration-500 ${loaded === slide.src ? "opacity-100" : "opacity-0"}`}
                />
              </div>
              <figcaption className="shrink-0 pt-5 text-center" aria-live="polite">
                <span className="block font-serif text-3xl font-medium leading-tight md:text-4xl">{slide.title}</span>
                <span className="mt-1 block text-xs uppercase tracking-[0.2em] text-white/70">{slide.meta}</span>
              </figcaption>
            </figure>

            <button type="button" onClick={() => step(1)} aria-label="Next image" className={`${arrow} max-md:hidden`}>
              <ArrowRight aria-hidden="true" className="size-5" />
            </button>
          </div>

          <div className="flex shrink-0 items-center gap-3 px-5 py-5 md:justify-center md:px-8">
            <button type="button" onClick={() => step(-1)} aria-label="Previous image" className={`${arrow} md:hidden`}>
              <ArrowLeft aria-hidden="true" className="size-5" />
            </button>
            <ul ref={stripRef} className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1 md:flex-none">
              {slides.map((item, i) => (
                <li key={item.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onChange(i)}
                    aria-label={`Show image ${i + 1}: ${item.title}`}
                    aria-current={i === index ? "true" : undefined}
                    className={`relative block aspect-video w-20 overflow-hidden rounded-lg transition duration-300 focus-visible:outline-white md:w-24 ${
                      i === index ? "opacity-100 ring-2 ring-white" : "opacity-45 hover:opacity-90"
                    }`}
                  >
                    <Image src={item.src} alt="" fill sizes="96px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => step(1)} aria-label="Next image" className={`${arrow} md:hidden`}>
              <ArrowRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
