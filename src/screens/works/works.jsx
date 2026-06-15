"use client";

import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs"
import { CategoryFilter } from "@/components/ui/category-filter/category-filter"
import { SectionHeader } from "@/components/ui/section-header/section-header"
import { useMemo, useState } from "react"
import { useTranslations } from "@/components/providers/language-provider"
import { WorkCard } from "./components/work-card/work-card"
import styles from "./works.module.scss"

// works — массив карточек, categories — [{ category, count }] (с сервера).
export function Works({ works = [], categories = [] }) {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState(null);

  const breadcrumbs = [
    { label: t("common.home"), href: "/" },
    { label: t("pages.works") },
  ];

  const filtered = useMemo(() => {
    if (!activeCategory) return works;
    return works.filter((w) => w.category === activeCategory);
  }, [activeCategory, works]);

  return (
    <main className={styles.page}>
      <div className={styles.head}>
        <Breadcrumbs items={breadcrumbs} className="onLight" />
        <SectionHeader
          title={t("pages.works")}
        />
      </div>

      <div className={styles.layout}>
        <div className={styles.filterCol}>
          <CategoryFilter
            items={categories.map((c) => ({
              value: c.category,
              count: c.count,
            }))}
            allCount={works.length}
            allLabel={t("common.all")}
            activeValue={activeCategory}
            onChange={setActiveCategory}
            heading={t("works.filterHeading")}
            ariaLabel={t("works.filterAria")}
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
            <p className={styles.empty}>{t("works.empty")}</p>
          )}
        </div>
      </div>
    </main>
  );
}
