import { LocaleLink as Link } from "@/components/ui/locale-link/locale-link";
import styles from "./breadcrumbs.module.scss";

export function Breadcrumbs({ items = [], className = "" }) {
  if (items.length === 0) return null;

  return (
    <nav
      className={`${styles.root} ${className}`}
      aria-label="Хлебные крошки"
    >
      <ol className={styles.list}>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const showLink = !isLast && item.href;

          return (
            <li key={`${item.label}-${i}`} className={styles.item}>
              {showLink ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={styles.current}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
