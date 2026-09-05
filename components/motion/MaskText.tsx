"use client";

import { motion } from "framer-motion";
import type { ElementType } from "react";

/**
 * Credit-style reveal: each line rises from behind an overflow mask.
 * Pass lines as an array so multi-line headlines stagger line-by-line.
 */
export default function MaskText({
  lines,
  as: Tag = "h2",
  className = "",
  delay = 0,
  once = true,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const MotionTag = motion(Tag);
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-80px" }}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "110%" },
              show: { y: "0%" },
            }}
            transition={{
              duration: 0.9,
              delay: delay + i * 0.09,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
