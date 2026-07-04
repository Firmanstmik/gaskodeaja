"use client";

import type { ElementType, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight2 } from "iconsax-react";
import { Magnetic } from "@/components/ui/Magnetic";

type ButtonVariant = "primary" | "ghost" | "wipe";
type ButtonTone = "bronze" | "cream" | "dark" | "light";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  icon?: ReactNode;
  className?: string;
  full?: boolean;
};

/**
 * Shared premium CTA. Renders an internal Next.js Link for local hrefs and
 * a plain anchor for external ones (matches the isExternalCta pattern used
 * across the public pages).
 */
export function Button({
  href,
  children,
  variant = "primary",
  tone,
  icon,
  className = "",
  full = true,
}: ButtonProps) {
  const isExternal = /^https?:\/\//.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
  const Tag = (isExternal ? "a" : Link) as ElementType;
  const tagProps: Record<string, unknown> = isExternal
    ? { href, target: href.startsWith("http") ? "_blank" : undefined }
    : { href };

  const widthCls = full ? "w-full sm:w-auto" : "";

  if (variant === "wipe") {
    const skin =
      tone === "dark"
        ? "border border-white/25 text-white"
        : "border border-[#a47148]/30 text-[#3a2718]";
    const fillSkin =
      tone === "dark" ? "bg-white/10" : "bg-[#a47148]/[0.08]";
    return (
      <Tag
        {...tagProps}
        className={`tap group relative inline-flex min-h-[3.1rem] ${widthCls} items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 text-sm font-bold tracking-wide ${skin} ${className}`}
      >
        <span className={`cta-wipe-fill ${fillSkin}`} />
        <span className="cta-wipe-label relative z-10">
          <span>{children}</span>
        </span>
        <span className="cta-wipe-arrow relative z-10">
          {icon ?? <ArrowRight2 size={16} />}
        </span>
      </Tag>
    );
  }

  if (variant === "ghost") {
    const skin =
      tone === "dark"
        ? "border-[#a47148]/30 text-[#3a2718] hover:border-[#a47148]/60 hover:bg-[#a47148]/[0.06]"
        : "border-white/25 text-white/90 hover:border-white/50 hover:bg-white/[0.07]";
    return (
      <Tag
        {...tagProps}
        className={`tap inline-flex min-h-[3.35rem] ${widthCls} items-center justify-center gap-3 rounded-full border px-8 text-[15px] font-bold tracking-wide backdrop-blur ${skin} ${className}`}
      >
        {children}
      </Tag>
    );
  }

  // primary
  const skin =
    tone === "cream"
      ? "from-[#f7e6d0] to-[#e6c39d] text-[#100d0a] shadow-[0_20px_50px_-16px_rgba(243,201,164,0.6)]"
      : "from-[#c08a5c] via-[#a97650] to-[#8b5e3c] text-white shadow-[0_22px_50px_-14px_rgba(164,113,72,0.65)]";
  return (
    <Magnetic className={widthCls}>
      <Tag
        {...tagProps}
        className={`btn-shine tap group relative inline-flex min-h-[3.35rem] w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-b ${skin} px-8 text-[15px] font-bold tracking-wide hover:-translate-y-1 ${className}`}
      >
        <span className="relative z-10 inline-flex items-center gap-3">{children}</span>
      </Tag>
    </Magnetic>
  );
}
