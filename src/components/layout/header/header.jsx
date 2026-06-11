"use client";

import { BurgerButton } from "@/components/ui/burger-button/burger-button"
import { LangSwitcher } from "@/components/ui/lang-switcher/lang-switcher"
import { Logo } from "@/components/ui/logo/logo"
import { NavList } from "@/components/ui/nav-list/nav-list"
import { MAIN_NAV, SUB_NAV } from "@/lib/nav"
import { useState } from "react"
import styles from "./header.module.scss"

const LANGUAGES = [
  { code: "kz", label: "KAZ" },
  { code: "ru", label: "RUS" },
  { code: "en", label: "ENG" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState("ru");

  const closeMenu = () => setIsMenuOpen(false);
  const withClose = (items) => items.map((link) => ({ ...link, onClick: closeMenu }));

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo href="/" onClick={closeMenu}>
          <img src="/icons/logo.png" alt="" width={60} height={60}/>
          <div className={styles.title}>
            <label htmlFor="">Shakarim</label>
            <label htmlFor="">Kudaiberdiuly</label>
          </div>
        </Logo>

        <nav className={styles.desktopNav} aria-label="Основная навигация">
          <NavList items={MAIN_NAV} direction="horizontal" />
        </nav>

        <div className={styles.actions}>
          <LangSwitcher
            languages={LANGUAGES}
            value={lang}
            onChange={setLang}
            size="sm"
          />
          <div className={styles.burgerSlot}>
            <BurgerButton
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-controls="mobile-menu"
            />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className={styles.mobileMenu}>
          <nav aria-label="Основная навигация">
            <NavList items={withClose(MAIN_NAV)} direction="vertical" />
          </nav>
          <nav aria-label="Дополнительная навигация" className={styles.mobileSubNav}>
            <NavList items={withClose(SUB_NAV)} direction="vertical" />
          </nav>
        </div>
      )}
    </header>
  );
}
