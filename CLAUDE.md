# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Проект

Свадебный сайт-компаньон к печатным пригласительным (Михаил и Варвара, 11 августа 2026). Гости попадают на него по QR-коду. Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS 4, Vitest. Деплой на Vercel, домен `mv-11-08-26.ru`.

## Команды

```bash
npm ci             # установка ровно из package-lock.json
npm run dev        # dev-сервер на http://localhost:3000
npm run lint       # eslint (next core-web-vitals + typescript)
npm run build      # прод-сборка, ловит ошибки типов и рендера
npm test           # vitest run (одноразовый прогон)
npx vitest run src/lib/countdown.test.ts        # один файл
npx vitest run -t "completes exactly at the ceremony time"  # один тест
```

Перед PR: `npm run lint && npm run build && npm test`.

`AGENTS.md` утверждает, что автотестов нет — это устарело, Vitest подключён (`vitest.config.mts`, алиас `@/` продублирован там вручную).

## Архитектура

**Контент отделён от вёрстки.** `src/config/wedding.ts` — единственный источник правды по датам, таймингу, адресам, дресс-коду, контактам и текстам; экспортируется `as const`. Компоненты только читают из него. Правка текста или времени = правка конфига, не компонента.

**Страница собирается из секций.** `src/app/page.tsx` — плоский список секций из `src/components/` в порядке показа. Каждая секция самодостаточна: сама тянет свой кусок конфига, сама рисует свои иконки инлайн-SVG. Переиспользуемая декоративка — в `src/components/decorative/`.

**`/memo`** — отдельный маршрут с памяткой под печать в PDF (`window.print()`, инлайн `@media print`, класс `.no-print`). Не переиспользует секции главной.

**`/flowers` — стабильный редирект под печатный QR.** `src/app/flowers/route.ts` отдаёт 307 на внешний сервис цветочной подписки. QR-коды (`public/qr/flowers.*`) закодированы на `/flowers`, а не на внешний URL, — чтобы менять получателя без перепечатки. Менять `FLOWERS_REDIRECT_URL` можно, статус 307 (не 301) менять нельзя: постоянный редирект закешируется у гостей.

**Обратный отсчёт.** Чистая логика в `src/lib/countdown.ts` (`calculateCountdown(target, now)` — принимает `now` параметром, поэтому тестируется без моков таймеров), тиканье и русская плюрализация — в `src/hooks/useCountdown.ts`. Флаг `isComplete` переключает Hero на поздравление после начала церемонии.

**Анимации появления** — без библиотек: `FadeInProvider` монтирует `useFadeIn`, тот навешивает один `IntersectionObserver` на все `.fade-in` в документе и добавляет `.visible`. Чтобы секция появлялась плавно, достаточно класса `fade-in` в разметке.

## Стиль и токены

Дизайн-токены живут в `@theme inline` в `src/app/globals.css`: цвета `ivory`, `text`, `burgundy`, `burgundy-dark`, `taupe`, `card` и шрифтовые семейства `font-script` (Great Vibes, акцентные заголовки), `font-serif` (Cormorant Infant, основной текст), `font-sans` (Montserrat). Шрифты подключены через `next/font/google` в `layout.tsx` с кириллицей — новые шрифты добавлять там же. Хардкод hex-ов в компонентах не нужен, кроме SVG-заливок.

`globals.css` — только токены и глобальные правила (текстура бумаги, `.fade-in`, `::selection`). Остальное — утилитами Tailwind.

Код: двойные кавычки, точки с запятой, два пробела, алиас `@/`. Компоненты и файлы — PascalCase, хуки — `useSomething.ts`. `"use client"` только там, где нужны браузерные API, эффекты или состояние (сейчас: Hero, Wishes, FadeInProvider, memo).

Тесты колокейтятся рядом (`Wishes.test.tsx`, `route.test.ts`). Компоненты тестируются через `renderToStaticMarkup` из `react-dom/server` — DOM-окружение не настроено.

## Процесс

Крупные фичи сначала описываются в `docs/superpowers/specs/`, затем в `docs/superpowers/plans/` — датированные файлы. Коммиты — короткие императивные сабджекты, для новых фич префикс `feat:`, для спек/планов `docs:`.

Проверять визуально на мобильной и десктопной ширине; `references/` (в gitignore) содержит исходники дизайна.
