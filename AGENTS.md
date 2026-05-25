<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# UI conventions

- **Mobile-first.** Базовые стили компонентов пишутся под мобильные экраны. Расширения — через `@include media-up(...)` из `src/styles/_mixins.scss` (медиа-запросы только `min-width`). Не использовать `max-width`-запросы.
- Стили — SCSS-модули (`*.module.scss`) рядом с компонентом; глобальные — в `src/app/globals.scss`. Никакого Tailwind.

## Структура компонентов

UI устроен как атомарная внутренняя библиотека.

```
src/components/
  ui/<name>/<name>.jsx + <name>.module.scss   ← атомы (Logo, NavLink, LangSwitcher…)
  layout/<name>/<name>.jsx + <name>.module.scss  ← композиции (Header, Footer…)
  providers/<name>/…                           ← React-провайдеры
```

**Правила атомов (`ui/*`):**
- Никаких внешних `margin` / позиционирования — за расстояние между соседями отвечает родитель.
- Не знает о контейнере и не делает `@media`, чтобы себя спрятать или ужать. Это решение родителя.
- Controlled API: состояние и колбэки через props (`value`/`onChange`, `isOpen`/`onClick`). Никакого внутреннего `useState` для прикладного состояния.
- Варианты — через props (`size`, `direction`), применяются классами `styles[\`size-\${size}\`]`.
- Принимает `className` и пробрасывает `...rest` на корневой элемент.
- `'use client'` — только если есть хуки/эффекты. Колбэки в props сами по себе не делают атом клиентским.

**Композиции (`layout/*`)** владеют состоянием, выбирают раскладку, прячут/показывают части по медиа-запросам в своём `.module.scss`.

## Страницы

Страничные модули лежат в **`src/screens/<screen>/`** (не в `src/pages/` — это бы активировало Pages Router и сломало App Router).

```
src/screens/<screen>/
  <screen>.jsx          ← композиция страницы
  <screen>.module.scss
  components/           ← компоненты, нужные только этой странице
    <local>/<local>.jsx + <local>.module.scss
```

- `src/app/.../page.js` — **тонкая обёртка**: импортирует экран из `screens/` и рендерит, без логики и стилей.
- В `screens/<screen>/components/` кладём только локальные компоненты. Как только что-то понадобилось второй странице — поднимаем в `src/components/ui/` (атом) или `src/components/layout/` (композиция).
