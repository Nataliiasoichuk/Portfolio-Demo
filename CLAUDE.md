@AGENTS.md

# Портфоліо Nataliia Soichuk

## Стек

- Next.js (App Router) — версія має відмінності від звичної, див. `AGENTS.md`
- TypeScript
- Tailwind CSS
- Хостинг: Vercel

## Робота з Git

- Уся робота йде в гілці `main`.
- Нових гілок не створюй, поки я прямо не попрошу.
- Пуш у `main` публікує сайт (Vercel збирає кожен пуш), тому перед пушем питай мене.

## Токени

Єдине джерело значень: блок `@theme` у `src/app/globals.css`. У компонентах пишемо лише ці назви, без hex, rgb і значень у квадратних дужках. Стандартні кольори й розміри Tailwind скинуто, тому `bg-blue-600`, `text-sm`, `text-white` не працюють. Перегляд: Storybook, сторінка Foundations/Tokens.

- Кольори (за ролями): `canvas` (фон сторінки), `surface` (картки), `line` (розділювачі), `accent`, `ink` (текст), `ink-muted` (приглушений текст), `danger` (помилка). Класи: `bg-canvas`, `bg-surface`, `border-line`, `bg-accent`, `text-ink`, `text-ink-muted`, `text-danger`, `border-danger`.
- Контраст: на `surface` текст лише `ink`; `ink-muted` і `accent` там нижче 4,5:1. Текст помилки лише на `canvas`.
- Шрифти: `font-display` (Space Grotesk), `font-body` (Inter).
- Розміри тексту (розмір, висота рядка, трекінг і жирність разом): `text-caption`, `text-body`, `text-lead`, `text-heading`, `text-display`, `text-logo`.
- Радіуси: `rounded-control` (кнопки, поля), `rounded-card` (картки).
- Пропорції картинок: `aspect-portrait`, `aspect-portrait-card`.
- Ширина контенту сторінки: `max-w-page`.
- Відступи: крок 4 px, у компонентах лише числа 2, 3, 4, 6, 8 (8, 12, 16, 24, 32 px), наприклад `p-4`, `gap-6`.
- Ще немає: `aspect-cover` (обкладинка картки проєкту) і відстань між великими секціями. Радіус 12 px поки записаний числом у `hero.css`.

## Компоненти

Заповнимо далі.

## Правила

Заповнимо далі.

## Посилання

- План сайту: `План сайту-портфоліо.md` (у корені проєкту)
