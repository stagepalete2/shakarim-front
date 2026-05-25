import styles from "./concepts-block.module.scss";

// Тематические карточки понятий: ключевые идеи раздела (например
// «Ар», «Ұят», «Әділдік» в «Үш анық»).
export function ConceptsBlock({ title, items = [] }) {
  if (items.length === 0) return null;
  return (
    <section className={styles.section}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <ul className={styles.grid}>
        {items.map((c, i) => (
          <li key={`${c.title}-${i}`} className={styles.cell}>
            <article className={styles.card}>
              {c.symbol && (
                <span className={styles.symbol} aria-hidden="true">
                  {c.symbol}
                </span>
              )}
              {c.title && <h4 className={styles.cardTitle}>{c.title}</h4>}
              {c.subtitle && (
                <p className={styles.subtitle}>{c.subtitle}</p>
              )}
              {c.description && (
                <p className={styles.desc}>{c.description}</p>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
