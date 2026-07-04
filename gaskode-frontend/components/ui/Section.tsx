import type { ElementType, ReactNode } from "react";
import { sectionY } from "@/lib/design-tokens";

export type SectionTone = "cream" | "stone" | "ink";

type SectionProps = {
  children: ReactNode;
  tone: SectionTone;
  /** Tone of the section directly above — renders a blend overlay when it differs. */
  prevTone?: SectionTone;
  /** Vertical rhythm: `tight` for same-tone continuations, `cinematic` for hero/closing moments. */
  rhythm?: keyof typeof sectionY;
  as?: ElementType;
  id?: string;
  className?: string;
};

const toneBg: Record<SectionTone, string> = {
  cream: "bg-background",
  stone: "bg-stone",
  ink: "bg-ink",
};

/**
 * Tone-aware section wrapper — the mechanism that replaces hard
 * background-color cuts between sections with a seamless blended scroll.
 * Every page section should render through this instead of a bare
 * `<section className="bg-...">`.
 */
export function Section({
  children,
  tone,
  prevTone,
  rhythm = "normal",
  as: Tag = "section",
  id,
  className = "",
}: SectionProps) {
  const blendClass = prevTone && prevTone !== tone ? `tone-blend-${prevTone}-${tone}` : null;

  return (
    <Tag id={id} className={`relative ${toneBg[tone]} ${sectionY[rhythm]} ${className}`}>
      {blendClass && (
        <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-40 ${blendClass}`} />
      )}
      {children}
    </Tag>
  );
}
