import Link from "next/link";
import { Image } from "@/components/ui/image/image";
import styles from "./video-card.module.scss";

export function VideoCard({
  title,
  thumbnail,
  thumbnailAlt,
  duration,
  href = "#",
  className = "",
}) {
  return (
    <Link href={href} className={`${styles.card} ${className}`}>
      <div className={styles.thumbWrap}>
        {thumbnail && (
          <Image
            src={thumbnail}
            alt={thumbnailAlt ?? title}
            className={styles.thumb}
          />
        )}
        <span className={styles.playButton} aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <polygon points="8,5 19,12 8,19" />
          </svg>
        </span>
        {duration && <span className={styles.duration}>{duration}</span>}
      </div>
      <h3 className={styles.title}>{title}</h3>
    </Link>
  );
}
