import { Diamond } from "@/components/ui/diamond";
import { Reveal } from "@/components/ui/reveal";

type Props = {
  index: string;
  label: string;
  /** The label in Japanese, shown beside the English one. */
  ja: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  id?: string;
  /**
   * Shrinks the block to the width of the title, so anything passed as children (and the lead)
   * lines up exactly with the headline's edges.
   */
  fitTitle?: boolean;
  children?: React.ReactNode;
};

/** The small numbered line above every section title: "01 ◆ Gameplay / ゲームプレイ". */
export function SectionLabel({ index, label, ja, className = "" }: { index?: string; label: string; ja: string; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-[0.28em] text-violet ${className}`}>
      {index ? <span className="tabular-nums">{index}</span> : null}
      <Diamond className="size-2" />
      <span>{label}</span>
      <span aria-hidden="true" className="h-3 w-px bg-current opacity-40" />
      <span lang="ja" className="tracking-[0.2em]">
        {ja}
      </span>
    </p>
  );
}

export function SectionHeading({ index, label, ja, title, lead, align = "left", id, fitTitle = false, children }: Props) {
  const centered = align === "center";
  const width = fitTitle ? "w-fit max-w-full" : centered ? "mx-auto max-w-2xl text-center" : "max-w-xl";
  return (
    <Reveal className={width}>
      <SectionLabel index={index} label={label} ja={ja} className={centered ? "justify-center" : ""} />
      <h2
        id={id}
        className={`mt-5 font-serif text-[clamp(2.25rem,5.2vw,4rem)] font-medium leading-[1.02] tracking-tight ${
          fitTitle ? "" : "text-balance"
        }`}
      >
        {title}
      </h2>
      {/* With fitTitle, the lead takes the title's width instead of stretching the block. */}
      {lead ? <p className={`mt-6 text-base text-ink-soft md:text-lg ${fitTitle ? "w-0 min-w-full" : ""}`}>{lead}</p> : null}
      {children}
    </Reveal>
  );
}
