import { LocaleLink as Link } from "@/components/ui/locale-link/locale-link";
import styles from "./section-header.module.scss";

export function SectionHeader({
  title,
  description,
  eyebrow,
  allHref,
  allLabel = "Все →",
  align = "row",
  tone = "default",
  className = "",
}) {
  return (
    <header
      className={`${styles.head} ${styles[`align-${align}`]} ${styles[`tone-${tone}`]} ${className}`}
    >
      <div className={styles.titleBlock}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 className={styles.title}>{title}</h2>
        {description && <p className={styles.description}>{description}</p>}
      </div>

      {allHref && (
        <Link href={allHref} className={styles.allLink}>
          {allLabel}
        </Link>
      )}
    </header>
  );
}
