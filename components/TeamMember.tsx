"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Member } from "@/lib/content";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function TeamMember({
  member,
  index = 0,
}: {
  member: Member;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-white/5">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover grayscale transition-all duration-[900ms] ease-cinema group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-6xl text-ash/40">
              {initials(member.name)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-5">
        <h3 className="font-display text-2xl text-paper sm:text-3xl">
          {member.name}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-widest2 text-ash">
          {member.role}
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-ash">
          {member.bio}
        </p>
        {(member.email || member.instagram) && (
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-ash">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="link-underline text-bone"
              >
                {member.email}
              </a>
            )}
            {member.instagram && (
              <a
                href={`https://instagram.com/${member.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="link-underline text-bone"
              >
                @{member.instagram}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
