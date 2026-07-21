import { LocaleLink as Link } from "@/components/ui/locale-link/locale-link";
import { workHref } from "@/lib/works";
import styles from "./work-row.module.scss";

// Строка списка работ: мета (жанр · год) + заголовок + описание + шеврон.
// Вся строка — ссылка на деталь.
export function WorkRow({ slug, title, year, category, description }) {
  return (
    <Link href={workHref(slug)} className={styles.row}>
      <div className={styles.body}>
        {(category || year) && (
          <p className={styles.meta}>
            {category && <span className={styles.category}>{category}</span>}
            {year && <span className={styles.year}>{year}</span>}
          </p>
        )}
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.desc}>{description}</p>}
      </div>

      <span className={styles.chevron} aria-hidden="true">
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </span>
    </Link>
  );
}
