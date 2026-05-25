import styles from "./quote-block.module.scss";

// Цитата с атрибуцией. Декоративный «» сверху, sepia-полоска снизу.
export function QuoteBlock({ text, attribution, source }) {
  if (!text) return null;
  return (
    <figure className={styles.figure}>
      <span className={styles.mark} aria-hidden="true">
        «
      </span>
      <blockquote className={styles.quote}>{text}</blockquote>
      {(attribution || source) && (
        <figcaption className={styles.cite}>
          {attribution && <span className={styles.attr}>{attribution}</span>}
          {source && <span className={styles.source}>{source}</span>}
        </figcaption>
      )}
    </figure>
  );
}
