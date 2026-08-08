# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 wedding companion site using the App Router, React 19, TypeScript, and Tailwind CSS 4.

- `src/app/` contains routes, layouts, styles, and metadata. The invitation is assembled in `src/app/page.tsx`; `src/app/memo/` is a separate route.
- `src/components/` contains page sections. Reusable visual elements belong in `src/components/decorative/`.
- `src/hooks/` contains client-side behavior such as the countdown and fade-in effects.
- `src/config/wedding.ts` is the source of truth for event copy, dates, locations, contacts, and dress-code data.
- `public/` contains served assets. `references/` contains design source material.

## Build, Test, and Development Commands

- `npm ci` installs the exact dependency versions from `package-lock.json`.
- `npm run dev` starts the local development server at `http://localhost:3000`.
- `npm run lint` checks Next.js, React, and TypeScript rules.
- `npm run build` creates a production build and catches type or rendering errors.
- `npm run start` serves the completed production build locally.

Run `npm run lint && npm run build` before opening a pull request.

## Coding Style & Naming Conventions

Use strict TypeScript, two-space indentation, double quotes, semicolons, and the `@/` alias for `src/`. Name components and files in PascalCase (`DressCode.tsx`), hooks in camelCase with a `use` prefix (`useCountdown.ts`), and configuration modules by domain.

Keep page sections focused and compose them in `src/app/page.tsx`. Keep event details in `src/config/wedding.ts` instead of components. Use Tailwind utilities; reserve `globals.css` for shared tokens and global rules. Add `"use client"` only for browser APIs, effects, or state.

## Testing Guidelines

There is no automated test runner or coverage threshold. Treat linting and a production build as required checks. Manually verify `/` and `/memo` at mobile and desktop widths, including countdown behavior, links, typography, and images. If tests are introduced, colocate them as `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative subjects such as `hero fullscreen...`; an occasional `feat:` prefix is acceptable. Keep each commit focused.

Pull requests should explain the user-visible result, list validation performed, and note any changed event details. Include before/after screenshots for visual changes at mobile and desktop sizes. Link the relevant issue when one exists, and never commit secrets, `.next/`, or unapproved personal contact information.
