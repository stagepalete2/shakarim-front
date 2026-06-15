"use client";

import { useState } from "react";
import { NavList } from "@/components/ui/nav-list/nav-list";
import { SearchInput } from "@/components/ui/search-input/search-input";
import { useTranslations } from "@/components/providers/language-provider";
import styles from "./sub-header.module.scss";

// settings — глобальные настройки (см. API.md §10.1).
export function SubHeader({ settings = {} }) {
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const subNav = settings.subNav ?? [];

  // TODO: подключить реальный поиск через бэкенд.
  const handleSubmit = () => {};

  return (
    <div className={styles.subHeader}>
      <div className={styles.inner}>
        <nav className={styles.nav} aria-label="Дополнительная навигация">
          <NavList items={subNav} direction="horizontal" />
        </nav>

        <div className={styles.searchSlot}>
          <SearchInput
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
            placeholder={t("common.searchSite")}
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
