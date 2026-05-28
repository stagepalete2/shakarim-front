"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { SectionHeader } from "@/components/ui/section-header/section-header";
import {
  ARCHIVE,
  getItemsByType,
  getTypeMeta,
  getTypesWithCounts,
} from "@/lib/archive";
import { ArchiveFilter } from "./components/archive-filter/archive-filter";
import { ArchiveShelf } from "./components/archive-shelf/archive-shelf";
import { ArchiveCard } from "./components/archive-card/archive-card";
import styles from "./archive.module.scss";

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  { label: "Архив және қолжазба" },
];

export function Archive() {
  const [activeType, setActiveType] = useState(null);

  const types = useMemo(() => getTypesWithCounts(), []);

  const visibleItems = useMemo(() => {
    if (!activeType) return ARCHIVE;
    return getItemsByType(activeType);
  }, [activeType]);

  return (
    <main className={styles.page}>
      <div className={styles.intro}>
        <Breadcrumbs items={BREADCRUMBS} className="onLight" />

        <SectionHeader
          eyebrow="Архив"
          title="Архив және қолжазба"
          description="Шәкәрім Құдайбердіұлының рухани мұрасы: түпнұсқа қолжазбалар, сирек кездесетін фотосуреттер, жеке хаттар, дыбыс және бейне жазбалар бір жерде сақталған."
        />

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{ARCHIVE.length}</span>
            <span className={styles.statLabel}>жазба</span>
          </div>
          <span className={styles.statSep} aria-hidden="true">
            ❦
          </span>
          <div className={styles.stat}>
            <span className={styles.statNum}>{types.length}</span>
            <span className={styles.statLabel}>топ</span>
          </div>
        </div>
      </div>

      <div className={styles.filterWrap}>
        <ArchiveFilter
          types={types}
          totalCount={ARCHIVE.length}
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
              items={getItemsByType(type.id)}
              onSeeAll={() => setActiveType(type.id)}
            />
          ))}
        </div>
      ) : (
        <section className={styles.results} aria-live="polite">
          <header className={styles.resultsHead}>
            <h3 className={styles.resultsTitle}>
              {getTypeMeta(activeType)?.label}
            </h3>
            <p className={styles.resultsDesc}>
              {getTypeMeta(activeType)?.description}
            </p>
          </header>

          {visibleItems.length > 0 ? (
            <div className={styles.grid}>
              {visibleItems.map((item) => (
                <ArchiveCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>Бұл топ бойынша жазба табылмады.</p>
          )}
        </section>
      )}
    </main>
  );
}
