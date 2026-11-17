"use client";

import { ArrowLeft, ArrowRight, Search, X } from "lucide-react";
import { useId, useMemo, useState } from "react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { songs } from "@/lib/content";

const PAGE_SIZE = 10;

export function Songs() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const inputId = useId();
  const listId = useId();

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return songs;
    return songs.filter((song) => `${song.title} ${song.artist}`.toLowerCase().includes(q));
  }, [query]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const current = Math.min(page, pageCount - 1);
  const visible = results.slice(current * PAGE_SIZE, current * PAGE_SIZE + PAGE_SIZE);

  const search = (value: string) => {
    setQuery(value);
    setPage(0);
  };

  const first = current * PAGE_SIZE + 1;
  const last = first + visible.length - 1;
  const status =
    results.length === 0
      ? "0 matches"
      : `Showing ${first}–${last} of ${results.length} ${query.trim() ? (results.length === 1 ? "match" : "matches") : "songs"}`;

  const pager =
    "grid size-11 place-items-center rounded-full border border-line bg-surface transition-colors duration-300 hover:border-violet hover:text-violet disabled:pointer-events-none disabled:opacity-35";

  return (
    <section id="music" aria-labelledby="music-title" className="relative py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="music-title"
              index="02"
              label="Music"
              ja="楽曲"
              title={
                <>
                  A setlist as wide as the <em className="text-violet">sky</em>.
                </>
              }
              lead={`Soaring artcore, pounding hardcore, gentle piano, things nobody has named yet. Here are ${songs.length} favourites out of more than 400 tracks, ten at a time.`}
            />

            <Reveal delay={0.1} className="mt-9 max-w-sm">
              <label htmlFor={inputId} className="text-xs font-medium uppercase tracking-[0.22em] text-ink-soft">
                Search these {songs.length}
              </label>
              <div className="relative mt-3">
                <Search aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 size-4 -translate-y-1/2 text-ink-soft" />
                <input
                  id={inputId}
                  type="search"
                  value={query}
                  onChange={(event) => search(event.target.value)}
                  placeholder="Song or artist"
                  autoComplete="off"
                  aria-controls={listId}
                  className="h-13 w-full rounded-full border border-line bg-surface px-12 text-[0.95rem] text-ink transition-colors placeholder:text-ink-soft hover:border-lilac focus:border-violet [&::-webkit-search-cancel-button]:hidden"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => search("")}
                    aria-label="Clear search"
                    className="absolute right-1.5 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-ink-soft transition-colors hover:text-violet"
                  >
                    <X aria-hidden="true" className="size-4" />
                  </button>
                ) : null}
              </div>
              <p role="status" className="mt-3 text-sm text-ink-soft">
                {status}
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="lg:col-span-7">
          {results.length > 0 ? (
            <>
              {/* Re-keyed per page and search, so each set of ten fades in as one. */}
              <ol key={`${current}-${query}`} id={listId} start={first} className="page-in border-t border-line">
                  {visible.map((song) => (
                    <li
                      key={song.title}
                      className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 border-b border-line py-5 transition-colors duration-300 hover:bg-wash/60 sm:grid-cols-[3rem_1fr_auto] sm:gap-x-6 sm:px-4 md:py-6"
                    >
                      <span className="text-xs tabular-nums tracking-[0.18em] text-ink-soft">
                        {String(songs.indexOf(song) + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="truncate font-serif text-2xl font-medium leading-tight transition-colors duration-300 group-hover:text-violet md:text-[1.9rem]">
                          {song.title}
                        </h3>
                        <p className="truncate text-sm text-ink-soft">{song.artist}</p>
                      </div>
                      <p className="text-right leading-none">
                        <span className="font-serif text-2xl font-medium tabular-nums md:text-[1.7rem]">{song.bpm}</span>
                        <span className="ml-1.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ink-soft">BPM</span>
                      </p>
                    </li>
                  ))}
              </ol>

              {pageCount > 1 ? (
                <nav aria-label="Song list pages" className="mt-7 flex items-center justify-between gap-4">
                  <button type="button" onClick={() => setPage(current - 1)} disabled={current === 0} aria-label="Previous ten songs" className={pager}>
                    <ArrowLeft aria-hidden="true" className="size-4" />
                  </button>
                  <p className="text-sm tabular-nums text-ink-soft sm:hidden">
                    Page {current + 1} of {pageCount}
                  </p>
                  <ul className="hidden items-center gap-1 sm:flex">
                    {Array.from({ length: pageCount }, (_, i) => (
                      <li key={i}>
                        <button
                          type="button"
                          onClick={() => setPage(i)}
                          aria-label={`Songs ${i * PAGE_SIZE + 1} to ${Math.min((i + 1) * PAGE_SIZE, results.length)}`}
                          aria-current={i === current ? "page" : undefined}
                          className={`grid size-10 place-items-center rounded-full text-sm font-medium tabular-nums transition-colors duration-300 ${
                            i === current ? "bg-btn-bg text-btn-fg" : "text-ink-soft hover:bg-wash hover:text-violet"
                          }`}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setPage(current + 1)}
                    disabled={current === pageCount - 1}
                    aria-label="Next ten songs"
                    className={pager}
                  >
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                </nav>
              ) : null}
            </>
          ) : (
            <div className="rounded-3xl border border-dashed border-line px-6 py-16 text-center">
              <p className="font-serif text-3xl font-medium">Nothing here by that name.</p>
              <p className="mx-auto mt-2 max-w-sm text-ink-soft">
                This list is only a small part of the library, so the song you want may well be waiting in the game.
              </p>
              <button
                type="button"
                onClick={() => search("")}
                className="mt-6 inline-flex min-h-11 items-center rounded-full border border-line px-6 text-sm font-medium transition-colors hover:border-violet hover:text-violet"
              >
                Clear search
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
