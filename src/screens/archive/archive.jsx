"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { SectionHeader } from "@/components/ui/section-header/section-header";
import { useTranslations } from "@/components/providers/language-provider";
import { ArchiveFilter } from "./components/archive-filter/archive-filter";
import { ArchiveShelf } from "./components/archive-shelf/archive-shelf";
import { ArchiveCard } from "./components/archive-card/archive-card";
import styles from "./archive.module.scss";

// items — все archive-карточки, types — [{id,label,short,description,count}] (с сервера).
export function Archive({ items = [], types = [] }) {
  const t = useTranslations();
  const [activeType, setActiveType] = useState(null);

  const breadcrumbs = [
    { label: t("common.home"), href: "/" },
    { label: t("pages.archive") },
  ];

  const itemsByType = (typeId) => items.filter((i) => i.type === typeId);
  const activeMeta = types.find((t) => t.id === activeType);

  const visibleItems = useMemo(() => {
    if (!activeType) return items;
    return items.filter((i) => i.type === activeType);
  }, [items, activeType]);

  return (
    <main className={styles.page}>
      <div className={styles.intro}>
        <Breadcrumbs items={breadcrumbs} className="onLight" />

        <SectionHeader title={t("pages.archive")} />

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{items.length}</span>
            <span className={styles.statLabel}>{t("archive.records")}</span>
          </div>
          <span className={styles.statSep} aria-hidden="true">
            ❦
          </span>
          <div className={styles.stat}>
            <span className={styles.statNum}>{types.length}</span>
            <span className={styles.statLabel}>{t("archive.groups")}</span>
          </div>
        </div>
      </div>

      <div className={styles.filterWrap}>
        <ArchiveFilter
          types={types}
          totalCount={items.length}
          activeType={activeType}
          onChange={setActiveType}
        />
      </div>

      {!activeType ? (
        <div className={styles.shelves}>
          {types.map((type) => (
            <ArchiveShelf
              key={type.id}
              type={type}
              items={itemsByType(type.id)}
              onSeeAll={() => setActiveType(type.id)}
            />
          ))}
        </div>
      ) : (
        <section className={styles.results} aria-live="polite">
          <header className={styles.resultsHead}>
            <h3 className={styles.resultsTitle}>{activeMeta?.label}</h3>
            <p className={styles.resultsDesc}>{activeMeta?.description}</p>
          </header>

          {visibleItems.length > 0 ? (
            <div className={styles.grid}>
              {visibleItems.map((item) => (
                <ArchiveCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>{t("archive.empty")}</p>
          )}
        </section>
      )}
    </main>
  );
}
