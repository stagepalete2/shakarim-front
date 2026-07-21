import { LocaleLink as Link } from "@/components/ui/locale-link/locale-link";
import { Image } from "@/components/ui/image/image";
import styles from "./author-card.module.scss";

export function AuthorCard({
  name,
  role,
  photo,
  photoAlt,
  href = "#",
  className = "",
}) {
  return (
    <Link href={href} className={`${styles.card} ${className}`}>
      <div className={styles.photoWrap}>
        {photo && (
          <Image
            src={photo}
            alt={photoAlt ?? name}
            className={styles.photo}
          />
        )}
      </div>
      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {role && <p className={styles.role}>{role}</p>}
      </div>
    </Link>
  );
}
