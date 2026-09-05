"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const NUMBERS = [5, 4, 3, 2, 1];
const TICK = 360; // ms per number
const KEY = "bl_intro_seen";

export default function FilmLeader() {
  const [show, setShow] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (sessionStorage.getItem(KEY) || reduce) return;

    setShow(true);
    document.body.style.overflow = "hidden";

    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      if (i >= NUMBERS.length) {
        window.clearInterval(id);
        window.setTimeout(finish, TICK);
      } else {
        setN(i);
      }
    }, TICK);

    function finish() {
      sessionStorage.setItem(KEY, "1");
      document.body.style.overflow = "";
      setShow(false);
    }

    return () => {
      window.clearInterval(id);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-ink"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* projector flicker on the whole leader */}
          <motion.div
            className="relative flex h-[62vmin] w-[62vmin] items-center justify-center"
            animate={{ opacity: [1, 0.82, 1, 0.9, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            {/* crosshair */}
            <div className="absolute inset-0 rounded-full border border-paper/25" />
            <div className="absolute inset-[14%] rounded-full border border-paper/15" />
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-paper/15" />
            <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-paper/15" />

            {/* sweep hand */}
            <motion.div
              className="absolute left-1/2 top-0 h-1/2 w-px origin-bottom bg-paper/70"
              style={{ translateX: "-0.5px" }}
              animate={{ rotate: 360 }}
              transition={{ duration: TICK / 1000, repeat: Infinity, ease: "linear" }}
            />

            {/* countdown number */}
            <AnimatePresence mode="popLayout">
              <motion.span
                key={n}
                className="font-display text-[26vmin] leading-none text-paper"
                initial={{ opacity: 0, scale: 1.3 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                {NUMBERS[n]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <span className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-widest2 text-ash">
            Barefoot Lens
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
