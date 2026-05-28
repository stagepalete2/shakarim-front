"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { SectionHeader } from "@/components/ui/section-header/section-header";
import { WORKS, getCategoriesWithCounts } from "@/lib/works";
import { WorkCard } from "./components/work-card/work-card";
import { WorksFilter } from "./components/works-filter/works-filter";
import styles from "./works.module.scss";

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  { label: "Шығармалары" },
];

export function Works() {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = useMemo(() => getCategoriesWithCounts(), []);

  const filtered = useMemo(() => {
    if (!activeCategory) return WORKS;
    return WORKS.filter((w) => w.category === activeCategory);
  }, [activeCategory]);

  return (
    <main className={styles.page}>
      <div className={styles.head}>
        <Breadcrumbs items={BREADCRUMBS} className="onLight" />
        <SectionHeader
          title="Шығармалары"
          description="Поэмы, философские труды, переводы, песни и кюи Шакарима Кудайбердиева."
        />
      </div>

      <div className={styles.layout}>
        <div className={styles.filterCol}>
          <WorksFilter
            categories={categories}
            totalCount={WORKS.length}
            activeCategory={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        <div className={styles.gridCol}>
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((work) => (
                <WorkCard
                  key={work.id}
                  title={work.title}
                  year={work.year}
                  category={work.category}
                  cover={work.cover}
                  description={work.description}
                />
              ))}
            </div>
          ) : (
            <p className={styles.empty}>
              По выбранному жанру работ не найдено.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
