"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import {
  useLanguage,
  useTranslations,
} from "@/components/providers/language-provider";
import { SearchInput } from "@/components/ui/search-input/search-input";
import styles from "./global-search.module.scss";

const MIN_CHARS = 2;
const DEBOUNCE_MS = 250;
const LIMIT = 5;

// Раздел → построитель детальной ссылки по slug.
const DETAIL_HREF = {
  works: (i) => `/works/${i.slug}`,
  books: (i) => `/books/${i.slug}`,
  authors: (i) => `/authors/${i.slug}`,
  archive: (i) => `/archive/${i.slug}`,
  articles: (i) => `/biography/${i.slug}`,
  biography: (i) => `/biography/${i.slug}`,
};

// Раздел → страница (фолбэк, если нет slug-детали).
const SECTION_PAGE = {
  works: "/works",
  books: "/books",
  authors: "/authors",
  archive: "/archive",
  articles: "/biography",
  biography: "/biography",
  media: "/media",
  shakarimtanu: "/shakarimtanu",
  tagzym: "/tagzym",
};

// Раздел → ключ заголовка в словаре.
const SECTION_LABEL = {
  works: "pages.works",
  books: "pages.books",
  authors: "pages.authors",
  archive: "pages.archive",
  articles: "pages.biography",
  biography: "pages.biography",
  media: "pages.media",
  shakarimtanu: "pages.shakarimtanu",
  tagzym: "pages.tagzym",
};

function itemHref(section, item) {
  const build = DETAIL_HREF[section];
  if (build && item?.slug) return build(item);
  return SECTION_PAGE[section] ?? "/";
}

function itemLabel(item) {
  return item.title ?? item.name ?? item.label ?? "";
}

// Глобальный поиск: дебаунс-запрос к /api/search/ по мере ввода,
// результаты сгруппированы по разделам в выпадающем списке.
export function GlobalSearch({ size = "sm", className = "" }) {
  const { lang } = useLanguage();
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({});
  const [searched, setSearched] = useState(""); // последний выполненный запрос
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  // Дебаунс + отмена предыдущего запроса. Всё состояние меняется в async-колбэке.
  useEffect(() => {
    const q = query.trim();
    if (q.length < MIN_CHARS) return;

    const controller = new AbortController();
    const id = setTimeout(async () => {
      try {
        const { data } = await api.get("/search/", {
          params: { q, lang, limit: LIMIT },
          signal: controller.signal,
        });
        setResults(data?.results ?? {});
        setSearched(q);
      } catch {
        if (!controller.signal.aborted) {
          setResults({});
          setSearched(q);
        }
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(id);
      controller.abort();
    };
  }, [query, lang]);

  // Закрытие по клику вне и Esc.
  useEffect(() => {
    function onPointerDown(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const sections = Object.entries(results).filter(
    ([, items]) => Array.isArray(items) && items.length > 0,
  );
  const hasQuery = query.trim().length >= MIN_CHARS;
  const showDropdown = open && hasQuery;
  // Запрос введён, но результат для него ещё не получен — идёт поиск.
  const pending = hasQuery && query.trim() !== searched;

  const closeAndReset = () => {
    setOpen(false);
    setQuery("");
    setResults({});
  };

  return (
    <div className={`${styles.root} ${className}`} ref={rootRef}>
      <SearchInput
        value={query}
        onChange={(v) => {
          setQuery(v);
          setOpen(true);
        }}
        onSubmit={() => {}}
        placeholder={t("common.searchSite")}
        size={size}
        onFocus={() => setOpen(true)}
      />

      {showDropdown && (
        <div className={styles.dropdown}>
          {pending && (
            <p className={styles.status}>{t("search.loading")}</p>
          )}

          {!pending && sections.length === 0 && (
            <p className={styles.status}>{t("search.noResults")}</p>
          )}

          {!pending && sections.map(([section, items]) => (
            <div key={section} className={styles.group}>
              <p className={styles.groupTitle}>
                {t(SECTION_LABEL[section] ?? section)}
              </p>
              <ul className={styles.list}>
                {items.map((item, i) => (
                  <li key={item.id ?? item.slug ?? i}>
                    <Link
                      href={itemHref(section, item)}
                      className={styles.item}
                      onClick={closeAndReset}
                    >
                      <span className={styles.itemLabel}>
                        {itemLabel(item)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
