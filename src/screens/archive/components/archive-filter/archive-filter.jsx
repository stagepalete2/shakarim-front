"use client";

import styles from "./archive-filter.module.scss";

export function ArchiveFilter({
  types = [],
  totalCount = 0,
  activeType = null,
  onChange,
}) {
  const handle = (value) => onChange?.(value);

  return (
    <nav className={styles.bar} aria-label="Архив топтары">
      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={`${styles.chip} ${!activeType ? styles.chipActive : ""}`}
            onClick={() => handle(null)}
            aria-pressed={!activeType}
          >
            <span>Барлығы</span>
            <span className={styles.count}>{totalCount}</span>
          </button>
        </li>
        {types.map((t) => {
          const isActive = activeType === t.id;
          return (
            <li key={t.id}>
              <button
                type="button"
                className={`${styles.chip} ${isActive ? styles.chipActive : ""}`}
                onClick={() => handle(t.id)}
                aria-pressed={isActive}
              >
                <span>{t.label}</span>
                <span className={styles.count}>{t.count}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
