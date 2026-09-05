import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import TrailerPlayer from "@/components/TrailerPlayer";
import MorphCover from "@/components/MorphCover";
import { getProject, projects } from "@/lib/content";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.logline,
  };
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const meta = [
    project.status,
    project.language,
    project.runtime,
    project.year,
  ].filter(Boolean);

  return (
    <article>
      {/* Cover */}
      <MorphCover
        src={project.cover}
        alt={project.title}
        slug={project.slug}
        priority
      >
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/50" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-wide px-5 pb-12 sm:px-8 sm:pb-16">
            <Reveal>
              <Link
                href="/films"
                className="link-underline text-xs uppercase tracking-widest2 text-bone"
              >
                ← All Films
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                {meta.map((m) => (
                  <span key={m} className="eyebrow text-bone">
                    {m}
                  </span>
                ))}
              </div>
              <h1 className="mt-4 font-display text-5xl leading-[0.9] text-paper sm:text-8xl">
                {project.title}
              </h1>
              {project.translatedTitle && (
                <p className="mt-3 font-display text-xl italic text-bone sm:text-2xl">
                  {project.translatedTitle}
                </p>
              )}
            </Reveal>
          </div>
        </div>
      </MorphCover>

      <div className="mx-auto max-w-wide px-5 sm:px-8">
        {/* Logline + synopsis */}
        <section className="grid gap-12 border-b border-white/10 py-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="eyebrow mb-5">Synopsis</p>
              <p className="font-display text-2xl leading-snug text-paper sm:text-3xl">
                {project.logline}
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-7">
            <Reveal delay={0.08}>
              <div className="space-y-5 text-[15px] leading-relaxed text-ash">
                {project.synopsis.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Trailer */}
        {project.trailer && (
          <section className="border-b border-white/10 py-20">
            <Reveal>
              <p className="eyebrow mb-6">Trailer</p>
              <TrailerPlayer
                src={project.trailer}
                poster={project.poster}
                title={project.title}
              />
            </Reveal>
          </section>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="border-b border-white/10 py-20">
            <Reveal>
              <p className="eyebrow mb-6">Stills</p>
            </Reveal>
            <Gallery images={project.gallery} />
          </section>
        )}

        {/* Credits */}
        <section className="grid gap-12 py-20 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal>
              <p className="eyebrow">Credits</p>
              {project.distribution && (
                <p className="mt-5 max-w-xs text-sm leading-relaxed text-ash">
                  {project.distribution}
                </p>
              )}
            </Reveal>
          </div>
          <div className="md:col-span-8">
            <Reveal delay={0.08}>
              <dl className="divide-y divide-white/10">
                {project.credits.map((c) => (
                  <div
                    key={c.role + c.name}
                    className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <dt className="text-xs uppercase tracking-widest2 text-ash">
                      {c.role}
                    </dt>
                    <dd className="text-right text-[15px] text-paper sm:max-w-md">
                      {c.name}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </section>
      </div>

      {/* Next film */}
      <NextFilm current={project.slug} />
    </article>
  );
}

function NextFilm({ current }: { current: string }) {
  const idx = projects.findIndex((p) => p.slug === current);
  const next = projects[(idx + 1) % projects.length];
  if (next.slug === current) return null;

  return (
    <Link
      href={`/films/${next.slug}`}
      className="group relative block h-[45svh] min-h-[360px] w-full overflow-hidden border-t border-white/10"
    >
      <Image
        src={next.cover}
        alt={next.title}
        fill
        sizes="100vw"
        className="object-cover opacity-40 transition-all duration-[1000ms] ease-cinema group-hover:scale-105 group-hover:opacity-60"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="eyebrow mb-4 text-bone">Next Film</span>
        <span className="font-display text-4xl text-paper sm:text-7xl">
          {next.title}
        </span>
      </div>
    </Link>
  );
}
