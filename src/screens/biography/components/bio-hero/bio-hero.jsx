import { Image } from "@/components/ui/image/image";
import styles from "./bio-hero.module.scss";

export function BioHero({ data }) {
  if (!data) return null;
  const { eyebrow, title, lifespan, subtitle, portrait } = data;

  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.text}>
          {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
          {title && <h1 className={styles.title}>{title}</h1>}
          {lifespan && <p className={styles.lifespan}>{lifespan}</p>}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          <hr className={styles.divider} aria-hidden="true" />
        </div>

        {portrait && (
          <div className={styles.portraitWrap}>
            <Image
              src={portrait}
              alt={title ?? ""}
              className={styles.portrait}
              loading="eager"
            />
            <div className={styles.portraitFrame} aria-hidden="true" />
          </div>
        )}
      </div>
    </header>
  );
}
