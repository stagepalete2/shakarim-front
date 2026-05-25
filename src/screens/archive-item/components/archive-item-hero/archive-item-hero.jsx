import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { Image } from "@/components/ui/image/image";
import { getTypeMeta } from "@/lib/archive";
import styles from "./archive-item-hero.module.scss";

export function ArchiveItemHero({ item }) {
  const meta = getTypeMeta(item.type);

  const breadcrumbs = [
    { label: "Главная", href: "/" },
    { label: "Архив", href: "/archive" },
    { label: item.title },
  ];

  return (
    <header className={`${styles.hero} ${styles[`type-${item.type}`]}`}>
      <div className={styles.cover} aria-hidden="true">
        {item.cover && (
          <Image
            src={item.cover}
            alt=""
            className={styles.coverImg}
          />
        )}
      </div>

      <div className={styles.inner}>
        <div className={styles.top}>
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className={styles.titleBlock}>
          <ul className={styles.tags}>
            {meta && <li className={styles.tag}>{meta.label}</li>}
            {item.year && (
              <li className={`${styles.tag} ${styles.tagYear}`}>
                {item.year}
              </li>
            )}
          </ul>

          <h1 className={styles.title}>{item.title}</h1>

          {item.location && (
            <div className={styles.meta}>
              <span className={styles.metaLabel}>Сақталу орны</span>
              <span className={styles.metaValue}>{item.location}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
