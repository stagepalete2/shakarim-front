import styles from "./stats-block.module.scss";

// Ряд больших чисел с короткими подписями. Editorial style — крупные
// цифры, тонкая подпись uppercase.
export function StatsBlock({ items = [] }) {
  if (items.length === 0) return null;
  return (
    <dl className={styles.row}>
      {items.map((s, i) => (
        <div key={`${s.label}-${i}`} className={styles.cell}>
          <dt className={styles.value}>{s.value}</dt>
          <dd className={styles.label}>{s.label}</dd>
        </div>
      ))}
    </dl>
  );
}
