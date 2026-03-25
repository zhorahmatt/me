# CLAUDE.md — rahmathidayat.my.id

> Personal portfolio & blog for Rahmat Hidayat.  
> Stack: **Astro 5** · **Tailwind CSS 3 (JIT)** · **TypeScript** · **i18n (en/id)**

---

## Project Overview

| Property | Value |
|---|---|
| Site URL | `https://rahmathidayat.my.id` |
| Dev server | `npm run dev` (default: `http://localhost:4321`) |
| Build | `npm run build` |
| Preview | `npm run preview` |
| Framework | Astro 5 with `@astrojs/tailwind` integration |
| Styling | Tailwind CSS v3 + custom tokens in `tailwind.config.mjs` |
| Fonts | Instrument Serif · Instrument Sans · JetBrains Mono (Google Fonts) |
| i18n | `en` (default) · `id` — managed via `src/i18n/` |

---

## Repository Structure

```
src/
├── components/       # Page sections (all .astro)
│   ├── Hero.astro
│   ├── About.astro
│   ├── Services.astro
│   ├── Projects.astro
│   ├── Blog.astro
│   ├── Resume.astro
│   └── Contact.astro
├── layouts/
│   └── BaseLayout.astro   # Root layout: nav island, footer, scroll-reveal
├── pages/
│   ├── index.astro        # Redirect entrypoint
│   ├── en/                # English pages
│   └── id/                # Indonesian pages
├── i18n/
│   ├── en.json            # English translations
│   ├── id.json            # Indonesian translations
│   └── utils.ts           # t(), getAlternateLocale(), localePath()
└── styles/
    └── global.css         # @tailwind base/components/utilities + scroll-reveal
```

---

## Design System

### Color Tokens (from `tailwind.config.mjs`)

| Token | Value | Usage |
|---|---|---|
| `paper` | `#f5f3ef` | Default background |
| `paper-light` | `#faf9f7` | Card backgrounds |
| `paper-alt` | `#eae7e1` | Subtle sections |
| `ink` | `#1a1a1a` | Primary text |
| `ink-secondary` | `#4a4a4a` | Secondary text |
| `ink-muted` | `#8a8a8a` | Placeholder / subtle text |
| `border` | `#e0ddd7` | Default borders |
| `accent` | `#6366f1` | Accent/highlight colour |

### Typography

| Class | Font | Usage |
|---|---|---|
| `font-serif` | Instrument Serif | Headings, section titles |
| `font-sans` | Instrument Sans | Body copy |
| `font-mono` | JetBrains Mono | Code, locale switcher |

### Spacing / Sizing Aliases

| Token | Value |
|---|---|
| `rounded-card` | `16px` |
| `rounded-card-lg` | `20px` |
| `rounded-pill` | `999px` |
| `text-hero` | `clamp(2.5rem, 6vw, 4rem)` |
| `text-section` | `clamp(2rem, 4vw, 3rem)` |

### Reusable CSS Classes (in `global.css`)

| Class | Description |
|---|---|
| `.page-wrapper` | Full-width section wrapper |
| `.page-content` | Centred content column, `max-w-[768px]`, `px-6` |
| `.section-heading` | Serif heading with bottom margin |
| `.card` | Rounded card with hover lift |
| `.btn-primary` | Dark pill CTA button |
| `.link-underline` | Underlined link variant |
| `.form-input` | Styled text input |
| `.reveal` / `.reveal.visible` | Scroll-reveal animation (JS IntersectionObserver) |
| `.reveal-delay-{1-6}` | Staggered animation delays |

---

## Navigation (BaseLayout)

- **Mobile**: horizontal pill bar, fixed top-center (`top-4 left-1/2 -translate-x-1/2`)
- **Desktop** (`md:`): vertical pill bar, fixed left-center (`left-20 md:top-1/2 md:-translate-y-1/2`)
- Nav items: Home · About · Work · Blog · Contact
- Extra controls: locale switcher (`EN`/`ID`) + theme toggle (placeholder)
- Hover tooltips appear on desktop only (hidden on mobile)

---

## i18n Conventions

```ts
// In .astro components, always receive `locale` as a prop
const { locale } = Astro.props; // type: Locale = 'en' | 'id'

// Use helpers from i18n/utils
import { t, localePath } from '../i18n/utils';
t('hero.title', locale);           // translated string
localePath('/about', locale);      // locale-prefixed path, e.g. /en/about
```

- All pages live under `src/pages/en/` and `src/pages/id/`
- Translation keys live in `src/i18n/en.json` and `src/i18n/id.json`
- Every component must accept `locale: Locale` as a prop if it renders any translated text

---

## Coding Conventions

### Astro Components
- Use **Astro frontmatter** (`---`) for logic; keep templates declarative
- Accept and forward `locale` prop to every child that needs i18n
- Prefer Tailwind utility classes; use `global.css` component classes for repeated patterns
- Avoid `<style scoped>` unless absolutely necessary — keep styles in `global.css` or Tailwind

### CSS / Tailwind
- Only use Tailwind v3. **Do not** upgrade to v4 without explicit approval
- Design tokens live in `tailwind.config.mjs` — extend the theme there, not inline `style` attributes
- All new reusable patterns go in `global.css` under `@layer components` or `@layer utilities`
- Maintain the scroll-reveal pattern (`.reveal`, `.reveal.visible`) — use JS IntersectionObserver already in `BaseLayout.astro`

### TypeScript
- `tsconfig.json` is minimal — keep it that way
- Use strict types for i18n (`Locale` type from `src/i18n/utils.ts`)

### File Naming
- Components: `PascalCase.astro`
- Pages: `kebab-case.astro`
- Utilities: `camelCase.ts`

---

## Common Tasks

### Add a new page

1. Create `src/pages/en/new-page.astro` and `src/pages/id/new-page.astro`
2. Add translation keys to both `en.json` and `id.json`
3. Import `BaseLayout` and pass `locale`, `title`, `description`, `activePage` props
4. Add the nav item to `navItems` array in `BaseLayout.astro` if it should appear in nav

### Add a new component

1. Create `src/components/NewSection.astro`
2. Declare `interface Props { locale: Locale; /* other props */ }`
3. Use `.page-content`, `.section-heading`, `.card`, etc. for consistent layout
4. Add `.reveal` classes for scroll animation

### Add a new translation key

1. Add to `src/i18n/en.json`
2. Add to `src/i18n/id.json`
3. Use `t('your.key', locale)` in components

---

## Dev Notes & Gotchas

- **Tailwind purge**: Content scanning covers `./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}` — ensure dynamic class names are fully spelled out (avoid string concatenation for Tailwind classes)
- **i18n routing**: Default locale is `en` with `prefixDefaultLocale: true` — all URLs are prefixed (`/en/`, `/id/`). The root `index.astro` redirects to the appropriate locale
- **Font preconnects**: Already in `BaseLayout.astro` `<head>`. Do not duplicate in individual pages
- **Scroll reveal**: The IntersectionObserver script is in `BaseLayout.astro`. Just add `.reveal` (and optionally `.reveal-delay-N`) to any element — it activates automatically
- **Theme toggle**: Currently a placeholder button — no dark mode implemented yet

---

## Antigravity Guidelines

- **Design-first**: When changing UI, prefer generating a reference image or mockup before coding
- **No placeholders**: If images are needed, use `generate_image` to create real assets
- **Aesthetic bar**: This is a personal brand site — visual quality matters. Prefer premium, intentional design over quick fixes
- **Run dev server**: Use `npm run dev` to verify changes visually before completing a task
- **SEO**: Every page needs unique `title` + `description` meta (passed as props to `BaseLayout`)
- **i18n**: Every user-facing string must have a translation in both `en.json` and `id.json`
- **Accessibility**: Navigation uses `aria-label`; maintain ARIA attributes on interactive elements
