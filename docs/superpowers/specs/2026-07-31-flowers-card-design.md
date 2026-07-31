# Flowers Subscription Card Design

## Goal

Restore the flower-subscription option in the wedding wishes section without exposing the external provider URL in the site content.

## Placement and Content

- Return the third card, «Цветы», to `src/components/Wishes.tsx`, beside «Поздравления» and «Подарки».
- Restore the existing flower icon and the previously approved text:

  > Если вы хотите подарить нам цветы — будем рады, если воспользуетесь ссылкой на цветочную подписку. Так мы будем получать свежие букеты ещё долгое время после свадьбы.

- Restore the existing button label: «Оформить подписку на цветы».
- Keep the desktop layout as three equal cards and preserve the single-column mobile layout.

## Link Behavior

- The CTA must link to `/flowers`, which is handled by the existing `307` redirect route.
- Keep `target="_blank"` and `rel="noopener noreferrer"` so guests do not lose the invitation page when they open the subscription.
- The card must not contain the provider URL. Updating `FLOWERS_REDIRECT_URL` in `src/app/flowers/route.ts` remains the only way to change the destination.

## Configuration and Verification

- Add the flower title and text back to `wedding.wishes` in `src/config/wedding.ts`; no optional or empty link field is needed.
- Verify the card appears in the rendered wishes section, the CTA has `href="/flowers"`, and the existing redirect test remains green.
- Run `npm test`, `npm run lint`, and `npm run build` before deployment.
