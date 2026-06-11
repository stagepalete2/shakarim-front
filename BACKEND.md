# BACKEND.md — спецификация бэкенда для shakarim-front

Этот документ описывает, **каким должен быть бэкенд**, чтобы текущий фронт
заработал на реальных данных. Бэкенд делаем на **Django + Django REST
Framework (DRF)**.

Сейчас все экраны питаются мок-данными из `src/lib/*.js`. Эти файлы — и есть
контракт: задача бэкенда — отдавать **те же JSON-формы** по REST. Формы полей
ниже скопированы с этих файлов один-в-один; имена ключей менять нельзя (фронт
читает их напрямую).

## Принцип: полная кастомизация

**Ни один видимый пользователю текст, картинка, подпись, ярлык вкладки или
файл не должен быть «зашит» во фронте.** Всё, что видно на любой странице,
редактируется в админке бэкенда и приходит по API:

- тексты: заголовки, описания, eyebrow/subtitle, leads, подписи к картинкам
  (`caption`), названия вкладок (`label`), имена файлов (`name`);
- изображения: обложки, портреты, сканы, превью, баннеры — каждое отдельно
  редактируется и заменяется;
- файлы: PDF, аудио, вложения — загрузка/замена через админку;
- структурные элементы: пункты меню (header/footer), хлебные крошки,
  заголовки секций, соцсети, контент главной страницы.

То, что сейчас захардкожено прямо в JSX (breadcrumbs, `SectionHeader`
title/description, навигация, футер, вся главная, дефолтные заголовки
bio-секций), при переходе на бэкенд **тоже должно приехать с API** — см.
§6 «Глобальные настройки и страничный контент» и аудит в §7.

Где редактируется «контент» (тело статьи, описание вкладки архива,
текстовые блоки шәкәрімтану и т.п.) — используем **бесплатный CKEditor для
Django** (см. §4 «Богатый текст»).

---

## 1. Как фронт обращается к API

- HTTP-клиент — `axios` в [src/lib/api.js](src/lib/api.js):
  ```js
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "/api"
  ```
  То есть бэкенд должен жить на `${NEXT_PUBLIC_API_URL}` (в проде — например
  `https://api.shakarim.kz`), а в дев-режиме можно проксировать `/api`.
- Кэш/загрузка — **TanStack React Query** ([src/lib/query-client.js](src/lib/query-client.js),
  `staleTime: 60s`). Бэкенд должен быть идемпотентным на GET и дружелюбным к
  кэшу (стабильные ответы, корректные `ETag`/`Last-Modified` — желательно).
- Детальные страницы роутятся по **slug**, не по id:
  `/works/[slug]`, `/books/[slug]`, `/authors/[slug]`, `/archive/[slug]`,
  `/biography/[slug]` (статьи). Значит у этих сущностей `slug` — уникальный,
  стабильный, URL-безопасный, и именно он lookup-поле в API.

### Общие правила API

- Только **GET** на первом этапе (контент read-only; админка — через Django
  admin / CKEditor, не через публичный API).
- Формат — JSON, кодировка UTF-8 (контент на казахском и русском).
- **CORS**: разрешить origin фронта (`django-cors-headers`).
- **Медиа и файлы** (обложки, портреты, сканы, PDF, аудио) фронт ждёт по
  путям-строкам в полях `cover` / `photo` / `portrait` / `src` / `image` /
  `thumbnail` / `url`. Бэкенд должен возвращать **полный URL** (или путь,
  который резолвится от хоста медиа). Раздаём через `MEDIA_URL` (dev) или
  внешнее хранилище/CDN (prod).
- **Богатый текст**: поля `body` / `content` / `html` — это **HTML из
  CKEditor**, фронт рендерит его как есть через `ui/Prose`. Бэкенд хранит и
  отдаёт готовый санитизированный HTML-фрагмент (не Markdown, не JSON-блоки).
- **Список + деталь**: у каталожных сущностей две формы ответа — «карточка» в
  списке (лёгкая) и «полная» в детали. Поля детали — надмножество карточки.
- **Пагинация**: каталоги небольшие — допустимо отдавать полным списком
  (массив). Если включаете DRF-пагинацию, фронт ждёт **голый массив**, поэтому
  либо отключить пагинацию для этих списков, либо согласовать обёртку
  `{ results: [...] }` и поправить фронт. По умолчанию — **голый массив**.

---

## 2. Карта эндпоинтов

| Экран | Эндпоинт | Отдаёт |
|---|---|---|
| `/works` | `GET /api/works/` | массив work-карточек |
| `/works` | `GET /api/works/categories/` | категории со счётчиками |
| `/works/[slug]` | `GET /api/works/{slug}/` | полный work + `related` |
| `/books` | `GET /api/books/` | массив book-карточек |
| `/books` | `GET /api/books/categories/`, `GET /api/books/tags/` | категории/теги |
| `/books/[slug]` | `GET /api/books/{slug}/` | полный book + `related` |
| `/authors` | `GET /api/authors/` | массив авторов |
| `/authors/[slug]` | `GET /api/authors/{slug}/` | автор + `related` |
| `/archive` | `GET /api/archive/` | массив archive-карточек |
| `/archive` | `GET /api/archive/types/` | типы со счётчиками |
| `/archive/[slug]` | `GET /api/archive/{slug}/` | полный archive-item + `related` |
| `/biography` | `GET /api/biography/` | составной объект `BIO` |
| `/biography/[slug]` | `GET /api/articles/{slug}/` | статья + `related` |
| (лента статей) | `GET /api/articles/` | массив статей |
| `/shakarimtanu` | `GET /api/shakarimtanu/` | hero + sections (блоки) |
| `/tagzym` | `GET /api/tagzym/` | hero + sections (items) |
| `/media` | `GET /api/media/` | `{ videos, films, audio, photos }` |
| все страницы | `GET /api/settings/` | глобальные настройки (лого, меню, футер) |
| `/` (главная) | `GET /api/home/` | баннер, quick-nav, таймлайн, секции |
| любая страница | `GET /api/pages/{key}/` *(опц.)* | hero/breadcrumbs/section-header страницы |

Списочные эндпоинты могут поддерживать query-параметры фильтрации (см. ниже),
но фронт сейчас умеет фильтровать и клиентски — это не обязательно для MVP.

---

## 3. Контракты данных по ресурсам

Источник истины для каждого — соответствующий файл в `src/lib/`. Ниже —
обязательные/опциональные поля. `?` = опциональное.

### 3.1 Works — `src/lib/works.js`

Карточка и деталь (деталь = карточка + `tags`, `file`, `excerpt`):
```jsonc
{
  "id": 1,
  "slug": "ush-anyq",
  "title": "Үш анық",
  "year": 1925,
  "category": "Тарихи, танымдық еңбектері",   // одна из CATEGORIES
  "cover": "/images/works/ush-anyq.jpg",
  "description": "…",
  "tags": ["философия", "ар ілімі"],          // ? массив строк
  "file": { "url": "/files/works/ush-anyq.pdf", "size": "8.2 МБ" }, // ?
  "excerpt": "…"                                // ? короткая цитата
}
```
- `GET /api/works/categories/` → `[{ "name": "Поэмалары", "count": 7 }, …]`
  (см. `getCategoriesWithCounts`). Первая «категория» на фронте — «Барлығы»
  (все), её фронт добавляет сам по общему счётчику.
- Деталь содержит `related` (4 шт.) — работы той же `category`, исключая
  текущую (`getRelatedWorks`).

### 3.2 Books — `src/lib/books.js`

```jsonc
{
  "id": 1,
  "slug": "ush-anyq",
  "title": "Үш анық",
  "author": "Шәкәрім Құдайбердіұлы",   // автор книги/исследования
  "year": 1925,
  "category": "Шығармалары",            // одна из CATEGORIES
  "tags": ["философия", "классика"],
  "cover": "/images/books/ush-anyq.jpg",   // ?
  "description": "…",
  "file": { "url": "/files/books/ush-anyq.pdf", "size": "8.2 МБ" } // ?
}
```
- `GET /api/books/categories/` → категории со счётчиками.
- `GET /api/books/tags/` → плоский список всех тегов (`getAllTags`).
- Поиск (`searchBooks`) идёт по `title + author + description + tags`. Если
  делаете серверный поиск — `GET /api/books/?search=…` с той же семантикой.
- Деталь → `related` (4 шт.) той же категории.

### 3.3 Authors — `src/lib/authors.js`

Внимание: у авторов `id` — **строка и равна slug**.
```jsonc
{
  "id": "esim",
  "slug": "esim",
  "name": "Ғарифолла Есім",
  "role": "Философ, академик",
  "years": "1947 ж.т.",                 // ? строка-период
  "bio": "…",                            // ?
  "photo": "/images/authors/esim.jpg",   // ?
  "tags": ["философия", "академиялық"]   // ?
}
```
- Поиск (`searchAuthors`) — по `name + role + bio + tags`.
- Деталь → `related` (4 шт.), напр. с пересечением тегов.

### 3.4 Archive — `src/lib/archive.js`

Типы (`ARCHIVE_TYPES`): `manuscript`, `photo`, `letter`, `audio`, `video`.
```jsonc
// GET /api/archive/types/  → типы со счётчиками (getTypesWithCounts)
{ "id": "manuscript", "label": "Қолжазбалар", "short": "Қолжазба",
  "description": "…", "count": 6 }
```
Item (карточка = базовые поля; деталь добавляет `gallery`, `files`, `tabs`):
```jsonc
{
  "id": 1,
  "slug": "ush-anyq-manuscript",
  "type": "manuscript",                 // id типа
  "title": "«Үш анық» қолжазбасы",
  "year": "1925",                        // строка
  "cover": "/images/archive/ush-anyq-ms.jpg",
  "location": "ҚР Орталық мемлекеттік мұрағаты",
  "description": "…",

  "gallery": [                           // ? сканы, открываются в lightbox
    { "src": "…", "caption": "Беті 1" }
  ],
  "files": [                             // ? вложения
    { "name": "…", "url": "…", "size": "12.4 МБ", "type": "pdf",
      "description": "…" }              // size/type/description — ?
  ],
  "tabs": [                              // ? смысловые вкладки (CMS-формат)
    { "id": "about", "label": "Сипаттама", "description": "…",
      "content": "<p>HTML из CKEditor…</p>" }  // description/content — ?
  ]
}
```
- `gallery` и `files` — атрибуты самого item. `tabs` — разные «прочтения»
  (транскрипт, перевод, история), каждое со своим HTML `content`.
- Деталь → `related` (3 шт.) того же `type` (`getRelatedArchive`).

### 3.5 Articles (статьи биографии) — `src/lib/articles.js`

```jsonc
{
  "id": 1,
  "slug": "ush-anyq-three-truths",
  "title": "…",
  "tags": ["Философия", "Үш анық"],
  "author": "А. Каирбекова",
  "date": "2026-04-22",                  // ISO-дата
  "cover": "/images/articles/ush-anyq.jpg",
  "body": "<p>HTML из CKEditor…</p>"     // тело статьи
}
```
- Деталь → `related` (3 шт., `getRelatedArticles`).

### 3.6 Biography — `src/lib/biography.js`

Один **составной объект** `BIO`. Каждая секция опциональна — если данных нет,
бэкенд может вернуть `null`/пропустить ключ, компоненты это переживут.
```jsonc
{
  "hero": { "title": "…", "lifespan": "1858 — 1931", "lead": "…",
            "portrait": "/images/biography/hero-portrait.jpg",
            "eyebrow": "…", "subtitle": "…" },   // eyebrow/subtitle — ?

  "chronology": [
    { "year": 1858, "title": "…", "description": "…",
      "image": "…", "media": "…" }               // image/media — ?
  ],

  "environment": {
    "intro": "…",
    "paragraphs": ["…", "…"],
    "quote": { "text": "…", "attribution": "…" },  // ?
    "facts": [ { "label": "Туған жылы", "value": "1858" } ],
    "images": [ { "src": "…", "caption": "…" } ]
  },

  "familyTree": {
    "root": {                                       // рекурсивный узел
      "name": "Құдайберді", "relation": "Әкесі", "description": "…",
      "portrait": "…",                              // ?
      "children": [ { /* такой же узел */ } ]       // ? рекурсия
    }
  },

  "memories": [
    { "text": "…", "source": "…", "year": 1929, "image": "…" } // кроме text — ?
  ],

  "descendants": [
    { "name": "…", "relation": "Ұлы", "bio": "…", "image": "…" } // image — ?
  ],

  "political": {
    "intro": "…",
    "events": [ { "year": 1905, "title": "…", "description": "…",
                  "image": "…", "citation": "…" } ], // image/citation — ?
    "quote": { "text": "…", "attribution": "…" }      // ?
  },

  "intellectual": {
    "intro": "…",
    "influences": [ { "name": "Абай", "era": "1845 — 1904",
                      "contribution": "…", "quote": "…", "portrait": "…" } ],
    "works": [ { "title": "…", "year": 1925, "type": "Философия" } ]
  }
}
```
> Примечание: блок `intellectual.works` фронт сейчас не рендерит (секцию
> «Шығармалар жолы» убрали) — поле можно не наполнять, но ломать структуру
> не нужно.

### 3.7 Shakarimtanu — `src/lib/shakarimtanu.js`

`hero` + `sections[]`. Секция содержит **полиморфные блоки** `blocks[]` —
ключевой момент для сериализации (см. §4).
```jsonc
{
  "hero": { "eyebrow": "Ғылыми бағыт", "title": "Шәкәрімтану", "lead": "…" },
  "sections": [
    {
      "id": "genesis",
      "title": "Генезис",
      "subtitle": "…",
      "lead": "…",
      "blocks": [
        { "type": "text",       "html": "<p>…</p>" },
        { "type": "milestones", "title": "…",
          "items": [ { "year": "1931", "title": "…", "description": "…" } ] },
        { "type": "stats",
          "items": [ { "value": "27", "label": "тыйым жылы" } ] },
        { "type": "people", "title": "…",
          "items": [ { "name": "…", "years": "…", "role": "…",
                       "bio": "…", "portrait": "…" } ] },
        { "type": "image", "src": "…", "caption": "…", "ratio": "16 / 9" },
        { "type": "pdf", "title": "…",
          "items": [ { "name": "…", "url": "…", "size": "…",
                       "author": "…", "description": "…" } ] }
      ]
    }
  ]
}
```
Типы блоков: `text`, `milestones`, `stats`, `people`, `image`, `pdf`.
Поле `type` — дискриминатор; набор остальных полей зависит от него.

### 3.8 Tagzym — `src/lib/tagzym.js`

`hero` + `sections[]`, где у секции простой `items[]` (без полиморфизма).
```jsonc
{
  "hero": { "eyebrow": "Тағзым", "title": "Шәкәрім ізі", "lead": "…" },
  "sections": [
    { "id": "organizations", "title": "Ұйым атауы", "subtitle": "…",
      "items": [
        { "title": "…", "image": "…", "year": "…",
          "location": "…", "description": "…" }   // year/location — ?
      ] }
  ]
}
```
Секции: `organizations`, `streets`, `awards`.

### 3.9 Media — `src/lib/media.js`

Объект из 4 списков. Общие поля item (кроме `id`+`title` все ?):
`id, title, author?, year?, date?, description?, thumbnail?, duration?,
tags?, links?[{label,url}], attachments?[{name,url,size?,type?}]`.
Типо-специфичные:
- `videos` / `films`: `videoUrl` (YouTube/Vimeo URL — фронт сам извлечёт embed)
- `audio`: `audioUrl` + `cover`
- `photos`: `src` + `caption` + `description`
```jsonc
{
  "videos": [ { "id": "v1", "title": "…", "author": "…", "year": 2018,
                "date": "2018-09-12", "duration": "48:21",
                "thumbnail": "…", "videoUrl": "https://youtu.be/…",
                "description": "…", "tags": ["…"],
                "links": [ { "label": "…", "url": "…" } ] } ],
  "films":  [ /* как videos */ ],
  "audio":  [ { "id": "a1", "title": "…", "audioUrl": "…", "cover": "…" } ],
  "photos": [ { "id": "p1", "title": "…", "src": "…",
                "caption": "…", "description": "…" } ]
}
```
> Вкладки медиа-страницы (`MEDIA_TABS`) — статичны на фронте (ярлыки секций),
> бэкенду их отдавать не нужно. Поле `number` из вкладок убрано — не вводить.

---

## 4. Заметки по реализации (Django + DRF)

### Деление на приложения

Одно Django-app на ресурс (или сгруппировать):
`works`, `books`, `authors`, `archive`, `articles`, `biography`,
`shakarimtanu`, `tagzym`, `media`. Плюс общий `core` (настройки, CORS,
утилиты).

### Модели — основные ориентиры

- **Slug** у works/books/authors/archive/articles — `SlugField(unique=True)`,
  `lookup_field = "slug"` во `ViewSet`. У authors PK можно сделать строковым
  slug (фронт ждёт `id == slug`) либо отдавать оба поля одинаковыми.
- **Категории/типы** works/books/archive — отдельные таблицы или `choices`.
  Эндпоинты `…/categories/` и `…/types/` отдают список с `count` (аннотация
  `Count` по связанным объектам).
- **Файлы** (`file`, `files`, `attachments`) — модель с `url`/`size`/`type`.
  `size` фронт показывает как **готовую строку** («8.2 МБ»), а не байты —
  либо храните строкой, либо форматируйте в сериализаторе.
- **Медиа-пути** — `ImageField`/`FileField` + сериализатор, отдающий
  абсолютный URL (`request.build_absolute_uri` или `MEDIA_URL`/CDN).

### Богатый текст — бесплатный CKEditor на Django

Для всех полей с форматируемым контентом используем **бесплатный CKEditor**:
- **`django-ckeditor`** (CKEditor 4 LTS, open-source) — самый простой путь,
  даёт виджет в Django admin + загрузку картинок (`ckeditor_uploader`); либо
- **`django-ckeditor-5`** (CKEditor 5, GPL/бесплатный) — современнее.

Берём бесплатную сборку без платных премиум-плагинов. Поле в модели —
`RichTextField` / `CKEditor5Field` (по сути `TextField`, хранящий HTML).

**Какие поля — это CKEditor-HTML (форматируемый контент):**

| Ресурс | Поле | Назначение |
|---|---|---|
| articles (биография) | `body` | тело статьи |
| archive item → tabs | `tab.content` | текст вкладки (транскрипт/перевод/история) |
| shakarimtanu → blocks | блок `{ "type": "text", "html": … }` | текстовый блок секции |

Остальные текстовые поля (`title`, `description`, `lead`, `subtitle`,
`caption`, `label`, `name` и т.п.) — **обычный текст** (`CharField`/
`TextField`), не CKEditor: фронт выводит их как строки. CKEditor — только там,
где нужна разметка (абзацы, заголовки, списки, цитаты, ссылки, выделения).

HTML из CKEditor фронт рендерит **как есть** через `ui/Prose` — поэтому
**санитизировать на входе** (bleach / встроенный allow-list CKEditor), чтобы
не пускать небезопасную разметку и `<script>`.

### Полиморфные блоки shakarimtanu (§3.7)

`blocks` — упорядоченный список разнотипных блоков. Варианты:
1. Модель `Block` с полем `type` + `JSONField data`, сортировка `order`.
   Сериализатор просто отдаёт `{ "type": …, …data }`.
2. Отдельные модели на тип блока + полиморфный сериализатор, склеивающий
   их в один упорядоченный массив.
Рекомендация для MVP — вариант 1 (`type` + `JSONField`): проще всего точно
воспроизвести форму, фронт уже диспетчеризует по `type`.

### Составные эндпоинты

`biography`, `shakarimtanu`, `tagzym`, `media` — это **один объект**, не
список. Делать через `APIView`/`@api_view`, собирающий вложенную структуру
(можно из БД, можно временно из фикстур), а не `ModelViewSet`.

### Связанные (`related`)

Деталь каждого каталога вкладывает `related`. Считать в сериализаторе/вью по
тем же правилам, что хелперы фронта (`getRelatedWorks` и т.д.): та же
категория/тип/пересечение тегов, исключая текущий, лимит 3–4. Альтернатива —
отдельный `GET …/{slug}/related/`, но вложенный массив экономит запрос.

### Пагинация и формат списков

Фронт ждёт **голый массив** на списках. Если используете
`DEFAULT_PAGINATION_CLASS`, переопределите/выключите для этих вью, либо
согласуйте с фронтом обёртку. По умолчанию — без пагинации.

### Django settings.py (минимум)

- `INSTALLED_APPS`: `rest_framework`, `corsheaders`, `ckeditor`
  (+`ckeditor_uploader`) или `django_ckeditor_5`, приложения ресурсов.
- `corsheaders.middleware.CorsMiddleware` + `CORS_ALLOWED_ORIGINS` = origin
  фронта.
- `MEDIA_URL` / `MEDIA_ROOT` (dev) или storage-бэкенд (S3/CDN, prod).
- `REST_FRAMEWORK`: дефолтный рендерер JSON; пагинация — см. выше.
- Локализация контента — UTF-8; БД — PostgreSQL (рекомендуется для full-text
  поиска V2).

### Поиск и фильтры (V1 → V2)

- V1: можно вернуть полные списки и фильтровать на клиенте (как сейчас).
- V2: серверные `?search=`, `?category=`, `?tag=`, `?type=` через
  `django-filter` / `SearchFilter`; полнотекстовый поиск (`title`, `author`,
  `description`, `tags`, тело статей) на PostgreSQL.

---

## 5. Порядок внедрения

1. Поднять Django + DRF + CORS, отдать `GET /api/works/` голым массивом
   (форма из §3.1) → подключить на фронте через `api` + React Query вместо
   импорта `WORKS`.
2. Повторить для остальных каталогов (`books`, `authors`, `archive`,
   `articles`) с деталью по slug и `related`.
3. Составные эндпоинты (`biography`, `shakarimtanu`, `tagzym`, `media`).
4. Метаданные (`categories`, `types`, `tags`), затем серверные фильтры/поиск.
5. Медиахранилище/CDN для обложек, сканов, PDF, аудио.

Главный инвариант: **ключи и форма JSON совпадают с `src/lib/*.js`** — тогда
замена мок-импорта на запрос к API не требует менять компоненты.

---

## 6. Глобальные настройки и страничный контент

Это часть, которой **ещё нет в `src/lib/`** — сейчас она захардкожена прямо в
JSX (см. аудит §7). Для полной кастомизации её тоже нужно отдавать с бэка.

### 6.1 Глобальные настройки — `GET /api/settings/`

Один объект-синглтон (в админке — модель с единственной записью):
```jsonc
{
  "logo": "/icons/logo.png",          // используется в header и footer
  "siteTitle": { "line1": "Shakarim", "line2": "Kudaiberdiuly" },

  "mainNav": [                         // верхнее меню (nav.js → MAIN_NAV)
    { "label": "Ғұмырнама", "href": "/biography" }
  ],
  "subNav": [                          // доп. меню (nav.js → SUB_NAV)
    { "label": "Медиа", "href": "/media" },
    { "label": "Шәкәрім чат-бот", "href": "#" }
  ],

  "footer": {
    "navLinks": [ { "label": "О проекте", "href": "#" } ],
    "socials": [ { "label": "Telegram", "href": "https://t.me/…",
                   "network": "telegram" } ],   // network → иконка на фронте
    "copyright": "Университет Шакарим"
  }
}
```
- `socials[].network` — ключ для выбора иконки (`telegram`, `whatsapp`,
  `instagram`, `tiktok`). Иконки — это SVG-компоненты на фронте; бэкенд задаёт
  лишь сеть + ссылку, добавление новой сети = новая иконка во фронте.
- `href` могут быть как внутренними (`/works`), так и внешними (`https://…`).

### 6.2 Контент страниц-обёрток — `GET /api/pages/{key}/` *(опц., но желательно)*

Каждая страница имеет «шапочную» обвязку, которая сейчас зашита в JSX:
**breadcrumbs**, **hero** (для biography/shakarimtanu/tagzym) или
**section-header** (для works/books/authors/archive/media). Чтобы их можно было
редактировать — отдаём по ключу страницы (`works`, `books`, `authors`,
`archive`, `media`, `biography`, `shakarimtanu`, `tagzym`):
```jsonc
{
  "breadcrumbs": [
    { "label": "Главная", "href": "/" },
    { "label": "Шығармалары" }          // последний — без href (текущая)
  ],
  // вариант A — страницы-каталоги (works/books/authors/archive/media):
  "sectionHeader": { "eyebrow": "Архив", "title": "Архив және қолжазба",
                     "description": "…" },   // eyebrow/description — ?
  // вариант B — страницы с PageHero (biography/shakarimtanu/tagzym):
  "hero": { "eyebrow": "…", "title": "…", "lead": "…",
            "portrait": "…", "lifespan": "…" },
  "tone": "museum"                       // museum | academic | memorial
}
```
Проще всего: **вложить эту обвязку прямо в основной ответ** ресурса. Напр.
`GET /api/biography/` уже содержит `hero` (§3.6) — добавьте туда `breadcrumbs`
и `tone`. Для каталогов — пусть `GET /api/works/` вернёт не голый массив, а
`{ "page": { breadcrumbs, sectionHeader }, "items": [...] }` **по согласованию
с фронтом** (это меняет форму ответа — см. оговорку про «голый массив» в §1).
Если меняем — правим и фронт. На MVP допустимо оставить обвязку статикой и
переносить постепенно.

Также **дефолтные заголовки/eyebrow секций биографии** (`bio-chronology` →
«Өмірбаян сүрлеуі», `bio-family-tree` → «Құнанбай әулеті» и т.д.) сейчас живут
как дефолты пропсов в компонентах. Чтобы их можно было переименовать — отдавать
`title`/`eyebrow` каждой секции в объекте `BIO` (§3.6), напр.
`biography.chronology` → `{ "title": "…", "eyebrow": "…", "items": [...] }`.

### 6.3 Главная страница — `GET /api/home/`

Самая «контентная» страница, сейчас целиком захардкожена в
[home.jsx](src/screens/home/home.jsx). Составной объект:
```jsonc
{
  "banner": {                              // фоновое ВИДЕО + наложенный текст
    "video": "/videos/sample_banner.mp4",  // mp4-фон (компонент Banner)
    "eyebrow": "1858 — 1931",
    "title": "Шәкәрім Құдайбердіұлы",
    "tagline": "Ақын • Философ • Сазгер",
    "quote": "«Үш анық»: Ынсап • Ұят • Әділет"
  },

  "chronology": [                          // таймлайн жизни на главной
    { "year": 1858, "label": "Детство", "title": "…", "description": "…",
      "image": "…" } ],
  "worldEvents": [                         // фон таймлайна — мировые события
    { "year": 1839, "label": "Изобретение фотографии", "icon": "camera" } ],
  // icon — ключ из фиксированного набора SVG на фронте (camera, phone,
  // bulb, film, atom, helmet, star, peace). Новый ключ = новая иконка во фронте.

  "quickNav": [                            // плитки быстрых разделов
    { "title": "Художественные фильмы", "image": "…", "href": "#" } ],

  "sections": {                            // заголовки секций-витрин главной
    "books":   { "title": "Библиотека" },
    "media":   { "title": "Медиаматериалы" },
    "authors": { "title": "Наши авторы" },
    "chronology": { "title": "Хронология жизни", "description": "…" }
  }
}
```
Витрины «Библиотека / Медиа / Авторы» на главной могут переиспользовать
основные эндпоинты (`/api/books/?limit=…` и т.п.) либо отдавать готовые
сокращённые списки внутри `/api/home/` — на усмотрение реализации.

---

## 7. Аудит: что сейчас захардкожено и должно приехать с бэка

Чтобы выполнить принцип полной кастомизации (см. «Принцип» в начале), вот всё, что на момент
написания зашито в компонентах, а не в данных:

| Где | Что захардкожено | Куда переносим |
|---|---|---|
| `src/lib/nav.js` | `MAIN_NAV`, `SUB_NAV` | `/api/settings/` → `mainNav`, `subNav` |
| `layout/footer` | ссылки, соцсети, «Shakarim Kudaiberdiuly», копирайт | `/api/settings/` → `footer`, `siteTitle` |
| `layout/header` | логотип, `siteTitle` | `/api/settings/` |
| каждый экран-список | `const BREADCRUMBS` | `/api/pages/{key}/` → `breadcrumbs` |
| детальные экраны | `const breadcrumbs` (work/book/author/archive/article) | строятся из данных сущности (title) + статический префикс → отдавать `breadcrumbs` в ответе детали |
| works/books/authors/archive/media | `SectionHeader title/description/eyebrow` | `/api/pages/{key}/` → `sectionHeader` |
| biography/shakarimtanu/tagzym | `tone`, breadcrumbs у `PageHero` | в ответ ресурса → `tone`, `breadcrumbs` |
| bio-секции | дефолтные `title`/`eyebrow` в пропсах | в объект `BIO` по секциям (§6.2) |
| архив-деталь | `title="Сканер беттері"`, `title="Файлдар"` | подписи блоков — в ответ или `/api/settings/` (UI-строки) |
| статьи/архив | `"Похожие статьи"`, `"Ұқсас жазбалар"`, `"Вложения"` | UI-подписи; вынести в `/api/settings/` или i18n-словарь |
| `home.jsx` | баннер, quick-nav, мировые события, таймлайн, заголовки витрин | `/api/home/` (§6.3) |

> UI-«хром» (aria-label кнопок «Жабу», «Алдыңғы»/«Келесі», «Тег сүзгісі»)
> можно оставить во фронте или вынести в общий словарь локализации — это не
> контент, а интерфейсные подписи; на усмотрение команды.

Главный инвариант полной кастомизации: **редактор в админке может поменять
любой видимый текст, картинку, подпись вкладки и файл без правок фронта.**
