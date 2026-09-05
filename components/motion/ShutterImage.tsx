"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Image that unmasks with a shutter wipe as it enters view. The image itself
 * is never clipped — a solid bar over it slides away via a transform (reliable
 * across browsers), while the image eases from a slight zoom.
 */
export default function ShutterImage({
  src,
  alt,
  sizes,
  priority,
  className = "",
  direction = "up",
  delay = 0,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}) {
  const horizontal = direction === "left" || direction === "right";
  const origin =
    direction === "up"
      ? "top"
      : direction === "down"
        ? "bottom"
        : direction === "left"
          ? "left"
          : "right";

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute inset-0 z-10 bg-ink"
        style={{ transformOrigin: origin }}
        initial={horizontal ? { scaleX: 1 } : { scaleY: 1 }}
        whileInView={horizontal ? { scaleX: 0 } : { scaleY: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
