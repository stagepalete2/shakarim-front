import { LocaleLink as Link } from "@/components/ui/locale-link/locale-link";
import { Image } from "@/components/ui/image/image";
import { ArchiveTypeIcon } from "@/components/ui/archive-type-icon/archive-type-icon";
import { archiveHref, getTypeMeta } from "@/lib/archive";
import styles from "./archive-card.module.scss";

export function ArchiveCard({ item }) {
  const meta = getTypeMeta(item.type);

  return (
    <Link
      href={archiveHref(item.slug)}
      className={`${styles.card} ${styles[`type-${item.type}`]}`}
    >
      <div className={styles.cover}>
        {item.cover && (
          <Image
            src={item.cover}
            alt=""
            className={styles.coverImg}
            loading="lazy"
          />
        )}

        <div className={styles.coverFallback} aria-hidden="true">
          <div className={styles.coverIcon}>
            <ArchiveTypeIcon type={item.type} />
          </div>
        </div>

        <div className={styles.badge}>
          <span className={styles.badgeIcon}>
            <ArchiveTypeIcon type={item.type} />
          </span>
          <span>{meta?.short}</span>
        </div>

        <div className={styles.coverGloss} aria-hidden="true" />
      </div>

      <div className={styles.info}>
        <h4 className={styles.title}>{item.title}</h4>
        {item.year && <p className={styles.year}>{item.year}</p>}
      </div>
    </Link>
  );
}
