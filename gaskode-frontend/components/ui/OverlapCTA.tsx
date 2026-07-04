"use client";

import type { ElementType } from "react";
import Link from "next/link";
import { ArrowRight2 } from "iconsax-react";

type OverlapCTAProps = {
  href: string;
  label?: string;
  tone?: "bronze" | "cream";
  className?: string;
};

/**
 * Circular arrow CTA that overlaps a card/image's bottom-right corner —
 * the shared "view more" device used by Home's Selected Works teaser and
 * Portfolio's case-study cards instead of each hand-rolling its own version.
 * Place inside a `relative` parent; this renders absolutely positioned,
 * half outside the parent's edge.
 */
export function OverlapCTA({ href, label = "Lihat detail", tone = "bronze", className = "" }: OverlapCTAProps) {
  const isExternal = /^https?:\/\//.test(href);
  const Tag = (isExternal ? "a" : Link) as ElementType;
  const skin =
    tone === "cream"
      ? "bg-gradient-to-br from-[#f7e6d0] to-[#e6c39d] text-[#100d0a]"
      : "bg-gradient-to-br from-[#c08a5c] via-[#a97650] to-[#8b5e3c] text-white";

  return (
    <Tag
      href={href}
      aria-label={label}
      className={`tap absolute bottom-0 right-6 z-10 flex h-14 w-14 translate-y-1/2 items-center justify-center rounded-full shadow-[0_18px_40px_-12px_rgba(43,28,17,0.55)] transition-transform duration-500 hover:-translate-y-[calc(50%+6px)] hover:rotate-45 sm:h-16 sm:w-16 ${skin} ${className}`}
    >
      <ArrowRight2 size={20} className="-rotate-45" />
    </Tag>
  );
}
