export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-gray-400 sm:flex-row">
        <p>© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
        <ul className="flex gap-6">
          <li>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors"
            >
              Next.js
            </a>
          </li>
          <li>
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors"
            >
              Tailwind CSS
            </a>
          </li>
          <li>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700 transition-colors"
            >
              Vercel
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
