"use client";

import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs"
import { CategoryFilter } from "@/components/ui/category-filter/category-filter"
import { SectionHeader } from "@/components/ui/section-header/section-header"
import { WORKS, getCategoriesWithCounts } from "@/lib/works"
import { useMemo, useState } from "react"
import { WorkCard } from "./components/work-card/work-card"
import styles from "./works.module.scss"

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
        />
      </div>

      <div className={styles.layout}>
        <div className={styles.filterCol}>
          <CategoryFilter
            items={categories.map((c) => ({
              value: c.category,
              count: c.count,
            }))}
            allCount={WORKS.length}
            activeValue={activeCategory}
            onChange={setActiveCategory}
            heading="Жанры"
            ariaLabel="Жанр сүзгісі"
          />
        </div>

        <div className={styles.gridCol}>
          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((work) => (
                <WorkCard
                  key={work.id}
                  slug={work.slug}
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
