"use client";

import { useState } from "react";
import { Image } from "@/components/ui/image/image";
import { useKeydown } from "@/hooks/use-keydown";
import styles from "./bio-memories.module.scss";

// Карусель мемуарных фрагментов. Один блок крупный по центру, под ним
// dots-индикатор + arrow-кнопки. Свайп — через scroll-snap трека,
// arrow и клавиатура — управляют активным индексом.
export function BioMemories({
  items = [],
  eyebrow = "Естеліктер",
  title = "Балалық пен ішкі әлем",
}) {
  const [index, setIndex] = useState(0);

  useKeydown({
    ArrowLeft: () => setIndex((i) => (i - 1 + items.length) % items.length),
    ArrowRight: () => setIndex((i) => (i + 1) % items.length),
  }, items.length > 1);

  if (items.length === 0) return null;

  const total = items.length;
  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  const current = items[index];

  return (
    <section className={styles.section} aria-labelledby="bio-mem-title">
      <header className={styles.head}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 id="bio-mem-title" className={styles.title}>
          {title}
        </h2>
      </header>

      <div className={styles.stage} aria-live="polite">
        <div
          key={index}
          className={`${styles.slide} ${current.image ? styles.slideWithImage : ""}`}
        >
          {current.image && (
            <figure className={styles.figure}>
              <Image
                src={current.image}
                alt=""
                className={styles.figureImg}
                loading="lazy"
              />
            </figure>
          )}

          <blockquote className={styles.quote}>
            <span className={styles.mark} aria-hidden="true">“</span>
            <p className={styles.quoteText}>{current.text}</p>
            <footer className={styles.attr}>
              {current.source && (
                <cite className={styles.source}>{current.source}</cite>
              )}
              {current.year && (
                <span className={styles.year}>{current.year}</span>
              )}
            </footer>
          </blockquote>
        </div>

        {total > 1 && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.arrow}
              onClick={goPrev}
              aria-label="Алдыңғы"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className={styles.dots} role="tablist">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Слайд ${i + 1}`}
                  aria-selected={i === index}
                  role="tab"
                />
              ))}
            </div>

            <button
              type="button"
              className={styles.arrow}
              onClick={goNext}
              aria-label="Келесі"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
