// Медиа — каталог видео, документальных фильмов, аудио и фото.
//
// СТРУКТУРА:
//   tabs: { videos, films, audio, photos } — 4 секции
//
// ОБЩИЕ ПОЛЯ media-item (все опциональны кроме id+title):
//   id, title, author?, year?, date?, description?
//   thumbnail?, duration?, tags?
//   links?: [{ label, url }]
//   attachments?: [{ name, url, size?, type? }]
//
// ТИПО-СПЕЦИФИЧНЫЕ ПОЛЯ:
//   videos / films: videoUrl (YouTube/Vimeo URL)
//   audio: audioUrl + cover
//   photos: src + caption + description

// === Утилита: вытащить ID YouTube-видео из любой формы URL ===
export function extractYoutubeId(url) {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([\w-]{11})/,
  );
  return match?.[1] ?? null;
}

// === Тип видео из URL ===
export function getVideoEmbedUrl(url) {
  const ytId = extractYoutubeId(url);
  if (ytId) return `https://www.youtube.com/embed/${ytId}?rel=0`;
  // Vimeo и другие провайдеры — добавлять по мере появления.
  return url;
}

export const MEDIA = {
  videos: [
    {
      id: "v1",
      title: "Шәкәрім философиясы — ашық дәріс",
      author: "Ғарифолла Есім",
      year: 2018,
      date: "2018-09-12",
      duration: "48:21",
      thumbnail: "/images/media/videos/lecture-esim.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description:
        "Қазақстанның белгілі философы Ғарифолла Есімнің Шәкәрім ой-санасы мен «Үш анық» іліміне арналған ашық дәрісі.",
      tags: ["философия", "дәріс", "ар ілімі"],
      links: [
        { label: "Конференция сайты", url: "https://example.com/conf" },
      ],
    },
    {
      id: "v2",
      title: "Сұхбат: Шәкәрім мұрасы туралы",
      author: "Хабар арнасы",
      year: 2015,
      date: "2015-04-08",
      duration: "22:15",
      thumbnail: "/images/media/videos/interview-khabar.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description:
        "Әдебиеттанушылармен интервью — қазіргі заманғы шәкәрімтану жағдайы.",
      tags: ["сұхбат", "TV"],
    },
    {
      id: "v3",
      title: "Шыңғыстауда — қысқа ролик",
      author: "Шәкәрім орталығы",
      year: 2020,
      date: "2020-06-15",
      duration: "3:45",
      thumbnail: "/images/media/videos/clip-chyngystau.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description:
        "Ақынның туған өңірі — Шыңғыстау таулары туралы шағын видео-эссе.",
      tags: ["ролик", "табиғат"],
    },
    {
      id: "v4",
      title: "«Үш анық» — талдау",
      author: "Әдебиет әлемі",
      year: 2021,
      duration: "18:30",
      thumbnail: "/images/media/videos/analysis-ush-anyq.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description:
        "Философиялық еңбектің негізгі ұғымдары мен олардың заманауи актуалдылығы.",
      tags: ["талдау", "философия"],
    },
    {
      id: "v5",
      title: "Шәкәрімнің 165 жылдығына — мерейтой",
      author: "ҚазТРК",
      year: 2023,
      duration: "1:12:08",
      thumbnail: "/images/media/videos/anniversary-165.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description:
        "Мерейтойлық концерт — ақын шығармаларының заманауи орындауы.",
      tags: ["мерейтой", "концерт"],
    },
    {
      id: "v6",
      title: "Студенттер үшін мини-курс",
      author: "Шәкәрім ат. университеті",
      year: 2022,
      duration: "32:55",
      thumbnail: "/images/media/videos/student-course.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: "Жоғары курс студенттеріне арналған шолу-курс.",
      tags: ["дәріс", "білім"],
    },
  ],

  films: [
    {
      id: "f1",
      title: "Шәкәрім: жалғыздық жолы",
      author: "Қазақстан мемлекеттік телекомпаниясы",
      year: 2008,
      duration: "52:40",
      thumbnail: "/images/media/films/doc-2008.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description:
        "Ақын өмірі мен шығармашылығына арналған терең деректі фильм. Шыңғыстаудағы жалғыздық кезеңі, философиялық ізденістер, тарихи драма.",
      tags: ["деректі", "өмірбаян"],
      attachments: [
        {
          name: "Фильм туралы анықтама.pdf",
          url: "/files/media/film-2008-info.pdf",
          size: "1.2 МБ",
          type: "pdf",
        },
      ],
    },
    {
      id: "f2",
      title: "Шәкәрімнің ізімен",
      author: "Цифрлық архив",
      year: 2018,
      duration: "44:12",
      thumbnail: "/images/media/films/footsteps-2018.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description:
        "Шәкәрім өмір сүрген жерлермен жасалған заманауи деректі сапар: Семей, Шыңғыстау, Мекке.",
      tags: ["деректі", "сапар"],
    },
    {
      id: "f3",
      title: "Қазақ айнасы — телехабар",
      author: "Хабар арнасы",
      year: 2015,
      duration: "38:25",
      thumbnail: "/images/media/films/qazaq-ainasy.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description:
        "Шәкәрімнің әдеби мұрасы туралы кеңейтілген телехабар.",
      tags: ["TV", "әдебиет"],
    },
  ],

  audio: [
    {
      id: "a1",
      title: "Боян",
      author: "Шәкәрім · қалпына келтірілген орындау",
      year: 1925,
      duration: "3:42",
      cover: "/images/media/audio/boyan.jpg",
      audioUrl: "/files/media/audio/boyan.mp3",
      description:
        "Шәкәрімнің әнінің архивтік аудиожазбасы, заманауи орындауда қалпына келтірілген нұсқасы.",
      tags: ["ән", "архивтік"],
    },
    {
      id: "a2",
      title: "Жайлауда",
      author: "Шәкәрім · күй",
      duration: "5:18",
      cover: "/images/media/audio/zhailauda.jpg",
      audioUrl: "/files/media/audio/zhailauda.mp3",
      description:
        "Шәкәрім жасаған күйдің сирек кездесетін аудиожазбасы — оның композиторлық мұрасының куәсі.",
      tags: ["күй", "архивтік"],
    },
    {
      id: "a3",
      title: "Анадан алғаш туғанымда",
      author: "Шәкәрім сөзіне · заманауи орындау",
      duration: "4:01",
      cover: "/images/media/audio/anadan.jpg",
      audioUrl: "/files/media/audio/anadan.mp3",
      description:
        "Шәкәрім сөзіне жазылған әннің студиялық орындау нұсқасы.",
      tags: ["ән"],
    },
    {
      id: "a4",
      title: "Дүние-ай",
      author: "Шәкәрім",
      duration: "3:28",
      cover: "/images/media/audio/duniye.jpg",
      audioUrl: "/files/media/audio/duniye.mp3",
      description: "Лирикалық әннің кәсіби орындауы.",
      tags: ["ән", "лирика"],
    },
    {
      id: "a5",
      title: "Тұрсын — әнінің архивтік нұсқасы",
      author: "Шәкәрім",
      duration: "2:55",
      cover: "/images/media/audio/tursyn.jpg",
      audioUrl: "/files/media/audio/tursyn.mp3",
      description:
        "Авторлық әннің реконструкция нұсқасы — Шәкәрімнің композиторлық мұрасынан.",
      tags: ["ән"],
    },
  ],

  photos: [
    {
      id: "p1",
      title: "Шәкәрім — портрет",
      author: "Жеке мұрағат",
      year: "~1900",
      src: "/images/media/photos/portrait-1900.jpg",
      caption: "Шәкәрім Құдайбердіұлы, шамамен 1900 ж.",
      description:
        "Ақынның орта жасындағы сирек кездесетін портрет фотосуреті.",
      tags: ["портрет"],
    },
    {
      id: "p2",
      title: "Меккеге сапары",
      author: "Жеке мұрағат",
      year: 1905,
      src: "/images/media/photos/mekke-1905.jpg",
      caption: "Қажылық сапары алдында — 1905 ж.",
      description:
        "Қажылыққа аттанар алдында түсірілген тарихи фото.",
      tags: ["сапар", "тарихи"],
    },
    {
      id: "p3",
      title: "Шыңғыстаудағы үй",
      author: "Шәкәрім мемориалдық мұражайы",
      year: 1920,
      src: "/images/media/photos/shyngystau-home.jpg",
      caption: "Ақынның жалғыздықпен өмір сүрген үйі",
      description:
        "Шыңғыстау бөктеріндегі ағаш үй — соңғы жылдары жасаған шығармаларының мекені.",
      tags: ["мекен"],
    },
    {
      id: "p4",
      title: "Отбасылық сурет",
      author: "Жеке мұрағат",
      year: 1910,
      src: "/images/media/photos/family-1910.jpg",
      caption: "Туыстарымен — 1910 ж.",
      description: "Сирек кездесетін отбасылық сурет.",
      tags: ["отбасы"],
    },
    {
      id: "p5",
      title: "Соңғы жылдар",
      author: "Шәкәрім мемориалдық мұражайы",
      year: "~1930",
      src: "/images/media/photos/last-years.jpg",
      caption: "Ақынның соңғы фотосуреттерінің бірі",
      description: "Терең мағыналы, ой-толғаулы көзқарас.",
      tags: ["портрет"],
    },
    {
      id: "p6",
      title: "Музей экспонаттары",
      author: "Шәкәрім мемориалдық мұражайы",
      src: "/images/media/photos/museum.jpg",
      caption: "Семей қаласындағы Шәкәрім музейі",
      description:
        "Музейдің негізгі залы — қолжазбалар, жеке заттар мен фотосуреттер.",
      tags: ["музей"],
    },
    {
      id: "p7",
      title: "Конференция, 2008 ж.",
      author: "Шәкәрім орталығы",
      year: 2008,
      src: "/images/media/photos/conference-2008.jpg",
      caption: "150 жылдық мерейтой конференциясы",
      description: "Халықаралық ғылыми форум, Семей.",
      tags: ["іс-шара"],
    },
    {
      id: "p8",
      title: "Мерейтой концерті",
      author: "ҚазТРК",
      year: 2023,
      src: "/images/media/photos/concert-2023.jpg",
      caption: "165 жылдық мерейтойлық концерт",
      description: "Заманауи орындаушылардың Шәкәрім әндерін шығаруы.",
      tags: ["концерт", "мерейтой"],
    },
  ],
};

// === Метаданные секций для табов ===
export const MEDIA_TABS = [
  {
    id: "videos",
    number: "7.1",
    label: "Видео дәрістер",
    longLabel: "Видео дәрістер мен сұхбаттар",
  },
  {
    id: "films",
    number: "7.2",
    label: "Деректі фильм",
    longLabel: "Деректі фильмдер",
  },
  {
    id: "audio",
    number: "7.3",
    label: "Әндері",
    longLabel: "Аудио — әндер мен күйлер",
  },
  {
    id: "photos",
    number: "7.4",
    label: "Фотогалерея",
    longLabel: "Тарихи фотосуреттер",
  },
];
