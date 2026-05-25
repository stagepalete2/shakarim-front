import styles from "./milestones-block.module.scss";

// Компактный таймлайн: год + событие. На мобилке вертикальный,
// на десктопе горизонтальный со связующей линией.
export function MilestonesBlock({ title, items = [] }) {
  if (items.length === 0) return null;
  return (
    <section className={styles.section}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <ol className={styles.track}>
        {items.map((m, i) => (
          <li key={`${m.year}-${i}`} className={styles.step}>
            <div className={styles.dot} aria-hidden="true" />
            <div className={styles.body}>
              <span className={styles.year}>{m.year}</span>
              {m.title && <p className={styles.event}>{m.title}</p>}
              {m.description && (
                <p className={styles.desc}>{m.description}</p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
