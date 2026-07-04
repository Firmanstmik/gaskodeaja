"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { revealItem } from "@/lib/design-tokens";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "span" | "li" | "article";
  /** Extra viewport margin before the reveal fires; matches the site-wide "-80px" default. */
  margin?: string;
};

/**
 * Canonical scroll-reveal wrapper — fade + rise, once per element. The
 * single source every section should use instead of hand-rolling its own
 * local motion.div variants.
 */
export function Reveal({ children, className = "", as = "div", margin = "-80px" }: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin }}
      variants={revealItem}
    >
      {children}
    </MotionTag>
  );
}
