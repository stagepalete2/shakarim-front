import Link from "next/link";
import { Image } from "@/components/ui/image/image";
import styles from "./book-card.module.scss";

export function BookCard({
  title,
  author,
  cover,
  coverAlt,
  href = "#",
  className = "",
}) {
  return (
    <Link href={href} className={`${styles.card} ${className}`}>
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
        <h3 className={styles.title}>{title}</h3>
        {author && <p className={styles.author}>{author}</p>}
      </div>
    </Link>
  );
}
