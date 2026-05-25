import styles from "./timeline-context.module.scss";

export function TimelineContext({
  year,
  label,
  icon,
  position,
  side = "above",
  isOpen,
  onToggle,
  id,
}) {
  return (
    <div
      className={`${styles.context} ${styles[side]} ${isOpen ? styles.open : ""}`}
      style={{ "--pos": `${position}%` }}
    >
      <div className={styles.line} aria-hidden="true" />

      <button
        type="button"
        className={styles.bubble}
        aria-expanded={isOpen}
        aria-controls={`ctx-tooltip-${id}`}
        aria-label={`${year}: ${label}`}
        onClick={onToggle}
      >
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      </button>

      <div id={`ctx-tooltip-${id}`} className={styles.tooltip}>
        <div className={styles.tooltipLabel}>{label}</div>
        <div className={styles.tooltipYear}>{year}</div>
      </div>
    </div>
  );
}
