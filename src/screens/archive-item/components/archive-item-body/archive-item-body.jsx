import { getTypeMeta } from "@/lib/archive";
import { getT } from "@/lib/i18n/server";
import styles from "./archive-item-body.module.scss";

export async function ArchiveItemBody({ item }) {
  const t = await getT();
  const meta = getTypeMeta(item.type);

  return (
    <article className={styles.body}>
      {item.description && (
        <p className={styles.lead}>{item.description}</p>
      )}

      <dl className={styles.facts}>
        {meta && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>{t("archive.type")}</dt>
            <dd className={styles.factValue}>{meta.label}</dd>
          </div>
        )}
        {item.year && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>{t("archive.year")}</dt>
            <dd className={styles.factValue}>{item.year}</dd>
          </div>
        )}
        {item.location && (
          <div className={styles.fact}>
            <dt className={styles.factLabel}>{t("archive.location")}</dt>
            <dd className={styles.factValue}>{item.location}</dd>
          </div>
        )}
      </dl>

      <aside className={styles.note}>
        <span className={styles.noteLabel}>{t("archive.note")}</span>
        <p className={styles.noteText}>
          Бұл жазбаның толық цифрлық нұсқасы көп ұзамай қол жетімді
          болады. Қосымша ақпарат қажет болса, мұрағат қызметкерлерімен
          байланысыңыз.
        </p>
      </aside>
    </article>
  );
}
