import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import MaskText from "@/components/motion/MaskText";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Films",
  description: "Films produced and developed by Barefoot Lens.",
};

export default function FilmsPage() {
  return (
    <div className="mx-auto max-w-wide px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">
      <Reveal>
        <p className="eyebrow mb-4">Films</p>
      </Reveal>
      <MaskText
        as="h1"
        lines={["The slate."]}
        className="max-w-3xl font-display text-5xl leading-[0.95] text-paper sm:text-7xl"
      />
      <Reveal delay={0.15}>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-ash">
          Released work and films in development — stories rooted in culture,
          human experience and the complexities of everyday life.
        </p>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}
