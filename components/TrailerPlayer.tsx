"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function TrailerPlayer({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  const play = () => {
    setPlaying(true);
    requestAnimationFrame(() => ref.current?.play());
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        controls={playing}
        preload="none"
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>

      <AnimatePresence>
        {!playing && (
          <motion.button
            onClick={play}
            exit={{ opacity: 0 }}
            data-cursor="play"
            className="group absolute inset-0 flex items-center justify-center"
            aria-label={`Play ${title} trailer`}
          >
            <Image
              src={poster}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink/40 transition-colors duration-500 group-hover:bg-ink/25" />
            <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-paper/70 backdrop-blur-sm transition-transform duration-500 ease-cinema group-hover:scale-110">
              <span className="ml-1 h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-paper" />
            </span>
            <span className="absolute bottom-6 left-6 text-xs uppercase tracking-widest2 text-paper">
              Play Trailer
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
