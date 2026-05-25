"use client";

import { ArchiveCard } from "../archive-card/archive-card";
import styles from "./archive-shelf.module.scss";

export function ArchiveShelf({ type, items = [], onSeeAll }) {
  if (items.length === 0) return null;

  return (
    <section className={styles.shelf} data-type={type.id}>
      <header className={styles.head}>
        <div className={styles.headText}>
          <h3 className={styles.title}>{type.label}</h3>
          <p className={styles.desc}>{type.description}</p>
        </div>

        {items.length > 4 && onSeeAll && (
          <button
            type="button"
            className={styles.seeAll}
            onClick={onSeeAll}
          >
            Барлығын көру
            <span aria-hidden="true">→</span>
          </button>
        )}
      </header>

      <div className={styles.rail}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              <ArchiveCard item={item} />
            </li>
          ))}
        </ul>
        <div className={styles.fadeRight} aria-hidden="true" />
      </div>
    </section>
  );
}
