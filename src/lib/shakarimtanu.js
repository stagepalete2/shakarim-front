// Шәкәрімтану — гибкая структура страницы под бэкенд/CMS.
//
// ФОРМАТ:
//   hero: { eyebrow, title, lead }
//   sections: Array<{
//     id, number, title, subtitle?, lead?,
//     blocks?: Array<Block>   // предпочтительный формат — массив блоков
//     content?: string        // legacy: единый HTML, если blocks не задан
//   }>
//
// ТИПЫ БЛОКОВ:
//   { type: "text",   html | content: string }
//   { type: "quote",  text, attribution?, source? }
//   { type: "image",  src, alt?, caption?, ratio? }
//   { type: "gallery",title?, items: [{ src, caption? }] }
//   { type: "video",  url, title?, caption?, provider? }
//   { type: "pdf",    title?, items: [{ name, url, size?, author?, description? }] }
//   { type: "people", title?, items: [{ name, role?, years?, bio?, portrait? }] }
//   { type: "stats",  items: [{ value, label }] }
//   { type: "milestones", title?, items: [{ year, title, description? }] }
//   { type: "concepts",   title?, items: [{ title, subtitle?, symbol?, description? }] }

export const SHAKARIMTANU = {
  hero: {
    eyebrow: "Ғылыми бағыт",
    title: "Шәкәрімтану",
    lead: "Шәкәрім Құдайбердіұлының рухани, әдеби және ғылыми мұрасын зерттейтін ғылыми бағыт — қазақ гуманитарлық ғылымдарының жеке саласы ретінде қалыптасты.",
  },

  sections: [
    // === 4.1 Генезис ===
    {
      id: "genesis",
      title: "Генезис",
      subtitle: "Шәкәрімтану ғылымының негізі",
      lead:
        "Тыйым салынған мұраның ғылыми айналымға қайта оралуы және өзіндік зерттеу мектебінің қалыптасу тарихы.",
      blocks: [
        {
          type: "text",
          html: `
            <p>Шәкәрімтану — өзіндік нысаны, әдістемесі мен зерттеу мектебі бар ғылыми бағыт. Оның қалыптасуы ерекше тарихи жолмен жүзеге асты: ұзақ үнсіздіктен кейінгі қайта оралу.</p>
          `,
        },
        {
          type: "milestones",
          title: "Маңызды кезеңдер",
          items: [
            { year: "1931", title: "Тұтқынға алыну", description: "Мұра ресми түрде жабылды." },
            { year: "1958", title: "Ақталу", description: "ОГПУ ісі бойынша толық ақталды." },
            { year: "1988", title: "Алғашқы жариялымдар", description: "Шығармалары қайта басылды." },
            { year: "1990", title: "Ғылыми зерттеулер", description: "Алғашқы жүйелі еңбектер." },
            { year: "2008", title: "Шәкәрім ғылыми орталығы", description: "Семей қаласында құрылды." },
          ],
        },
        {
          type: "stats",
          items: [
            { value: "27", label: "тыйым жылы" },
            { value: "30+", label: "монография" },
            { value: "200+", label: "ғылыми мақала" },
            { value: "12", label: "диссертация" },
          ],
        },
        {
          type: "people",
          title: "Бастамашы зерттеушілер",
          items: [
            {
              name: "Қайым Мұхамедханов",
              years: "1916 — 2004",
              role: "Әдебиеттанушы",
              bio: "Шәкәрім мұрасын қайта ашуға ерекше үлес қосқан ғалым.",
              portrait: "/images/shakarimtanu/scholars/muhamedkhanov.jpg",
            },
            {
              name: "Ғарифолла Есім",
              years: "1947 ж.т.",
              role: "Философ",
              bio: "Шәкәрімнің философиялық мұрасын жүйелі зерттеген.",
              portrait: "/images/shakarimtanu/scholars/esim.jpg",
            },
            {
              name: "Мекемтас Мырзахметов",
              years: "1930 — 2015",
              role: "Әдебиеттанушы",
              bio: "Шәкәрім шығармаларының текстологиясын зерттеген.",
              portrait: "/images/shakarimtanu/scholars/myrzakhmetov.jpg",
            },
            {
              name: "Балтабай Әбдіғазиев",
              years: "1941 — 2014",
              role: "Әдебиеттанушы",
              bio: "Шәкәрімнің поэтикасы туралы іргелі еңбектердің авторы.",
              portrait: "/images/shakarimtanu/scholars/abdigaziev.jpg",
            },
          ],
        },
        {
          type: "image",
          src: "/images/shakarimtanu/genesis/conference.jpg",
          caption:
            "Шәкәрімнің 150 жылдық мерейтойына арналған халықаралық ғылыми конференция, 2008 ж.",
          ratio: "16 / 9",
        },
        {
          type: "pdf",
          title: "Іргелі еңбектер",
          items: [
            {
              name: "Шәкәрімтану: пайда болуы мен дамуы",
              url: "/files/shakarimtanu/origins.pdf",
              size: "4.2 МБ",
              author: "Ғ. Есім",
              description: "Ғылыми бағыттың қалыптасу тарихы туралы шолу.",
            },
          ],
        },
      ],
    },

    // === 4.2 Тарих ===
    {
      id: "history",
      title: "Тарих",
      subtitle: "Шәкәрім және тарих",
      lead:
        "Шежіре жазудағы еңбегі, қазақ халқының шығу тегі туралы ойлары және тарихи зерттеу әдісі.",
      blocks: [
        {
          type: "text",
          html: `
            <p>Шәкәрім — тек ақын ғана емес, тарихты терең зерттеген ойшыл. «Түрік, қырғыз-қазақ һәм хандар шежіресі» (1911) — оның тарихи көзқарасының ең айқын дәлелі.</p>
          `,
        },
        {
          type: "image",
          src: "/images/shakarimtanu/history/shezhire-cover.jpg",
          caption:
            "«Түрік, қырғыз-қазақ һәм хандар шежіресі» — алғашқы басылым, Орынбор, 1911 ж.",
          ratio: "4 / 5",
        },
        {
          type: "concepts",
          title: "Тарихи зерттеудегі негізгі бағыттар",
          items: [
            {
              title: "Этногенез",
              subtitle: "Халық тегі",
              description:
                "Қазақ халқының шығу тегі мен түркі әлемі ішіндегі орны жайлы тұжырымдар.",
            },
            {
              title: "Шежіре",
              subtitle: "Ру-тайпа жүйесі",
              description:
                "Хандар мен билердің шежіресін жүйелі құжаттау — қазақ тарихнамасының іргетасы.",
            },
            {
              title: "Дереккөздер",
              subtitle: "Әдіс",
              description:
                "Ауызша дәстүр + араб-парсы жазбалары + орыс ғалымдарының еңбектері.",
            },
          ],
        },
        {
          type: "quote",
          text: "Өткен — болашақтың айнасы. Өз тарихын білмеген халық жоғалуға бейім.",
          attribution: "Шәкәрім",
          source: "«Шежіре», 1911 ж.",
        },
        {
          type: "pdf",
          items: [
            {
              name: "Шәкәрімнің тарихнамалық концепциясы",
              url: "/files/shakarimtanu/history-concept.pdf",
              size: "3.1 МБ",
              author: "К. Жұмалиев",
            },
          ],
        },
      ],
    },

    // === 4.3 Әдебиет ===
    {
      id: "literature",
      title: "Әдебиет",
      subtitle: "Шәкәрім және әдебиет",
      lead:
        "Ақындық, жазушылық, аудармашылық қыры және қазақ әдебиетіндегі орны.",
      blocks: [
        {
          type: "text",
          html: `
            <p>Шәкәрімнің әдеби мұрасы — лирикалық өлеңдер, поэмалар, дастандар, аудармалар мен философиялық прозалық ой-толғаулар. Ұстазы Абайдан алған дәстүрді жалғастыра отырып, ол қазақ әдебиетіне жаңа тереңдік әкелді.</p>
          `,
        },
        {
          type: "stats",
          items: [
            { value: "5", label: "поэма" },
            { value: "100+", label: "өлең" },
            { value: "4", label: "ірі аударма" },
            { value: "3", label: "философ. шығарма" },
          ],
        },
        {
          type: "gallery",
          title: "Шығармаларының басылымдары",
          items: [
            { src: "/images/shakarimtanu/literature/ush-anyq.jpg", caption: "«Үш анық»" },
            { src: "/images/shakarimtanu/literature/qazaq-ainasy.jpg", caption: "«Қазақ айнасы»" },
            { src: "/images/shakarimtanu/literature/mutylgan.jpg", caption: "«Мұтылғанның өмірі»" },
            { src: "/images/shakarimtanu/literature/dubrovsky.jpg", caption: "«Дубровский» (аударма)" },
          ],
        },
        {
          type: "quote",
          text:
            "Сөз — ойдың киімі. Сөзі таза адамның ойы да таза.",
          attribution: "Шәкәрім",
        },
        {
          type: "concepts",
          title: "Көркемдік ерекшеліктер",
          items: [
            {
              title: "Философиялық лирика",
              description: "Ішкі әлемді терең талдау, өмір мәнін іздеу.",
            },
            {
              title: "Шығыс-Батыс синтезі",
              description: "Сопылық дәстүр мен еуропалық ой-сананың үндесуі.",
            },
            {
              title: "Дала эстетикасы",
              description: "Көшпелі мәдениеттің бейнелі тілінің сақталуы.",
            },
          ],
        },
      ],
    },

    // === 4.4 Текстология ===
    {
      id: "textology",
      title: "Текстология",
      subtitle: "Шәкәрім және текстология",
      lead:
        "Қолжазбалардың сақталуы, нұсқалардың салыстырылуы және мәтіндердің ғылыми тұрғыда қалпына келтірілуі.",
      blocks: [
        {
          type: "text",
          html: `
            <p>Шәкәрімнің шығармалары тарихи себептермен бірнеше нұсқада сақталды. Текстологиялық зерттеу — оның мұрасын дәл түрде ұрпаққа жеткізудің кепілі.</p>
          `,
        },
        {
          type: "gallery",
          title: "Қолжазба нұсқалары",
          items: [
            { src: "/images/shakarimtanu/textology/manuscript-1.jpg", caption: "Түпнұсқа қолжазба" },
            { src: "/images/shakarimtanu/textology/manuscript-2.jpg", caption: "Ахаттың көшірмесі" },
            { src: "/images/shakarimtanu/textology/manuscript-3.jpg", caption: "1988 ж. басылым" },
          ],
        },
        {
          type: "concepts",
          title: "Текстологиялық міндеттер",
          items: [
            {
              title: "Атрибуция",
              description: "Авторлықты дәлелдеу, басқа авторлардан ажырату.",
            },
            {
              title: "Хронология",
              description: "Шығармалардың жазылу мерзімін анықтау.",
            },
            {
              title: "Қалпына келтіру",
              description: "Жоғалған фрагменттерді мүмкіндігінше қалпына келтіру.",
            },
          ],
        },
        {
          type: "pdf",
          title: "Академиялық басылымдар",
          items: [
            {
              name: "Шәкәрім: Шығармалар жинағы (3 томдық)",
              url: "/files/shakarimtanu/shakarim-collected-works.pdf",
              size: "28.4 МБ",
              author: "ҚР ҰҒА",
              description: "Толық академиялық басылым, текстологиялық ескертулермен.",
            },
            {
              name: "Текстологиялық зерттеулер",
              url: "/files/shakarimtanu/textology-research.pdf",
              size: "5.8 МБ",
              author: "М. Мырзахметов",
            },
          ],
        },
      ],
    },

    // === 4.5 Баспасөз ===
    {
      id: "press",
      title: "Баспасөз",
      subtitle: "Шәкәрім және баспасөз",
      lead:
        "Ақынның замандас баспасөзіндегі орны, шығармаларының жариялану тарихы және қазіргі медиа-кеңістігі.",
      blocks: [
        {
          type: "text",
          html: `
            <p>ХХ ғасыр басында Шәкәрімнің шығармалары «Айқап» журналы мен «Қазақ» газеті секілді басылымдарда жарық көрді. Бұл оның есімінің кең қауымға жетуінде маңызды рөл атқарды.</p>
          `,
        },
        {
          type: "gallery",
          title: "Тарихи басылымдар",
          items: [
            { src: "/images/shakarimtanu/press/aiqap.jpg", caption: "«Айқап» журналы, 1911 ж." },
            { src: "/images/shakarimtanu/press/qazaq.jpg", caption: "«Қазақ» газеті, 1913 ж." },
          ],
        },
        {
          type: "pdf",
          title: "Қазіргі заманғы мақалалар",
          items: [
            {
              name: "Шәкәрім мұрасы — XXI ғасыр көзімен",
              url: "/files/shakarimtanu/press-modern.pdf",
              size: "2.4 МБ",
              author: "«Қазақ әдебиеті», 2018",
            },
            {
              name: "Цифрлық дәуірдегі Шәкәрімтану",
              url: "/files/shakarimtanu/digital-era.pdf",
              size: "1.9 МБ",
              author: "«Egemen Qazaqstan»",
            },
          ],
        },
      ],
    },

    // === 4.6 Ар ілімі ===
    {
      id: "ar-ilimi",
      title: "Ар ілімі",
      subtitle: "Үш ақиқат туралы ілім",
      lead:
        "Шәкәрімнің этикалық-философиялық жүйесі — оның ой-санасының өзегі.",
      blocks: [
        {
          type: "text",
          html: `
            <p>«Үш анық» (1925) — Шәкәрімнің философиялық ой-санасының шыңы. Бұл шығармада ол адамгершілік құндылықтардың жүйелі іліміне жетті.</p>
          `,
        },
        {
          type: "concepts",
          title: "Үш ақиқат",
          items: [
            {
              symbol: "Ар",
              title: "Ішкі тазалық",
              subtitle: "Адамның жан-дүниесі",
              description:
                "Адамның моральдық тұтастығы, ішкі жанының таза болуы.",
            },
            {
              symbol: "Ұят",
              title: "Жауапкершілік",
              subtitle: "Қоғам алдында",
              description:
                "Қоғам алдындағы моральдық міндеттемелер мен ұят-ынсап.",
            },
            {
              symbol: "Әділдік",
              title: "Қатынас өлшемі",
              subtitle: "Адамдар арасында",
              description:
                "Адами қатынастардағы әділеттіліктің универсалды өлшемі.",
            },
          ],
        },
        {
          type: "quote",
          text:
            "Үш ақиқат — адамның жол сілтеуші жұлдыздары. Олардың үшеуі бірге жүргенде ғана адам шынайы адам болады.",
          attribution: "Шәкәрім",
          source: "«Үш анық», 1925 ж.",
        },
        {
          type: "pdf",
          title: "Терең зерттеулер",
          items: [
            {
              name: "«Үш анық» — қазақ философиясының іргетасы",
              url: "/files/shakarimtanu/ush-anyq-analysis.pdf",
              size: "6.7 МБ",
              author: "Ғ. Есім",
            },
          ],
        },
      ],
    },

    // === 4.7 Таным ===
    {
      id: "tanym",
      title: "Таным",
      subtitle: "Дүниетаным мен философия",
      lead:
        "Өмір, адам, жан, әділет туралы философиялық тұжырымдар — Шәкәрімнің ой-санасының тереңі.",
      blocks: [
        {
          type: "text",
          html: `
            <p>Шәкәрімнің танымдық жүйесі — Шығыс пен Батыс философиясы, дала даналығы, ислам ілімі және сопылық дәстүр тоғысқан ерекше синтез.</p>
          `,
        },
        {
          type: "people",
          title: "Ой ұстаздары",
          items: [
            {
              name: "Абай Құнанбайұлы",
              years: "1845 — 1904",
              role: "Тікелей ұстаз",
              bio: "Ақындық дәстүр мен ой-сананың негізін салушы.",
              portrait: "/images/shakarimtanu/influences/abai.jpg",
            },
            {
              name: "Лев Толстой",
              years: "1828 — 1910",
              role: "Хат алмасу",
              bio: "Этикалық философияда үндестік табу.",
              portrait: "/images/shakarimtanu/influences/tolstoy.jpg",
            },
            {
              name: "Әлішер Науаи",
              years: "1441 — 1501",
              role: "Стиль ұстазы",
              bio: "Шығыс поэзиясының классигі.",
              portrait: "/images/shakarimtanu/influences/navoi.jpg",
            },
            {
              name: "Хафиз",
              years: "1315 — 1390",
              role: "Сопылық дәстүр",
              bio: "Ішкі еркіндік пен жан-дүние ілімі.",
              portrait: "/images/shakarimtanu/influences/hafiz.jpg",
            },
          ],
        },
        {
          type: "concepts",
          title: "Дүниетанымның негізгі категориялары",
          items: [
            { title: "Өмір", description: "Адамның жер бетіндегі миссиясы." },
            { title: "Жан", description: "Рухани жан-дүниенің құрылымы." },
            { title: "Адам", description: "Дүние мен Алла арасындағы көпір." },
            { title: "Әділет", description: "Универсалды моральдық өлшем." },
            { title: "Ақыл", description: "Танымның ең жоғары құралы." },
            { title: "Махаббат", description: "Тіршіліктің қозғаушы күші." },
          ],
        },
        {
          type: "video",
          url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          title: "Шәкәрім философиясы — дәріс",
          caption: "Ғарифолла Есімнің ашық дәрісі",
          provider: "YouTube",
        },
      ],
    },

    // === 4.8 Естеліктер ===
    {
      id: "memoirs",
      title: "Естеліктер",
      subtitle: "Замандастары мен ұрпақтары",
      lead:
        "Шәкәрімнің өмірі мен тұлғасы туралы жанды дереккөздер.",
      blocks: [
        {
          type: "text",
          html: `
            <p>Шәкәрімнің балалары — Ахат пен Балқия — өз әкесі туралы жазған естеліктері ақын тұлғасын ашатын негізгі дереккөздердің бірі. Замандас зиялылар да жадын қалдырды.</p>
          `,
        },
        {
          type: "people",
          title: "Естелік авторлары",
          items: [
            {
              name: "Ахат Шәкәрімұлы",
              years: "1900 — 1985",
              role: "Ұлы",
              bio: "Әкесінің мұрасын сақтап, ауыр кезеңде жариялауға атсалысты.",
              portrait: "/images/shakarimtanu/memoirs/akhat.jpg",
            },
            {
              name: "Балқия Шәкәрімқызы",
              years: "1905 — 1990",
              role: "Қызы",
              bio: "Отбасылық дәстүрді ұстанушы, естеліктер жазған.",
              portrait: "/images/shakarimtanu/memoirs/balqiya.jpg",
            },
            {
              name: "Жүсіпбек Аймауытов",
              years: "1889 — 1931",
              role: "Замандас",
              bio: "Қазақ зиялысы, Шәкәрім туралы естелік-очерктер.",
              portrait: "/images/shakarimtanu/memoirs/aimauytov.jpg",
            },
          ],
        },
        {
          type: "quote",
          text:
            "Әкем кешкі ауада терезенің алдында ұзақ отыратын. Сол кезде оның дауысы естілгендей болатын — ол өзімен өзі сөйлесетін.",
          attribution: "Ахат Шәкәрімұлы",
          source: "Әкем туралы естелік, 1962 ж.",
        },
        {
          type: "pdf",
          title: "Естеліктер жинағы",
          items: [
            {
              name: "Әкем Шәкәрім",
              url: "/files/shakarimtanu/akhat-memoirs.pdf",
              size: "5.2 МБ",
              author: "Ахат Шәкәрімұлы",
            },
            {
              name: "Замандастар естеліктері",
              url: "/files/shakarimtanu/contemporaries.pdf",
              size: "8.1 МБ",
              description: "Жанұя мен зиялы қауымның жинақталған естеліктері.",
            },
          ],
        },
      ],
    },
  ],
};
