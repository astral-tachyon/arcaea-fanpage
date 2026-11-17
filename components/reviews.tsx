import { Star } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ratings, ratingsCheckedOn, reviews } from "@/lib/content";

function Stars({ rating }: { rating: number }) {
  return (
    <span role="img" aria-label={`Rated ${rating} out of 5`} className="flex gap-0.5 text-violet">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} aria-hidden="true" className={`size-4 ${n <= Math.round(rating) ? "fill-current" : "opacity-30"}`} />
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="reviews-title"
            index="06"
            label="Reviews"
            ja="レビュー"
            title={
              <>
                Players tend to <em className="text-violet">stay</em>.
              </>
            }
          />

          <Reveal delay={0.1}>
            <dl className="flex flex-wrap gap-x-12 gap-y-6">
              {ratings.map((item) => (
                <div key={item.source}>
                  <dt className="text-xs uppercase tracking-[0.22em] text-ink-soft">{item.source}</dt>
                  <dd className="mt-1 flex items-end gap-3">
                    <span className="font-serif text-6xl font-medium leading-none tabular-nums">{item.score.toFixed(1)}</span>
                    <span className="pb-1">
                      <Stars rating={item.score} />
                      <span className="mt-1 block text-xs text-ink-soft">{item.detail}</span>
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <RevealGroup className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <RevealItem key={review.quote}>
              <figure className="group flex h-full flex-col justify-between rounded-[1.75rem] border border-line bg-surface p-8 transition duration-500 ease-glide hover:-translate-y-1.5 hover:border-lilac hover:shadow-[0_30px_60px_-30px_rgb(76_44_140/0.45)] md:p-9">
                <blockquote>
                  <span aria-hidden="true" className="block font-serif text-7xl leading-[0.6] text-lilac transition-colors duration-500 group-hover:text-violet">
                    “
                  </span>
                  <p className="mt-4 font-serif text-2xl font-medium italic leading-snug md:text-[1.65rem]">{review.quote}</p>
                </blockquote>
                <figcaption className="mt-9 flex items-center justify-between gap-4 border-t border-line pt-5">
                  <Stars rating={review.rating} />
                  <span className="text-xs uppercase tracking-[0.22em] text-ink-soft">{review.source}</span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-10 text-sm text-ink-soft">
          Short excerpts from public player reviews, with names removed. Store ratings checked {ratingsCheckedOn}.
        </p>
      </div>
    </section>
  );
}
