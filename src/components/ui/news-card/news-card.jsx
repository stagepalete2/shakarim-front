import Link from "next/link";
import { Image } from "@/components/ui/image/image";
import { formatDate } from "@/lib/date";
import styles from "./news-card.module.scss";

export function NewsCard({
  title,
  author,
  date,
  image,
  imageAlt,
  href = "#",
  className = "",
}) {
  return (
    <article className={`${styles.card} ${className}`}>
      <Link href={href} className={styles.link}>
        <div className={styles.imageWrap}>
          {image && (
            <Image
              src={image}
              alt={imageAlt ?? title}
              className={styles.image}
            />
          )}
        </div>

        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.meta}>
            {author && <span className={styles.author}>{author}</span>}
            {date && (
              <time className={styles.date} dateTime={String(date)}>
                {formatDate(date)}
              </time>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
