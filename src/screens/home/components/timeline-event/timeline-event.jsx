import { Image } from "@/components/ui/image/image";
import styles from "./timeline-event.module.scss";

export function TimelineEvent({
  year,
  label,
  title,
  description,
  details,
  image,
  imageAlt,
  position,
  row = 0,
  isOpen,
  onToggle,
  id,
}) {
  const displayYear = label ?? year;

  return (
    <div
      className={`${styles.event} ${isOpen ? styles.open : ""}`}
      style={{ "--pos": `${position}%`, "--lane": row }}
    >
      <button
        type="button"
        className={styles.dot}
        aria-expanded={isOpen}
        aria-controls={`event-card-${id}`}
        aria-label={`${displayYear} — ${title}`}
        onClick={onToggle}
      />

      <div className={styles.preview}>
        <span className={styles.previewLabel}>{displayYear}</span>
        <span className={styles.previewYearNum}>{year}</span>
        <span className={styles.previewTitle}>{title}</span>
      </div>

      <div
        id={`event-card-${id}`}
        role="dialog"
        aria-label={title}
        className={styles.card}
        hidden={!isOpen}
      >
        {image && (
          <Image
            src={image}
            alt={imageAlt ?? title}
            className={styles.cardImage}
          />
        )}
        <div className={styles.cardBody}>
          <h3 className={styles.cardTitle}>{title}</h3>
          {description && (
            <p className={styles.description}>{description}</p>
          )}
          {details && <p className={styles.details}>{details}</p>}
        </div>
      </div>
    </div>
  );
}
