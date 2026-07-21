import { LocaleLink as Link } from "@/components/ui/locale-link/locale-link";
import { Image } from "@/components/ui/image/image";
import styles from "./quick-nav-card.module.scss";

export function QuickNavCard({
  title,
  href = "#",
  icon,
  image,
  imageAlt,
  className = "",
}) {
  return (
    <Link href={href} className={`${styles.card} ${className}`}>
      <div className={styles.media}>
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? title}
            className={styles.image}
          />
        ) : (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}
      </div>
      <span className={styles.title}>{title}</span>
    </Link>
  );
}
