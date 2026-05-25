// Работы Шакарима — единый источник для страницы /works.
// На проде придёт с бэкенда; даты по ряду пунктов приблизительные.

export const WORKS = [
  {
    id: 1,
    title: "Үш анық",
    year: 1925,
    category: "Тарихи, танымдық еңбектері",
    cover: "/images/works/ush-anyq.jpg",
    description:
      "Главный философский труд: учение о трёх истинах — совести, стыде и справедливости.",
  },
  {
    id: 2,
    title: "Қалқаман — Мамыр",
    year: 1912,
    category: "Поэмалары",
    cover: "/images/works/qalqaman-mamyr.jpg",
    description:
      "Поэма о трагической любви двух молодых людей из враждующих родов.",
  },
  {
    id: 3,
    title: "Еңлік — Кебек",
    year: 1912,
    category: "Поэмалары",
    cover: "/images/works/enlik-kebek.jpg",
    description:
      "Поэтическая обработка известной казахской легенды о любви и родовой чести.",
  },
  {
    id: 4,
    title: "Жолсыз жаза",
    year: 1912,
    category: "Поэмалары",
    cover: "/images/works/zholsyz-zhaza.jpg",
    description:
      "Поэма-размышление о несправедливости и моральном выборе человека.",
  },
  {
    id: 5,
    title: "Мұтылғанның өмірі",
    year: 1923,
    category: "Поэмалары",
    cover: "/images/works/mutylgan.jpg",
    description:
      "Автобиографическая поэма — внутренний путь поэта и осмысление жизни.",
  },
  {
    id: 6,
    title: "Түрік, қырғыз-қазақ һәм хандар шежіресі",
    year: 1911,
    category: "Тарихи, танымдық еңбектері",
    cover: "/images/works/shezhire.jpg",
    description:
      "Один из первых системных трудов по генеалогии тюркских народов и казахских ханов.",
  },
  {
    id: 7,
    title: "Қазақ айнасы",
    year: 1912,
    category: "Өлеңдері",
    cover: "/images/works/qazaq-ainasy.jpg",
    description:
      "Сборник лирических стихотворений — портрет казахского общества эпохи.",
  },
  {
    id: 8,
    title: "Дубровский",
    year: 1924,
    category: "Аудармалары",
    cover: "/images/works/dubrovsky.jpg",
    description:
      "Перевод повести А. С. Пушкина на казахский язык — один из ранних опытов литературного перевода.",
  },
  {
    id: 9,
    title: "Лайла — Мажнун",
    year: 1907,
    category: "Аудармалары",
    cover: "/images/works/layla-majnun.jpg",
    description:
      "Переложение классической восточной поэмы о страстной любви.",
  },
  {
    id: 10,
    title: "Боян",
    year: 1920,
    category: "Аудармалары",
    cover: "/images/works/boyan.jpg",
    description:
      "Перевод фрагмента «Слова о полку Игореве» — встреча тюркской и славянской традиций.",
  },
  {
    id: 11,
    title: "Тұрсын",
    year: null,
    category: "Музыкалық мұрасы",
    cover: "/images/works/song-tursyn.jpg",
    description:
      "Авторская песня Шакарима — образец его композиторского наследия.",
  },
  {
    id: 12,
    title: "Кюй «Жайлауда»",
    year: null,
    category: "Музыкалық мұрасы",
    cover: "/images/works/kui-zhailauda.jpg",
    description:
      "Инструментальная композиция, посвящённая летним пастбищам в Чингизтау.",
  },
  {
    id: 13,
    title: "Иманым",
    year: null,
    category: "Тарихи, танымдық еңбектері",
    cover: "/images/works/imanym.jpg",
    description:
      "Религиозно-философское сочинение о вере, морали и человеке.",
  },
  {
    id: 14,
    title: "Жыр Шәкәрім",
    year: 1920,
    category: "Өлеңдері",
    cover: "/images/works/zhyr-shakarim.jpg",
    description:
      "Поздняя лирика периода уединения в горах — медитативная и философская.",
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
