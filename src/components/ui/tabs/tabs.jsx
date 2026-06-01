"use client";

import styles from "./tabs.module.scss";

// Гориз. навбар табов (без панели — state и панель рендерит parent).
//
// Props:
//   tabs: Array<{ id, label, number? }>
//   activeId: string
//   onChange(id)
//   ariaLabel — для <div role="tablist" aria-label>
//   idPrefix — префикс для id/controls ARIA (default "tab")
//
// Внутри родителя:
//   <Tabs ... />
//   <section role="tabpanel" id={`${prefix}-panel-${activeId}`} aria-labelledby={`${prefix}-tab-${activeId}`}>
//     {активная панель}
//   </section>
export function Tabs({
  tabs = [],
  activeId,
  onChange,
  ariaLabel = "Бөлімдер",
  idPrefix = "tab",
}) {
  if (tabs.length === 0) return null;

  return (
    <div className={styles.bar} role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`${idPrefix}-tab-${tab.id}`}
            aria-selected={isActive}
            aria-controls={`${idPrefix}-panel-${tab.id}`}
            tabIndex={isActive ? 0 : -1}
            className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
            onClick={() => onChange?.(tab.id)}
          >
            {tab.number && (
              <span className={styles.number} aria-hidden="true">
                {tab.number}
              </span>
            )}
            <span className={styles.label}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
