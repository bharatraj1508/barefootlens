import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import MaskText from "@/components/motion/MaskText";
import { about, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: site.intro,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-wide px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">
      <Reveal>
        <p className="eyebrow mb-6">About</p>
      </Reveal>
      <MaskText
        as="h1"
        lines={[
          "Powerful stories can emerge",
          "from any place — and connect",
          "with people everywhere.",
        ]}
        className="max-w-4xl font-display text-4xl leading-[1.05] text-paper sm:text-6xl lg:text-7xl"
      />

      <div className="mt-20 grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal>
            <div className="relative aspect-square w-full overflow-hidden bg-white/5">
              <Image
                src={site.logo}
                alt="Barefoot Lens"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-ink/20" />
            </div>
            <p className="mt-4 text-xs uppercase tracking-widest2 text-ash">
              {site.location} · Est. Barefoot Lens
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal delay={0.08}>
            <p className="font-display text-2xl leading-snug text-paper sm:text-3xl">
              {about.lead}
            </p>
            <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-ash">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Pillars */}
      <div className="mt-24 grid gap-px overflow-hidden border border-white/10 sm:grid-cols-3">
        {about.pillars.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="h-full bg-white/[0.02] p-8 sm:p-10">
              <span className="font-display text-5xl text-ash/40">
                0{i + 1}
              </span>
              <h3 className="mt-6 text-sm uppercase tracking-widest2 text-paper">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-24 flex flex-col items-start gap-6 border-t border-white/10 pt-14 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-3xl text-paper sm:text-5xl">
          {site.tagline}
        </p>
        <Link
          href="/team"
          className="rounded-full border border-paper/70 px-7 py-3 text-xs uppercase tracking-widest2 text-paper transition-colors duration-500 hover:bg-paper hover:text-ink"
        >
          Meet the Team
        </Link>
      </div>
    </div>
  );
}
