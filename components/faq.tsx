"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { useId, useState } from "react";
import { GeometricSequence } from "@/components/geometric-sequence";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/lib/content";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="faq-title"
              index="07"
              label="FAQ"
              ja="よくある質問"
              fitTitle
              title={
                <>
                  Before you <em className="text-violet">dive in</em>.
                </>
              }
              lead="Short answers to the things new players ask most."
            >
              {/* Inside the fitted heading, so it is exactly as wide as "Before you dive in." */}
              <GeometricSequence className="mt-8 aspect-square w-full" />
            </SectionHeading>
          </div>
        </div>

        <Reveal className="lg:col-span-7">
          <ul className="border-t border-line">
            {faqs.map((faq, i) => {
              const open = openIndex === i;
              const buttonId = `${baseId}-q-${i}`;
              const panelId = `${baseId}-a-${i}`;
              return (
                <li key={faq.q} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
                    >
                      <span
                        className={`font-serif text-2xl font-medium leading-snug transition-colors duration-300 group-hover:text-violet md:text-[1.75rem] ${
                          open ? "text-violet" : ""
                        }`}
                      >
                        {faq.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`grid size-10 shrink-0 place-items-center rounded-full border transition duration-500 ease-glide group-hover:border-violet group-hover:text-violet ${
                          open ? "rotate-[135deg] border-violet bg-violet text-paper group-hover:text-paper" : "border-line"
                        }`}
                      >
                        <Plus className="size-4" />
                      </span>
                    </button>
                  </h3>
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    inert={!open}
                    initial={false}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-xl pb-8 pr-12 text-ink-soft">{faq.a}</p>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
