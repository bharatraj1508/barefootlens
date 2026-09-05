import Link from "next/link";
import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-16 sm:px-8">
      <div className="mx-auto max-w-wide">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-4">Barefoot Lens</p>
            <p className="max-w-md font-display text-3xl leading-tight text-paper sm:text-4xl">
              {site.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-ash">
            <a
              href={`mailto:${site.email}`}
              className="link-underline text-paper"
            >
              {site.email}
            </a>
            <span>{site.location}</span>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-widest2 text-ash sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <div className="flex gap-6">
            <Link href="/films" className="hover:text-paper">
              Films
            </Link>
            <Link href="/about" className="hover:text-paper">
              About
            </Link>
            <Link href="/contact" className="hover:text-paper">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
