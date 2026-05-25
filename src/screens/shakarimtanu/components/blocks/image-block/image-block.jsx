"use client";

import { useState } from "react";
import { Image } from "@/components/ui/image/image";
import { ImageLightbox } from "@/components/ui/image-lightbox/image-lightbox";
import styles from "./image-block.module.scss";

// Одиночное изображение с подписью. По клику открывается в лайтбоксе
// (тот же что в архиве: pinch zoom, swipe, ESC).
export function ImageBlock({ src, alt, caption, ratio = "4 / 3" }) {
  const [open, setOpen] = useState(false);
  if (!src) return null;

  return (
    <>
      <figure className={styles.figure}>
        <button
          type="button"
          className={styles.btn}
          style={{ aspectRatio: ratio }}
          onClick={() => setOpen(true)}
          aria-label={alt ?? caption ?? "Суретті ашу"}
        >
          <Image
            src={src}
            alt={alt ?? caption ?? ""}
            className={styles.img}
            loading="lazy"
          />
          <span className={styles.zoomHint} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
            </svg>
          </span>
        </button>
        {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      </figure>

      {open && (
        <ImageLightbox
          items={[{ src, caption }]}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
