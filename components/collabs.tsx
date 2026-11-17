"use client";

import { ArrowRight } from "lucide-react";
import { useId, useState } from "react";
import { CollabDialog, CollabMark } from "@/components/collab-dialog";
import { Diamond } from "@/components/ui/diamond";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { collabs, labelCollabs, type Collab, type CollabKind } from "@/lib/collabs";

type Filter = "all" | CollabKind;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "rhythm", label: "Rhythm games" },
  { id: "other", label: "Beyond rhythm" },
];

const matching = (filter: Filter) => (filter === "all" ? collabs : collabs.filter((item) => item.kind === filter));

function CollabCard({ collab, onOpen }: { collab: Collab; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="group flex w-full items-stretch overflow-hidden rounded-3xl border border-line bg-surface text-left transition duration-500 ease-glide hover:-translate-y-1 hover:border-lilac hover:shadow-[0_30px_60px_-30px_rgb(76_44_140/0.45)]"
    >
      {/* Logo tile: the supplied logo, or the name as a wordmark until one is added */}
      <span
        className={`relative grid w-32 shrink-0 place-items-center overflow-hidden p-3 text-white sm:w-40 ${
          collab.kind === "other" ? "bg-[linear-gradient(150deg,#e9a8cd,#7d3fb8)]" : "bg-[linear-gradient(150deg,#b9a4f2,#4a2f9e)]"
        }`}
      >
        <span className="lattice absolute inset-0 opacity-70" aria-hidden="true" />
        <span className="relative grid h-20 w-full place-items-center transition-transform duration-700 ease-glide group-hover:scale-105">
          <CollabMark collab={collab} className="text-xl sm:text-2xl" />
        </span>
      </span>
      <span className="flex min-w-0 flex-1 flex-col justify-center gap-1 p-5">
        <span className="text-xs uppercase tracking-[0.18em] text-ink-soft">{collab.genre}</span>
        <span className="font-serif text-2xl font-medium leading-tight transition-colors duration-300 group-hover:text-violet md:text-3xl">
          <span className="sr-only">Arcaea with </span>
          <span aria-hidden="true" className="mr-2 text-lilac">
            ×
          </span>
          {collab.name}
        </span>
        <span className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-violet">
          View details
          <ArrowRight aria-hidden="true" className="size-3.5 transition-transform duration-300 ease-glide group-hover:translate-x-1" />
        </span>
      </span>
    </button>
  );
}

export function Collabs() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<number | null>(null);
  const groupId = useId();
  const shown = matching(filter);
  const firstYear = collabs[0].year;
  const lastYear = collabs[collabs.length - 1].year;

  const step = (delta: 1 | -1) => setActive((current) => (current === null ? null : (current + delta + shown.length) % shown.length));

  return (
    <section id="collabs" aria-labelledby="collabs-title" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="collabs-title"
            index="05"
            label="Collaborations"
            ja="コラボレーション"
            title={
              <>
                When other worlds <em className="text-violet">drift in</em>.
              </>
            }
            lead={`From ${firstYear} to ${lastYear}, Arcaea has traded songs and characters with ${collabs.length} other games, from arcade cabinets to an RPG. Select one for the details.`}
          />

          <Reveal delay={0.1}>
            <div role="group" aria-labelledby={`${groupId}-label`} className="flex flex-wrap items-center gap-2">
              <span id={`${groupId}-label`} className="sr-only">
                Filter collaborations
              </span>
              {filters.map((item) => {
                const selected = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setFilter(item.id)}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors duration-300 ${
                      selected ? "border-transparent bg-btn-bg text-btn-fg" : "border-line bg-surface text-ink-soft hover:border-violet hover:text-violet"
                    }`}
                  >
                    {item.label}
                    <span className="text-xs tabular-nums opacity-70">{matching(item.id).length}</span>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>

        <p role="status" className="sr-only">
          Showing {shown.length} collaborations, oldest first
        </p>

        {/* Timeline: oldest at the top. One line down the left on phones, down the middle on wide screens. */}
        <ol className="relative mt-14 md:mt-20">
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-[0.6875rem] top-4 w-px bg-gradient-to-b from-arc-blue via-violet to-arc-pink opacity-50 lg:left-1/2"
          />
          {shown.map((collab, i) => {
            const onLeft = i % 2 === 0;
            // Every entry shows its year, strictly alternating down the line: filled, outline, filled…
            const filled = i % 2 === 0;
            const yearStyle = filled ? "text-violet" : "text-transparent [-webkit-text-stroke:1.5px_var(--violet)]";
            return (
              <li key={collab.id} className="relative grid grid-cols-[1.5rem_1fr] gap-x-5 pb-6 last:pb-0 lg:grid-cols-[1fr_3rem_1fr] lg:gap-x-8 lg:pb-8">
                {/* Node on the line, matching the year's style */}
                <span className="relative z-10 col-start-1 row-start-1 mt-9 grid size-6 place-items-center lg:col-start-2 lg:mx-auto">
                  <span className={`size-3 rotate-45 border border-violet ${filled ? "bg-violet" : "bg-paper"}`} />
                </span>

                <Reveal
                  className={`col-start-2 row-start-1 lg:row-start-1 ${onLeft ? "lg:col-start-1" : "lg:col-start-3"}`}
                >
                  {/* On phones the year sits above its card */}
                  <p className={`mb-2 font-serif text-4xl font-medium italic leading-none lg:hidden ${yearStyle}`}>{collab.year}</p>
                  <CollabCard collab={collab} onOpen={() => setActive(i)} />
                </Reveal>

                {/* On wide screens the year sits across the line from the card */}
                <p
                  className={`hidden self-center font-serif text-7xl font-medium italic leading-none lg:row-start-1 lg:block ${
                    onLeft ? "lg:col-start-3 lg:text-left" : "lg:col-start-1 lg:text-right"
                  } ${yearStyle}`}
                >
                  {collab.year}
                </p>
              </li>
            );
          })}
        </ol>

        <p className="mt-12 flex items-start gap-3 text-sm text-ink-soft">
          <Diamond className="mt-[0.45rem] size-1.5 text-violet" />
          <span>
            Song counts are for the mobile release. There have also been crossovers with the music labels {labelCollabs.slice(0, -1).join(", ")} and{" "}
            {labelCollabs[labelCollabs.length - 1]}.
          </span>
        </p>
      </div>

      <CollabDialog items={shown} index={active} onClose={() => setActive(null)} onStep={step} />
    </section>
  );
}
