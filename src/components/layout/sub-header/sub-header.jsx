"use client";

import { useState } from "react";
import { NavList } from "@/components/ui/nav-list/nav-list";
import { SearchInput } from "@/components/ui/search-input/search-input";
import { SUB_NAV } from "@/lib/nav";
import styles from "./sub-header.module.scss";

export function SubHeader() {
  const [query, setQuery] = useState("");

  // TODO: подключить реальный поиск через бэкенд.
  const handleSubmit = () => {};

  return (
    <div className={styles.subHeader}>
      <div className={styles.inner}>
        <nav className={styles.nav} aria-label="Дополнительная навигация">
          <NavList items={SUB_NAV} direction="horizontal" />
        </nav>

        <div className={styles.searchSlot}>
          <SearchInput
            value={query}
            onChange={setQuery}
            onSubmit={handleSubmit}
            placeholder="Поиск по сайту"
            size="sm"
          />
        </div>
      </div>
    </div>
  );
}
