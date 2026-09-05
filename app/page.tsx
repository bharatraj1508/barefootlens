import Link from "next/link";
import Hero from "@/components/Hero";
import FilmLeader from "@/components/FilmLeader";
import Reveal from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import MaskText from "@/components/motion/MaskText";
import ShutterImage from "@/components/motion/ShutterImage";
import ProjectCard from "@/components/ProjectCard";
import { projects, about, site } from "@/lib/content";

export default function Home() {
  const featured = projects.find((p) => p.slug === "antraal") ?? projects[0];

  return (
    <>
      <FilmLeader />
      <Hero />

      {/* Featured film */}
      <section className="mx-auto max-w-wide px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow mb-3">Featured Film</p>
              <h2 className="font-display text-4xl leading-none text-paper sm:text-6xl">
                {featured.title}
              </h2>
            </div>
            <Link
              href={`/films/${featured.slug}`}
              className="link-underline hidden text-xs uppercase tracking-widest2 text-ash sm:inline-block"
            >
              Full Details
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href={`/films/${featured.slug}`}
            className="group mt-8 block overflow-hidden"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-white/5">
              <ShutterImage
                src={featured.cover}
                alt={featured.title}
                priority
                sizes="100vw"
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
                <p className="max-w-lg font-display text-xl italic text-paper sm:text-2xl">
                  {featured.tagline ?? featured.logline}
                </p>
                <span className="rounded-full border border-paper/50 px-6 py-2.5 text-[11px] uppercase tracking-widest2 text-paper transition-colors duration-500 group-hover:bg-paper group-hover:text-ink">
                  Watch Trailer
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Marquee */}
      <section className="border-y border-white/10 py-8">
        <Marquee text={site.tagline.replace(".", "")} />
      </section>

      {/* Works grid */}
      <section className="mx-auto max-w-wide px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <p className="eyebrow mb-3">Selected Works</p>
          <h2 className="max-w-2xl font-display text-3xl leading-tight text-paper sm:text-5xl">
            A slate of culture-rooted, character-driven films.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="border-t border-white/10 px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-wide gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow">About Barefoot Lens</p>
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.08}>
              <p className="font-display text-2xl leading-snug text-paper sm:text-4xl">
                {about.paragraphs[1]}
              </p>
              <div className="mt-10 grid gap-8 sm:grid-cols-3">
                {about.pillars.map((p) => (
                  <div key={p.title}>
                    <h3 className="text-sm uppercase tracking-widest2 text-paper">
                      {p.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ash">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="link-underline mt-10 inline-block text-xs uppercase tracking-widest2 text-paper"
              >
                Read the full story
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
