/**
 * Shared design tokens for the premium GaskodeAja presentation layer.
 * Single source of truth for motion timing and layout rhythm so every
 * section — home, about, service, blog, contact, portfolio — reads as
 * one system instead of hand-tuned one-offs.
 */

/** Soft ease-out with no overshoot — used for every reveal/hover transition. */
export const ease = [0.22, 1, 0.36, 1] as const;

/** Overshoot bounce — reserved for playful micro-interactions (arrow pops, magnetic release). */
export const easeOvershoot = [0.34, 1.5, 0.64, 1] as const;

export const springSnappy = { type: "spring" as const, stiffness: 420, damping: 34 };

/** Fluid display-heading scale (Fraunces), reused by every section H2. */
export const sectionH2 =
  "font-display text-balance font-light leading-[1.03] tracking-[-0.025em] text-[2.5rem] sm:text-6xl md:text-7xl";

/** Cinematic scale reserved for hero H1s — a dramatic mobile→desktop jump. */
export const heroH1 =
  "font-display text-balance font-light leading-[0.98] tracking-[-0.03em] text-[2.9rem] sm:text-7xl lg:text-[6.4rem] xl:text-[7.2rem] xl:leading-[0.95]";

export const sectionLead = "text-[15px] leading-7 text-slate-600 sm:text-base sm:leading-8";

/** Horizontal container padding, consistent across every page. */
export const pageX = "px-5 sm:px-6";

/** Vertical section rhythm — pass `tight` for sections that continue the same background tone,
 *  `cinematic` for the most dramatic full-breath moments (hero, closing statements). */
export const sectionY = {
  normal: "py-16 sm:py-24 lg:py-28",
  tight: "py-10 sm:py-16 lg:py-20",
  cinematic: "py-24 sm:py-32 lg:py-40",
} as const;

/** Shared pill/card radius scale. */
export const radius = {
  pill: "rounded-full",
  card: "rounded-[1.5rem] sm:rounded-[1.75rem]",
  cardLg: "rounded-[1.9rem] sm:rounded-[2.4rem]",
};

/**
 * Oversized, low-opacity Fraunces numeral/word used as background typography —
 * the "ghost numeral" storytelling device behind quotes, section indices, and closers.
 */
export const ghostNumeral =
  "font-display font-light leading-none tracking-[-0.03em] text-[7rem] sm:text-[9rem] lg:text-[11rem] select-none pointer-events-none";

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

/**
 * Per-line clip-mask reveal for cinematic headlines — each line unmasks
 * upward instead of simply fading in. Pair with `revealStagger` on the
 * parent and wrap each line in `overflow-hidden`.
 */
export const revealLine = {
  hidden: { clipPath: "inset(0 0 100% 0)", y: 12 },
  show: {
    clipPath: "inset(0 0 0% 0)",
    y: 0,
    transition: { duration: 0.9, ease },
  },
};
