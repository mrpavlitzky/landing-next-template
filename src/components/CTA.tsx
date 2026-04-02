export default function CTA() {
  return (
    <section id="cta" className="px-6 py-28">
      <div className="mx-auto max-w-2xl rounded-3xl bg-indigo-600 px-10 py-16 text-center shadow-xl">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-indigo-200">
          Fork the template, customise the content, and ship your landing page
          today.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://github.com/mrpavlitzky/landing-next-template"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-indigo-600 shadow-sm transition-colors hover:bg-indigo-50"
          >
            View on GitHub
          </a>
          <a
            href="https://vercel.com/new/clone?repository-url=https://github.com/mrpavlitzky/landing-next-template"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-indigo-400 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-indigo-500"
          >
            Deploy to Vercel
          </a>
        </div>
      </div>
    </section>
  );
}
