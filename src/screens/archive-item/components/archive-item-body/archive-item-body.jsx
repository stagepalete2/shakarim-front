import { getTypeMeta } from "@/lib/archive";
import styles from "./archive-item-body.module.scss";

export function ArchiveItemBody({ item }) {
  const meta = getTypeMeta(item.type);

  return (
    <article className={styles.body}>
      {item.description && (
        <p className={styles.lead}>{item.description}</p>
      )}

      <dl className={styles.facts}>
        {meta && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Түрі</dt>
            <dd className={styles.factValue}>{meta.label}</dd>
          </div>
        )}
        {item.year && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Жылы</dt>
            <dd className={styles.factValue}>{item.year}</dd>
          </div>
        )}
        {item.location && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>Сақталу орны</dt>
            <dd className={styles.factValue}>{item.location}</dd>
          </div>
        )}
      </dl>

      <aside className={styles.note}>
        <span className={styles.noteLabel}>Ескерту</span>
        <p className={styles.noteText}>
          Бұл жазбаның толық цифрлық нұсқасы көп ұзамай қол жетімді
          болады. Қосымша ақпарат қажет болса, мұрағат қызметкерлерімен
          байланысыңыз.
        </p>
      </aside>
    </article>
  );
}
