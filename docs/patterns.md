# Common Patterns

Quick reference for common tasks.

## Form Submission

- Use Zod schema for validation
- Controlled inputs with `useState`
- Show inline errors, disable button during submission

**See:** `src/components/ContactForm.tsx`, `src/pages/contact.astro`

---

## Error Handling

1. Catch errors explicitly
2. Log for debugging (server-side only)
3. Show user-friendly message
4. Wrap React islands with `<ErrorBoundary>`

**See:** `src/components/error-boundary.tsx`

---

## Loading States

Use `<Skeleton>` component, not spinners. Shows the actual layout loading.

```tsx
<div className="space-y-2">
  <Skeleton className="h-12 w-32" />
  <Skeleton className="h-4 w-full" />
</div>
```

---

## Data Fetching

**Server-side (Astro):** Fetch directly in `.astro` files
**Client-side (React island):** `useEffect` + `useState`, handle errors

---

## Type Safety

Export types from files:

```ts
export const schema = z.object({ name: z.string() });
export type FormData = z.infer<typeof schema>;
```

Never use `any`.

---

## React Islands

Keep small and focused. Use hydration directives:

- `client:load` — Hydrate immediately (default)
- `client:idle` — Hydrate when browser is idle
- `client:visible` — Hydrate when scrolled into view (best for performance)

**See:** `src/pages/contact.astro`

---

## SEO

Use `generateSEO()` helper for consistent Open Graph, Twitter cards, canonicals:

```astro
---
const seo = generateSEO({
  title: "About",
  description: "...",
});
---

<html>
  <head>
    <title>{seo.title}</title>
    <!-- add meta tags -->
  </head>
</html>
```

**See:** `src/lib/seo.ts`

---

## Environment Variables

Add to `.env.example`, validate at startup with Zod in `src/lib/env.ts`.

Catches missing vars at boot, not runtime.

---

## Component Organization

- `src/components/ui/` → shadcn primitives (never customize)
- `src/components/layout/` → Reusable Astro layouts
- `src/components/*.tsx` → React islands (interactive)
- `src/lib/` → Pure functions, no Astro/React

---

## Testing

Co-locate tests: `utils.ts` → `utils.test.ts`

Only test `src/lib/` (pure functions).

```bash
pnpm test
pnpm test:coverage
```

---

## Markdown Pages

Files in `src/pages/*.md` auto-route and are server-rendered.

```markdown
---
title: "Blog Post"
pubDate: 2024-01-01
---

# Markdown content here
```

---

See `CONSTITUTION.md` for detailed principles.
