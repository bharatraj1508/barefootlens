import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import MaskText from "@/components/motion/MaskText";
import TeamMember from "@/components/TeamMember";
import { team } from "@/lib/content";

export const metadata: Metadata = {
  title: "Team",
  description: "The filmmakers and creative practitioners behind Barefoot Lens.",
};

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-wide px-5 pb-24 pt-32 sm:px-8 sm:pb-32 sm:pt-40">
      <Reveal>
        <p className="eyebrow mb-4">Team</p>
      </Reveal>
      <MaskText
        as="h1"
        lines={["Diverse creative", "voices, one crew."]}
        className="max-w-3xl font-display text-5xl leading-[0.95] text-paper sm:text-7xl"
      />
      <Reveal delay={0.15}>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-ash">
          Filmmakers and creative practitioners across India and the United
          States, brought together through a collaborative filmmaking process.
        </p>
      </Reveal>

      <div className="mt-20 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
        {team.map((m, i) => (
          <TeamMember key={m.name} member={m} index={i} />
        ))}
      </div>
    </div>
  );
}
