const features = [
  {
    icon: "⚡",
    title: "Blazing Fast",
    description:
      "Built on Next.js App Router with React Server Components for optimal performance out of the box.",
  },
  {
    icon: "🎨",
    title: "Easily Styled",
    description:
      "Tailwind CSS utility classes make it simple to customise colours, spacing, and typography.",
  },
  {
    icon: "🔒",
    title: "Type Safe",
    description:
      "TypeScript is configured throughout so you catch errors at compile time, not in production.",
  },
  {
    icon: "📦",
    title: "Zero Config",
    description:
      "Clone, install dependencies, and start building — no extra configuration required.",
  },
  {
    icon: "🌐",
    title: "SEO Ready",
    description:
      "Metadata API and semantic HTML ensure your pages are discoverable by search engines.",
  },
  {
    icon: "🚀",
    title: "Deploy Anywhere",
    description:
      "Ship to Vercel, Netlify, or any Node.js host with a single command.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-gray-50 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need
          </h2>
          <p className="mt-4 text-base text-gray-500">
            A solid foundation so you can focus on what makes your product
            unique.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon, title, description }) => (
            <div
              key={title}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-3xl">{icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
