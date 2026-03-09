# Template Constitution

This document describes the architectural principles, conventions, and constraints that govern this template. It's a living guide for maintaining consistency as the template evolves.

## 1. Purpose

This is a **starter scaffold**, not a framework. It provides:
- Pre-wired libraries and sensible defaults
- Proper folder structure with clear contracts
- Minimal working components and pages
- A foundation for rapid development

**What it is NOT:**
- A production-ready application
- A library or package
- A deployment target
- An opinionated framework for your domain logic

## 2. TypeScript

- **Strict mode always**: `strict: true` in `tsconfig.json`
- **No `any`**: Explicitly type everything. If you can't, refactor.
- **Exported types**: When a type is used across multiple files, export from `types/index.ts`
- **Interface for Props**: Create `Props` interfaces and export when components are cross-file imports
- **Explicit return types**: Always annotate function return types, especially in `lib/` (pure functions)
- **Zod for validation**: Use Zod schemas for runtime validation at system boundaries (user input, API responses)

## 3. Architecture

The folder structure enforces a clear separation of concerns:

### `lib/` — Pure Functions
- No React, no Astro-specific code
- Fully testable
- Co-locate tests: `utils.ts` → `utils.test.ts`
- Examples: string helpers, date formatting, validation, math

### `hooks/` — React Only
- No JSX output
- State logic and side effects
- Naming: `use-kebab-case.ts`
- SSR-safe (use `useState` + `useEffect` for browser APIs)

### `config/` — Static Configuration
- No runtime logic or async operations
- Export objects and constants
- Examples: site config, navigation, theme tokens

### `types/` — Shared TypeScript Types
- No internal imports (keep it dependency-free)
- Export interfaces and types
- Re-export from `config/` when appropriate

### `components/ui/` — shadcn Primitives
- **Never customize directly**
- Only wrap with `cn()` for Tailwind combinations
- If you need a variant, create a new component in `components/`

### `components/layout/` — Shell Components
- Header, Footer, Navbar, MobileNav (Astro components)
- Layout wrappers (Astro components)
- Reused across multiple pages

### `components/` — Feature Components
- Astro components for page layouts and structure
- React components (`.tsx`) for interactive islands
- Keep them focused and composable

## 4. Styling

- **Tailwind utilities first**: Use Tailwind for all layout and spacing
- **CSS custom props for theme**: Define color tokens in `styles/global.css` for consistent theming
- **`cn()` always**: Use `tailwind-merge` via `cn()` for class merging (handles Tailwind conflicts)
- **Mobile-first**: Design for mobile, then add responsive modifiers (`md:`, `lg:`, etc.)
- **No inline styles**: Everything goes through Tailwind or CSS modules

## 5. Dark Mode

- **System preference default**: Respect `prefers-color-scheme` on first load
- **localStorage persistence**: Remember user's choice across sessions
- **`.dark` class on `<html>`**: Applied by the theme provider
- **Implicit**: Don't hardcode colors; use Tailwind's `dark:` modifier

## 6. Components

- **Composition over configuration**: Props for content, not style overrides
- **Accessible labels**: Every interactive element needs an accessible name (`aria-label`, `<label>`, etc.)
- **No prop drilling**: Use layout components and Astro slots
- **Named exports for utilities**: Helper components exported from `components/ui/` and layout wrappers
- **Client islands**: Mark interactive React components with `client:load` or appropriate directives

## 7. Forms

- **Zod schema first**: Define validation rules as source of truth
- **Controlled inputs**: State lives in the React component, not form
- **Inline errors**: Show validation messages under the field
- **Clear loading/disabled states**: Disable button + change text during submission
- **Schema co-location**: Keep Zod schema in the same file as the form

Example structure:
```tsx
const formSchema = z.object({ /* ... */ });

export default function ContactForm() {
  const [data, setData] = useState(/* ... */);
  const [loading, setLoading] = useState(false);

  // Handle form submission, validation, and feedback inline
}
```

## 8. Error & Loading

- **Component-level skeletons/spinners**: Show loading state at the component that's fetching
- **Never expose raw errors**: Catch errors, log them, show user-friendly messages
- **404 keeps header/footer**: Error pages are full layouts, not isolated components
- **Graceful degradation**: Fall back to empty states or retry patterns

## 9. Testing

- **`lib/` is fully tested**: Pure functions must have unit tests
- **Co-locate tests**: `filename.ts` → `filename.test.ts` in the same directory
- **TDD mindset**: Write tests first for new `lib/` utilities
- **Vitest + node environment**: Tools are pre-configured; run `npm run test`

## 10. Naming Conventions

- **Astro components**: `PascalCase.astro` (e.g., `Header.astro`, `NarrowLayout.astro`)
- **React components**: `PascalCase.tsx` (e.g., `ContactForm.tsx`)
- **Hooks**: `use-kebab-case.ts` (e.g., `use-media-query.ts`)
- **Utilities/lib**: `camelCase` (e.g., `formatDate.ts`, `cn()` in utils.ts)
- **Test files**: `name.test.ts` (e.g., `utils.test.ts`)
- **Pages**: Folder-based (e.g., `src/pages/about.astro` for `/about` route)

## 11. Astro-Specific Notes

- **Server-first**: Astro components are zero-JS by default; use `client:` directives only for interactive features
- **Islands architecture**: Keep interactive React components small and focused
- **Slots**: Use Astro slots instead of prop drilling for layout composition
- **Markdown support**: `.md` files in `src/pages/` are automatically routed
- **No runtime build**: Astro pre-renders pages at build time for maximum performance

## 12. What NOT to Add

- **No database layer**: Keep it out of this template
- **No auth configuration**: Astro Auth stays as optional dependency
- **No deployment scripts**: That's for your fork
- **No store files** (Redux, Zustand initial state, etc.): Keep state logic in components or hooks
- **No Storybook**: Components are documented by their usage

---

## Updating This Constitution

If you discover a pattern or principle that improves the template:

1. Check it doesn't contradict existing points
2. Add evidence from multiple files/components
3. Update this document
4. Refactor affected code to match

Constitution changes should be rare and well-documented.
