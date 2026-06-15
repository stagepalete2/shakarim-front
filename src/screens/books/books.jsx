"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { CategoryFilter } from "@/components/ui/category-filter/category-filter";
import { SearchInput } from "@/components/ui/search-input/search-input";
import { SectionHeader } from "@/components/ui/section-header/section-header";
import { searchBooks } from "@/lib/books";
import { useTranslations } from "@/components/providers/language-provider";
import { BookCard } from "./components/book-card/book-card";
import styles from "./books.module.scss";

// Алфавитная сортировка с учётом kk/ru локали.
const collator = new Intl.Collator("kk", { sensitivity: "base" });

// books — массив карточек, categories — [{category,count}], tags — [{tag,count}] (с сервера).
export function Books({ books = [], categories = [], tags = [] }) {
  const t = useTranslations();
  const [query, setQuery] = useState("");

  const breadcrumbs = [
    { label: t("common.home"), href: "/" },
    { label: t("pages.books") },
  ];
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeTag, setActiveTag] = useState(null);

  // Пайплайн: category → tag → search → sort.
  const filtered = useMemo(() => {
    let list = books;
    if (activeCategory) {
      list = list.filter((b) => b.category === activeCategory);
    }
    if (activeTag) {
      list = list.filter((b) => b.tags?.includes(activeTag));
    }
    list = searchBooks(list, query);
    return [...list].sort((a, b) => collator.compare(a.title, b.title));
  }, [books, activeCategory, activeTag, query]);

  const hasActiveFilters = Boolean(activeCategory || activeTag || query);
  const resetAll = () => {
    setActiveCategory(null);
    setActiveTag(null);
    setQuery("");
  };

  return (
    <main className={styles.page}>
      <div className={styles.head}>
        <Breadcrumbs items={breadcrumbs} className="onLight" />
        <SectionHeader title={t("pages.books")} />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder={t("books.searchPlaceholder")}
            size="md"
          />
        </div>
        <p className={styles.summary} aria-live="polite">
          <strong>{filtered.length}</strong>{" "}
          <span>{t("books.countLabel")}</span>
          {hasActiveFilters && (
            <button
              type="button"
              className={styles.reset}
              onClick={resetAll}
            >
              {t("common.clear")}
            </button>
          )}
        </p>
      </div>

      <div className={styles.layout}>
        <aside className={styles.filterCol}>
          <CategoryFilter
            items={categories.map((c) => ({
              value: c.category,
              count: c.count,
            }))}
            allCount={books.length}
            allLabel={t("common.all")}
            activeValue={activeCategory}
            onChange={setActiveCategory}
            heading={t("books.categoryHeading")}
            ariaLabel={t("books.categoryAria")}
          />
        </aside>

        <div className={styles.contentCol}>
          {tags.length > 0 && (
            <div className={styles.tagsBar} aria-label={t("books.tagsLabel")}>
              <span className={styles.tagsLabel}>{t("books.tagsLabel")}</span>
              <ul className={styles.tagsList}>
                <li>
                  <button
                    type="button"
                    className={`${styles.tagChip} ${!activeTag ? styles.tagChipActive : ""}`}
                    onClick={() => setActiveTag(null)}
                    aria-pressed={!activeTag}
                  >
                    {t("common.all")}
                  </button>
                </li>
                {tags.map(({ tag, count }) => {
                  const isActive = activeTag === tag;
                  return (
                    <li key={tag}>
                      <button
                        type="button"
                        className={`${styles.tagChip} ${isActive ? styles.tagChipActive : ""}`}
                        onClick={() =>
                          setActiveTag(isActive ? null : tag)
                        }
                        aria-pressed={isActive}
                      >
                        {tag}
                        <span className={styles.tagCount}>{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {filtered.length > 0 ? (
            <div className={styles.grid}>
              {filtered.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyText}>{t("books.emptyTitle")}</p>
              {hasActiveFilters && (
                <button
                  type="button"
                  className={styles.emptyReset}
                  onClick={resetAll}
                >
                  {t("books.emptyReset")}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
