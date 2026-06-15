"use client";

import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { SearchInput } from "@/components/ui/search-input/search-input";
import { SectionHeader } from "@/components/ui/section-header/section-header";
import { searchAuthors } from "@/lib/authors";
import { useTranslations } from "@/components/providers/language-provider";
import { AuthorCard } from "./components/author-card/author-card";
import styles from "./authors.module.scss";

// kk-локаль сортировка по имени.
const collator = new Intl.Collator("kk", { sensitivity: "base" });

// authors — массив авторов (с сервера).
export function Authors({ authors = [] }) {
  const t = useTranslations();
  const [query, setQuery] = useState("");

  const breadcrumbs = [
    { label: t("common.home"), href: "/" },
    { label: t("pages.authors") },
  ];

  const filtered = useMemo(() => {
    return [...searchAuthors(authors, query)].sort((a, b) =>
      collator.compare(a.name, b.name),
    );
  }, [authors, query]);

  const hasQuery = query.trim().length > 0;

  return (
    <main className={styles.page}>
      <div className={styles.head}>
        <Breadcrumbs items={breadcrumbs} className="onLight" />
        <SectionHeader title={t("pages.authors")} />
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder={t("authors.searchPlaceholder")}
            size="md"
          />
        </div>
        <p className={styles.summary} aria-live="polite">
          <strong>{filtered.length}</strong> {t("authors.countLabel")}
          {hasQuery && (
            <button
              type="button"
              className={styles.reset}
              onClick={() => setQuery("")}
            >
              {t("common.clear")}
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
            «{query}» {t("authors.emptyText")}
          </p>
          <button
            type="button"
            className={styles.emptyReset}
            onClick={() => setQuery("")}
          >
            {t("authors.emptyReset")}
          </button>
        </div>
      )}
    </main>
  );
}
