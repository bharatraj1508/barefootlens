import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow mb-6">404</p>
      <h1 className="font-display text-5xl text-paper sm:text-7xl">
        Off the map.
      </h1>
      <p className="mt-4 max-w-sm text-sm text-ash">
        This page wandered without borders and never came back.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-paper/70 px-7 py-3 text-xs uppercase tracking-widest2 text-paper transition-colors duration-500 hover:bg-paper hover:text-ink"
      >
        Back Home
      </Link>
    </div>
  );
}
