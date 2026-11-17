"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { PartnerDialog } from "@/components/partner-dialog";
import { Diamond } from "@/components/ui/diamond";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { groups, morePartners, partners, type Partner, type PartnerGroup } from "@/lib/partners";

type CardProps = { partner: Partner; onOpen: () => void };

const openBadge =
  "absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/85 text-[#1d0f3d] opacity-0 transition duration-500 ease-glide group-hover:rotate-90 group-hover:opacity-100 group-focus-visible:opacity-100";

/** The two leads get large cards: scenery behind, character in front. Their story lives in the profile. */
function LeadCard({ partner, onOpen }: CardProps) {
  const isLight = partner.tone === "light";
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className={`group relative flex min-h-[32rem] flex-1 flex-col justify-end overflow-hidden rounded-[2rem] text-left ring-1 transition-[flex-grow] duration-700 ease-glide md:min-h-[40rem] md:hover:flex-[1.3] ${
        isLight ? "text-[#1d1233] ring-[#4c2c8c]/15" : "text-white ring-white/15"
      }`}
    >
      <Image
        src={`/art/${partner.id}.webp`}
        alt=""
        fill
        sizes="(min-width: 768px) 55vw, 100vw"
        className="object-cover transition-transform duration-[1400ms] ease-glide group-hover:scale-105"
      />
      <Image
        src={`/art/partners/${partner.id}.webp`}
        alt=""
        fill
        sizes="(min-width: 768px) 45vw, 90vw"
        className="object-contain object-top px-6 pb-32 pt-8 drop-shadow-[0_20px_30px_rgb(18_10_36/0.3)] transition-transform duration-[1200ms] ease-glide group-hover:-translate-y-2 md:pb-36"
      />
      <span aria-hidden="true" className={openBadge}>
        <Plus className="size-4" />
      </span>
      {/* The veil is sized by the text block, so the copy stays readable at any card height. */}
      <span
        className={`relative block p-7 pt-24 md:p-10 md:pt-28 ${
          isLight
            ? "bg-[linear-gradient(to_top,#ffffff_0%,rgb(255_255_255/0.92)_55%,rgb(255_255_255/0)_100%)]"
            : "bg-[linear-gradient(to_top,#120a24_0%,rgb(18_10_36/0.92)_55%,rgb(18_10_36/0)_100%)]"
        }`}
      >
        <span
          className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] ${
            isLight ? "text-[#5a2fc0]" : "text-[#cdbdf7]"
          }`}
        >
          <Diamond className="size-2" />
          {isLight ? "Light" : "Conflict"}
        </span>
        <span className="mt-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <span className="font-serif text-6xl font-medium leading-none md:text-7xl">{partner.name}</span>
          <span className="pb-1.5 text-sm font-medium underline decoration-1 underline-offset-4">View profile</span>
        </span>
      </span>
    </button>
  );
}

function PartnerCard({ partner, onOpen, shape = "portrait" }: CardProps & { shape?: "portrait" | "wide" }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className={`group relative block w-full overflow-hidden rounded-3xl text-left text-white ring-1 ring-line transition duration-500 ease-glide hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-28px_rgb(43_18_89/0.7)] ${
        shape === "wide" ? "aspect-[4/3] sm:aspect-[21/9]" : "aspect-[3/4]"
      } ${partner.tone === "light" ? "bg-[#ece6f8]" : "bg-[#1a0f33]"}`}
    >
      {/* The same menu wallpaper as the profile, softened so the figure stays in front */}
      <Image
        src={partner.scenery}
        alt=""
        fill
        sizes={shape === "wide" ? "(min-width: 1024px) 860px, 100vw" : "(min-width: 1024px) 260px, (min-width: 640px) 33vw, 62vw"}
        className="object-cover transition-transform duration-[1400ms] ease-glide group-hover:scale-105"
      />
      <span aria-hidden="true" className={`absolute inset-0 ${partner.tone === "light" ? "bg-white/25" : "bg-[#120a24]/30"}`} />
      <Image
        src={`/art/partners/${partner.id}${shape === "wide" ? "" : "-thumb"}.webp`}
        alt=""
        fill
        sizes={shape === "wide" ? "(min-width: 1024px) 860px, 100vw" : "(min-width: 1024px) 260px, (min-width: 640px) 33vw, 62vw"}
        className="object-contain object-bottom px-3 pb-16 pt-4 drop-shadow-[0_14px_18px_rgb(18_10_36/0.35)] transition-transform duration-[900ms] ease-glide group-hover:scale-[1.07]"
      />
      <span aria-hidden="true" className={openBadge}>
        <Plus className="size-4" />
      </span>
      <span className="absolute inset-x-0 bottom-0 block bg-[linear-gradient(to_top,rgb(18_10_36/0.92)_35%,rgb(18_10_36/0))] p-4 pt-14">
        <span className="sr-only">View profile: </span>
        <span className="block font-serif text-xl font-medium leading-tight md:text-2xl">{partner.name}</span>
        <span className="mt-0.5 hidden text-xs text-white/80 sm:block">{partner.epithet}</span>
      </span>
    </button>
  );
}

export function Characters() {
  const [active, setActive] = useState<number | null>(null);

  const open = (partner: Partner) => setActive(partners.indexOf(partner));
  const step = (delta: 1 | -1) =>
    setActive((current) => (current === null ? null : (current + delta + partners.length) % partners.length));

  const inGroup = (id: PartnerGroup) => partners.filter((partner) => partner.group === id);
  const group = (id: PartnerGroup) => groups.find((item) => item.id === id)!;

  return (
    <section id="partners" aria-labelledby="partners-title" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          id="partners-title"
          index="03"
          label="Partners"
          ja="パートナー"
          align="center"
          title={
            <>
              Two girls. One world. <em className="text-violet">Opposite</em> skies.
            </>
          }
          lead="Every song is played alongside a partner. Pick a card to open their profile: who they are, how they look, and the scenes they appear in."
        />

        <h3 className="sr-only">{group("leads").title}</h3>
        <Reveal className="mt-12 flex flex-col gap-5 md:mt-16 md:flex-row">
          {inGroup("leads").map((partner) => (
            <LeadCard key={partner.id} partner={partner} onOpen={() => open(partner)} />
          ))}
        </Reveal>

        <Reveal className="mt-20 md:mt-28">
          <GroupHeading title="Who they become" blurb="The story changes them. Each form below is a chapter of it, so expect light spoilers." />
        </Reveal>

        {(["hikari", "tairitsu"] as const).map((id) => (
          <Reveal key={id} className="mt-8 grid gap-5 border-t border-line pt-8 lg:grid-cols-12 lg:gap-8">
            {/* Tairitsu's row is mirrored: cards first, name on the right */}
            <RowLabel title={group(id).title} blurb={group(id).blurb} side={id === "tairitsu" ? "right" : "left"} />
            {/* One row: a swipeable strip on phones, three columns from tablet up */}
            <ul
              className={`-mx-5 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0 lg:col-span-9 ${
                id === "tairitsu" ? "lg:order-first" : ""
              }`}
            >
              {inGroup(id).map((partner) => (
                <li key={partner.id} className="w-[62vw] shrink-0 snap-start sm:w-auto">
                  <PartnerCard partner={partner} onOpen={() => open(partner)} />
                </li>
              ))}
            </ul>
          </Reveal>
        ))}

        <Reveal className="mt-8 flex flex-col items-center gap-6 border-t border-line pt-8 text-center">
          <RowLabel title={group("reunion").title} blurb={group("reunion").blurb} side="center" />
          <div className="w-full max-w-4xl">
            {inGroup("reunion").map((partner) => (
              <PartnerCard key={partner.id} partner={partner} shape="wide" onOpen={() => open(partner)} />
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-20 md:mt-28">
          <GroupHeading title={group("cast").title} blurb={group("cast").blurb} />
          <ul className="mt-8 flex flex-wrap justify-center gap-4">
            {inGroup("cast").map((partner) => (
              <li key={partner.id} className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(20%-0.8rem)]">
                <PartnerCard partner={partner} onOpen={() => open(partner)} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-16 md:mt-24">
        <p className="text-center text-xs font-medium uppercase tracking-[0.28em] text-ink-soft">
          And many more to meet in the game
        </p>
        <div className="mx-auto mt-8 max-w-4xl px-5 md:px-10">
          <Image
            src="/art/scenes/cast.webp"
            alt="The cast of Arcaea gathered in a row against a white backdrop"
            width={1000}
            height={309}
            sizes="(min-width: 960px) 896px, 100vw"
            className="h-auto w-full rounded-3xl"
            style={{
              maskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
            }}
          />
        </div>
        <div
          className="marquee-wrap mt-7 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          }}
        >
          <ul className="marquee flex w-max items-center">
            {[...morePartners, ...morePartners].map((name, i) => {
              const duplicate = i >= morePartners.length;
              return (
                <li
                  key={`${name}-${i}`}
                  aria-hidden={duplicate || undefined}
                  data-duplicate={duplicate || undefined}
                  className="flex items-center gap-8 pr-8 font-serif text-4xl font-medium text-ink/80 md:gap-12 md:pr-12 md:text-6xl"
                >
                  {name}
                  <Diamond className="size-2.5 text-lilac" />
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>

      <PartnerDialog index={active} onClose={() => setActive(null)} onStep={step} />
    </section>
  );
}

function GroupHeading({ title, blurb }: { title: string; blurb: string }) {
  return (
    <div className="flex flex-col gap-2 border-t border-line pt-7 md:flex-row md:items-baseline md:justify-between md:gap-10">
      <h3 className="font-serif text-4xl font-medium leading-none md:text-5xl">{title}</h3>
      <p className="max-w-md text-ink-soft md:text-right">{blurb}</p>
    </div>
  );
}

function RowLabel({ title, blurb, side = "left" }: { title: string; blurb: string; side?: "left" | "right" | "center" }) {
  const align = { left: "", right: "lg:items-end lg:text-right", center: "items-center text-center" }[side];
  return (
    <div className={`flex flex-col lg:col-span-3 ${align}`}>
      <h4 className={`flex items-center gap-3 font-serif text-3xl font-medium leading-none md:text-4xl ${side === "right" ? "lg:flex-row-reverse" : ""}`}>
        <Diamond className="size-2 text-violet" />
        {title}
        {side === "center" ? <Diamond className="size-2 text-violet" /> : null}
      </h4>
      <p className="mt-3 max-w-xs text-sm text-ink-soft">{blurb}</p>
    </div>
  );
}
