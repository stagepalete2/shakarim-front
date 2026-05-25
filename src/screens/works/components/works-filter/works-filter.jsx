"use client";

import styles from "./works-filter.module.scss";

export function WorksFilter({
  categories = [],
  totalCount = 0,
  activeCategory = null,
  onChange,
}) {
  const handleClick = (value) => {
    onChange?.(value);
  };

  return (
    <aside className={styles.sidebar} aria-label="Фильтр по жанрам">
      <h3 className={styles.title}>Жанры</h3>

      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={`${styles.item} ${!activeCategory ? styles.itemActive : ""}`}
            onClick={() => handleClick(null)}
            aria-pressed={!activeCategory}
          >
            <span className={styles.itemLabel}>Все</span>
            <span className={styles.itemCount}>{totalCount}</span>
          </button>
        </li>

        {categories.map(({ category, count }) => {
          const isActive = activeCategory === category;
          return (
            <li key={category}>
              <button
                type="button"
                className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                onClick={() => handleClick(category)}
                aria-pressed={isActive}
              >
                <span className={styles.itemLabel}>{category}</span>
                <span className={styles.itemCount}>{count}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
