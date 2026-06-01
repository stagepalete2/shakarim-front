import Link from "next/link";
import { Image } from "@/components/ui/image/image";
import { workHref } from "@/lib/works";
import styles from "./work-card.module.scss";

export function WorkCard({
  slug,
  title,
  year,
  category,
  cover,
  coverAlt,
  description,
  className = "",
}) {
  return (
    <Link
      href={workHref(slug)}
      className={`${styles.card} ${className}`}
      aria-label={`${title} — толық ақпарат`}
    >
      <div className={styles.coverWrap}>
        {cover && (
          <Image
            src={cover}
            alt={coverAlt ?? title}
            className={styles.cover}
          />
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        {year && <p className={styles.date}>{year}</p>}
      </div>

      {/* Десктопный hover-popover с подробной информацией. */}
      <div className={styles.popover} role="tooltip">
        <div className={styles.popoverCover}>
          {cover && (
            <Image
              src={cover}
              alt=""
              className={styles.popoverCoverImg}
            />
          )}
        </div>
        <div className={styles.popoverBody}>
          <p className={styles.popoverMeta}>
            {year && <span>{year}</span>}
            {category && <span>{category}</span>}
          </p>
          <h4 className={styles.popoverTitle}>{title}</h4>
          {description && (
            <p className={styles.popoverDesc}>{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
