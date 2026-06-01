"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { CategoryFilter } from "@/components/ui/category-filter/category-filter";
import { SearchInput } from "@/components/ui/search-input/search-input";
import { SectionHeader } from "@/components/ui/section-header/section-header";
import {
  BOOKS,
  getAllTags,
  getCategoriesWithCounts,
  searchBooks,
} from "@/lib/books";
import { BookCard } from "./components/book-card/book-card";
import styles from "./books.module.scss";

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  { label: "Кітап әлемі" },
];

// Алфавитная сортировка с учётом kk/ru локали.
const collator = new Intl.Collator("kk", { sensitivity: "base" });

export function Books() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeTag, setActiveTag] = useState(null);

  const categories = useMemo(() => getCategoriesWithCounts(), []);
  const allTags = useMemo(() => getAllTags(), []);

  // Пайплайн: category → tag → search → sort.
  const filtered = useMemo(() => {
    let list = BOOKS;
    if (activeCategory) {
      list = list.filter((b) => b.category === activeCategory);
    }
    if (activeTag) {
      list = list.filter((b) => b.tags?.includes(activeTag));
    }
    list = searchBooks(list, query);
    return [...list].sort((a, b) => collator.compare(a.title, b.title));
  }, [activeCategory, activeTag, query]);

  const hasActiveFilters = Boolean(activeCategory || activeTag || query);
  const resetAll = () => {
    setActiveCategory(null);
    setActiveTag(null);
    setQuery("");
  };

  return (
    <main className={styles.page}>
      <div className={styles.head}>
        <Breadcrumbs items={BREADCRUMBS} className="onLight" />
        <SectionHeader
          title="Кітап әлемі"
          description="Шәкәрім Құдайбердіұлының кітаптары мен оған арналған ғылыми зерттеу еңбектерінің электронды каталогы. Әр кітапты тікелей сайтта оқып, PDF нұсқасын жүктеп ала аласыз."
        />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Іздеу: тақырып, автор, тег..."
            size="md"
          />
        </div>
        <p className={styles.summary} aria-live="polite">
          <strong>{filtered.length}</strong>{" "}
          <span>
            {filtered.length === 1 ? "кітап табылды" : "кітап табылды"}
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              className={styles.reset}
              onClick={resetAll}
            >
              Тазалау
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
            allCount={BOOKS.length}
            activeValue={activeCategory}
            onChange={setActiveCategory}
            heading="Категория"
            ariaLabel="Категория сүзгісі"
          />
        </aside>

        <div className={styles.contentCol}>
          {allTags.length > 0 && (
            <div className={styles.tagsBar} aria-label="Тег сүзгісі">
              <span className={styles.tagsLabel}>Тегтер:</span>
              <ul className={styles.tagsList}>
                <li>
                  <button
                    type="button"
                    className={`${styles.tagChip} ${!activeTag ? styles.tagChipActive : ""}`}
                    onClick={() => setActiveTag(null)}
                    aria-pressed={!activeTag}
                  >
                    Барлығы
                  </button>
                </li>
                {allTags.map(({ tag, count }) => {
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
              <p className={styles.emptyText}>
                Сұрауыңыз бойынша кітап табылмады.
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  className={styles.emptyReset}
                  onClick={resetAll}
                >
                  Барлық сүзгілерді тазалау
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
