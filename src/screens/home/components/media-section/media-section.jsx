import Link from "next/link";
import { AudioCard } from "@/components/ui/audio-card/audio-card";
import { SectionHeader } from "@/components/ui/section-header/section-header";
import { Slider } from "@/components/ui/slider/slider";
import { VideoCard } from "@/components/ui/video-card/video-card";
import styles from "./media-section.module.scss";

export function MediaSection({
  videos = [],
  audios = [],
  allHref = "#",
  allAudiosHref = "#",
  title = "Медиаматериалы",
}) {
  return (
    <section className={styles.section}>
      <SectionHeader
        title={title}
        allHref={allHref}
        allLabel="Все материалы →"
      />

      <div className={styles.grid}>
        <div className={styles.videoCol}>
          <h3 className={styles.colTitle}>Видеоматериалы</h3>
          <Slider itemsPerView={1}>
            {videos.map((v) => (
              <VideoCard
                key={v.id}
                title={v.title}
                thumbnail={v.thumbnail}
                thumbnailAlt={v.thumbnailAlt}
                duration={v.duration}
                href={v.href}
              />
            ))}
          </Slider>
        </div>

        <div className={styles.audioCol}>
          <h3 className={styles.colTitle}>Аудио</h3>
          <ul className={styles.audioList}>
            {audios.map((a) => (
              <li key={a.id}>
                <AudioCard
                  title={a.title}
                  author={a.author}
                  duration={a.duration}
                  cover={a.cover}
                  coverAlt={a.coverAlt}
                  src={a.src}
                />
              </li>
            ))}
          </ul>
          <Link href={allAudiosHref} className={styles.audioAll}>
            Показать все →
          </Link>
        </div>
      </div>
    </section>
  );
}
