# Tech Reference — Next.js + Tailwind + Netlify Forms

Dokument opisuje tech-stack, podejście do stylowania, SEO oraz obsługę formularzy dla szablonu strony internetowej. Służy jako sprawdzona baza startowa dla kolejnych projektów o podobnym charakterze (strona usługowa / portfolio).

---

## Tech Stack

| Warstwa | Technologia | Rola |
|---|---|---|
| Framework | **Next.js** (App Router) | Routing, SSR/SSG, optymalizacja obrazów i fontów |
| UI | **React** | Biblioteka komponentów |
| Język | **TypeScript** (strict) | Bezpieczeństwo typów w całym projekcie |
| Style | **Tailwind CSS** | Utility-first styling, bez zewnętrznych bibliotek UI |
| Ikony | **Lucide React** | Lekka biblioteka SVG icons |
| Formularze | **Netlify Forms** | Serverless backend, bez własnego API |
| Linting | **ESLint** (flat config) | Preset `next/core-web-vitals` + TypeScript |
| Deployment | **Netlify** | Hosting + obsługa formularzy |

> Brak komponentowych bibliotek UI (brak shadcn/ui, MUI itp.) — projekt opiera się wyłącznie na Tailwind i własnych komponentach.

### Uruchomienie lokalne

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # produkcyjny build
npm run lint     # ESLint
```

---

## Stylowanie

### Tailwind CSS 4

Projekt używa **Tailwind CSS 4** z nowym pluginem `@tailwindcss/postcss`. Cała konfiguracja motywu (kolory, fonty) znajduje się bezpośrednio w `globals.css` w bloku `@theme`, co eliminuje potrzebę osobnego `tailwind.config.js`.

```css
/* globals.css */
@import "tailwindcss";

@theme {
  --color-primary:        #xxxxxx;  /* kolor wiodący */
  --color-primary-light:  #xxxxxx;
  --color-primary-medium: #xxxxxx;
  --color-primary-dark:   #xxxxxx;
  --color-accent:         #xxxxxx;  /* akcent */
  --color-accent-light:   #xxxxxx;
  --color-accent-dark:    #xxxxxx;
  --color-text:           #xxxxxx;
  --color-text-light:     #xxxxxx;
}
```

### Fonty

Fonty ładowane przez `next/font/google` z `display: "swap"` i zawężonymi subsetami (`latin`, `latin-ext`). Każda rodzina przypisana do CSS-variable i stosowana przez klasy Tailwind. Typowy podział ról:

| Zmienna CSS | Rola |
|---|---|
| `--font-heading` | Nagłówki h1–h6 (serif lub display) |
| `--font-body` | Tekst ciągły, UI (sans-serif) |
| `--font-decorative` | Logo, elementy dekoracyjne (script / display) |

### Komponenty CSS

Wielokrotnie używane wzorce animacji i stylów definiowane są jako klasy w `@layer components`:

```css
@layer components {
  /* przycisk z gradientem i efektem shimmer */
  .btn-gold { … }

  /* karta z efektem unoszenia przy hover */
  .card-hover { … }

  /* element wchodzi w widok (fade-in + slide-up) */
  .reveal { opacity: 0; transform: translateY(20px); transition: … }
  .reveal.visible { opacity: 1; transform: translateY(0); }
}
```

### Animacje scroll

Komponent `ScrollReveal` (client component) używa **Intersection Observer API**, żeby dodawać klasę `.visible` do każdego elementu `.reveal` w momencie wejścia w viewport. `MutationObserver` obserwuje zmiany DOM przy nawigacji Next.js bez pełnego przeładowania strony.

---

## SEO

### Next.js Metadata API

SEO obsługiwane wyłącznie przez natywne API Next.js — obiekt `metadata` eksportowany z każdego `page.tsx` i z `layout.tsx`. Brak zewnętrznych bibliotek (brak `next-seo`).

**Globalne metadane** w `src/app/layout.tsx`:

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tytuł domyślny – Marka",
  description: "Globalny opis fallback.",
};
```

**Metadane per-strona** — każdy `page.tsx` nadpisuje tytuł i opis:

```typescript
// src/app/jakas-strona/page.tsx
export const metadata: Metadata = {
  title: "Tytuł podstrony – Marka",
  description: "Opis specyficzny dla tej podstrony.",
};
```

### Dobre praktyki zastosowane w projekcie

- Unikalny tytuł i opis na każdej stronie
- Hierarchia nagłówków (`h1` → `h2` → `h3`) zachowana semantycznie
- Atrybut `lang="pl"` na elemencie `<html>` (ustawiony w `layout.tsx`)
- Atrybut `alt` z opisem treści na każdym obrazie
- Czytelne, opisowe URL (`/o-mnie`, `/kontakt`, `/oferta/nazwa-uslugi`)
- Komponenty `next/image` z automatyczną optymalizacją rozmiaru i formatu

- Open Graph (`og:title`, `og:description`, `og:image`) — `metadata.openGraph`
- JSON-LD / Schema.org — wstrzyknięty jako `<script type="application/ld+json">`
- `sitemap.xml` — plik `src/app/sitemap.ts` (automatyczny generator Next.js)
- `robots.txt` — plik `src/app/robots.ts`

---

## Netlify Forms

### Problem

Next.js renderuje formularze dynamicznie w JavaScript. Netlify podczas budowania skanuje statyczne pliki HTML w poszukiwaniu formularzy z atrybutem `data-netlify="true"` — nie widzi formularzy wygenerowanych przez JS.

### Rozwiązanie: ukryty formularz HTML + AJAX

Podejście dwuetapowe:

**Etap 1 — wykrycie przez Netlify podczas buildu**

W katalogu `public/` umieszczony jest statyczny plik HTML z ukrytym formularzem o tej samej nazwie (`name`) co formularz React. Netlify go wykryje i zarejestruje backend.

```html
<!-- public/netlify-hidden-form.html -->
<form name="kontakt" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
  <input type="hidden" name="form-name" value="kontakt" />
  <input name="bot-field" />
  <input name="imie" />
  <input name="email" />
  <input name="telefon" />
  <select name="temat"></select>
  <textarea name="wiadomosc"></textarea>
  <input name="checkbox-name" type="checkbox" />
</form>
```

> Każde pole formularza React musi mieć odpowiednik w tym pliku (ta sama wartość `name`).

**Etap 2 — wysyłka AJAX z komponentu React**

Formularz React (Client Component) wysyła dane metodą `POST` z nagłówkiem `Content-Type: application/x-www-form-urlencoded`. Kluczowe jest dodanie ukrytego pola `form-name` z nazwą formularza oraz pola honeypot.

```typescript
"use client";

function encode(data: Record<string, string>) {
  return Object.entries(data)
    .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v))
    .join("&");
}

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  await fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({
      "form-name": "kontakt",
      "bot-field": "",      // honeypot — puste dla ludzi
      imie: formData.imie,
      email: formData.email,
      // … pozostałe pola
    }),
  });
}
```

**Pole honeypot (ochrona przed spamem)**

Pole `bot-field` jest ukryte dla użytkownika przez CSS (`display: none`), ale widoczne dla botów. Jeśli bot je wypełni, Netlify odrzuca zgłoszenie.

```tsx
{/* W JSX formularza */}
<input type="hidden" name="bot-field" />
```

### Zarządzanie stanem formularza

Prosty wzorzec z `useState` obsługujący cztery stany UX:

```typescript
type FormStatus = "idle" | "loading" | "success" | "error";
const [status, setStatus] = useState<FormStatus>("idle");
```

Podczas wysyłki: `loading` → blokada przycisku. Po odpowiedzi: `success` z potwierdzeniem lub `error` z fallback-linkiem do e-maila.

---

## Struktura katalogów

```
src/
├── app/                   # Next.js App Router (strony i layouty)
│   ├── layout.tsx         # Root layout: meta, fonty, Navbar, Footer
│   ├── page.tsx           # Strona główna
│   ├── globals.css        # Tailwind + @theme + @layer components
│   └── [podstrona]/
│       └── page.tsx       # Każda podstrona z własnym metadata
├── components/            # Reużywalne komponenty React
└── content/               # Statyczna treść i konfiguracja

public/
└── netlify-hidden-form.html   # Wymagane dla Netlify Forms
```
