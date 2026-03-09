# Astro Template

A modern, performant starter for Astro applications with React, Tailwind CSS 4, and shadcn/ui. Built with best practices and ready for rapid development.

## Stack

- **Framework**: [Astro 5](https://astro.build/) (Server-first, zero-JS by default)
- **UI**: [React 19](https://react.dev/) (Islands) + [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Theme**: Custom theme provider (dark mode with localStorage)
- **Forms & Validation**: [Zod](https://zod.dev/) (in React components)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Type Safety**: TypeScript (strict mode)

## Getting Started

### 1. Clone or Use as Template

```bash
# Clone
git clone <repo-url> my-app
cd my-app

# Or use GitHub's "Use this template" button
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Customize Site Config

Edit `src/config/site.config.ts` with your site information:

```ts
export const siteConfig: SiteConfig = {
  name: "Your App Name",
  title: "Your App Title",
  description: "Your description",
  url: "https://yoursite.com",
  // ... update links, nav, footer
};
```

### 4. Start Development

```bash
pnpm dev
```

Visit `http://localhost:3000`

## Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Navbar, layout wrappers
│   │   ├── ui/              # shadcn components (primitives)
│   │   ├── ContactForm.tsx  # Example React island
│   │   └── icons/           # Icon components
│   ├── config/
│   │   └── site.config.ts   # Site metadata, navigation, footer
│   ├── hooks/               # React hooks (use-media-query.ts)
│   ├── lib/                 # Pure utilities (no React/Astro)
│   │   ├── utils.ts        # cn(), other helpers
│   │   └── utils.test.ts   # Tests
│   ├── layouts/
│   │   └── main.astro      # Main layout wrapper
│   ├── pages/              # Routes (Astro pages)
│   │   ├── index.astro     # Home
│   │   ├── about.astro     # About
│   │   ├── contact.astro   # Contact form
│   │   ├── 404.astro       # 404 page
│   │   └── markdown-page.md # Example Markdown page
│   ├── styles/
│   │   └── global.css      # Global styles & theme
│   └── types/
│       └── index.ts        # Shared TypeScript types
├── public/
│   ├── favicon.svg
│   └── scripts/            # Browser scripts (theme init)
├── CONSTITUTION.md         # Architectural principles
├── astro.config.mjs       # Astro configuration
├── vitest.config.ts       # Test configuration
└── package.json
```

## Key Files

- **`src/config/site.config.ts`**: Navigation, footer links, site metadata. Update this first.
- **`src/pages/`**: All page routes. Astro handles routing automatically.
- **`src/components/`**: Reusable Astro and React components.
- **`src/layouts/main.astro`**: Main layout with Header + Footer.
- **`CONSTITUTION.md`**: Detailed architectural guide

## Features

### Dark Mode

System preference is respected by default. Theme persists to localStorage via the script in `public/scripts/theme-init.js`.

```tsx
// In React islands:
import { useTheme } from "next-themes";

export function MyComponent() {
  const { theme, setTheme } = useTheme();
  // ...
}
```

### Forms & Validation

Use Zod in React components for runtime validation:

```tsx
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
});

// Validate and show inline errors
const result = schema.safeParse(formData);
```

### Responsive Design

Built mobile-first with Tailwind breakpoints:

```astro
<!-- mobile → md (768px) → lg (1024px) -->
<div class="p-4 md:p-6 lg:p-8">
```

### Styling with `cn()`

Always use `cn()` for Tailwind class merging:

```tsx
import { cn } from "@/lib/utils";

<div className={cn("px-2", customClass)} />
```

### React Islands

Interactive features are React components. Mark them with `client:load` in Astro:

```astro
---
import ContactForm from '@/components/ContactForm';
---

<ContactForm client:load />
```

## Testing

Unit tests for pure functions in `src/lib/`:

```bash
pnpm test
```

Tests are co-located and use Vitest with node environment:

```
src/lib/
├── utils.ts
└── utils.test.ts  ← test for above
```

## Scripts

```bash
pnpm dev        # Start dev server
pnpm build      # Build for production
pnpm preview    # Preview production build
pnpm astro      # Run astro CLI
pnpm test       # Run tests with Vitest
```

## Architecture

See **`CONSTITUTION.md`** for detailed principles:

- **Astro components**: Server-rendered, zero-JS by default
- **React islands**: Small, focused interactive components
- **`src/lib/`**: Pure functions, no framework code, fully testable
- **`src/hooks/`**: React state logic (no JSX)
- **`src/config/`**: Static configuration, no logic
- **`src/types/`**: Shared types, no internal imports
- **`src/components/ui/`**: shadcn primitives, never customized
- **`src/components/layout/`**: Reusable shells and layout wrappers
- **`src/pages/`**: Route definitions

## What's Not Included

- **Database**: Add your own (Prisma, Drizzle, etc.)
- **Authentication**: Astro Auth is available if needed
- **Deployment config**: Configure for your hosting (Vercel, Netlify, etc.)
- **Storybook**: Maintain one source of truth (the component files)

## Customization

1. **Colors**: Edit `src/styles/global.css` (Tailwind theme tokens)
2. **Navigation**: Update `src/config/site.config.ts`
3. **Layout**: Modify `src/components/layout/`
4. **Pages**: Add new `.astro` or `.md` files in `src/pages/`

## FAQ

**Q: How do I change the theme colors?**
A: Edit the Tailwind theme in `src/styles/global.css`. Or use CSS custom properties via `--foreground`, `--background`, etc.

**Q: Where do I add API routes?**
A: Create `src/pages/api/` folder with API route handlers.

**Q: How do I use React everywhere?**
A: That defeats the purpose. Astro is zero-JS by default. Use React for islands only.

**Q: Can I add a database?**
A: Yes, use API routes in `src/pages/api/` with your database driver.

**Q: How do I deploy?**
A: This is a standard Astro site. Deploy to Vercel, Netlify, or self-host. Check Astro docs.

## Astro-Specific Notes

- **Astro files**: Use `*.astro` for layouts and pages (server-rendered, zero-JS)
- **React files**: Use `*.tsx` for interactive islands (JavaScript-heavy components)
- **client:load**: Hydrate React component on page load
- **client:idle**: Hydrate when browser is idle
- **client:visible**: Hydrate when component scrolls into view
- **client:only**: Skip server rendering (use sparingly)

## License

Use freely for your projects.

---

**Questions?** Read `CONSTITUTION.md` or explore the example pages (`about`, `contact`).
