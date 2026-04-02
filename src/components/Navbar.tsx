import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          YourBrand
        </Link>
        <ul className="hidden gap-8 text-sm font-medium text-gray-600 sm:flex">
          <li>
            <a href="#features" className="hover:text-gray-900 transition-colors">
              Features
            </a>
          </li>
          <li>
            <a href="#cta" className="hover:text-gray-900 transition-colors">
              Pricing
            </a>
          </li>
        </ul>
        <a
          href="#cta"
          className="rounded-full bg-gray-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-700"
        >
          Get started
        </a>
      </nav>
    </header>
  );
}
