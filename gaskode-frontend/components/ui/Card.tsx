"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useSpotlight } from "@/components/ui/Spotlight";

type CardProps = {
  children: ReactNode;
  href?: string;
  /** Renders a faint numbered badge in the top-right corner, e.g. "01". */
  index?: number;
  tone?: "light" | "dark";
  /** Adds the four gallery-bracket corner marks for flagship cards. */
  frame?: boolean;
  className?: string;
};

/**
 * Premium bordered card: subtle conic sheen, lift-on-hover, and a shadow
 * that shifts toward the brand color as it rises — the base unit reused by
 * services, benefits, pricing, articles, and testimonial grids.
 */
export function Card({ children, href, index, tone = "light", frame = false, className = "" }: CardProps) {
  const onPointerMove = useSpotlight();
  const toneCls =
    tone === "dark"
      ? "border-white/15 bg-white/[0.04] hover:border-white/25 hover:shadow-[0_32px_65px_-24px_rgba(0,0,0,0.55)]"
      : "border-[#a47148]/15 bg-white hover:border-[#a47148]/35 hover:shadow-[0_32px_65px_-24px_rgba(43,28,17,0.4)]";
  const spotlightCls = tone === "dark" ? "spotlight-dark" : "spotlight";

  const base = `card-sheen corner-frame ${spotlightCls} tap group relative overflow-hidden rounded-[1.5rem] border p-6 transition-all duration-500 hover:-translate-y-2 sm:rounded-[1.75rem] sm:p-8 ${toneCls} ${className}`;

  const badge = typeof index === "number" && (
    <span
      className={`absolute right-5 top-5 font-display text-4xl font-light transition-colors duration-300 sm:right-6 sm:top-6 ${
        tone === "dark" ? "text-white/10 group-hover:text-white/20" : "text-[#a47148]/15 group-hover:text-[#a47148]/30"
      }`}
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  );

  const frameMarks = frame && (
    <>
      <span
        aria-hidden
        data-pos="tl"
        className={`corner-frame-mark opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${tone === "dark" ? "text-[#f3c9a4]/70" : "text-[#a47148]/70"}`}
      />
      <span
        aria-hidden
        data-pos="br"
        className={`corner-frame-mark opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${tone === "dark" ? "text-[#f3c9a4]/70" : "text-[#a47148]/70"}`}
      />
    </>
  );

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} className={base} onPointerMove={onPointerMove}>
          {badge}
          {frameMarks}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={base} onPointerMove={onPointerMove}>
        {badge}
        {frameMarks}
        {children}
      </Link>
    );
  }

  return (
    <div className={base} onPointerMove={onPointerMove}>
      {badge}
      {frameMarks}
      {children}
    </div>
  );
}
