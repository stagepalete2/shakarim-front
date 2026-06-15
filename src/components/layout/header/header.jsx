"use client";

import { BurgerButton } from "@/components/ui/burger-button/burger-button"
import { LangSwitcher } from "@/components/ui/lang-switcher/lang-switcher"
import { Logo } from "@/components/ui/logo/logo"
import { NavList } from "@/components/ui/nav-list/nav-list"
import { useState } from "react"
import { useLanguage } from "@/components/providers/language-provider"
import { LANG_OPTIONS } from "@/lib/i18n/config"
import styles from "./header.module.scss"

// settings — глобальные настройки (см. API.md §10.1).
export function Header({ settings = {} }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  const mainNav = settings.mainNav ?? [];
  const subNav = settings.subNav ?? [];
  const logo = settings.logo ?? "/icons/logo.png";
  const title = settings.siteTitle ?? { line1: "Shakarim", line2: "Kudaiberdiuly" };

  const closeMenu = () => setIsMenuOpen(false);
  const withClose = (items) => items.map((link) => ({ ...link, onClick: closeMenu }));

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo href="/" onClick={closeMenu}>
          <img src={logo} alt="" width={60} height={60}/>
          <div className={styles.title}>
            <label htmlFor="">{title.line1}</label>
            <label htmlFor="">{title.line2}</label>
          </div>
        </Logo>

        <nav className={styles.desktopNav} aria-label="Основная навигация">
          <NavList items={mainNav} direction="horizontal" />
        </nav>

        <div className={styles.actions}>
          <LangSwitcher
            languages={LANG_OPTIONS}
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
            <NavList items={withClose(mainNav)} direction="vertical" />
          </nav>
          <nav aria-label="Дополнительная навигация" className={styles.mobileSubNav}>
            <NavList items={withClose(subNav)} direction="vertical" />
          </nav>
        </div>
      )}
    </header>
  );
}
