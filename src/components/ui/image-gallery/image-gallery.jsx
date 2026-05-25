"use client";

import { useState } from "react";
import { Image } from "@/components/ui/image/image";
import { ImageLightbox } from "@/components/ui/image-lightbox/image-lightbox";
import styles from "./image-gallery.module.scss";

// Универсальная галерея миниатюр с lightbox-просмотром.
// Поведение одинаковое для всех страниц; визуальные различия — через props.
//
// Props:
//   items: [{ src, caption? }]
//   title?         — заголовок секции (если задан — рендерится head с count)
//   aspectRatio?   — "1 / 1" (default) | "4 / 3" | любой valid CSS
//   showCaptions?  — показывать подпись под каждой миниатюрой (default false)
//   showHoverHint? — показывать иконку-лупу при ховере (default false)
//   className?     — для тематических обёрток (cream-paper bg и т.п.)
export function ImageGallery({
  items = [],
  title,
  aspectRatio = "1 / 1",
  showCaptions = false,
  showHoverHint = false,
  className = "",
}) {
  const [openIndex, setOpenIndex] = useState(null);
  if (items.length === 0) return null;

  return (
    <section className={`${styles.section} ${className}`}>
      {title && (
        <header className={styles.head}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.count}>{items.length}</span>
        </header>
      )}

      <ul className={styles.grid}>
        {items.map((item, i) => (
          <li key={item.src ?? i} className={styles.cell}>
            <button
              type="button"
              className={styles.thumb}
              style={{ aspectRatio }}
              onClick={() => setOpenIndex(i)}
              aria-label={item.caption ?? `Сурет ${i + 1}`}
            >
              <Image
                src={item.src}
                alt={item.caption ?? ""}
                className={styles.thumbImg}
                loading="lazy"
              />

              <span className={styles.thumbFallback} aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="28"
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="6" width="18" height="14" rx="2" />
                  <circle cx="12" cy="13" r="3.5" />
                </svg>
              </span>

              {showHoverHint && (
                <span className={styles.hoverHint} aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="7" />
                    <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
                  </svg>
                </span>
              )}
            </button>

            {showCaptions && item.caption && (
              <p className={styles.caption}>{item.caption}</p>
            )}
          </li>
        ))}
      </ul>

      {openIndex !== null && (
        <ImageLightbox
          items={items}
          startIndex={openIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </section>
  );
}
