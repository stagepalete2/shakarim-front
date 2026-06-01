import Link from "next/link";
import { Image } from "@/components/ui/image/image";
import { bookHref } from "@/lib/books";
import styles from "./book-card.module.scss";

// Карточка книги: обложка + название + автор + год + теги.
// Клик ведёт на детальную страницу /books/[slug], где доступны
// табы «Сипаттама» и «Контент» (PDF-просмотр).
export function BookCard({ book }) {
  if (!book) return null;

  const { slug, title, author, year, cover, description, tags = [], file } = book;
  const hasFile = Boolean(file?.url);

  return (
    <article className={styles.card}>
      <Link
        href={bookHref(slug)}
        className={styles.link}
        aria-label={`${title} — толық ақпарат`}
      >
        <div className={styles.coverWrap}>
          {cover && (
            <Image
              src={cover}
              alt={title}
              className={styles.cover}
              loading="lazy"
            />
          )}
          <div className={styles.coverFallback} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h12a3 3 0 0 1 3 3v14H7a3 3 0 0 1-3-3V4z" />
              <path d="M7 8h8M7 12h8M7 16h5" />
            </svg>
          </div>
          <div className={styles.coverGloss} aria-hidden="true" />

          {hasFile && (
            <span className={styles.viewBadge} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              PDF
            </span>
          )}
        </div>

        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.meta}>
            {author && <span className={styles.author}>{author}</span>}
            {year && <span className={styles.year}>{year}</span>}
          </div>
          {tags.length > 0 && (
            <ul className={styles.tags} aria-label="Тегтер">
              {tags.slice(0, 3).map((t) => (
                <li key={t} className={styles.tag}>
                  {t}
                </li>
              ))}
              {tags.length > 3 && (
                <li className={`${styles.tag} ${styles.tagMore}`}>
                  +{tags.length - 3}
                </li>
              )}
            </ul>
          )}
          {description && (
            <p className={styles.desc}>{description}</p>
          )}
        </div>
      </Link>
    </article>
  );
}
