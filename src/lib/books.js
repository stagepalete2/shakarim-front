// Кітап әлемі — каталог книг и научных работ. Гибкая CMS-форма.
//
// СТРУКТУРА item:
//   id, slug, title — обязательные
//   author       — кто написал (Шәкәрім или исследователь)
//   year         — год издания
//   category     — основная классификация (см. CATEGORIES)
//   tags         — дополнительные метки для тонкой фильтрации
//   cover        — URL обложки (опц.)
//   description  — короткое описание
//   file         — { url, size? } — PDF для просмотра/скачивания (опц.)
//
// Категории и теги используются для фильтрации; поиск идёт по
// title + author + description + tags (метаданные; full-text — V2).

export const CATEGORIES = [
  "Шығармалары",
  "Зерттеулер",
  "Аудармалары",
  "Жинақтар",
  "Естеліктер",
  "Энциклопедия",
];

export const BOOKS = [
  {
    id: 1,
    slug: "ush-anyq",
    title: "Үш анық",
    author: "Шәкәрім Құдайбердіұлы",
    year: 1925,
    category: "Шығармалары",
    tags: ["философия", "ар ілімі", "классика"],
    cover: "/images/books/ush-anyq.jpg",
    description:
      "Шәкәрімнің басты философиялық еңбегі — ар, ұят, әділдік туралы үш ақиқат ілімі.",
    file: { url: "/files/books/ush-anyq.pdf", size: "8.2 МБ" },
  },
  {
    id: 2,
    slug: "mutylgan",
    title: "Мұтылғанның өмірі",
    author: "Шәкәрім Құдайбердіұлы",
    year: 1929,
    category: "Шығармалары",
    tags: ["дастан", "автобиография"],
    cover: "/images/books/mutylgan.jpg",
    description:
      "Автобиографиялық дастан — ақынның ішкі жолы мен өмір мағынасын ұғыну.",
    file: { url: "/files/books/mutylgan.pdf", size: "5.4 МБ" },
  },
  {
    id: 3,
    slug: "shezhire",
    title: "Түрік, қырғыз-қазақ һәм хандар шежіресі",
    author: "Шәкәрім Құдайбердіұлы",
    year: 1911,
    category: "Шығармалары",
    tags: ["тарих", "шежіре", "классика"],
    cover: "/images/books/shezhire.jpg",
    description:
      "Түркі халықтары мен қазақ хандарының шежіресі — тұңғыш жүйелі еңбек.",
    file: { url: "/files/books/shezhire.pdf", size: "6.1 МБ" },
  },
  {
    id: 4,
    slug: "qazaq-ainasy",
    title: "Қазақ айнасы",
    author: "Шәкәрім Құдайбердіұлы",
    year: 1912,
    category: "Шығармалары",
    tags: ["лирика", "өлеңдер"],
    cover: "/images/books/qazaq-ainasy.jpg",
    description:
      "Лирикалық өлеңдер жинағы — қазақ қоғамының портреті.",
    file: { url: "/files/books/qazaq-ainasy.pdf", size: "3.8 МБ" },
  },
  {
    id: 5,
    slug: "layla-mazhnun",
    title: "Лайла — Мажнун",
    author: "Шәкәрім Құдайбердіұлы",
    year: 1907,
    category: "Аудармалары",
    tags: ["шығыс", "поэма", "махаббат"],
    cover: "/images/books/layla-majnun.jpg",
    description:
      "Классикалық шығыс поэмасының қазақ тіліндегі аудармасы.",
    file: { url: "/files/books/layla-majnun.pdf", size: "4.2 МБ" },
  },
  {
    id: 6,
    slug: "dubrovsky",
    title: "Дубровский",
    author: "А. С. Пушкин · аударған Шәкәрім",
    year: 1924,
    category: "Аудармалары",
    tags: ["проза", "орыс әдебиеті"],
    cover: "/images/books/dubrovsky.jpg",
    description:
      "Пушкиннің повестінің ерте қазақ аудармасы.",
    file: { url: "/files/books/dubrovsky.pdf", size: "3.1 МБ" },
  },
  {
    id: 7,
    slug: "imanym",
    title: "Иманым",
    author: "Шәкәрім Құдайбердіұлы",
    year: 1920,
    category: "Шығармалары",
    tags: ["дін", "философия"],
    cover: "/images/books/imanym.jpg",
    description: "Дін, иман және мораль туралы діни-философиялық еңбек.",
    file: { url: "/files/books/imanym.pdf", size: "2.9 МБ" },
  },

  // === Исследовательские работы (зерттеулер) ===
  {
    id: 8,
    slug: "shakarim-philosophy-esim",
    title: "Шәкәрім философиясы",
    author: "Ғарифолла Есім",
    year: 2008,
    category: "Зерттеулер",
    tags: ["философия", "академиялық"],
    cover: "/images/books/research-esim.jpg",
    description:
      "Шәкәрімнің дүниетанымы мен этикалық жүйесіне арналған іргелі еңбек.",
    file: { url: "/files/books/esim-philosophy.pdf", size: "12.4 МБ" },
  },
  {
    id: 9,
    slug: "shakarim-poetics-abdigaziev",
    title: "Шәкәрімнің поэтикасы",
    author: "Балтабай Әбдіғазиев",
    year: 1996,
    category: "Зерттеулер",
    tags: ["әдебиет", "поэтика"],
    cover: "/images/books/research-abdigaziev.jpg",
    description:
      "Ақынның көркемдік әлемі, бейнелі ойлау жүйесі туралы монография.",
    file: { url: "/files/books/abdigaziev-poetics.pdf", size: "9.7 МБ" },
  },
  {
    id: 10,
    slug: "shakarim-textology-myrzakhmetov",
    title: "Шәкәрім: текстологиялық зерттеу",
    author: "Мекемтас Мырзахметов",
    year: 1989,
    category: "Зерттеулер",
    tags: ["текстология", "академиялық"],
    cover: "/images/books/research-textology.jpg",
    description:
      "Шығармалардың қолжазба нұсқалары мен текстологиялық мәселелер.",
    file: { url: "/files/books/myrzakhmetov-textology.pdf", size: "7.3 МБ" },
  },

  // === Жинақтар ===
  {
    id: 11,
    slug: "collected-3vol",
    title: "Шәкәрім: шығармалар жинағы (3 томдық)",
    author: "ҚР Ұлттық ғылым академиясы",
    year: 2018,
    category: "Жинақтар",
    tags: ["академиялық", "толық жинақ"],
    cover: "/images/books/collected-3vol.jpg",
    description:
      "Барлық белгілі шығармалар, академиялық ескертулермен.",
    file: { url: "/files/books/collected-3vol.pdf", size: "32.5 МБ" },
  },
  {
    id: 12,
    slug: "selected-poems",
    title: "Таңдамалы өлеңдер",
    author: "Шәкәрім Құдайбердіұлы",
    year: 2005,
    category: "Жинақтар",
    tags: ["лирика", "таңдамалы"],
    cover: "/images/books/selected-poems.jpg",
    description:
      "Ақынның ең жарқын лирикалық туындыларының жинағы.",
    file: { url: "/files/books/selected-poems.pdf", size: "5.8 МБ" },
  },

  // === Естеліктер ===
  {
    id: 13,
    slug: "akhat-memoirs",
    title: "Әкем Шәкәрім",
    author: "Ахат Шәкәрімұлы",
    year: 1962,
    category: "Естеліктер",
    tags: ["естелік", "отбасы"],
    cover: "/images/books/akhat-memoirs.jpg",
    description:
      "Ұлы Ахат жазған ерекше әсерлі әке-естелігі.",
    file: { url: "/files/books/akhat-memoirs.pdf", size: "4.5 МБ" },
  },
  {
    id: 14,
    slug: "contemporaries-memoirs",
    title: "Замандастар естелігі",
    author: "Жинақ",
    year: 2010,
    category: "Естеліктер",
    tags: ["естелік", "құжаттар"],
    cover: "/images/books/contemporaries.jpg",
    description:
      "Шәкәрім туралы замандас зиялы қауымның естеліктері мен ой-пікірлері.",
    file: { url: "/files/books/contemporaries.pdf", size: "6.9 МБ" },
  },

  // === Энциклопедия ===
  {
    id: 15,
    slug: "shakarim-encyclopedia",
    title: "Шәкәрім энциклопедиясы",
    author: "Авторлар ұжымы",
    year: 2015,
    category: "Энциклопедия",
    tags: ["анықтамалық", "академиялық"],
    cover: "/images/books/encyclopedia.jpg",
    description:
      "Шәкәрім өмірі, шығармалары, замандастары мен зерттеушілерінің энциклопедиялық тізілімі.",
    file: { url: "/files/books/encyclopedia.pdf", size: "48.2 МБ" },
  },
];

// === Хелперы ===

export function getBookBySlug(slug) {
  return BOOKS.find((b) => b.slug === slug) ?? null;
}

// Похожие книги — той же категории, исключая текущую.
export function getRelatedBooks(currentSlug, limit = 4) {
  const current = BOOKS.find((b) => b.slug === currentSlug);
  if (!current) return [];
  return BOOKS.filter(
    (b) => b.slug !== currentSlug && b.category === current.category,
  ).slice(0, limit);
}

export function bookHref(slug) {
  return `/books/${slug}`;
}

export function getCategoriesWithCounts() {
  const counts = new Map();
  BOOKS.forEach((b) => {
    counts.set(b.category, (counts.get(b.category) ?? 0) + 1);
  });
  return CATEGORIES.map((c) => ({
    category: c,
    count: counts.get(c) ?? 0,
  }));
}

// Все теги в порядке убывания частоты использования.
export function getAllTags() {
  const counts = new Map();
  BOOKS.forEach((b) => {
    (b.tags ?? []).forEach((tag) => {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    });
  });
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, "ru"));
}

// Поиск по метаданным (title, author, description, tags).
// Регистронезависимый, локаль-aware (ru/kk casefold).
export function searchBooks(items, query) {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((b) => {
    const hay = [
      b.title,
      b.author,
      b.description,
      ...(b.tags ?? []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}
