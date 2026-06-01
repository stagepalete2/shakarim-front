import { Banner } from "@/components/ui/banner/banner"
import { SectionHeader } from "@/components/ui/section-header/section-header"
import { AuthorsSection } from "./components/authors-section/authors-section"
import { BooksSection } from "./components/books-section/books-section"
import { MediaSection } from "./components/media-section/media-section"
import { NewsSection } from "./components/news-section/news-section"
import { QuickNavSection } from "./components/quick-nav-section/quick-nav-section"
import {
  AtomIcon,
  BulbIcon,
  CameraIcon,
  FilmIcon,
  HelmetIcon,
  PeaceIcon,
  PhoneIcon,
  StarIcon,
} from "./components/timeline-icons"
import { Timeline } from "./components/timeline/timeline"
import styles from "./home.module.scss"

const TIMELINE_START = 1838; // 1858 - 20
const TIMELINE_END = 1951; // 1931 + 20

const SHAKARIM_EVENTS = [
  {
    year: 1858,
    title: "Рождение в Чингизских горах",
    image: "/images/timeline/birth.jpg",
    description:
      "Шакарим родился в семье знатного рода Тобыкты на территории нынешней Восточно-Казахстанской области.",
    details:
      "Его отец, Кудайберди, был старшим братом Абая Кунанбаева — поэт-наставник станет ключевой фигурой в жизни Шакарима.",
  },
  {
    year: 1868,
    label: "Детство",
    title: "Воспитание под влиянием Абая",
    image: "/images/timeline/childhood.jpg",
    description:
      "После ранней смерти отца Шакарим воспитывался под опекой дяди — Абая Кунанбаева, ставшего его учителем и духовным наставником.",
    details:
      "Под влиянием Абая он освоил арабский, персидский, турецкий и русский языки, познакомился с восточной и западной философией.",
  },
  {
    year: 1898,
    title: "Паломничество в Мекку",
    image: "/images/timeline/hajj.jpg",
    description:
      "Совершил хадж, посетил Стамбул и Каир, работал в библиотеках, изучал восточную философию и литературу.",
    details:
      "Путешествие привезло книги, рукописи и идеи, легшие в основу его последующих философских и исторических трудов.",
  },
  {
    year: 1912,
    title: "«Родословная тюрков, киргизов, казахов и ханских династий»",
    image: "/images/timeline/genealogy-book.jpg",
    description:
      "Издал в Оренбурге один из первых системных трудов по генеалогии тюркских народов.",
  },
  {
    year: 1925,
    label: "1920-е",
    title: "Уединение и философские труды",
    image: "/images/timeline/seclusion.jpg",
    description:
      "Удалился в горы и стал жить уединённо, посвятив себя поэзии, музыке и философско-религиозным сочинениям.",
    details:
      "В этот период созданы его ключевые произведения, в том числе философское учение «Үш анық» («Три истины»).",
  },
  {
    year: 1931,
    title: "Гибель в эпоху репрессий",
    image: "/images/timeline/repression.jpg",
    description:
      "Шакарим был убит во время политических преследований казахской интеллигенции. Его имя на десятилетия оказалось под запретом.",
  },
];

const LATEST_NEWS = [
  {
    id: 1,
    title: "Открыт приём документов на 2026/2027 учебный год",
    author: "Приёмная комиссия",
    date: "2026-05-15",
    image: "/images/news/grants.jpg",
    href: "#",
  },
  {
    id: 2,
    title: "Шакаримовские чтения 2026: международная конференция в Семее",
    author: "Научный отдел",
    date: "2026-05-12",
    image: "/images/news/grants.jpg",
    href: "#",
  },
  {
    id: 3,
    title: "Студенты университета — призёры республиканской олимпиады",
    author: "Пресс-служба",
    date: "2026-05-08",
    image: "/images/news/grants.jpg",
    href: "#",
  },
  {
    id: 4,
    title: "Открыт новый корпус Института филологии и истории",
    author: "Администрация",
    date: "2026-05-04",
    image: "/images/news/grants.jpg",
    href: "#",
  },
  {
    id: 5,
    title: "Запущена грантовая программа для молодых исследователей",
    author: "Отдел грантов",
    date: "2026-04-29",
    image: "/images/news/grants.jpg",
    href: "#",
  },
  {
    id: 6,
    title: "Запущена грантовая программа для молодых исследователей",
    author: "Отдел грантов",
    date: "2026-04-29",
    image: "/images/news/grants.jpg",
    href: "#",
  },
];

const QUICK_NAV = [
  {
    title: "Художественные фильмы",
    href: "#",
    image: "/images/quick-nav/films.jpg",
  },
  {
    title: "Театральные концерты",
    href: "#",
    image: "/images/quick-nav/theater.jpg",
  },
  {
    title: "Мир книг",
    href: "#",
    image: "/images/quick-nav/books.jpg",
  },
  {
    title: "Биография",
    href: "#",
    image: "/images/quick-nav/biography.jpg",
  },
];

const POPULAR_BOOKS = [
  {
    id: 1,
    title: "Үш анық",
    author: "Шәкәрім Құдайбердіұлы",
    cover: "/images/books/qazaq-ainasy.jpg",
    href: "#",
  },
  {
    id: 2,
    title: "Қазақ айнасы",
    author: "Шәкәрім Құдайбердіұлы",
    cover: "/images/books/qazaq-ainasy.jpg",
    href: "#",
  },
  {
    id: 3,
    title: "Қалқаман — Мамыр",
    author: "Шәкәрім Құдайбердіұлы",
    cover: "/images/books/qazaq-ainasy.jpg",
    href: "#",
  },
  {
    id: 4,
    title: "Еңлік — Кебек",
    author: "Шәкәрім Құдайбердіұлы",
    cover: "/images/books/qazaq-ainasy.jpg",
    href: "#",
  },
  {
    id: 5,
    title: "Жолсыз жаза",
    author: "Шәкәрім Құдайбердіұлы",
    cover: "/images/books/qazaq-ainasy.jpg",
    href: "#",
  },
  {
    id: 6,
    title: "Дубровский",
    author: "А. Пушкин · аударған Шәкәрім",
    cover: "/images/books/qazaq-ainasy.jpg",
    href: "#",
  },
  {
    id: 7,
    title: "Түрік, қырғыз-қазақ һәм хандар шежіресі",
    author: "Шәкәрім Құдайбердіұлы",
    cover: "/images/books/qazaq-ainasy.jpg",
    href: "#",
  },
  {
    id: 8,
    title: "Мұтылғанның өмірі",
    author: "Шәкәрім Құдайбердіұлы",
    cover: "/images/books/qazaq-ainasy.jpg",
    href: "#",
  },
];

const VIDEO_MATERIALS = [
  {
    id: 1,
    title: "По следам Абая. Часть 2",
    thumbnail: "/images/videos/abay-2.jpg",
    duration: "12:34",
    href: "#",
  },
  {
    id: 2,
    title: "Шакарим Кудайбердиев — поэт и философ",
    thumbnail: "/images/videos/shakarim-portrait.jpg",
    duration: "18:02",
    href: "#",
  },
  {
    id: 3,
    title: "Жыр Шәкәрім — литературный вечер",
    thumbnail: "/images/videos/literary-evening.jpg",
    duration: "26:15",
    href: "#",
  },
  {
    id: 4,
    title: "Музыкальное наследие Шакарима",
    thumbnail: "/images/videos/music-heritage.jpg",
    duration: "08:47",
    href: "#",
  },
  {
    id: 5,
    title: "По следам Абая. Часть 1",
    thumbnail: "/images/videos/abay-1.jpg",
    duration: "11:09",
    href: "#",
  },
  {
    id: 6,
    title: "Шәкәрімтану: лекция профессора Каирбековой",
    thumbnail: "/images/videos/lecture.jpg",
    duration: "42:23",
    href: "#",
  },
];

const AUDIO_MATERIALS = [
  {
    id: 1,
    title: "Абай Кунанбаев: Слова назидания. Слово первое",
    author: "Абай Кунанбаев",
    duration: "3:04",
    cover: "/images/audio/abay.jpg",
    src: "/audio/abay-slovo-1.mp3",
  },
  {
    id: 2,
    title: "Абай Кунанбаев: Слова назидания. Слово второе",
    author: "Абай Кунанбаев",
    duration: "2:59",
    cover: "/images/audio/abay.jpg",
    src: "/audio/abay-slovo-2.mp3",
  },
  {
    id: 3,
    title: "Абай Кунанбаев: Слова назидания. Слово третье",
    author: "Абай Кунанбаев",
    duration: "6:26",
    cover: "/images/audio/abay.jpg",
    src: "/audio/abay-slovo-3.mp3",
  },
  {
    id: 4,
    title: "Шәкәрім — «Үш анық»: вступление",
    author: "Шәкәрім Құдайбердіұлы",
    duration: "4:18",
    cover: "/images/audio/shakarim.jpg",
    src: "/audio/shakarim-ush-anyq.mp3",
  },
];

const OUR_AUTHORS = [
  {
    id: 1,
    name: "Айгуль Каирбекова",
    role: "Шәкәрімтанушы, доктор филологических наук",
    photo: "/images/authors/kairbekova.jpg",
    href: "#",
  },
  {
    id: 2,
    name: "Бекжан Серикулы",
    role: "Историк, профессор",
    photo: "/images/authors/president.jpg",
    href: "#",
  },
  {
    id: 3,
    name: "Айдос Сарсенбаев",
    role: "Литературовед, PhD",
    photo: "/images/authors/president.jpg",
    href: "#",
  },
  {
    id: 4,
    name: "Гульнара Бакитова",
    role: "Философ, кандидат наук",
    photo: "/images/authors/president.jpg",
    href: "#",
  },
  {
    id: 5,
    name: "Нурлан Сапарбаев",
    role: "Переводчик, доцент",
    photo: "/images/authors/president.jpg",
    href: "#",
  },
  {
    id: 6,
    name: "Заура Жумабекова",
    role: "Музыковед, искусствовед",
    photo: "/images/authors/president.jpg",
    href: "#",
  },
  {
    id: 7,
    name: "Дамир Турсунов",
    role: "Культуролог, доцент",
    photo: "/images/authors/president.jpg",
    href: "#",
  },
  {
    id: 8,
    name: "Мадина Алимова",
    role: "Архивариус, кандидат исторических наук",
    photo: "/images/authors/president.jpg",
    href: "#",
  },
];

const CONTEXT_EVENTS = [
  { year: 1839, label: "Изобретение фотографии", icon: <CameraIcon /> },
  { year: 1876, label: "Изобретение телефона", icon: <PhoneIcon /> },
  { year: 1879, label: "Лампа накаливания Эдисона", icon: <BulbIcon /> },
  { year: 1895, label: "Первый кинопоказ Люмьеров", icon: <FilmIcon /> },
  { year: 1905, label: "Теория относительности Эйнштейна", icon: <AtomIcon /> },
  { year: 1914, label: "Начало Первой мировой войны", icon: <HelmetIcon /> },
  { year: 1917, label: "Октябрьская революция", icon: <StarIcon /> },
  { year: 1939, label: "Начало Второй мировой войны", icon: <HelmetIcon /> },
  { year: 1945, label: "Окончание Второй мировой войны", icon: <PeaceIcon /> },
];

export function Home() {
  return (
    <main className={styles.home}>
      <div className={styles.bannerWrap}>
        <Banner src="/videos/sample_banner.mp4">
          <div className={styles.bannerContent}>
            <p className={styles.bannerEyebrow}>1858 — 1931</p>
            <h1 className={styles.bannerTitle}>Шәкәрім Құдайбердіұлы</h1>
            <p className={styles.bannerTagline}>
              Ақын • Философ • Сазгер
            </p>
            <p className={styles.bannerQuote}>
              «Үш анық»: Ынсап • Ұят • Әділет
            </p>
          </div>
        </Banner>
      </div>

      <section className={styles.quickNav}>
        <QuickNavSection items={QUICK_NAV} />
      </section>

      <section className={styles.authors}>
        <AuthorsSection items={OUR_AUTHORS} />
      </section>

      <section className={styles.chronology}>
        <div className={styles.chronologyInner}>
          <div className={styles.chronologyHead}>
            <SectionHeader
              title="Хронология жизни"
              description="На фоне ключевых мировых событий той эпохи. Нажмите на точку, чтобы открыть карточку с подробностями."
              align="center"
              tone="onAccent"
            />
          </div>

          <Timeline
            events={SHAKARIM_EVENTS}
            contextEvents={CONTEXT_EVENTS}
            startYear={TIMELINE_START}
            endYear={TIMELINE_END}
          />
        </div>
      </section>

      <section className={styles.books}>
        <BooksSection items={POPULAR_BOOKS} />
      </section>

      <section className={styles.media}>
        <MediaSection
          videos={VIDEO_MATERIALS}
          audios={AUDIO_MATERIALS}
        />
      </section>

      {/* <section className={styles.news}>
        <NewsSection items={LATEST_NEWS} />
      </section> */}
    </main>
  );
}
