"use client";

import { motion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

type Props = { children: React.ReactNode; className?: string };

/** Fades a single block up into place the first time it scrolls into view. */
export function Reveal({ children, className, delay = 0 }: Props & { delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Staggers its RevealItem children when the group scrolls into view. */
export function RevealGroup({ children, className, as = "div" }: Props & { as?: "div" | "ul" | "ol" | "dl" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={group}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ children, className, as = "div" }: Props & { as?: "div" | "li" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={item}>
      {children}
    </Tag>
  );
}
