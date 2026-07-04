"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees; kept small so it reads as premium, not gimmicky. */
  range?: number;
};

/**
 * Cursor-aware tilt wrapper for flagship imagery/cards — a restrained 3D
 * lean toward the pointer, springed back to flat on leave. Use selectively
 * (hero showcase, featured case studies), not on every card.
 */
export function TiltCard({ children, className = "", range = 8 }: TiltCardProps) {
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [0, 1], [range, -range]);
  const rotateY = useTransform(springX, [0, 1], [-range, range]);

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handlePointerLeave() {
    x.set(0.5);
    y.set(0.5);
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
