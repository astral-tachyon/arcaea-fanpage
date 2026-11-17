import { PlayField } from "@/components/play-field";
import { Diamond } from "@/components/ui/diamond";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { features } from "@/lib/content";

export function Features() {
  return (
    <section id="gameplay" aria-labelledby="gameplay-title" className="relative py-24 md:py-36">
      <div className="lattice pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          id="gameplay-title"
          index="01"
          label="Gameplay"
          ja="ゲームプレイ"
          align="center"
          title={
            <>
              Two layers of play, one unbroken <em className="text-violet">flow</em>.
            </>
          }
          lead="Your thumbs keep time on the ground while your fingers draw shapes in the air. It sounds like a lot. Ten minutes in, it feels like dancing."
        />

        <Reveal className="mx-auto mt-12 max-w-5xl md:mt-16">
          <PlayField />
          <p className="mt-4 text-center text-sm text-ink-soft">
            An illustration of how a chart looks in play, on a 30-second loop. Notes on the floor, arcs in the air.
          </p>
        </Reveal>

        <RevealGroup as="ol" className="mt-16 grid gap-x-10 md:mt-24 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <RevealItem as="li" key={feature.title} className="group relative border-t border-line py-9 md:py-10">
              {/* Accent line that sweeps in on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -top-px h-px origin-left scale-x-0 bg-gradient-to-r from-arc-blue via-violet to-arc-pink transition-transform duration-700 ease-glide group-hover:scale-x-100"
              />
              <span className="flex items-center gap-3 text-xs font-medium tabular-nums tracking-[0.2em] text-ink-soft">
                0{i + 1}
                <Diamond className="size-2 text-lilac transition duration-500 ease-glide group-hover:rotate-[225deg] group-hover:text-violet" />
              </span>
              <h3 className="mt-4 font-serif text-3xl font-medium leading-tight transition-transform duration-500 ease-glide group-hover:translate-x-1.5 md:text-[2.2rem]">
                {feature.title}
              </h3>
              <p className="mt-3 text-ink-soft">{feature.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
