"use client";

import { Menu, X } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/ui/logo";
import { nav } from "@/lib/site";

/** Tracks which section is currently in the middle of the viewport. */
function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

const sectionIds = nav.map((item) => item.href.slice(1));

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const active = useActiveSection(sectionIds);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // The native <dialog> gives us focus trapping, Escape-to-close and focus return for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (menuOpen && !dialog.open) dialog.showModal();
    if (!menuOpen && dialog.open) dialog.close();
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-glide ${
        scrolled ? "border-b border-line bg-paper/75 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-5 md:px-10">
        <a href="#top" aria-label="Arcaea, back to top" className="-ml-2 block shrink-0 transition-transform duration-500 ease-glide hover:scale-[1.04]">
          <Logo className="h-14" priority />
        </a>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-7 text-sm">
            {nav.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative py-2 transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-violet after:transition-transform after:duration-500 after:ease-glide hover:text-violet hover:after:scale-x-100 ${
                      isActive ? "text-violet after:scale-x-100" : "text-ink after:scale-x-0"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href="#download"
            className="hidden min-h-11 items-center rounded-full bg-btn-bg px-6 text-sm font-medium text-btn-fg transition duration-300 ease-glide hover:-translate-y-0.5 sm:inline-flex"
          >
            Download
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="grid size-11 place-items-center rounded-full border border-line bg-surface/60 backdrop-blur-md transition-colors hover:border-violet hover:text-violet xl:hidden"
          >
            <Menu aria-hidden="true" className="size-5" />
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        onClose={() => setMenuOpen(false)}
        className="mobile-menu m-0 h-dvh max-h-none w-screen max-w-none flex-col bg-paper p-0 text-ink backdrop:bg-transparent open:flex"
      >
        <div className="lattice pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative flex h-18 shrink-0 items-center justify-between px-5 md:px-10">
          <Logo className="-ml-2 h-14" />
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="grid size-11 place-items-center rounded-full border border-line bg-surface/60 transition-colors hover:border-violet hover:text-violet"
          >
            <X aria-hidden="true" className="size-5" />
          </button>
        </div>

        <nav aria-label="Mobile" className="relative flex flex-1 flex-col justify-center overflow-y-auto px-5 pb-10 md:px-10">
          <ul>
            {nav.map((item, i) => (
              <li key={item.href} style={{ "--i": i } as React.CSSProperties} className="border-b border-line">
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline justify-between py-3 font-serif text-[1.7rem] font-medium transition-colors hover:text-violet"
                >
                  {item.label}
                  <span className="font-sans text-xs tabular-nums tracking-[0.2em] text-ink-soft">0{i + 1}</span>
                </a>
              </li>
            ))}
            <li style={{ "--i": nav.length } as React.CSSProperties} className="pt-8">
              <a
                href="#download"
                onClick={() => setMenuOpen(false)}
                className="flex min-h-14 items-center justify-center rounded-full bg-btn-bg px-6 font-medium text-btn-fg"
              >
                Download the game
              </a>
            </li>
          </ul>
        </nav>
      </dialog>
    </header>
  );
}
