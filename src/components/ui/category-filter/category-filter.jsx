"use client";

import styles from "./category-filter.module.scss";

// Универсальный single-select chip-filter.
// На мобилке — горизонтальный скролл, на десктопе — вертикальный sticky-сайдбар.
//
// Props:
//   items: Array<{ value: string, label?: string, count?: number }>
//     value — уникальный ключ; label — текст (если не задан, используется value).
//   activeValue: string | null — выбранное значение; null = «Все».
//   onChange(value | null) — колбэк выбора.
//   allLabel — текст «Все» кнопки (по умолч. "Все").
//   allCount — счётчик «Все» (опц.).
//   heading — заголовок desktop-сайдбара (опц., скрыт на мобилке).
//   ariaLabel — для <aside aria-label="...">.
export function CategoryFilter({
  items = [],
  activeValue = null,
  onChange,
  allLabel = "Все",
  allCount,
  heading,
  ariaLabel = "Категория сүзгісі",
}) {
  const handleClick = (value) => onChange?.(value);

  return (
    <aside className={styles.sidebar} aria-label={ariaLabel}>
      {heading && <h3 className={styles.title}>{heading}</h3>}

      <ul className={styles.list}>
        <li>
          <button
            type="button"
            className={`${styles.item} ${!activeValue ? styles.itemActive : ""}`}
            onClick={() => handleClick(null)}
            aria-pressed={!activeValue}
          >
            <span className={styles.itemLabel}>{allLabel}</span>
            {typeof allCount === "number" && (
              <span className={styles.itemCount}>{allCount}</span>
            )}
          </button>
        </li>

        {items.map(({ value, label, count }) => {
          const isActive = activeValue === value;
          return (
            <li key={value}>
              <button
                type="button"
                className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                onClick={() => handleClick(value)}
                aria-pressed={isActive}
              >
                <span className={styles.itemLabel}>{label ?? value}</span>
                {typeof count === "number" && (
                  <span className={styles.itemCount}>{count}</span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
