import { LocaleLink as Link } from "@/components/ui/locale-link/locale-link";
import { Image } from "@/components/ui/image/image";
import { formatDate } from "@/lib/date";
import styles from "./article-card.module.scss";

export function ArticleCard({
  title,
  cover,
  coverAlt,
  tags = [],
  author,
  date,
  href = "#",
  className = "",
}) {
  return (
    <article className={`${styles.card} ${className}`}>
      <Link href={href} className={styles.link}>
        <div className={styles.coverWrap}>
          {cover && (
            <Image
              src={cover}
              alt={coverAlt ?? title}
              className={styles.cover}
            />
          )}
        </div>

        <div className={styles.body}>
          {tags.length > 0 && (
            <ul className={styles.tags}>
              {tags.map((tag) => (
                <li key={tag} className={styles.tag}>
                  {tag}
                </li>
              ))}
            </ul>
          )}

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
