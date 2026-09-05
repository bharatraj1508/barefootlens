"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

type Mode = "default" | "play" | "link";

export default function LensCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    // Only on devices with a fine pointer (desktop) and no reduced-motion pref
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-lens-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = (e.target as HTMLElement)?.closest(
        "[data-cursor], a, button"
      ) as HTMLElement | null;
      const c = el?.getAttribute("data-cursor");
      if (c === "play") setMode("play");
      else if (el) setMode("link");
      else setMode("default");
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.documentElement.classList.remove("has-lens-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = mode === "play" ? 84 : mode === "link" ? 56 : 26;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[80] flex items-center justify-center"
      style={{ x: sx, y: sy }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="flex items-center justify-center rounded-full border border-paper/80 backdrop-blur-[1px]"
        animate={{
          width: size,
          height: size,
          x: -size / 2,
          y: -size / 2,
          backgroundColor:
            mode === "play" ? "rgba(10,10,10,0.35)" : "rgba(244,241,234,0)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 28 }}
      >
        <AnimatePresence mode="wait">
          {mode === "play" ? (
            <motion.span
              key="play"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-[9px] uppercase tracking-widest2 text-paper"
            >
              Play
            </motion.span>
          ) : (
            <motion.span
              key="dot"
              initial={{ opacity: 0 }}
              animate={{ opacity: mode === "link" ? 0 : 1 }}
              exit={{ opacity: 0 }}
              className="h-1 w-1 rounded-full bg-paper"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
