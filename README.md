Zero-JS by default, React islands on-demand. Astro starter with TypeScript, Tailwind CSS 4, shadcn/ui, form validation, dark mode, error handling, and testing.

## Stack

[Astro 5](https://astro.build) • [React 19](https://react.dev) • [TypeScript](https://www.typescriptlang.org) • [Tailwind CSS 4](https://tailwindcss.com) • [shadcn/ui](https://ui.shadcn.com) • [Zod](https://zod.dev) • [Vitest](https://vitest.dev)

## What's Pre-wired

✅ Zero-JS by default (pages are pure HTML)
✅ React islands (hydrate only when needed)
✅ Dark mode (system preference + localStorage)
✅ Form validation with Zod + inline errors
✅ Error boundaries (React components)
✅ SEO metadata helpers
✅ Testing setup (Vitest + co-located tests)
✅ Git hooks (auto-fix on commit via Husky)
✅ Markdown pages (auto-routed)

## Quick Start

```bash
# Clone
git clone <repo-url> my-app && cd my-app

# Install & setup
pnpm install

# Configure (edit site name, nav, footer)
# → open src/config/site.config.ts

# Run
pnpm dev
```

Visit `http://localhost:3000`

## What You Build

- Pages in `src/pages/[name].astro`
- Markdown in `src/pages/[name].md`
- React islands in `src/components/`
- Pure functions in `src/lib/`

See `docs/patterns.md` for working examples.

## Project Structure

```
├── src/
│   ├── pages/               # Routes (auto-routed)
│   │   ├── index.astro     # Home
│   │   ├── about.astro     # About
│   │   ├── contact.astro   # Contact form
│   │   └── markdown-page.md # Markdown route
│   ├── components/
│   │   ├── layout/          # Header, Footer, Nav
│   │   ├── ui/              # shadcn primitives
│   │   └── ContactForm.tsx  # React island
│   ├── layouts/main.astro   # Main layout wrapper
│   ├── config/site.config.ts # Site metadata & nav
│   ├── lib/                 # Pure utilities
│   ├── hooks/               # React hooks
│   ├── types/               # Shared types
│   ├── styles/global.css    # Theme tokens
│   └── icons/               # Icon components
├── docs/patterns.md         # Quick reference
├── CONSTITUTION.md          # Architecture principles
└── package.json
```

## Customize

**Colors:** Edit `src/styles/global.css`
**Navigation:** Edit `src/config/site.config.ts`
**Pages:** Add `.astro` or `.md` to `src/pages/`
**Islands:** Add `.tsx` to `src/components/`

## Commands

```
pnpm dev              # Dev server
pnpm build            # Production build
pnpm preview          # Preview build
pnpm test             # Run tests
pnpm format           # Format code
pnpm type-check       # Type check
```

## Design Principles

This template follows a [constitution](./CONSTITUTION.md):

- **No magic:** Explicit over implicit. Clear folder structure.
- **Zero-JS first:** Ship no JavaScript by default. Add React only where needed.
- **Islands:** React components are hydrated on-demand (`client:visible`, `client:idle`).
- **Type-safe:** Strict TypeScript, no `any`.
- **Validated:** Zod at boundaries (forms, API).
- **Tested:** Pure functions in `src/lib/` are tested.

## Astro Islands Explained

**Pages (`.astro`):** Pure HTML + server-side logic. Zero JavaScript.

```astro
---
const title = "About";
---
<h1>{title}</h1>
```

**Islands (`.tsx`):** Interactive React components. Only hydrate when user interacts.

```astro
---
import ContactForm from '@/components/ContactForm';
---
<ContactForm client:visible />
```

Use hydration directives wisely:
- `client:load` — Needed immediately
- `client:idle` — Can wait until browser is idle
- `client:visible` — Can wait until scrolled into view (recommended)

Result: **Faster page loads + full interactivity when needed.**

## Examples

- **Pages:** `src/pages/index.astro` (hero), `src/pages/about.astro` (content)
- **Islands:** `src/pages/contact.astro` (uses React form)
- **Forms:** `src/components/ContactForm.tsx` (Zod validation, loading state)
- **Dark mode:** `src/components/layout/ThemeToggle.tsx`
- **Errors:** `src/components/error-boundary.tsx`
- **SEO:** `src/lib/seo.ts` (Open Graph, Twitter cards)
- **Markdown:** `src/pages/markdown-page.md` (auto-routed content page)

## FAQ

**Why Astro over Next.js?**
Zero-JS by default. Faster. Better for content-first sites. React when you need it.

**Why React islands, not Svelte/Vue?**
React has the largest ecosystem. Mix & match later if needed.

**How much JavaScript ships?**
Only for interactive React islands. Pages are pure HTML. Typically 0–50KB depending on islands.

**Can I add authentication?**
Use API routes in `src/pages/api/` + any auth library. Astro Auth exists but not pre-configured.

**How do I add a database?**
Use `src/pages/api/` routes + Prisma, Drizzle, or any DB driver.

**How do I deploy?**
Standard Astro site. Works on Vercel, Netlify, or self-hosted. Check Astro docs.

## Next

- 📖 [docs/patterns.md](./docs/patterns.md) — 2-minute reference for common patterns
- 📋 [CONSTITUTION.md](./CONSTITUTION.md) — Detailed architecture & naming conventions
- 💻 [src/pages/contact.astro](./src/pages/contact.astro) — Working React island example

---

**Fast by default. Interactive when needed. Ready to ship.**
