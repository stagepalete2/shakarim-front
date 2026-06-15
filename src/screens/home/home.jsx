import { Banner } from "@/components/ui/banner/banner"
import { SectionHeader } from "@/components/ui/section-header/section-header"
import { AuthorsSection } from "./components/authors-section/authors-section"
import { BooksSection } from "./components/books-section/books-section"
import { MediaSection } from "./components/media-section/media-section"
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
import { bookHref } from "@/lib/books"
import { authorHref } from "@/lib/authors"
import styles from "./home.module.scss"

// worldEvents[].icon (ключ) → SVG-компонент (см. API.md §10.2).
const WORLD_EVENT_ICONS = {
  camera: CameraIcon,
  phone: PhoneIcon,
  bulb: BulbIcon,
  film: FilmIcon,
  atom: AtomIcon,
  helmet: HelmetIcon,
  star: StarIcon,
  peace: PeaceIcon,
};

function renderIcon(key) {
  const Icon = WORLD_EVENT_ICONS[key];
  return Icon ? <Icon /> : null;
}

const SHOWCASE_LIMIT = 8;
const AUDIO_LIMIT = 4;

// home — /api/home/ (banner, chronology, worldEvents, quickNav, sections).
// books/authors/media — витрины из основных эндпоинтов.
export function Home({ home = {}, books = [], authors = [], media = {} }) {
  const banner = home.banner ?? {};
  const sections = home.sections ?? {};
  const chronology = home.chronology ?? [];

  // worldEvents: ключ иконки → React-узел для Timeline.
  const worldEvents = (home.worldEvents ?? []).map((e) => ({
    ...e,
    icon: renderIcon(e.icon),
  }));

  // Диапазон таймлайна — из годов хронологии ±20 (fallback — жизнь поэта).
  const years = chronology
    .map((e) => e.year)
    .filter((y) => typeof y === "number");
  const startYear = (years.length ? Math.min(...years) : 1858) - 20;
  const endYear = (years.length ? Math.max(...years) : 1931) + 20;

  const bookItems = books.slice(0, SHOWCASE_LIMIT).map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    cover: b.cover,
    href: bookHref(b.slug),
  }));
  const authorItems = authors.slice(0, SHOWCASE_LIMIT).map((a) => ({
    id: a.id,
    name: a.name,
    role: a.role,
    photo: a.photo,
    href: authorHref(a.slug),
  }));
  const videoItems = (media.videos ?? []).slice(0, SHOWCASE_LIMIT).map((v) => ({
    id: v.id,
    title: v.title,
    thumbnail: v.thumbnail,
    duration: v.duration,
    href: "/media",
  }));
  const audioItems = (media.audio ?? []).slice(0, AUDIO_LIMIT).map((a) => ({
    id: a.id,
    title: a.title,
    author: a.author,
    duration: a.duration,
    cover: a.cover,
    src: a.audioUrl,
  }));

  return (
    <main className={styles.home}>
      <div className={styles.bannerWrap}>
        <Banner src={banner.video}>
          <div className={styles.bannerContent}>
            {banner.eyebrow && (
              <p className={styles.bannerEyebrow}>{banner.eyebrow}</p>
            )}
            {banner.title && (
              <h1 className={styles.bannerTitle}>{banner.title}</h1>
            )}
            {banner.tagline && (
              <p className={styles.bannerTagline}>{banner.tagline}</p>
            )}
            {banner.quote && (
              <p className={styles.bannerQuote}>{banner.quote}</p>
            )}
          </div>
        </Banner>
      </div>

      <section className={styles.quickNav}>
        <QuickNavSection items={home.quickNav ?? []} />
      </section>

      <section className={styles.authors}>
        <AuthorsSection
          items={authorItems}
          allHref="/authors"
          title={sections.authors?.title}
        />
      </section>

      <section className={styles.chronology}>
        <div className={styles.chronologyInner}>
          <div className={styles.chronologyHead}>
            <SectionHeader
              title={sections.chronology?.title ?? "Хронология жизни"}
              description={sections.chronology?.description}
              align="center"
              tone="onAccent"
            />
          </div>

          <Timeline
            events={chronology}
            contextEvents={worldEvents}
            startYear={startYear}
            endYear={endYear}
          />
        </div>
      </section>

      <section className={styles.books}>
        <BooksSection
          items={bookItems}
          allHref="/books"
          title={sections.books?.title}
        />
      </section>

      <section className={styles.media}>
        <MediaSection
          videos={videoItems}
          audios={audioItems}
          allHref="/media"
          allAudiosHref="/media"
          title={sections.media?.title}
        />
      </section>
    </main>
  );
}
