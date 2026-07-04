import type { ReactNode } from "react";

type CornerFrameProps = {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/**
 * Wraps an image/flagship card with four gallery-bracket corner marks — the
 * recurring "instant camera frame" motif used across hero showcases,
 * featured case studies, and flagship cards.
 */
export function CornerFrame({ children, tone = "light", className = "" }: CornerFrameProps) {
  const colorCls = tone === "dark" ? "text-[#f3c9a4]/70" : "text-[#a47148]/70";
  return (
    <div className={`corner-frame ${className}`}>
      {children}
      <span aria-hidden data-pos="tl" className={`corner-frame-mark ${colorCls}`} />
      <span aria-hidden data-pos="tr" className={`corner-frame-mark ${colorCls}`} />
      <span aria-hidden data-pos="bl" className={`corner-frame-mark ${colorCls}`} />
      <span aria-hidden data-pos="br" className={`corner-frame-mark ${colorCls}`} />
    </div>
  );
}
