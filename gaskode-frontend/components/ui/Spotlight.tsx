"use client";

import type { PointerEvent } from "react";

/**
 * Writes pointer position into --spot-x/--spot-y CSS custom properties via a
 * direct DOM mutation (no React state, no re-render) — pair with the
 * `.spotlight`/`.spotlight-dark` CSS classes for a cursor-tracked radial glow.
 * Spread the returned handler onto any relatively-positioned, overflow-hidden
 * element that already carries the `spotlight` class.
 */
export function useSpotlight() {
  return function onPointerMove(e: PointerEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };
}
