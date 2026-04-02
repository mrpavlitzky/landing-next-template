# landing-next-template

A minimal Next.js landing page template built with TypeScript and Tailwind CSS.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)

## Project structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Home page (assembles sections)
│   └── globals.css     # Global styles
└── components/
    ├── Navbar.tsx      # Sticky top navigation
    ├── Hero.tsx        # Hero section with headline + CTAs
    ├── Features.tsx    # Feature grid
    ├── CTA.tsx         # Call-to-action banner
    └── Footer.tsx      # Site footer
docs/
└── reference.md        # Template reference documentation
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the result.

## Customisation

1. Update brand name — search for `YourBrand` in `Navbar.tsx` and `Footer.tsx`.
2. Edit copy — update headlines and descriptions in each component.
3. Change colours — swap `indigo` classes with any Tailwind colour.
4. Add sections — create a new component in `src/components/` and import it in `page.tsx`.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/mrpavlitzky/landing-next-template)

