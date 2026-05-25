"use client";

import { useState } from "react";
import { Prose } from "@/components/ui/prose/prose";
import styles from "./archive-tabs.module.scss";

// Гибкие вкладки для текстовых «прочтений» архивного элемента:
// Сипаттама, Транскрипт, Аударма, Тарихи мәнмәтін и т.п.
// Сами категории и их состав приходят с бэкенда — у каждой записи
// может быть свой набор. Сканы и файлы — атрибуты item-уровня,
// рендерятся ВЫШЕ табов отдельными секциями.
export function ArchiveTabs({ tabs = [] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? null);

  if (tabs.length === 0) return null;

  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  return (
    <section className={styles.section}>
      <div
        className={styles.tablist}
        role="tablist"
        aria-label="Архив бөлімдері"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        // key=active.id перезапускает анимацию panel-in при смене.
        key={active.id}
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        className={styles.panel}
      >
        {active.description && (
          <p className={styles.lead}>{active.description}</p>
        )}

        {active.content && <Prose html={active.content} />}
      </div>
    </section>
  );
}
