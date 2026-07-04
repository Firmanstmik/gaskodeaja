"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { ease } from "@/lib/design-tokens";

type CountUpProps = {
  /** A formatted stat string like "4+", "10+", or "4.9" — the leading number animates, the rest is kept as a static suffix. */
  value: string;
  className?: string;
};

/**
 * Animates the leading number of a formatted stat string from 0 up to its
 * target once it scrolls into view — the "counting up" micro-interaction
 * used on stat bands across the site.
 */
export function CountUp({ value, className = "" }: CountUpProps) {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const isDecimal = match ? match[1].includes(".") : false;

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => (isDecimal ? v.toFixed(1) : Math.round(v).toString()));
  const [display, setDisplay] = useState(isDecimal ? "0.0" : "0");

  useMotionValueEvent(rounded, "change", (latest) => setDisplay(latest));

  useEffect(() => {
    if (!match) return;
    if (isInView) {
      const controls = animate(count, target, { duration: 1.6, ease });
      return controls.stop;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, target]);

  if (!match) return <span className={className}>{value}</span>;

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
