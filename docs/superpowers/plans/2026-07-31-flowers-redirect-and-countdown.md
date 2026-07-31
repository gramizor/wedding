# Flowers Redirect and Countdown Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a stable `/flowers` redirect with printable QR assets and replace the ceremony countdown with a congratulatory message at 10:30 Moscow time on 11 August 2026.

**Architecture:** A Next.js route handler owns the temporary external redirect. Countdown math moves into a pure library module so the React hook only schedules updates and the ceremony boundary is unit-testable. QR files encode the stable first-party URL and remain valid when the redirect target changes.

**Tech Stack:** Next.js 16 App Router, React 19, strict TypeScript, Vitest, Tailwind CSS, `qrcode` CLI for asset generation.

## Global Constraints

- QR payload: `https://mv-11-08-26.ru/flowers`.
- Current redirect target: `https://mate-wedding.ru/mikhail-and-varvara`.
- Redirect status: `307 Temporary Redirect`, never a permanent redirect.
- Ceremony timestamp: `2026-08-11T10:30:00+03:00`.
- Completion copy: `Поздравляем молодожёнов с праздником!`.
- Preserve the existing countdown layout before the ceremony.
- Do not change DNS configuration.

---

## File Map

- Create `src/app/flowers/route.ts`: owns the external destination and HTTP redirect.
- Create `src/app/flowers/route.test.ts`: verifies redirect status and destination.
- Create `src/lib/countdown.ts`: pure countdown state and Russian label logic.
- Create `src/lib/countdown.test.ts`: verifies the ceremony boundary.
- Modify `src/hooks/useCountdown.ts`: schedules recalculation using the pure module.
- Modify `src/components/Hero.tsx`: switches between countdown and completion copy.
- Modify `package.json` and `package-lock.json`: adds Vitest and the `test` script.
- Create `public/qr/flowers.svg` and `public/qr/flowers.png`: printable QR assets.

### Task 1: Temporary flowers redirect

**Files:**
- Create: `src/app/flowers/route.ts`
- Create: `src/app/flowers/route.test.ts`
- Modify: `package.json`
- Modify: `package-lock.json`

**Interfaces:**
- Produces: `FLOWERS_REDIRECT_URL: string` and `GET(): Response`.

- [ ] **Step 1: Install Vitest and add the test command**

Run:

```bash
npm install --save-dev vitest
npm pkg set scripts.test="vitest run"
```

- [ ] **Step 2: Write the failing redirect test**

```ts
import { describe, expect, it } from "vitest";
import { FLOWERS_REDIRECT_URL, GET } from "./route";

describe("GET /flowers", () => {
  it("temporarily redirects to the configured flowers page", () => {
    const response = GET();

    expect(FLOWERS_REDIRECT_URL).toBe(
      "https://mate-wedding.ru/mikhail-and-varvara",
    );
    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(FLOWERS_REDIRECT_URL);
  });
});
```

- [ ] **Step 3: Run the test and confirm the expected failure**

Run: `npm test -- src/app/flowers/route.test.ts`

Expected: FAIL because `src/app/flowers/route.ts` does not exist.

- [ ] **Step 4: Implement the route handler**

```ts
import { NextResponse } from "next/server";

export const FLOWERS_REDIRECT_URL =
  "https://mate-wedding.ru/mikhail-and-varvara";

export const GET = (): Response => {
  return NextResponse.redirect(FLOWERS_REDIRECT_URL, 307);
};
```

- [ ] **Step 5: Run the redirect test**

Run: `npm test -- src/app/flowers/route.test.ts`

Expected: PASS with one passing test.

- [ ] **Step 6: Commit the redirect**

```bash
git add package.json package-lock.json src/app/flowers/route.ts src/app/flowers/route.test.ts
git commit -m "feat: add flowers redirect"
```

### Task 2: Explicit countdown completion state

**Files:**
- Create: `src/lib/countdown.ts`
- Create: `src/lib/countdown.test.ts`
- Modify: `src/hooks/useCountdown.ts`
- Modify: `src/components/Hero.tsx`

**Interfaces:**
- Produces: `CountdownState`, `calculateCountdown(targetDate: Date, now?: Date): CountdownState`, and `countdownLabels(value: number, unit: CountdownUnit): string`.
- Consumes: `wedding.date` from `src/config/wedding.ts`.

- [ ] **Step 1: Write failing boundary tests**

```ts
import { describe, expect, it } from "vitest";
import { calculateCountdown } from "./countdown";

const ceremonyDate = new Date("2026-08-11T10:30:00+03:00");

describe("calculateCountdown", () => {
  it("is active immediately before the ceremony", () => {
    const result = calculateCountdown(
      ceremonyDate,
      new Date("2026-08-11T10:29:59+03:00"),
    );

    expect(result.isComplete).toBe(false);
    expect(result.seconds).toBe(1);
  });

  it("completes exactly at the ceremony time", () => {
    const result = calculateCountdown(ceremonyDate, ceremonyDate);

    expect(result).toEqual({
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    });
  });

  it("stays complete after the ceremony", () => {
    const result = calculateCountdown(
      ceremonyDate,
      new Date("2026-08-11T10:30:01+03:00"),
    );

    expect(result.isComplete).toBe(true);
  });
});
```

- [ ] **Step 2: Run the tests and confirm the expected failure**

Run: `npm test -- src/lib/countdown.test.ts`

Expected: FAIL because `src/lib/countdown.ts` does not exist.

- [ ] **Step 3: Extract countdown logic into a pure module**

Create `src/lib/countdown.ts` with:

```ts
export interface CountdownState {
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export type CountdownUnit = "month" | "day" | "hour" | "minute" | "second";

interface CountdownForms {
  month: readonly [string, string, string];
  day: readonly [string, string, string];
  hour: readonly [string, string, string];
  minute: readonly [string, string, string];
  second: readonly [string, string, string];
}

const countdownForms: CountdownForms = {
  month: ["месяц", "месяца", "месяцев"],
  day: ["день", "дня", "дней"],
  hour: ["час", "часа", "часов"],
  minute: ["минута", "минуты", "минут"],
  second: ["секунда", "секунды", "секунд"],
};

const pluralize = (
  value: number,
  one: string,
  few: string,
  many: string,
): string => {
  const absoluteValue = Math.abs(value) % 100;
  const lastDigit = absoluteValue % 10;

  if (absoluteValue >= 11 && absoluteValue <= 19) {
    return many;
  }

  if (lastDigit === 1) {
    return one;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return few;
  }

  return many;
};

export const calculateCountdown = (
  targetDate: Date,
  now: Date = new Date(),
): CountdownState => {
  if (now.getTime() >= targetDate.getTime()) {
    return {
      months: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isComplete: true,
    };
  }

  let months = 0;
  const cursor = new Date(now);

  while (true) {
    const next = new Date(cursor);
    next.setMonth(next.getMonth() + 1);

    if (next > targetDate) {
      break;
    }

    cursor.setMonth(cursor.getMonth() + 1);
    months += 1;
  }

  const remainderMs = targetDate.getTime() - cursor.getTime();
  const dayMs = 1000 * 60 * 60 * 24;
  const hourMs = 1000 * 60 * 60;
  const minuteMs = 1000 * 60;

  return {
    months,
    days: Math.floor(remainderMs / dayMs),
    hours: Math.floor((remainderMs % dayMs) / hourMs),
    minutes: Math.floor((remainderMs % hourMs) / minuteMs),
    seconds: Math.floor((remainderMs % minuteMs) / 1000),
    isComplete: false,
  };
};

export const countdownLabels = (
  value: number,
  unit: CountdownUnit,
): string => {
  return pluralize(value, ...countdownForms[unit]);
};
```

The completed branch must return all numeric fields as zero with `isComplete: true`; the active branch must preserve the existing full-month algorithm and return `isComplete: false`.

- [ ] **Step 4: Update the hook to use the pure calculation**

Replace the calculation and label helpers in `src/hooks/useCountdown.ts` with imports from `@/lib/countdown`. Keep the one-second interval and return `CountdownState` from `useCountdown`.

```ts
"use client";

import { useEffect, useRef, useState } from "react";
import {
  calculateCountdown,
  type CountdownState,
} from "@/lib/countdown";

export const useCountdown = (targetDate: Date): CountdownState => {
  const targetMs = useRef(targetDate.getTime());
  const [countdown, setCountdown] = useState<CountdownState>(() => {
    return calculateCountdown(targetDate);
  });

  useEffect(() => {
    const target = new Date(targetMs.current);
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(target));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return countdown;
};
```

- [ ] **Step 5: Render the completion copy in Hero**

Destructure `isComplete` from `useCountdown`. Replace the timer container with this conditional:

```tsx
{isComplete ? (
  <p className="mt-6 max-w-md text-center font-serif text-2xl font-light italic text-burgundy sm:mt-8 sm:text-3xl">
    Поздравляем молодожёнов с праздником!
  </p>
) : (
  <div className="mt-6 flex items-start gap-1 sm:mt-8 sm:gap-5">
    {months > 0 && (
      <>
        <CountdownUnit
          value={months}
          label={countdownLabels(months, "month")}
        />
        <CountdownSeparator />
      </>
    )}
    <CountdownUnit value={days} label={countdownLabels(days, "day")} />
    <CountdownSeparator />
    <CountdownUnit value={hours} label={countdownLabels(hours, "hour")} />
    <CountdownSeparator />
    <CountdownUnit
      value={minutes}
      label={countdownLabels(minutes, "minute")}
    />
    <CountdownSeparator />
    <CountdownUnit
      value={seconds}
      label={countdownLabels(seconds, "second")}
    />
  </div>
)}
```

- [ ] **Step 6: Run focused and full tests**

Run:

```bash
npm test -- src/lib/countdown.test.ts
npm test
```

Expected: three countdown tests and the redirect test PASS.

- [ ] **Step 7: Commit the countdown behavior**

```bash
git add src/lib/countdown.ts src/lib/countdown.test.ts src/hooks/useCountdown.ts src/components/Hero.tsx
git commit -m "feat: show ceremony countdown completion"
```

### Task 3: Stable QR assets

**Files:**
- Create: `public/qr/flowers.svg`
- Create: `public/qr/flowers.png`

**Interfaces:**
- Encodes: `https://mv-11-08-26.ru/flowers`.

- [ ] **Step 1: Generate SVG and high-resolution PNG assets**

Run:

```bash
mkdir -p public/qr
npx --yes qrcode@1.5.4 -e H -q 4 -w 1200 -o public/qr/flowers.svg "https://mv-11-08-26.ru/flowers"
npx --yes qrcode@1.5.4 -e H -q 4 -w 2000 -o public/qr/flowers.png "https://mv-11-08-26.ru/flowers"
```

- [ ] **Step 2: Rasterize the SVG for independent decoding**

Run:

```bash
qr_verify_dir=$(mktemp -d)
rsvg-convert -w 2000 -h 2000 public/qr/flowers.svg > "$qr_verify_dir/flowers-svg.png"
```

- [ ] **Step 3: Decode both QR images**

Run macOS Core Image from Swift against both images:

```bash
swift - public/qr/flowers.png "$qr_verify_dir/flowers-svg.png" <<'SWIFT'
import CoreImage
import Foundation

let expectedPayload = "https://mv-11-08-26.ru/flowers"

for path in CommandLine.arguments.dropFirst() {
  let url = URL(fileURLWithPath: path)

  guard let image = CIImage(contentsOf: url) else {
    fatalError("Cannot load QR image: \(path)")
  }

  guard let detector = CIDetector(
    ofType: CIDetectorTypeQRCode,
    context: nil,
    options: [CIDetectorAccuracy: CIDetectorAccuracyHigh]
  ) else {
    fatalError("Cannot create QR detector")
  }

  let payloads = detector.features(in: image).compactMap { feature in
    return (feature as? CIQRCodeFeature)?.messageString
  }

  guard payloads == [expectedPayload] else {
    fatalError("Unexpected QR payload in \(path): \(payloads)")
  }

  print("\(path): \(expectedPayload)")
}
SWIFT
```

Expected: both paths print `https://mv-11-08-26.ru/flowers`.

- [ ] **Step 4: Inspect asset metadata**

Run:

```bash
file public/qr/flowers.svg public/qr/flowers.png
sips -g pixelWidth -g pixelHeight public/qr/flowers.png
```

Expected: valid SVG, valid PNG, and a 2000×2000 PNG.

- [ ] **Step 5: Commit QR assets**

```bash
git add public/qr/flowers.svg public/qr/flowers.png
git commit -m "assets: add flowers QR code"
```

### Task 4: End-to-end verification

**Files:**
- Verify only; no expected file changes.

- [ ] **Step 1: Run all automated checks**

Run:

```bash
npm test
npm run lint
npm run build
```

Expected: all commands exit with code 0.

- [ ] **Step 2: Verify the built redirect over HTTP**

Run the production server on an unused local port and request `/flowers` without following redirects:

```bash
npm run start -- --port 3210 > /tmp/wedding-next-start.log 2>&1 &
wedding_server_pid=$!
curl -sS -D - -o /dev/null http://localhost:3210/flowers
kill "$wedding_server_pid"
wait "$wedding_server_pid" 2>/dev/null || true
```

Expected: status `307` and `Location: https://mate-wedding.ru/mikhail-and-varvara`.

- [ ] **Step 3: Review repository state**

Run:

```bash
git diff --check
git status --short
```

Expected: no whitespace errors. Preserve the pre-existing untracked `AGENTS.md`; do not stage or modify it as part of this feature.
