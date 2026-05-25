// Архив Шакарима — единый источник для страницы /archive.
// На проде придёт с бэкенда; обложки и точные даты будут заменены реальными.
//
// СТРУКТУРА item:
//   id, slug, type, title, year, cover, location, description — базовые поля
//   gallery? — массив сканов/изображений item (всегда сверху, открывается в lightbox)
//   files?   — массив файлов (PDF и др., всегда сверху)
//   tabs?    — массив гибких текстовых вкладок (CMS/API формат). Каждая вкладка:
//     {
//       id: string,            // уникальный в рамках item
//       label: string,         // текст кнопки вкладки
//       description?: string,  // короткое интро
//       content?: string       // HTML из CKEditor (рендерится через ui/Prose)
//     }
//   Сканы (gallery) и файлы (files) — атрибуты самого item, не вкладок.
//   Вкладки же — разные смысловые «прочтения» (транскрипт, перевод, история).

export const ARCHIVE_TYPES = [
  {
    id: "manuscript",
    label: "Қолжазбалар",
    short: "Қолжазба",
    description: "Шәкәрімнің өз қолымен жазған еңбектерінің түпнұсқалары.",
  },
  {
    id: "photo",
    label: "Фотосуреттер",
    short: "Фото",
    description: "Ақын өмірінің әр кезеңіндегі сирек кездесетін фотолар.",
  },
  {
    id: "letter",
    label: "Хаттар мен құжаттар",
    short: "Құжат",
    description: "Жеке хаттар, қойын дәптерлер және ресми құжаттар.",
  },
  {
    id: "audio",
    label: "Аудио жазбалар",
    short: "Аудио",
    description: "Шәкәрім әндері мен күйлерінің архивтік жазбалары.",
  },
  {
    id: "video",
    label: "Бейне материалдар",
    short: "Бейне",
    description: "Ақын туралы деректі фильмдер мен телехабарлар.",
  },
];

export const ARCHIVE = [
  // === Қолжазбалар ===
  {
    id: 1,
    slug: "ush-anyq-manuscript",
    type: "manuscript",
    title: "«Үш анық» қолжазбасы",
    year: "1925",
    cover: "/images/archive/ush-anyq-ms.jpg",
    location: "ҚР Орталық мемлекеттік мұрағаты",
    description:
      "Шәкәрімнің басты философиялық еңбегінің түпнұсқа қолжазбасы. Ар, ұят және әділдік туралы үш ақиқат жайында ілім — қазақ философиясының іргетастық мәтіні.",
    gallery: [
      { src: "/images/archive/ush-anyq-page-1.jpg", caption: "Беті 1 — Кіріспе" },
      { src: "/images/archive/ush-anyq-page-2.jpg", caption: "Беті 2" },
      { src: "/images/archive/ush-anyq-page-3.jpg", caption: "Беті 3" },
      { src: "/images/archive/ush-anyq-page-4.jpg", caption: "Беті 4" },
      { src: "/images/archive/ush-anyq-page-5.jpg", caption: "Беті 5" },
      { src: "/images/archive/ush-anyq-page-6.jpg", caption: "Беті 6 — Аяқталу" },
    ],
    files: [
      {
        name: "«Үш анық» — толық қолжазба",
        url: "/files/archive/ush-anyq-full.pdf",
        size: "12.4 МБ",
        type: "pdf",
        description: "Барлық беттер жоғары сапада",
      },
      {
        name: "Транскрипт (қазақша)",
        url: "/files/archive/ush-anyq-transcript-kz.pdf",
        size: "2.1 МБ",
        type: "pdf",
      },
      {
        name: "Перевод на русский",
        url: "/files/archive/ush-anyq-translation-ru.pdf",
        size: "1.8 МБ",
        type: "pdf",
      },
    ],
    tabs: [
      {
        id: "about",
        label: "Сипаттама",
        description:
          "Қолжазбаның тарихы, маңыздылығы және ғылыми контексті.",
        content: `
          <p>«Үш анық» — Шәкәрімнің философиялық ой-санасының шыңы. Бұл шығармада ол адам өмірінің мәні, ар-намыс пен әділдік туралы өзіндік ілімін жүйелі түрде баяндайды.</p>
          <h3>Негізгі тұжырымдар</h3>
          <p>Шәкәрім үш ақиқатты ажыратады: <strong>ар</strong> (ішкі моральдық тазалық), <strong>ұят</strong> (қоғам алдындағы жауапкершілік) және <strong>әділдік</strong> (адами қатынастардың өлшемі).</p>
          <blockquote><p>Адам — өзін-өзі жетілдіруге бағытталған жан. Үш ақиқат — оның жол сілтейтін жұлдыздары.</p></blockquote>
          <p>Қолжазба 1925 жылы Шәкәрімнің Шыңғыстаудағы жалғыздық кезеңінде жазылған. Бүгінгі күнге дейін негізгі мәтін сақталған, бірақ кейбір беттерінің реті анықталу үстінде.</p>
        `,
      },
      {
        id: "transcript",
        label: "Транскрипт",
        description: "Қолжазбаның цифрленген мәтіндік нұсқасы.",
        content: `
          <p><em>Бірінші бөлім</em></p>
          <p>Адам баласы бұл дүниеге бір мақсатпен келген. Сол мақсатты түсіну үшін үш ақиқатты білу керек...</p>
          <p>[Толық транскрипт жұмыс үстінде. PDF нұсқасы жоғарыдағы «Файлдар» бөлімінде қол жетімді.]</p>
        `,
      },
      {
        id: "translation",
        label: "Аударма",
        description: "Перевод текста на русский язык.",
        content: `
          <p>«Три истины» — вершина философской мысли Шакарима. В этой работе он систематически излагает своё учение о смысле жизни человека, о чести и справедливости.</p>
          <h3>Основные положения</h3>
          <p>Шакарим выделяет три истины: <strong>совесть</strong> (внутренняя моральная чистота), <strong>стыд</strong> (ответственность перед обществом) и <strong>справедливость</strong> (мера человеческих отношений).</p>
          <blockquote><p>Человек — существо, направленное к самосовершенствованию. Три истины — его путеводные звёзды.</p></blockquote>
        `,
      },
      {
        id: "historical",
        label: "Тарихи мәнмәтін",
        description:
          "Шығарманың жазылу кезеңі мен тарихи маңыздылығы.",
        content: `
          <p>«Үш анық» 1920-жылдары — Шәкәрімнің Шыңғыстауда жалғыздықпен өмір сүрген кезінде жазылған. Бұл кезең қазақ халқының тарихындағы өзгеріс пен қиыншылық жылдары болды.</p>
          <p>Кеңестік жаңа билік дәстүрлі қазақ мәдениеті мен діни ілімдеріне қысым жасап жатқан уақытта Шәкәрім өз философиялық жүйесін жасап үлгерді.</p>
        `,
      },
    ],
  },
  {
    id: 2,
    slug: "mutylgan-omiri-manuscript",
    type: "manuscript",
    title: "«Мұтылғанның өмірі» қолжазбасы",
    year: "1929",
    cover: "/images/archive/mutylgan-ms.jpg",
    location: "Семей облыстық мұражайы",
    description:
      "Автобиографиялық дастанның авторлық қолжазбасы. Ақынның ішкі жолы, рухани ізденісі мен өмір мағынасын ұғыну.",
    gallery: [
      { src: "/images/archive/mutylgan-page-1.jpg", caption: "Беті 1" },
      { src: "/images/archive/mutylgan-page-2.jpg", caption: "Беті 2" },
      { src: "/images/archive/mutylgan-page-3.jpg", caption: "Беті 3" },
      { src: "/images/archive/mutylgan-page-4.jpg", caption: "Беті 4" },
      { src: "/images/archive/mutylgan-page-5.jpg", caption: "Беті 5" },
    ],
  },
  {
    id: 3,
    slug: "shezhire-manuscript",
    type: "manuscript",
    title: "«Түрік, қырғыз-қазақ һәм хандар шежіресі»",
    year: "1911",
    cover: "/images/archive/shezhire-ms.jpg",
    location: "ҚР Ұлттық кітапханасы",
    description:
      "Түркі халықтары мен қазақ хандарының шежіресі бойынша тұңғыш жүйелі еңбектің сақталған қолжазбасы.",
  },
  {
    id: 4,
    slug: "qazaq-ainasy-manuscript",
    type: "manuscript",
    title: "«Қазақ айнасы» лирикалық жинағы",
    year: "1912",
    cover: "/images/archive/qazaq-ainasy-ms.jpg",
    location: "Семей облыстық мұражайы",
    description:
      "Лирикалық өлеңдер жинағының алғашқы қолжазба нұсқасы — Шәкәрімнің ақындық дауысы қалыптасқан кезеңі.",
  },
  {
    id: 5,
    slug: "imanym-manuscript",
    type: "manuscript",
    title: "«Иманым» қолжазбасы",
    year: "1920-жж.",
    cover: "/images/archive/imanym-ms.jpg",
    location: "ҚР Ұлттық кітапханасы",
    description:
      "Дін, иман және мораль туралы діни-философиялық еңбектің авторлық қолжазбасы.",
  },

  // === Фотосуреттер ===
  {
    id: 6,
    slug: "portrait-1900",
    type: "photo",
    title: "Шәкәрім Құдайбердіұлы — портрет",
    year: "~1900",
    cover: "/images/archive/portrait-1900.jpg",
    location: "Семей облыстық тарихи-өлкетану мұражайы",
    description:
      "Ақынның орта жасындағы сирек кездесетін портрет фотосуреті. Шығармашылығының кемелдене бастаған кезеңі.",
  },
  {
    id: 7,
    slug: "mekke-1905",
    type: "photo",
    title: "Меккеге сапары алдында",
    year: "1905",
    cover: "/images/archive/mekke-1905.jpg",
    location: "Жеке мұрағат",
    description:
      "Қажылыққа аттанар алдында түсірілген тарихи фото. Бұл сапар Шәкәрімнің дүниетанымына терең ықпал етті.",
  },
  {
    id: 8,
    slug: "shyngystau-home",
    type: "photo",
    title: "Шыңғыс тауындағы үйі",
    year: "1920",
    cover: "/images/archive/shyngystau-home.jpg",
    location: "Шәкәрім мемориалдық мұражайы",
    description:
      "Ақынның жалғыздықпен өмір сүрген аймағындағы шағын үйі — соңғы жылдары жасаған еңбектерінің мекені.",
  },
  {
    id: 9,
    slug: "family-1910",
    type: "photo",
    title: "Туыстарымен бірге",
    year: "1910",
    cover: "/images/archive/family-1910.jpg",
    location: "Жеке мұрағат",
    description:
      "Сирек кездесетін отбасылық сурет — Шәкәрім жақын туыстарымен бірге.",
    gallery: [
      { src: "/images/archive/family-1910-1.jpg", caption: "Топтық сурет" },
      { src: "/images/archive/family-1910-2.jpg", caption: "Ұлымен" },
      { src: "/images/archive/family-1910-3.jpg", caption: "Қызымен" },
      { src: "/images/archive/family-1910-4.jpg", caption: "Туыстары" },
    ],
  },
  {
    id: 10,
    slug: "last-years-portrait",
    type: "photo",
    title: "Соңғы жылдар",
    year: "~1930",
    cover: "/images/archive/last-years.jpg",
    location: "Шәкәрім мемориалдық мұражайы",
    description:
      "Ақынның өмірінің соңғы жылдарында түсірілген, терең мағыналы фотосурет.",
  },

  // === Хаттар мен құжаттар ===
  {
    id: 11,
    slug: "letter-to-abai",
    type: "letter",
    title: "Шәкәрімнің Абайға хаты",
    year: "1898",
    cover: "/images/archive/letter-abai.jpg",
    location: "Абай атындағы мемориалды мұражай",
    description:
      "Ұстазы Абайға жазған хатының түпнұсқасы. Әдеби және рухани байланыстың тірі куәсі.",
    gallery: [
      { src: "/images/archive/letter-abai-1.jpg", caption: "1-бет" },
      { src: "/images/archive/letter-abai-2.jpg", caption: "2-бет" },
      { src: "/images/archive/letter-abai-envelope.jpg", caption: "Конверт" },
    ],
    files: [
      {
        name: "Хаттың цифрлық көшірмесі",
        url: "/files/archive/letter-abai.pdf",
        size: "3.2 МБ",
        type: "pdf",
      },
    ],
    tabs: [
      {
        id: "transcript",
        label: "Транскрипт",
        description: "Хаттың толық мәтіндік нұсқасы.",
        content: `
          <p>Құрметті Ұстазым Абай,</p>
          <p>Сіздің тәлімгер ретінде маған берген сабақтарыңыз менің өмір жолыма бағыт берді...</p>
          <p>[Хаттың толық мәтіні — жоғарыдағы PDF нұсқасында.]</p>
        `,
      },
      {
        id: "context",
        label: "Тарихи мәнмәтін",
        description:
          "Хаттың жазылу кезеңі және Шәкәрім мен Абайдың байланысы.",
        content: `
          <p>1898 жыл — Шәкәрімнің ақындық кемелдене бастаған кезеңі. Бұл хат — оның ұстазына деген терең құрметін, шәкірттік дәстүрді сақтауын көрсетеді.</p>
        `,
      },
    ],
  },
  {
    id: 12,
    slug: "notebook-1920",
    type: "letter",
    title: "Қойын дәптер — жеке жазбалар",
    year: "1920-жж.",
    cover: "/images/archive/notebook.jpg",
    location: "Семей облыстық мұражайы",
    description:
      "Ақынның күнделікті ой-толғаныстары, өлең нобайлары мен философиялық тұжырымдары жинақталған дәптер.",
  },
  {
    id: 13,
    slug: "hajj-certificate-1905",
    type: "letter",
    title: "Қажылық куәлігі",
    year: "1905",
    cover: "/images/archive/hajj-cert.jpg",
    location: "ҚР Орталық мемлекеттік мұрағаты",
    description:
      "Меккеге сапары туралы ресми құжат — Шәкәрім өмірбаянының маңызды дәйектемесі.",
  },
  {
    id: 14,
    slug: "arrest-documents-1931",
    type: "letter",
    title: "1931 жылғы тұтқынға алу құжаттары",
    year: "1931",
    cover: "/images/archive/docs-1931.jpg",
    location: "ҚР Орталық мемлекеттік мұрағаты",
    description:
      "Шәкәрімнің ОГПУ-мен ұсталуы туралы архивтік құжаттар жинағы — қайғылы тағдырдың құжаттық дәлелі.",
  },

  // === Аудио жазбалар ===
  {
    id: 15,
    slug: "audio-boyan",
    type: "audio",
    title: "«Боян» әні",
    year: "Қалпына келтірілген",
    cover: "/images/archive/audio-boyan.jpg",
    location: "Цифрлық архив",
    description:
      "Шәкәрімнің әнінің архивтік аудиожазбасы, заманауи орындауда қалпына келтірілген нұсқасы.",
  },
  {
    id: 16,
    slug: "audio-zhailauda",
    type: "audio",
    title: "«Жайлауда» күйі",
    year: "Архивтік жазба",
    cover: "/images/archive/audio-zhailauda.jpg",
    location: "Орталық мемлекеттік дыбыс мұрағаты",
    description:
      "Шәкәрім жасаған күйдің сирек кездесетін аудиожазбасы — оның композиторлық мұрасының куәсі.",
  },
  {
    id: 17,
    slug: "audio-anadan-algash",
    type: "audio",
    title: "«Анадан алғаш туғанымда»",
    year: "Заманауи жазба",
    cover: "/images/archive/audio-anadan.jpg",
    location: "Цифрлық архив",
    description:
      "Шәкәрім сөзіне жазылған әннің студиялық орындау нұсқасы.",
  },

  // === Бейне материалдар ===
  {
    id: 18,
    slug: "video-zhalgyzdyk-zholy",
    type: "video",
    title: "«Шәкәрім: жалғыздық жолы»",
    year: "2008",
    cover: "/images/archive/video-doc-2008.jpg",
    location: "Қазақстан мемлекеттік телекомпаниясы",
    description:
      "Шәкәрім өмірі мен шығармашылығына арналған терең деректі фильм.",
  },
  {
    id: 19,
    slug: "video-qazaq-ainasy-2015",
    type: "video",
    title: "«Қазақ айнасы» — телехабар",
    year: "2015",
    cover: "/images/archive/video-tv-2015.jpg",
    location: "Хабар арнасы",
    description:
      "Шәкәрімнің әдеби мұрасы туралы кеңейтілген телехабар.",
  },
  {
    id: 20,
    slug: "video-izimen-2018",
    type: "video",
    title: "«Шәкәрімнің ізімен»",
    year: "2018",
    cover: "/images/archive/video-trip-2018.jpg",
    location: "Цифрлық архив",
    description:
      "Ақын өмір сүрген жерлермен жасалған заманауи деректі сапар.",
  },
];

export function getTypeMeta(id) {
  return ARCHIVE_TYPES.find((t) => t.id === id) ?? null;
}

export function getTypesWithCounts() {
  const counts = new Map();
  ARCHIVE.forEach((i) => {
    counts.set(i.type, (counts.get(i.type) ?? 0) + 1);
  });
  return ARCHIVE_TYPES.filter((t) => counts.has(t.id)).map((t) => ({
    ...t,
    count: counts.get(t.id) ?? 0,
  }));
}

export function getItemsByType(typeId) {
  return ARCHIVE.filter((i) => i.type === typeId);
}

export function getArchiveBySlug(slug) {
  return ARCHIVE.find((i) => i.slug === slug) ?? null;
}

// Похожие — того же типа, исключая текущий.
export function getRelatedArchive(currentSlug, limit = 3) {
  const current = ARCHIVE.find((i) => i.slug === currentSlug);
  if (!current) return [];
  return ARCHIVE.filter(
    (i) => i.slug !== currentSlug && i.type === current.type,
  ).slice(0, limit);
}

export function archiveHref(slug) {
  return `/archive/${slug}`;
}
