# Flowers Redirect and Countdown Completion Design

## Goal

Create a stable wedding-domain URL for the flowers service and replace the countdown with a congratulatory message when the ceremony begins.

## Flowers Redirect

- The QR code must encode only `https://mv-11-08-26.ru/flowers`.
- `src/app/flowers/route.ts` will redirect requests to `https://mate-wedding.ru/mikhail-and-varvara`.
- The response must use HTTP `307 Temporary Redirect`. A temporary redirect avoids permanently caching the current destination and allows it to be changed later.
- The destination URL will live in a clearly named constant near the route handler. Updating it and redeploying the site will change where every printed QR code leads.
- DNS configuration stays unchanged. The existing apex domain and Vercel deployment handle the new path.

## QR Assets

Generate two equivalent assets:

- `public/qr/flowers.svg` for printing and layout work.
- `public/qr/flowers.png` as a high-resolution raster fallback.

Both files must use a black-on-white QR code with a standard quiet zone and encode the stable `/flowers` URL, never the external destination. The generated QR must be decoded during verification to confirm its payload.

## Countdown Completion

The countdown continues targeting `2026-08-11T10:30:00+03:00`, the ceremony start in Moscow time. Before that moment, its current month/day/hour/minute/second display remains unchanged.

At or after the target time, the countdown values are replaced with the text:

> Поздравляем молодожёнов с праздником!

The completion state will be derived from the target timestamp, not inferred from all-zero values. This keeps the behavior explicit and avoids ambiguity around timer calculations.

## Verification

- Run lint and a production build.
- Request `/flowers` locally and verify the `307` status and exact `Location` header.
- Decode both QR assets and confirm `https://mv-11-08-26.ru/flowers`.
- Add Vitest and focused unit tests for countdown behavior immediately before, at, and after the ceremony timestamp.
