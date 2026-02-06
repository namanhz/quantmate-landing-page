# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (Turbopack)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint (Next.js core-web-vitals + TypeScript)
```

No test framework is configured yet.

## Architecture

Single-page Next.js 16 App Router landing page for **Quant Mate** — an AI research assistant for Vietnamese university students. The page is Vietnamese (`lang="vi"`) with no API routes or backend integration yet.

**Page flow:** GridBackground → Navbar → Hero → Pain → Features → HowItWorks → SocialProof → Waitlist → CTA → Footer

### Component layers

- `src/components/sections/` — 7 page sections, each self-contained with its own data
- `src/components/ui/` — Reusable primitives (Button, Card, Chip, etc.) with variant props
- `src/components/animations/` — Animation wrappers (FadeInWhenVisible, StaggerChildren, TypewriterText)
- `src/components/layout/` — Navbar, Footer, GridBackground

### Key conventions

- **Motion library**: Import from `motion/react` (NOT `framer-motion`)
- **GSAP**: Client-side only — guard with `typeof window` check. Registered in `src/lib/gsap-config.ts`
- **`"use client"`**: Required on all components using hooks, motion, or browser APIs
- **Class names**: Use `cn()` from `src/lib/utils.ts` (simple falsy-filtering combiner, not clsx/twMerge)
- **Navigation**: Hash-based scroll (`#features`, `#how-it-works`, etc.) defined in `src/lib/constants.ts`

## Design System

**Tailwind v4** with `@theme inline` in `globals.css` for design tokens — no `tailwind.config` file.

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-cream` | `#F5F0E8` | Page background |
| `--bg-dark` | `#1A1A2E` | Terminal, dark sections |
| `--accent-gold` | `#D4A853` | Buttons, highlights |
| `--text-primary` | `#1A1A2E` | Headings, body |
| `--text-secondary` | `#5A5A6E` | Subtitles |

**Fonts** (`src/lib/fonts.ts`): Playfair Display (headings), Be Vietnam Pro (body), JetBrains Mono (code). All use `vietnamese` subset except JetBrains Mono.

## Animations

All animations respect `prefers-reduced-motion`. Three animation systems coexist:

1. **motion/react** — Component enter animations, stagger effects, mobile menu
2. **GSAP + ScrollTrigger** — SVG line draw in HowItWorksSection
3. **CSS keyframes** — `blink`, `pulse-glow`, `draw-line` in globals.css

## Types

Shared interfaces in `src/types/index.ts`: `NavLink`, `PainPoint`, `Feature`, `Testimonial`, `Stat`.

## Path alias

`@/*` maps to `./src/*` (tsconfig paths).
