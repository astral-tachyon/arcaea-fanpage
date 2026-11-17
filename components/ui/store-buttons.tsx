import Image from "next/image";
import { stores } from "@/lib/site";

/** The three store badges, each cropped onto an identical black pill (see scripts/optimize-images.mjs). */
export function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {stores.map((store) => (
        <li key={store.id}>
          <a
            href={store.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group block overflow-hidden rounded-full bg-black shadow-[0_12px_28px_-14px_rgb(18_10_36/0.7)] ring-1 ring-white/25 transition duration-300 ease-glide hover:-translate-y-1 hover:shadow-[0_20px_36px_-14px_rgb(43_18_89/0.75)] hover:ring-violet"
          >
            <Image
              src={store.badge}
              alt={`${store.cta} (opens in a new tab)`}
              width={678}
              height={168}
              sizes="210px"
              className="h-[3.25rem] w-auto transition-transform duration-500 ease-glide group-hover:scale-[1.04]"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
