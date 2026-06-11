import { Image } from "@/components/ui/image/image";
import styles from "./bio-chronology.module.scss";

// Хронология жизни. На десктопе — alternating cards вдоль вертикальной
// оси; на мобилке — вертикальная лента с маркерами слева.
export function BioChronology({ items = [], eyebrow, title = "Өмірбаян сүрлеуі" }) {
  if (items.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="bio-chronology-title">
      <header className={styles.head}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 id="bio-chronology-title" className={styles.title}>
          {title}
        </h2>
      </header>

      <ol className={styles.track}>
        {items.map((it, i) => {
          const side = i % 2 === 0 ? "left" : "right";
          return (
            <li
              key={`${it.year}-${i}`}
              className={`${styles.item} ${styles[`side-${side}`]}`}
            >
              <div className={styles.marker} aria-hidden="true">
                <span className={styles.dot} />
              </div>

              <article className={styles.card}>
                {it.year && (
                  <span className={styles.year}>{it.year}</span>
                )}
                {it.title && <h3 className={styles.cardTitle}>{it.title}</h3>}
                {it.description && (
                  <p className={styles.cardText}>{it.description}</p>
                )}
                {it.image && (
                  <div className={styles.imageWrap}>
                    <Image
                      src={it.image}
                      alt=""
                      className={styles.image}
                      loading="lazy"
                    />
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
