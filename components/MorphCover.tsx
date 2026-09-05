"use client";

import Image from "next/image";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { transition, type MorphState } from "@/lib/transition";

type Rect = { top: number; left: number; width: number; height: number };

/**
 * Detail-page cover that lands the poster-morph. If we arrived from a poster
 * click, a fixed clone flies from the poster's rect into this cover, then
 * cross-fades to reveal the real cover underneath.
 */
export default function MorphCover({
  src,
  alt,
  slug,
  priority,
  className = "",
  children,
}: {
  src: string;
  alt: string;
  slug: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [morph, setMorph] = useState<MorphState>(null);

  useEffect(() => {
    if (transition.morph && transition.morph.slug === slug) {
      setMorph(transition.morph);
      transition.morph = null;
    }
  }, [slug]);

  return (
    <div
      ref={ref}
      className={`relative h-[70svh] min-h-[520px] w-full overflow-hidden ${className}`}
    >
      <Image src={src} alt={alt} fill priority={priority} sizes="100vw" className="object-cover" />
      {children}
      {morph && (
        <FlyingPoster
          morph={morph}
          targetRef={ref}
          onDone={() => setMorph(null)}
        />
      )}
    </div>
  );
}

function FlyingPoster({
  morph,
  targetRef,
  onDone,
}: {
  morph: NonNullable<MorphState>;
  targetRef: React.RefObject<HTMLDivElement>;
  onDone: () => void;
}) {
  const [target, setTarget] = useState<Rect | null>(null);

  useLayoutEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTarget({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [targetRef]);

  if (!target) return null;

  return (
    <motion.img
      src={morph.src}
      alt=""
      aria-hidden
      className="fixed z-[80] object-cover"
      initial={{
        top: morph.rect.top,
        left: morph.rect.left,
        width: morph.rect.width,
        height: morph.rect.height,
        opacity: 1,
      }}
      animate={{
        top: target.top,
        left: target.left,
        width: target.width,
        height: target.height,
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        opacity: { duration: 0.9, times: [0, 0.78, 1] },
      }}
      onAnimationComplete={onDone}
      style={{ objectFit: "cover" }}
    />
  );
}
