"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import type { Project } from "@/lib/content";
import { transition } from "@/lib/transition";

export default function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  // Pointer-driven 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 20,
  });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const router = useRouter();
  const posterRef = useRef<HTMLDivElement>(null);

  // Launch the shared-element morph: capture the poster's rect, hand it off,
  // and navigate. The detail page flies a clone from this rect into its cover.
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    const el = posterRef.current;
    if (!el) return;
    e.preventDefault();
    const r = el.getBoundingClientRect();
    transition.morph = {
      src: project.poster,
      slug: project.slug,
      rect: { top: r.top, left: r.left, width: r.width, height: r.height },
    };
    transition.skipIris = true;
    router.push(`/films/${project.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/films/${project.slug}`}
        onClick={onClick}
        className="group block"
      >
        <motion.div
          ref={posterRef}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
          className="relative aspect-[3/4] overflow-hidden bg-white/5 [transform-style:preserve-3d]"
        >
          <Image
            src={project.poster}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover transition-transform duration-[900ms] ease-cinema group-hover:scale-[1.06]"
          />
          {/* grain intensifies on hover */}
          <div className="pointer-events-none absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-30 [background-image:url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%22120%22%20height=%22120%22%3E%3Cfilter%20id=%22n%22%3E%3CfeTurbulence%20type=%22fractalNoise%22%20baseFrequency=%220.9%22%20numOctaves=%224%22/%3E%3C/filter%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <span className="eyebrow">{project.status}</span>
          </div>
        </motion.div>
        <div className="mt-5 flex items-baseline justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl leading-tight text-paper transition-[letter-spacing] duration-500 ease-cinema group-hover:tracking-wide sm:text-3xl">
              {project.title}
            </h3>
            {project.translatedTitle && (
              <p className="mt-1 text-sm italic text-ash">
                {project.translatedTitle}
              </p>
            )}
          </div>
          <span className="shrink-0 text-ash transition-transform duration-500 ease-cinema group-hover:translate-x-1">
            →
          </span>
        </div>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ash">
          {project.logline}
        </p>
      </Link>
    </motion.div>
  );
}
