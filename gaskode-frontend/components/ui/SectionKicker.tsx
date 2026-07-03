import type { ReactNode } from "react";

type SectionKickerProps = {
  children: ReactNode;
  tone?: "dark" | "light";
  center?: boolean;
  className?: string;
};

/** Small uppercase eyebrow label with a hairline tick, used above every section heading. */
export function SectionKicker({ children, tone = "dark", center = false, className = "" }: SectionKickerProps) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.3em] sm:gap-3 sm:text-[11px] sm:tracking-[0.34em] ${
        tone === "light" ? "text-[#f3c9a4]" : "text-[#a47148]"
      } ${className}`}
    >
      {!center && <span className={`h-px w-6 sm:w-8 ${tone === "light" ? "bg-[#f3c9a4]/60" : "bg-[#a47148]/50"}`} />}
      {children}
      {center && <span className={`h-px w-6 sm:w-8 ${tone === "light" ? "bg-[#f3c9a4]/60" : "bg-[#a47148]/50"}`} />}
    </span>
  );
}
