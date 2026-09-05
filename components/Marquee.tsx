"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  wrap,
} from "framer-motion";

export default function Marquee({
  text,
  className = "",
  baseVelocity = 5,
}: {
  text: string;
  className?: string;
  /** base scroll speed in % of a sequence per second */
  baseVelocity?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300,
  });

  // page scroll speed → multiplier on the marquee speed
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // lean the whole line when scrolling fast
  const skew = useTransform(smoothVelocity, [-2000, 0, 2000], [-6, 0, 6], {
    clamp: true,
  });

  // two identical sequences → wrapping across exactly one sequence is seamless
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // scroll direction flips the marquee direction
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const sequence = Array.from({ length: 4 });

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        style={{ x, skewX: skew }}
      >
        {sequence.concat(sequence).map((_, i) => (
          <span
            key={i}
            className="flex items-center font-display text-[13vw] uppercase leading-none text-paper/90 md:text-[9vw]"
          >
            {text}
            <span className="mx-8 inline-block h-[0.12em] w-[0.5em] translate-y-[-0.25em] rounded-full bg-paper/40 md:mx-12" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
