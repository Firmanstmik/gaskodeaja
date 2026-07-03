import type { ElementType, ReactNode } from "react";
import { SectionKicker } from "./SectionKicker";
import { heroH1, sectionH2 } from "@/lib/design-tokens";

type SectionHeadingProps = {
  children: ReactNode;
  /** Final clause rendered in the champagne→bronze italic accent. */
  accent?: ReactNode;
  kicker?: ReactNode;
  tone?: "dark" | "light";
  center?: boolean;
  as?: ElementType;
  size?: "section" | "hero";
  className?: string;
  leadClassName?: string;
};

/**
 * Fraunces display heading with an optional italic gold-gradient accent
 * phrase — the signature editorial pattern reused across every section.
 */
export function SectionHeading({
  children,
  accent,
  kicker,
  tone = "dark",
  center = false,
  as: Tag = "h2",
  size = "section",
  className = "",
}: SectionHeadingProps) {
  const scale = size === "hero" ? heroH1 : sectionH2;
  const color = tone === "light" ? "text-white" : "text-[#100d0a]";

  return (
    <div className={center ? "text-center" : ""}>
      {kicker && (
        <div className={center ? "flex justify-center" : ""}>
          <SectionKicker tone={tone} center={center}>
            {kicker}
          </SectionKicker>
        </div>
      )}
      <Tag className={`mt-5 sm:mt-6 ${scale} ${color} ${className}`}>
        {children}
        {accent && <span className="text-gold-gradient italic"> {accent}</span>}
      </Tag>
    </div>
  );
}
