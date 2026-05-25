"use client";

import { useEffect, useState } from "react";
import styles from "./shakarimtanu-toc.module.scss";

// Sticky table-of-contents с активным состоянием. Активный раздел
// определяем через IntersectionObserver: тот, чей <h2> ближе всего
// к верху viewport-а в зоне 0..40%.
export function ShakarimtanuToc({ items = [] }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const sectionEls = items
      .map((it) => document.getElementById(it.id))
      .filter(Boolean);

    if (sectionEls.length === 0) return;

    // Срабатываем когда заголовок входит в верхние 40% viewport-а.
    const observer = new IntersectionObserver(
      (entries) => {
        // Берём самый верхний intersecting элемент.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-10% 0px -55% 0px",
        threshold: 0,
      },
    );

    sectionEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    // Учитываем sticky header сайта (~64px моб / 72px desktop) — даём offset.
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  if (items.length === 0) return null;

  return (
    <nav className={styles.toc} aria-label="Бөлімдер">
      <span className={styles.heading}>Бөлімдер</span>
      <ol className={styles.list}>
        {items.map((it) => {
          const isActive = it.id === activeId;
          return (
            <li key={it.id} className={styles.item}>
              <a
                href={`#${it.id}`}
                onClick={(e) => handleClick(e, it.id)}
                className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                aria-current={isActive ? "true" : undefined}
              >
                <span className={styles.number}>{it.number}</span>
                <span className={styles.label}>{it.title}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
