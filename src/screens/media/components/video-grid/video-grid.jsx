"use client";

import { useState } from "react";
import { Image } from "@/components/ui/image/image";
import { VideoModal } from "../video-modal/video-modal";
import styles from "./video-grid.module.scss";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// Карточка видео в стиле YouTube: thumbnail с play-overlay + meta снизу.
function VideoCard({ item, onOpen }) {
  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.button}
        onClick={() => onOpen(item)}
        aria-label={`${item.title} — ойнату`}
      >
        <div className={styles.thumbWrap}>
          {item.thumbnail && (
            <Image
              src={item.thumbnail}
              alt={item.title}
              className={styles.thumb}
              loading="lazy"
            />
          )}
          <div className={styles.thumbFallback} aria-hidden="true" />
          <span className={styles.play} aria-hidden="true">
            <PlayIcon />
          </span>
          {item.duration && (
            <span className={styles.duration}>{item.duration}</span>
          )}
        </div>

        <div className={styles.body}>
          <h3 className={styles.title}>{item.title}</h3>
          <div className={styles.meta}>
            {item.author && <span className={styles.author}>{item.author}</span>}
            {item.year && (
              <>
                {item.author && <span className={styles.dot} aria-hidden="true">·</span>}
                <span className={styles.year}>{item.year}</span>
              </>
            )}
          </div>
        </div>
      </button>
    </article>
  );
}

export function VideoGrid({ items = [] }) {
  const [active, setActive] = useState(null);

  if (items.length === 0) {
    return (
      <p className={styles.empty}>Бұл бөлімде материалдар әзірге жоқ.</p>
    );
  }

  return (
    <>
      <ul className={styles.grid}>
        {items.map((item) => (
          <li key={item.id} className={styles.cell}>
            <VideoCard item={item} onOpen={setActive} />
          </li>
        ))}
      </ul>

      {active && (
        <VideoModal item={active} onClose={() => setActive(null)} />
      )}
    </>
  );
}
