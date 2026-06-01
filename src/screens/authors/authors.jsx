"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { SearchInput } from "@/components/ui/search-input/search-input";
import { SectionHeader } from "@/components/ui/section-header/section-header";
import { AUTHORS, searchAuthors } from "@/lib/authors";
import { AuthorCard } from "./components/author-card/author-card";
import styles from "./authors.module.scss";

const BREADCRUMBS = [
  { label: "Главная", href: "/" },
  { label: "Авторлар" },
];

// kk-локаль сортировка по имени.
const collator = new Intl.Collator("kk", { sensitivity: "base" });

export function Authors() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return [...searchAuthors(AUTHORS, query)].sort((a, b) =>
      collator.compare(a.name, b.name),
    );
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <main className={styles.page}>
      <div className={styles.head}>
        <Breadcrumbs items={BREADCRUMBS} className="onLight" />
        <SectionHeader
          title="Авторлар"
          description="Шәкәрім мұрасын зерттеген ғалымдар, оның замандастары мен ұрпақтары — алфавиттік тізім."
        />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Аты бойынша іздеу..."
            size="md"
          />
        </div>
        <p className={styles.summary} aria-live="polite">
          <strong>{filtered.length}</strong> автор
          {hasQuery && (
            <button
              type="button"
              className={styles.reset}
              onClick={() => setQuery("")}
            >
              Тазалау
            </button>
          )}
        </p>
      </div>

      {filtered.length > 0 ? (
        <ul className={styles.grid}>
          {filtered.map((author) => (
            <li key={author.id} className={styles.cell}>
              <AuthorCard author={author} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyText}>
            «{query}» бойынша автор табылмады.
          </p>
          <button
            type="button"
            className={styles.emptyReset}
            onClick={() => setQuery("")}
          >
            Іздеуді тазалау
          </button>
        </div>
      )}
    </main>
  );
}
