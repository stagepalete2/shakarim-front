// Работы Шакарима — единый источник для страницы /works и детальной /works/[slug].
// На проде придёт с бэкенда; даты по ряду пунктов приблизительные.
//
// СТРУКТУРА item:
//   id, slug, title, year, category — обязательные
//   cover, description — основные
//   tags?     — массив строк для tag-чипов на детальной странице
//   file?     — { url, size? } PDF для просмотра в детальной (Контент-таб)
//   excerpt?  — короткая цитата/отрывок (для info-таба)

export const WORKS = [
  {
    id: 1,
    slug: "ush-anyq",
    title: "Үш анық",
    year: 1925,
    category: "Тарихи, танымдық еңбектері",
    cover: "/images/works/ush-anyq.jpg",
    description:
      "Главный философский труд Шакарима: учение о трёх истинах — совести (ар), стыде (ұят) и справедливости (әділдік). Книга-вершина его этической системы, написанная в годы уединения в Чингизтау.",
    tags: ["философия", "ар ілімі", "классика"],
    file: { url: "/files/works/ush-anyq.pdf", size: "8.2 МБ" },
    excerpt:
      "Адам — өзін-өзі жетілдіруге бағытталған жан. Үш ақиқат — оның жол сілтейтін жұлдыздары.",
  },
  {
    id: 2,
    slug: "qalqaman-mamyr",
    title: "Қалқаман — Мамыр",
    year: 1912,
    category: "Поэмалары",
    cover: "/images/works/qalqaman-mamyr.jpg",
    description:
      "Поэма о трагической любви двух молодых людей из враждующих родов. Драматическое сочетание лиризма и социальной критики.",
    tags: ["поэма", "махаббат", "классика"],
    file: { url: "/files/works/qalqaman-mamyr.pdf", size: "3.4 МБ" },
  },
  {
    id: 3,
    slug: "enlik-kebek",
    title: "Еңлік — Кебек",
    year: 1912,
    category: "Поэмалары",
    cover: "/images/works/enlik-kebek.jpg",
    description:
      "Поэтическая обработка известной казахской легенды о любви и родовой чести.",
    tags: ["поэма", "аңыз"],
    file: { url: "/files/works/enlik-kebek.pdf", size: "2.9 МБ" },
  },
  {
    id: 4,
    slug: "zholsyz-zhaza",
    title: "Жолсыз жаза",
    year: 1912,
    category: "Поэмалары",
    cover: "/images/works/zholsyz-zhaza.jpg",
    description:
      "Поэма-размышление о несправедливости и моральном выборе человека.",
    tags: ["поэма", "әділдік"],
    file: { url: "/files/works/zholsyz-zhaza.pdf", size: "2.1 МБ" },
  },
  {
    id: 5,
    slug: "mutylgan-omiri",
    title: "Мұтылғанның өмірі",
    year: 1923,
    category: "Поэмалары",
    cover: "/images/works/mutylgan.jpg",
    description:
      "Автобиографическая поэма — внутренний путь поэта и осмысление жизни. Считается духовным завещанием Шакарима.",
    tags: ["дастан", "автобиография"],
    file: { url: "/files/works/mutylgan.pdf", size: "5.4 МБ" },
  },
  {
    id: 6,
    slug: "shezhire",
    title: "Түрік, қырғыз-қазақ һәм хандар шежіресі",
    year: 1911,
    category: "Тарихи, танымдық еңбектері",
    cover: "/images/works/shezhire.jpg",
    description:
      "Один из первых системных трудов по генеалогии тюркских народов и казахских ханов.",
    tags: ["тарих", "шежіре", "классика"],
    file: { url: "/files/works/shezhire.pdf", size: "6.1 МБ" },
  },
  {
    id: 7,
    slug: "qazaq-ainasy",
    title: "Қазақ айнасы",
    year: 1912,
    category: "Өлеңдері",
    cover: "/images/works/qazaq-ainasy.jpg",
    description:
      "Сборник лирических стихотворений — портрет казахского общества эпохи.",
    tags: ["лирика", "жинақ"],
    file: { url: "/files/works/qazaq-ainasy.pdf", size: "3.8 МБ" },
  },
  {
    id: 8,
    slug: "dubrovsky",
    title: "Дубровский",
    year: 1924,
    category: "Аудармалары",
    cover: "/images/works/dubrovsky.jpg",
    description:
      "Перевод повести А. С. Пушкина на казахский язык — один из ранних опытов литературного перевода.",
    tags: ["аударма", "проза", "орыс әдебиеті"],
    file: { url: "/files/works/dubrovsky.pdf", size: "3.1 МБ" },
  },
  {
    id: 9,
    slug: "layla-mazhnun",
    title: "Лайла — Мажнун",
    year: 1907,
    category: "Аудармалары",
    cover: "/images/works/layla-majnun.jpg",
    description:
      "Переложение классической восточной поэмы о страстной любви.",
    tags: ["аударма", "шығыс", "поэма"],
    file: { url: "/files/works/layla-majnun.pdf", size: "4.2 МБ" },
  },
  {
    id: 10,
    slug: "boyan",
    title: "Боян",
    year: 1920,
    category: "Аудармалары",
    cover: "/images/works/boyan.jpg",
    description:
      "Перевод фрагмента «Слова о полку Игореве» — встреча тюркской и славянской традиций.",
    tags: ["аударма", "көне әдебиет"],
    file: { url: "/files/works/boyan.pdf", size: "1.8 МБ" },
  },
  {
    id: 11,
    slug: "tursyn",
    title: "Тұрсын",
    year: null,
    category: "Музыкалық мұрасы",
    cover: "/images/works/song-tursyn.jpg",
    description:
      "Авторская песня Шакарима — образец его композиторского наследия.",
    tags: ["ән"],
  },
  {
    id: 12,
    slug: "kui-zhailauda",
    title: "Кюй «Жайлауда»",
    year: null,
    category: "Музыкалық мұрасы",
    cover: "/images/works/kui-zhailauda.jpg",
    description:
      "Инструментальная композиция, посвящённая летним пастбищам в Чингизтау.",
    tags: ["күй"],
  },
  {
    id: 13,
    slug: "imanym",
    title: "Иманым",
    year: null,
    category: "Тарихи, танымдық еңбектері",
    cover: "/images/works/imanym.jpg",
    description:
      "Религиозно-философское сочинение о вере, морали и человеке.",
    tags: ["дін", "философия"],
    file: { url: "/files/works/imanym.pdf", size: "2.9 МБ" },
  },
  {
    id: 14,
    slug: "zhyr-shakarim",
    title: "Жыр Шәкәрім",
    year: 1920,
    category: "Өлеңдері",
    cover: "/images/works/zhyr-shakarim.jpg",
    description:
      "Поздняя лирика периода уединения в горах — медитативная и философская.",
    tags: ["лирика", "философиялық"],
    file: { url: "/files/works/zhyr-shakarim.pdf", size: "3.2 МБ" },
  },
];

// Жанры — порядок задаёт порядок отображения в фильтре.
// Прозасы пока без работ — категория видна с (0), наполнится позже.
export const CATEGORIES = [
  "Өлеңдері",
  "Поэмалары",
  "Прозасы",
  "Тарихи, танымдық еңбектері",
  "Аудармалары",
  "Музыкалық мұрасы",
];

// Возвращаем ВСЕ категории (даже с count: 0), чтобы фильтр
// показывал полный список жанров, как задан в CATEGORIES.
export function getCategoriesWithCounts() {
  const counts = new Map();
  WORKS.forEach((w) => {
    counts.set(w.category, (counts.get(w.category) ?? 0) + 1);
  });
  return CATEGORIES.map((c) => ({
    category: c,
    count: counts.get(c) ?? 0,
  }));
}

// === Хелперы для детальной страницы ===

export function getWorkBySlug(slug) {
  return WORKS.find((w) => w.slug === slug) ?? null;
}

// Похожие работы (та же категория, исключая текущую).
export function getRelatedWorks(currentSlug, limit = 4) {
  const current = WORKS.find((w) => w.slug === currentSlug);
  if (!current) return [];
  return WORKS.filter(
    (w) => w.slug !== currentSlug && w.category === current.category,
  ).slice(0, limit);
}

export function workHref(slug) {
  return `/works/${slug}`;
}
