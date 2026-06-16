# API.md — документация API для фронта

Справочник по всем эндпоинтам бэкенда Shakarim: методы, пути, параметры, права
доступа, формы ответов. Контракт форм данных — из `src/lib/*.js` фронта (см.
[BACKEND.md](BACKEND.md) §3); архитектура — [BACKEND.md](BACKEND.md) §8.

---

## Общие правила

- **Base URL:** `${NEXT_PUBLIC_API_URL}` (в дев — `/api`, в проде — напр.
  `https://api.shakarim.kz`). Все пути ниже даны от `/api`.
- **Методы:** только **GET** (контент read-only). Запись — через Django admin
  (`/admin/`), не через публичный API.
- **Права доступа:** все GET-эндпоинты **публичные, без авторизации**
  (`AllowAny`). Токен/куки не нужны. Заголовки авторизации игнорируются.
- **Формат:** JSON, UTF-8 (контент на казахском/русском). `Content-Type:
  application/json`.
- **CORS:** разрешён origin фронта (`CORS_ALLOWED_ORIGINS`, по умолчанию
  `http://localhost:3000`). Меняется через env, без правок кода.
- **Пагинация:** выключена — **списки возвращаются голым массивом** `[...]`,
  без обёртки `{results, count}`.
- **Медиа (`cover`, `photo`, `portrait`, `src`, `image`, `url`, `video`,
  `logo`):** возвращается **абсолютный URL** (`http://host/media/...`) или
  `null`, если файл не загружен.
- **Богатый текст (`body`, `content`, `html`):** готовый **HTML** из CKEditor,
  рендерить как есть (`ui/Prose`).
- **Опциональные поля:** если данных нет — приходит `null`, `""` или `[]`
  (компоненты это переживают). В таблицах ниже `?` = может быть пустым.
- **Кэш:** ответы стабильны и идемпотентны (дружелюбны к React Query
  `staleTime`).

### Коды ответов

| Код | Когда |
|---|---|
| `200` | успех |
| `404` | объект по `slug`/`key` не найден → тело `{ "detail": "…" }` |
| `400` | (потенциально) некорректный запрос |
| `5xx` | ошибка сервера |

### Конвенция «список + деталь»

У каталогов две формы: **карточка** (лёгкая, в списках) и **деталь**
(карточка + доп. поля + `related`). Поля детали — надмножество карточки.
Детальные страницы ищутся **по `slug`** (а не по `id`).

---

## 1. Works — Шығармалар

| Метод | Путь | Описание |
|---|---|---|
| GET | `/works/` | массив карточек |
| GET | `/works/categories/` | категории со счётчиками |
| GET | `/works/{slug}/` | полная работа + `related` |

**Карточка:**
```jsonc
{
  "id": 1,
  "slug": "ush-anyq",
  "title": "Үш анық",
  "year": 1925,                                  // ? число
  "category": "Тарихи, танымдық еңбектері",       // строка-имя категории
  "cover": "http://host/media/works/covers/x.jpg",// ? абс. URL
  "description": "…"
}
```
**Деталь** = карточка + :
```jsonc
{
  "tags": ["философия", "ар ілімі"],             // массив строк
  "file": { "url": "http://host/media/…pdf", "size": "8.2 МБ" }, // ? или null
  "excerpt": "…",                                 // ? строка

  // === Литературный архив (миграция mura) — все поля опциональны ===
  "body": "…",             // текст произведения: HTML (CKEditor) ИЛИ текст с \n (стихи)
  "history": "<p>…</p>",   // ? история (HTML)
  "textology": "<p>…</p>", // ? текстология (HTML)
  "speaker": "…",          // ? декламатор/чтец
  "school_book": "…",      // ? отметка о школьной программе
  "audio": "http://…mp3",  // ? абс. URL аудио или null
  "video_url": "https://youtu.be/…",                         // ? YouTube/Vimeo URL
  "gallery": [ { "src": "http://…", "caption": "…" } ],       // ? сканы/иллюстрации
  "glossary": [ { "word": "…", "definition": "<p>…</p>" } ],  // ? словарь; definition — HTML
  "commentaries": [ { "author": "…", "body": "<p>…</p>" } ],  // ? түсініктемелер; body — HTML

  "related": [ /* 4 карточки той же категории */ ]
}
```
> Деталь рендерится вкладками (показываются только заполненные): текст (`body`),
> «Тарихы» (`history`), «Текстология», «Түсініктемелер» (`commentaries`),
> «Сөздік» (`glossary`), «Медиа» (`gallery`+`video_url`+`audio`), PDF (`file`).
> `body` фронт показывает как HTML (если есть теги) либо как текст с переносами
> строк (стихи). `history`/`textology`/`commentary.body`/`glossary.definition` —
> rich-text (CKEditor).
**`/works/categories/`:**
```jsonc
[ { "category": "Поэмалары", "count": 7 } ]
```
> Ключ — **`category`** (фронт читает `c.category`), не `name`. Отдаются **все**
> категории, в т.ч. с `count: 0` (полный список жанров).
> «Барлығы» (все) фронт добавляет сам по общему счётчику — бэк её не отдаёт.

---

## 2. Books — Кітаптар / зерттеулер

| Метод | Путь | Параметры | Описание |
|---|---|---|---|
| GET | `/books/` | `?search=` *(опц.)* | массив карточек |
| GET | `/books/categories/` | — | категории со счётчиками |
| GET | `/books/tags/` | — | теги со счётчиками |
| GET | `/books/{slug}/` | — | полная книга + `related` |

**`?search=`** — серверный поиск по `title + author + description + tags`
(те же правила, что `searchBooks` на фронте). Без параметра — весь список.

**Карточка:**
```jsonc
{
  "id": 1,
  "slug": "ush-anyq",
  "title": "Үш анық",
  "author": "Шәкәрім Құдайбердіұлы",   // ?
  "year": 1925,                         // ?
  "category": "Шығармалары",
  "tags": ["философия", "классика"],
  "cover": "http://host/…jpg",          // ? или null
  "description": "…",
  "file": { "url": "http://host/…pdf", "size": "8.2 МБ" } // ? или null
}
```
**Деталь** = карточка + `"related": [ /* 4 той же категории */ ]`.

**`/books/tags/`:** массив объектов `{ tag, count }`, отсортированный по
убыванию частоты (как `getAllTags` на фронте):
```jsonc
[ { "tag": "философия", "count": 5 }, { "tag": "классика", "count": 3 } ]
```

---

## 3. Authors — Авторлар

| Метод | Путь | Параметры | Описание |
|---|---|---|---|
| GET | `/authors/` | `?search=` *(опц.)* | массив авторов |
| GET | `/authors/{slug}/` | — | автор + `related` |

> Внимание: у авторов **`id` — строка и равна `slug`**.

**`?search=`** — по `name + role + bio + tags`.

**Карточка:**
```jsonc
{
  "id": "esim",
  "slug": "esim",
  "name": "Ғарифолла Есім",
  "role": "Философ, академик",      // ?
  "years": "1947 ж.т.",             // ? строка-период
  "bio": "…",                       // ?
  "photo": "http://host/…jpg",      // ? или null
  "tags": ["философия", "академиялық"]
}
```
**Деталь** = карточка + :
```jsonc
{
  "fullBio": "<p>HTML из CKEditor…</p>",      // ? полная биография (вкладка «Биография»)
  "works": [ { "title": "…", "year": 2008,    // ? труды автора (вкладка «Жұмыстары»)
               "type": "Монография" } ],       //   year/type — ?
  "quotes": [ { "text": "…", "source": "…" } ],// ? цитаты (вкладка «Цитаталар»); source — ?
  "related": [ /* 4, по пересечению тегов */ ]
}
```
> `fullBio` — rich-text (CKEditor), рендерится через `ui/Prose`. Если не задан —
> фронт показывает короткий `bio` из карточки. Вкладки `works`/`quotes`
> скрываются, когда массив пуст.

---

## 4. Articles — Мақалалар (статьи биографии)

| Метод | Путь | Описание |
|---|---|---|
| GET | `/articles/` | массив карточек |
| GET | `/articles/{slug}/` | статья + `related` |

> Деталь питает фронтовый роут `/biography/{slug}`.

**Карточка:**
```jsonc
{
  "id": 1,
  "slug": "ush-anyq-three-truths",
  "title": "…",
  "tags": ["Философия", "Үш анық"],
  "author": "А. Каирбекова",        // ?
  "date": "2026-04-22",             // ? ISO-дата (YYYY-MM-DD) или null
  "cover": "http://host/…jpg"       // ? или null
}
```
**Деталь** = карточка + :
```jsonc
{
  "body": "<p>HTML из CKEditor…</p>",      // тело статьи
  "related": [ /* 3, по пересечению тегов */ ]
}
```

---

## 5. Archive — Архив және қолжазба

| Метод | Путь | Описание |
|---|---|---|
| GET | `/archive/` | массив карточек |
| GET | `/archive/types/` | типы со счётчиками |
| GET | `/archive/{slug}/` | полный item + `related` |

**Карточка:**
```jsonc
{
  "id": 1,
  "slug": "ush-anyq-manuscript",
  "type": "manuscript",                 // id типа (см. /archive/types/)
  "title": "«Үш анық» қолжазбасы",
  "year": "1925",                        // строка
  "cover": "http://host/…jpg",          // ? или null
  "location": "ҚР Орталық мемлекеттік мұрағаты", // ?
  "description": "…"
}
```
**Деталь** = карточка + :
```jsonc
{
  "gallery": [ { "src": "http://host/…jpg", "caption": "Беті 1" } ], // сканы (lightbox)
  "files": [
    { "name": "…", "url": "http://host/…pdf",
      "size": "12.4 МБ", "type": "pdf", "description": "…" }   // size/type/description ?
  ],
  "tabs": [
    { "id": "about", "label": "Сипаттама", "description": "…",
      "content": "<p>HTML из CKEditor…</p>" }                  // description/content ?
  ],
  "related": [ /* 3 того же типа */ ]
}
```
**`/archive/types/`:**
```jsonc
[ { "id": "manuscript", "label": "Қолжазбалар", "short": "Қолжазба",
    "description": "…", "count": 6 } ]
```
Типы: `manuscript`, `photo`, `letter`, `audio`, `video`.

---

## 6. Shakarimtanu — Шәкәрімтану *(составной объект)*

| Метод | Путь | Описание |
|---|---|---|
| GET | `/shakarimtanu/` | hero + sections (полиморфные блоки) |

```jsonc
{
  "hero": { "eyebrow": "Ғылыми бағыт", "title": "Шәкәрімтану", "lead": "…" },
  "sections": [
    {
      "id": "genesis",          // ключ секции
      "title": "Генезис",
      "subtitle": "…",          // ?
      "lead": "…",              // ?
      "blocks": [ /* см. ниже */ ]
    }
  ]
}
```
**Блоки `blocks[]` полиморфны — диспетчеризуются по полю `type`:**

| `type` | Поля блока |
|---|---|
| `text` | `{ "type":"text", "html": "<p>…</p>" }` *(допустимо `content` вместо `html`)* |
| `quote` | `{ "type":"quote", "text":"…", "attribution":"…", "source":"…" }` *(attribution/source — ?)* |
| `image` | `{ "type":"image", "src":"http://host/…", "caption":"…", "ratio":"16 / 9" }` *(caption/ratio — ?)* |
| `gallery` | `{ "type":"gallery", "title":"…", "items":[{ "src","caption" }] }` *(title/caption — ?)* |
| `video` | `{ "type":"video", "url":"https://youtu.be/…", "title":"…", "caption":"…", "provider":"YouTube" }` |
| `pdf` | `{ "type":"pdf", "title":"…", "items":[{ "name","url","size","author","description" }] }` |
| `people` | `{ "type":"people", "title":"…", "items":[{ "name","years","role","bio","portrait" }] }` |
| `stats` | `{ "type":"stats", "items":[{ "value","label" }] }` |
| `milestones` | `{ "type":"milestones", "title":"…", "items":[{ "year","title","description" }] }` |
| `concepts` | `{ "type":"concepts", "title":"…", "items":[{ "title","subtitle","symbol","description" }] }` *(subtitle/symbol/description — ?)* |

> Всего **10 типов** — неизвестные фронт тихо игнорирует. У `image`/`gallery`
> `src` — абс. URL загруженной картинки (или `null`). Блок `video` использует
> поле **`url`** (не `videoUrl`, как в /media). Поля внутри `items` —
> как их ввёл редактор (портреты/ссылки — строки).

---

## 7. Tagzym — Тағзым *(составной объект)*

| Метод | Путь | Описание |
|---|---|---|
| GET | `/tagzym/` | hero + sections (простые items) |

```jsonc
{
  "hero": { "eyebrow": "Тағзым", "title": "Шәкәрім ізі", "lead": "…" },
  "sections": [
    {
      "id": "organizations",     // organizations | streets | awards
      "title": "Ұйым атауы",
      "subtitle": "…",           // ?
      "items": [
        { "title": "…", "image": "http://host/…", "year": "…",
          "location": "…", "description": "…" }   // image/year/location ?
      ]
    }
  ]
}
```

---

## 8. Media — Медиаматериалдар *(составной объект)*

| Метод | Путь | Описание |
|---|---|---|
| GET | `/media/` | `{ videos, films, audio, photos }` |

```jsonc
{
  "videos": [ { /* video item */ } ],
  "films":  [ { /* как video */ } ],
  "audio":  [ { /* audio item */ } ],
  "photos": [ { /* photo item */ } ]
}
```
**Общие поля item** (`id` и `title` обязательны, остальное `?`):
`id, title, author, year, date, description, thumbnail, duration,
tags[], links[{label,url}], attachments[{name,url,size,type}]`.
> `id` — строка (`"v1"`, `"a1"`) или, если не задан код, строковый pk.

**Типо-специфичные поля:**

| Список | Доп. поля |
|---|---|
| `videos`, `films` | `videoUrl` (URL YouTube/Vimeo — фронт сам извлечёт embed) |
| `audio` | `audioUrl`, `cover` (абс. URL) |
| `photos` | **минимальный item:** `{ id, title, src, caption, description }` |

```jsonc
// video / film
{ "id":"v1", "title":"…", "author":"…", "year":2018, "date":"2018-09-12",
  "duration":"48:21", "thumbnail":"http://host/…", "videoUrl":"https://youtu.be/…",
  "description":"…", "tags":["…"], "links":[{"label":"…","url":"…"}],
  "attachments":[] }
// audio
{ "id":"a1", "title":"…", "audioUrl":"http://…", "cover":"http://host/…", … }
// photo
{ "id":"p1", "title":"…", "src":"http://host/…", "caption":"…", "description":"…" }
```

---

## 9. Biography — Өмірбаян *(составной объект `BIO`)*

| Метод | Путь | Описание |
|---|---|---|
| GET | `/biography/` | составной объект BIO |

Каждая секция опциональна (может прийти `null`/`[]`/`{}`).
```jsonc
{
  "hero": { "title":"…", "lifespan":"1858 — 1931", "lead":"…",
            "portrait":"http://host/…", "eyebrow":"…", "subtitle":"…" },

  "breadcrumbs": [ { "label":"Главная", "href":"/" } ],  // обвязка страницы
  "tone": "museum",                                       // museum|academic|memorial

  "chronology": [ { "year":1858, "title":"…", "description":"…",
                    "image":"http://host/…", "media":"…" } ], // image/media ?

  "environment":  { /* intro, paragraphs[], quote{}, facts[], images[] */ } | null,
  "familyTree":   { "root": { "name","relation","description","portrait",
                              "children":[ /* рекурсия */ ] } } | null,
  "memories":     [ { "text":"…", "source":"…", "year":1929, "image":"…" } ], // кроме text — ?
  "descendants":  [ { "name":"…", "relation":"Ұлы", "bio":"…", "image":"…" } ], // image ?
  "political":    { /* intro, events[], quote{} */ } | null,
  "intellectual": { /* intro, influences[], works[] */ } | null,

  "sectionLabels": { "chronology": { "title":"…", "eyebrow":"…" } } // ? редактируемые заголовки секций
}
```
> `environment`, `familyTree`, `political`, `intellectual` — гибкие
> JSON-структуры (формы из BACKEND.md §3.6). Картинки внутри них — строки-URL,
> как их ввёл редактор.

---

## 10. Глобальные настройки и страницы

### 10.1 `GET /api/settings/`

Глобальная обвязка (header/footer/лого) — нужна на **всех** страницах.
```jsonc
{
  "logo": "http://host/media/site/logo.png",    // ? или null
  "siteTitle": { "line1": "Shakarim", "line2": "Kudaiberdiuly" },
  "mainNav": [ { "label": "Ғұмырнама", "href": "/biography" } ],
  "subNav":  [ { "label": "Медиа", "href": "/media" } ],
  "footer": {
    "navLinks": [ { "label": "О проекте", "href": "#" } ],
    "socials":  [ { "label":"Telegram", "href":"https://t.me/…",
                    "network":"telegram" } ],     // network → иконка на фронте
    "copyright": "Университет Шакарим"
  }
}
```
> `href` — внутренние (`/works`) или внешние (`https://…`).
> `socials[].network` ∈ `telegram | whatsapp | instagram | tiktok` (ключ иконки).

### 10.2 `GET /api/home/`

Контент главной страницы.
```jsonc
{
  "banner": { "video": "http://host/media/home/x.mp4", // ? фон-видео
              "eyebrow":"1858 — 1931", "title":"Шәкәрім Құдайбердіұлы",
              "tagline":"Ақын • Философ • Сазгер", "quote":"«Үш анық»: …" },
  "chronology": [ { "year":1858, "label":"Детство", "title":"…",
                    "description":"…", "image":"http://host/…",
                    "details":"…" } ],  // label/image/details — ? (details: текст в карточке таймлайна)
  "worldEvents": [ { "year":1839, "label":"Изобретение фотографии",
                     "icon":"camera" } ],  // icon — ключ SVG на фронте
  "quickNav": [ { "title":"Художественные фильмы",
                  "image":"http://host/…", "href":"#" } ],
  "sections": { "books":{"title":"Библиотека"}, "media":{"title":"…"},
                "authors":{"title":"…"}, "chronology":{"title":"…","description":"…"} }
}
```
> `worldEvents[].icon` ∈ `camera, phone, bulb, film, atom, helmet, star, peace`.

### 10.3 `GET /api/pages/{key}/`

«Шапочная» обвязка страницы-каталога/обёртки. `key` ∈ `works, books, authors,
archive, media, biography, shakarimtanu, tagzym`. **404**, если страница не
заведена в админке.
```jsonc
{
  "breadcrumbs": [ { "label":"Главная", "href":"/" },
                   { "label":"Шығармалары" } ],   // последний без href
  "sectionHeader": { "eyebrow":"Архив", "title":"Архив және қолжазба",
                     "description":"…" } | null,   // для страниц-каталогов
  "hero": { "eyebrow":"…", "title":"…", "lead":"…",
            "portrait":"http://host/…", "lifespan":"…" } | null, // для PageHero-страниц
  "tone": "museum" | null
}
```

---

## 11. Search — Глобальный поиск

| Метод | Путь | Параметры | Описание |
|---|---|---|---|
| GET | `/search/` | `q`, `lang?`, `type?`, `limit?` | поиск по всем разделам |

- `q` — строка запроса. PostgreSQL FTS + триграммы (`pg_trgm`: опечатки и
  частичные слова), по полям активного языка.
- `lang` — язык полей (как везде; по умолч. `kk`). Фронт шлёт текущий язык.
- `type` *(опц.)* — ограничить одним разделом (`works`/`books`/…).
- `limit` *(опц.)* — лимит элементов на раздел.

Ответ — результаты, **сгруппированные по разделам** (ключ — имя раздела):
```jsonc
{
  "query": "üш",
  "total": 12,
  "results": {
    "works":   [ { "id": 1, "slug": "ush-anyq", "title": "…" } ],
    "books":   [ { "id": 3, "slug": "…",        "title": "…" } ],
    "authors": [ { "id": "esim", "slug": "esim", "name": "…" } ]
  }
}
```
Фронту в каждом элементе нужны **`slug`** (ссылка на деталь) и **`title`/`name`**
(подпись). Разделы без детального роута (`media`, `shakarimtanu`, `tagzym`,
biography-composite) ведут на страницу раздела. Пусто →
`{ "query": "…", "total": 0, "results": {} }`.

---

## Сводная таблица эндпоинтов

| Метод | Путь | Параметры | Доступ | Ответ |
|---|---|---|---|---|
| GET | `/api/works/` | — | public | массив |
| GET | `/api/works/categories/` | — | public | массив |
| GET | `/api/works/{slug}/` | — | public | объект |
| GET | `/api/books/` | `?search=` | public | массив |
| GET | `/api/books/categories/` | — | public | массив |
| GET | `/api/books/tags/` | — | public | массив `{tag,count}` |
| GET | `/api/books/{slug}/` | — | public | объект |
| GET | `/api/authors/` | `?search=` | public | массив |
| GET | `/api/authors/{slug}/` | — | public | объект |
| GET | `/api/articles/` | — | public | массив |
| GET | `/api/articles/{slug}/` | — | public | объект |
| GET | `/api/archive/` | — | public | массив |
| GET | `/api/archive/types/` | — | public | массив |
| GET | `/api/archive/{slug}/` | — | public | объект |
| GET | `/api/shakarimtanu/` | — | public | объект |
| GET | `/api/tagzym/` | — | public | объект |
| GET | `/api/media/` | — | public | объект |
| GET | `/api/biography/` | — | public | объект |
| GET | `/api/settings/` | — | public | объект |
| GET | `/api/home/` | — | public | объект |
| GET | `/api/pages/{key}/` | — | public | объект |
| GET | `/api/search/` | `q,lang,type,limit` | public | объект |

> Все эндпоинты — `GET`, без авторизации. Запись/редактирование контента — в
> Django admin `/admin/` (требует аккаунт сотрудника), CKEditor — `/ckeditor5/`.
