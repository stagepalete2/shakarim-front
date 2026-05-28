// Биография Шәкәрім Құдайбердіұлы — мок-данные.
//
// СТРУКТУРА — то, что ожидаем с бэкенда/CMS. Сейчас наполнено
// плейсхолдер-контентом, чтобы экран выглядел живым в дев-режиме.
// При замене этого файла на ответ API ничего в компонентах не должно
// поменяться — секции принимают свои срезы и сами справляются с
// пустыми/частичными данными (рендерят null или скрывают подблоки).
//
// Формат каждого блока:
//
//   hero:        { eyebrow, title, lifespan, subtitle, portrait }
//   chronology:  Array<{ year, title, description, image?, media? }>
//   environment: { intro, paragraphs[], quote?, facts[], images[] }
//   familyTree:  { root: TreeNode }
//                TreeNode = { name, relation, description, portrait?, children? }
//   memories:    Array<{ text, source?, image?, year? }>
//   descendants: Array<{ name, relation, bio, image? }>
//   political:   { intro, events: Array<{ year, title, description, image?, citation? }>, quote? }
//   intellectual:{ intro, influences: Array<{ name, era, contribution, quote?, portrait? }>, works: Array<{ title, year, type }> }

export const BIO = {
  hero: {
    eyebrow: "Ғұмырнама",
    title: "Шәкәрім Құдайбердіұлы",
    lifespan: "1858 — 1931",
    lead:
      "Қазақ ақыны, философ, аудармашы және композитор. Дала ойшылдығы мен Шығыс пен Батыс философиясын бір арнаға жинаған рухани тұлға.",
    portrait: "/images/biography/hero-portrait.jpg",
  },

  chronology: [
    {
      year: 1858,
      title: "Туылған жылы",
      description: "Шыңғыстау бөктерінде дүниеге келді.",
      image: "/images/biography/chronology/1858.jpg",
    },
    {
      year: 1865,
      title: "Әкеден айырылды",
      description: "Жеті жасында әкесінен айырылып, Абайдың тәрбиесіне өтті.",
    },
    {
      year: 1876,
      title: "Абайдың шәкірті",
      description: "Ұстазы Абайдан ой-өріс, ақындық дәстүр алды.",
      image: "/images/biography/chronology/1876.jpg",
    },
    {
      year: 1898,
      title: "Алғашқы шығармашылық кезеңі",
      description: "Лирикалық өлеңдер мен дастандар жаза бастады.",
    },
    {
      year: 1905,
      title: "Қажылық сапар",
      description:
        "Меккеге сапар шегіп, Шығыс философиясы мен діни ілімдерімен тереңірек танысты.",
      image: "/images/biography/chronology/1905.jpg",
    },
    {
      year: 1912,
      title: "«Шежіре» жарық көрді",
      description: "Түркі халықтары мен қазақ хандарының шежіресі басылды.",
    },
    {
      year: 1922,
      title: "Шыңғыстауға оралу",
      description: "Жалғыздықпен өмір сүріп, философиялық еңбектерге кірісті.",
      image: "/images/biography/chronology/1922.jpg",
    },
    {
      year: 1925,
      title: "«Үш анық»",
      description: "Басты философиялық еңбегі — ар, ұят пен әділдік туралы.",
    },
    {
      year: 1931,
      title: "Қазасы",
      description: "ОГПУ-мен тұтқынға алынып, қаза тапты. 1958 жылы ақталды.",
    },
  ],

  environment: {
    intro: "Шәкәрім дала мәдениетінің қайнар бұлағында дүниеге келді.",
    paragraphs: [
      "Шыңғыстау бөктері — Тобықты руының жайлауы. Бұл өңір ХІХ ғасырдың соңында ауызша поэзия мен ой-толғаудың орталығы болды. Ақын осындай ортада өсіп, дала философиясы мен Шығыс білімдерін бойына сіңірді.",
      "Әкесі Құдайберді — Құнанбай қажының інісі, Абайдың туысы. Жанұя қатынасы Шәкәрімге Абайдай ұстазға жақын тұруға мүмкіндік берді. Бұл ерте жастан зор әсер қалдырды.",
    ],
    quote: {
      text:
        "Қазақ даласы — ұлы ойдың бесігі, өнер мен философияның мекені.",
      attribution: "Зерттеуші пікірі",
    },
    facts: [
      { label: "Туған жылы", value: "1858" },
      { label: "Туған өңірі", value: "Шыңғыстау" },
      { label: "Руы", value: "Тобықты" },
      { label: "Ұстазы", value: "Абай" },
    ],
    images: [
      {
        src: "/images/biography/env/chyngystau.jpg",
        caption: "Шыңғыстау тау сілемдері — ақынның туған өлкесі.",
      },
      {
        src: "/images/biography/env/steppe.jpg",
        caption: "Семей өңірінің даласы, XIX ғасырдың аяғы.",
      },
    ],
  },

  familyTree: {
    root: {
      name: "Құдайберді",
      relation: "Әкесі",
      description: "Құнанбай қажының інісі.",
      portrait: "/images/biography/family/kudaiberdi.jpg",
      children: [
        {
          name: "Шәкәрім Құдайбердіұлы",
          relation: "Өзі",
          description: "Ақын, философ, аудармашы (1858–1931).",
          portrait: "/images/biography/family/shakarim.jpg",
          children: [
            {
              name: "Ахат Шәкәрімұлы",
              relation: "Ұлы",
              description: "Ақын мұрасын сақтап, насихаттаған.",
              portrait: "/images/biography/family/akhat.jpg",
            },
            {
              name: "Зият Шәкәрімұлы",
              relation: "Ұлы",
              description: "Әкесінің еңбектерін жинақтаушы.",
            },
            {
              name: "Балқия Шәкәрімқызы",
              relation: "Қызы",
              description: "Жанұяның тарихын жеткізуші.",
            },
          ],
        },
      ],
    },
  },

  memories: [
    {
      text:
        "Балалық шағымда әкем менің қолыма қалам ұстатты. Ол кезде білмедім, бірақ қалам менің тағдырыма айналды.",
      source: "«Мұтылғанның өмірі»",
      year: 1929,
    },
    {
      text:
        "Шыңғыстау бөктері — менің бесігім. Әр тастың, әр көктемнің даусы жадымда.",
      source: "Естелік фрагменті",
      image: "/images/biography/memories/m1.jpg",
    },
    {
      text:
        "Ұстазым Абай маған өлеңнің тек әуені ғана емес, ойы мен жаны бар екенін үйретті.",
      source: "«Мұтылғанның өмірі»",
      year: 1929,
    },
    {
      text:
        "Меккеге сапар шеккенімде, көзім ашылды. Адам — бір ұлы шеңбердің кішкене бөлшегі.",
      source: "Қажылық жазбалары",
      image: "/images/biography/memories/m2.jpg",
    },
  ],

  descendants: [
    {
      name: "Ахат Шәкәрімұлы",
      relation: "Ұлы",
      bio: "Әкесінің мұрасын сақтап, ауыр кезеңде жариялауға атсалысты.",
      image: "/images/biography/descendants/akhat.jpg",
    },
    {
      name: "Зият Шәкәрімұлы",
      relation: "Ұлы",
      bio: "Шығармаларды реттеп, кейінгі ұрпаққа жеткізді.",
      image: "/images/biography/descendants/ziyat.jpg",
    },
    {
      name: "Балқия Шәкәрімқызы",
      relation: "Қызы",
      bio: "Отбасылық дәстүрді ұстанушы, тарих жеткізуші.",
      image: "/images/biography/descendants/balqiya.jpg",
    },
    {
      name: "Кейінгі ұрпақ",
      relation: "Немерелер",
      bio:
        "Шәкәрімнің рухани мұрасын зерттеуге өмірлерін арнаған туыстары.",
      image: "/images/biography/descendants/grandchildren.jpg",
    },
  ],

  political: {
    intro:
      "Шәкәрім қоғамдық өмірге белсене араласып, заманының рухани және саяси құбылыстарына өзіндік жауап қайтарды.",
    events: [
      {
        year: 1905,
        title: "Қажылық сапар",
        description:
          "Меккеге сапар — рухани ізденіс пен халықаралық байланыстың басталуы.",
        image: "/images/biography/political/hajj.jpg",
        citation: "Қажылық куәлігі, 1905 ж.",
      },
      {
        year: 1917,
        title: "Революция кезеңі",
        description:
          "Қоғамдағы өзгерістерге сын көзбен қарап, қазақ халқының болашағы үшін уайымдады.",
      },
      {
        year: 1924,
        title: "Ағарту жолы",
        description:
          "Жастарға арналған еңбектер жазып, ағарту ісіне үлес қосты.",
        image: "/images/biography/political/education.jpg",
      },
      {
        year: 1931,
        title: "Тұтқынға алыну",
        description:
          "Сталиндік репрессия құрбандарының бірі. 1958 жылы толық ақталды.",
        citation: "ҚР Орталық мемлекеттік мұрағаты, іс №...",
      },
    ],
    quote: {
      text:
        "Халықтың азаттығы — оның ой-санасының азаттығынан басталады.",
      attribution: "Шәкәрім, 1924 ж.",
    },
  },

  intellectual: {
    intro:
      "Шәкәрімнің ой әлемі — Шығыс пен Батыс философиясы, дала даналығы мен дін ілімі тоғысқан ерекше жүйе. Ол өзі үшін «үш анық» іздеп, әлемдік ойшылдардың мұрасына жүгінді.",
    influences: [
      {
        name: "Абай Құнанбайұлы",
        era: "1845 — 1904",
        contribution: "Ұстаз әрі рухани тәлімгер.",
        quote: "Адам — өзін-өзі тану жолындағы жолаушы.",
        portrait: "/images/biography/influences/abai.jpg",
      },
      {
        name: "Лев Толстой",
        era: "1828 — 1910",
        contribution: "Хат алмасу, мораль-философия үндестігі.",
        quote: "Біз бір-бірімізді түсіну үшін жаратылғанбыз.",
        portrait: "/images/biography/influences/tolstoy.jpg",
      },
      {
        name: "Әлішер Науаи",
        era: "1441 — 1501",
        contribution: "Шығыс поэзиясының классигі — стиль әсері.",
        portrait: "/images/biography/influences/navoi.jpg",
      },
      {
        name: "Хафиз",
        era: "1315 — 1390",
        contribution: "Сопылық дәстүр, ішкі еркіндік идеясы.",
        quote: "Жүрек — Алланың айнасы.",
        portrait: "/images/biography/influences/hafiz.jpg",
      },
    ],
    works: [
      { title: "«Үш анық»", year: 1925, type: "Философия" },
      { title: "«Мұтылғанның өмірі»", year: 1929, type: "Дастан" },
      { title: "«Шежіре»", year: 1911, type: "Тарих" },
      { title: "«Қазақ айнасы»", year: 1912, type: "Лирика" },
      { title: "«Иманым»", year: 1920, type: "Дін-философия" },
    ],
  },
};
