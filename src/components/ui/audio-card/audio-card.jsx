"use client";

import { useState } from "react";
import { Image } from "@/components/ui/image/image";
import styles from "./audio-card.module.scss";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <polygon points="8,5 19,12 8,19" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

function HeadphonesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14a8 8 0 0 1 16 0v4" />
      <path d="M4 14v4a2 2 0 0 0 2 2h2v-6H4z" />
      <path d="M20 14v4a2 2 0 0 1-2 2h-2v-6h4z" />
    </svg>
  );
}

export function AudioCard({
  title,
  author,
  duration,
  cover,
  coverAlt,
  src,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((v) => !v);

  return (
    <article className={`${styles.card} ${isOpen ? styles.open : ""} ${className}`}>
      <div className={styles.row}>
        <button
          type="button"
          className={styles.coverWrap}
          onClick={toggle}
          aria-label={isOpen ? "Остановить" : "Играть"}
          aria-pressed={isOpen}
        >
          {cover && (
            <Image src={cover} alt={coverAlt ?? ""} className={styles.cover} />
          )}
          <span className={styles.playOverlay} aria-hidden="true">
            {isOpen ? <PauseIcon /> : <PlayIcon />}
          </span>
        </button>

        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.meta}>
            {author && <span className={styles.author}>{author}</span>}
            {duration && <span className={styles.duration}>{duration}</span>}
          </div>
          <div className={styles.kind}>
            <HeadphonesIcon />
            <span>Прослушивание</span>
          </div>
        </div>
      </div>

      {isOpen && src && (
        <audio
          src={src}
          controls
          autoPlay
          className={styles.player}
          onEnded={() => setIsOpen(false)}
        />
      )}
    </article>
  );
}
