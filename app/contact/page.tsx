import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with Barefoot Lens — ${site.email}`,
};

export default function ContactPage() {
  return (
    <div className="flex min-h-[100svh] flex-col">
      <div className="mx-auto flex w-full max-w-wide flex-1 flex-col justify-center px-5 pt-32 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-6">Contact</p>
          <h1 className="max-w-4xl font-display text-4xl leading-[1.02] text-paper sm:text-6xl lg:text-7xl">
            Have a story to tell, or want to collaborate? We’d love to hear from
            you.
          </h1>
        </Reveal>

        <div className="mt-16 grid gap-12 border-t border-white/10 pt-12 md:grid-cols-3">
          <Reveal delay={0.05}>
            <p className="eyebrow mb-3">Email</p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline font-display text-xl text-paper sm:text-2xl"
            >
              {site.email}
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="eyebrow mb-3">Based in</p>
            <p className="font-display text-xl text-paper sm:text-2xl">
              {site.location}
            </p>
            <p className="mt-2 text-sm text-ash">
              Working across India & the United States.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="eyebrow mb-3">Enquiries</p>
            <p className="text-sm leading-relaxed text-ash">
              Distribution, festivals, casting and creative collaboration —
              reach out and a member of the team will get back to you.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-24 border-t border-white/10 py-8">
        <Marquee text={site.tagline.replace(".", "")} />
      </div>
    </div>
  );
}
