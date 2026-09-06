"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/content";

const START_AT = 10; // seconds — skip the intro, start from the 0:10 mark

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Seek to START_AT whenever the video is at (or near) the beginning.
  const seekToStart = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.currentTime < START_AT - 0.25) {
      try {
        v.currentTime = START_AT;
      } catch {
        /* not seekable yet — a later event (canplay) will retry */
      }
    }
  };

  return (
    <section className="relative flex h-[100svh] min-h-[100svh] w-full items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        playsInline
        poster="/projects/antraal/gallery/still-4.png"
        onLoadedMetadata={seekToStart}
        onLoadedData={seekToStart}
        onCanPlay={seekToStart}
        onEnded={() => {
          seekToStart();
          videoRef.current?.play();
        }}
      >
        {/* #t=10 media fragment tells the browser to begin playback at 0:10 */}
        <source
          src="/projects/antraal/video/antraal-trailer.mp4#t=10"
          type="video/mp4"
        />
      </video>

      {/* Light tint for text legibility — keeps the video visible edge to edge */}
      <div className="absolute inset-0 bg-black/20" />
      {/* Subtle fade only at the very top (nav) and bottom (scroll icon) */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/45" />

      <div className="relative z-10 mx-auto max-w-wide px-5 text-center sm:px-8">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Independent Film · {site.location}
        </motion.p>

        <motion.h1
          className="font-display text-[15vw] font-light leading-[0.9] tracking-tight text-paper sm:text-[11vw] lg:text-[9vw]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          Stories
          <br />
          <span className="italic text-bone">without borders.</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-bone/80 sm:text-base"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {site.intro}
        </motion.p>

        <motion.div
          className="mt-10 flex items-center justify-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href="/films"
            className="rounded-full border border-paper/70 px-7 py-3 text-xs uppercase tracking-widest2 text-paper transition-colors duration-500 hover:bg-paper hover:text-ink"
          >
            View Films
          </Link>
          <Link
            href="/about"
            className="link-underline text-xs uppercase tracking-widest2 text-bone"
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-[6vh] left-1/2 z-30 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="eyebrow text-bone/60">Scroll</span>
      </motion.div>
    </section>
  );
}
