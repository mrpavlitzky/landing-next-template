export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 px-6 py-28 text-center">
      <span className="rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500">
        Minimal template
      </span>
      <h1 className="max-w-3xl text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl">
        Build your next product{" "}
        <span className="text-indigo-600">faster than ever</span>
      </h1>
      <p className="max-w-xl text-lg leading-relaxed text-gray-500">
        A clean, minimal Next.js landing page template with TypeScript and
        Tailwind CSS — ready to customise and ship.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#cta"
          className="rounded-full bg-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500"
        >
          Get started for free
        </a>
        <a
          href="#features"
          className="rounded-full border border-gray-300 px-7 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
        >
          Learn more
        </a>
      </div>
    </section>
  );
}
