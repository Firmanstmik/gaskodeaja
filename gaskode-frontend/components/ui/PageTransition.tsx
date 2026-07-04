"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ease } from "@/lib/design-tokens";

/**
 * Shared cinematic route transition: a brief mask/fade wipe between public
 * pages instead of an instant swap. Navbar/Footer live outside this
 * boundary in the layout — only the page content transitions.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, clipPath: "inset(4% 4% 4% 4% round 1.5rem)" }}
        animate={{ opacity: 1, clipPath: "inset(0% 0% 0% 0% round 0rem)" }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.55, ease }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
