"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { transition } from "@/lib/transition";

/**
 * template.tsx remounts on every navigation, so this plays an "enter"
 * transition per route: a black iris contracts to reveal the new page,
 * then the content eases in. Reliable in the App Router (no exit needed).
 *
 * When arriving via a poster morph (Films → detail), the iris is skipped
 * so the flying poster isn't hidden behind black.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const skip = useRef(transition.skipIris);
  useEffect(() => {
    transition.skipIris = false;
  }, []);

  return (
    <>
      {!skip.current && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[75] bg-ink"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          animate={{ clipPath: "circle(0% at 50% 50%)" }}
          transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: skip.current ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: skip.current ? 0 : 0.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
