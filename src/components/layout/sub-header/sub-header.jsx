import { NavList } from "@/components/ui/nav-list/nav-list";
import { GlobalSearch } from "@/components/ui/global-search/global-search";
import styles from "./sub-header.module.scss";

// settings — глобальные настройки (см. API.md §10.1).
export function SubHeader({ settings = {} }) {
  const subNav = settings.subNav ?? [];

  return (
    <div className={styles.subHeader}>
      <div className={styles.inner}>
        <nav className={styles.nav} aria-label="Дополнительная навигация">
          <NavList items={subNav} direction="horizontal" />
        </nav>

        <div className={styles.searchSlot}>
          <GlobalSearch size="sm" />
        </div>
      </div>
    </div>
  );
}
