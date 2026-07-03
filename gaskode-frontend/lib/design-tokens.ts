/**
 * Shared design tokens for the premium GaskodeAja presentation layer.
 * Single source of truth for motion timing and layout rhythm so every
 * section — home, about, service, blog, contact, portfolio — reads as
 * one system instead of hand-tuned one-offs.
 */

/** Soft ease-out with no overshoot — used for every reveal/hover transition. */
export const ease = [0.22, 1, 0.36, 1] as const;

export const springSnappy = { type: "spring" as const, stiffness: 420, damping: 34 };

/** Fluid display-heading scale (Fraunces), reused by every section H2. */
export const sectionH2 =
  "font-display text-balance font-light leading-[1.05] tracking-[-0.02em] text-[2.35rem] sm:text-5xl md:text-6xl";

/** Slightly larger scale reserved for hero H1s. */
export const heroH1 =
  "font-display text-balance font-light leading-[1.02] tracking-[-0.02em] text-[2.7rem] sm:text-6xl lg:text-[5.6rem] lg:leading-[0.98]";

export const sectionLead = "text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8";

/** Horizontal container padding, consistent across every page. */
export const pageX = "px-5 sm:px-6";

/** Vertical section rhythm — pass `tight` for sections that continue the same background tone. */
export const sectionY = {
  normal: "py-16 sm:py-24 lg:py-28",
  tight: "py-10 sm:py-16 lg:py-20",
} as const;

/** Shared pill/card radius scale. */
export const radius = {
  pill: "rounded-full",
  card: "rounded-[1.5rem] sm:rounded-[1.75rem]",
  cardLg: "rounded-[1.9rem] sm:rounded-[2.4rem]",
};

/** Motion variants shared across every scroll-reveal on the site. */
export const revealSection = {
  hidden: { opacity: 0, y: 34 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export const revealStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export const revealItem = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
