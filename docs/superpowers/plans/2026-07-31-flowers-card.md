# Flowers Subscription Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restore the flower-subscription card in the wishes section and route its CTA through the stable `/flowers` redirect.

**Architecture:** `wedding.ts` owns the card copy, while `Wishes.tsx` renders the icon, text, and a fixed first-party CTA. A render-to-static-markup test verifies the guest-visible card and prevents accidentally exposing the external provider URL.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, Vitest.

## Global Constraints

- Card title: `Цветы`.
- CTA label: `Оформить подписку на цветы`.
- CTA target: `/flowers` with `target="_blank"` and `rel="noopener noreferrer"`.
- Desktop layout: three equal cards; mobile: a single column.
- The external provider URL must not appear in `Wishes.tsx` or `wedding.ts`.

---

### Task 1: Restore the flowers card

**Files:**
- Create: `src/components/Wishes.test.tsx`
- Modify: `src/config/wedding.ts`
- Modify: `src/components/Wishes.tsx`

**Interfaces:**
- Consumes: `wedding.wishes.flowers.title` and `wedding.wishes.flowers.text`.
- Produces: a visible `Wishes` card whose CTA links to `/flowers`.

- [ ] **Step 1: Write the failing render test**

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Wishes } from "./Wishes";

describe("Wishes", () => {
  it("renders a flowers subscription CTA through the stable route", () => {
    const markup = renderToStaticMarkup(<Wishes />);

    expect(markup).toContain("Цветы");
    expect(markup).toContain("Оформить подписку на цветы");
    expect(markup).toContain('href="/flowers"');
    expect(markup).toContain('target="_blank"');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- src/components/Wishes.test.tsx`

Expected: FAIL because the current two-card component does not render the flower title or CTA.

- [ ] **Step 3: Restore flower configuration**

Add this exact object beside `budget` in `wedding.wishes`:

```ts
flowers: {
  title: "Цветы",
  text: "Если вы хотите подарить нам цветы — будем рады, если воспользуетесь ссылкой на цветочную подписку. Так мы будем получать свежие букеты ещё долгое время после свадьбы",
},
```

- [ ] **Step 4: Restore flower rendering**

In `Wishes.tsx`, restore `FlowerIcon`, change the grid class from `mx-auto grid max-w-3xl gap-8 sm:grid-cols-2` to `grid gap-8 sm:grid-cols-3`, and add the third card after the budget card:

```tsx
<div className="fade-in rounded-2xl border border-taupe/30 bg-card p-8 text-center shadow-sm">
  <div className="mb-4 flex justify-center">
    <FlowerIcon />
  </div>
  <h3 className="mb-3 font-serif text-xl font-semibold text-text">
    {wedding.wishes.flowers.title}
  </h3>
  <p className="font-serif text-base leading-relaxed text-text/60 italic">
    {wedding.wishes.flowers.text}
  </p>
  <a
    href="/flowers"
    target="_blank"
    rel="noopener noreferrer"
    className="mt-5 inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-2.5 text-sm font-medium text-card transition-colors hover:bg-burgundy-dark"
  >
    Оформить подписку на цветы
  </a>
</div>
```

Use the previously removed inline SVG from commit `cc3a03f^` for `FlowerIcon` without changing its strokes or colors.

- [ ] **Step 5: Run the focused test and full checks**

Run:

```bash
npm test -- src/components/Wishes.test.tsx
npm test
npm run lint
npm run build
```

Expected: the new render test, the redirect test, and countdown tests all pass; lint has no errors; production build succeeds.

- [ ] **Step 6: Commit and deploy**

```bash
git add docs/superpowers/plans/2026-07-31-flowers-card.md src/components/Wishes.test.tsx src/components/Wishes.tsx src/config/wedding.ts
git commit -m "feat: restore flowers subscription card"
git push origin main
```

Verify `https://mv-11-08-26.ru/flowers` continues to return `307 Temporary Redirect` after Vercel marks the commit deployment successful.
