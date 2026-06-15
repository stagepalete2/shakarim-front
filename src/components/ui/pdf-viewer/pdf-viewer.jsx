"use client";

import { useState } from "react";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useKeydown } from "@/hooks/use-keydown";
import styles from "./pdf-viewer.module.scss";

// Просмотрщик PDF без скачивания — встроенный браузерный viewer через
// <iframe>. На большинстве десктопов и Android-Chrome работает нативно.
// На iOS Safari iframe-PDF поддерживается ограниченно (без тулбара),
// поэтому в шапке всегда виден fallback «Открыть в браузере».
export function PdfViewer({ file, onClose }) {
  const [loaded, setLoaded] = useState(false);

  useBodyScrollLock();
  useKeydown({ Escape: () => onClose?.() });

  if (!file) return null;

  // #view=FitH — растягиваем PDF по ширине окна.
  const src = `${file.url}#view=FitH`;

  return (
    <div
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label={file.name}
    >
      <div
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />

      <div className={styles.panel}>
        <header className={styles.top}>
          <div className={styles.titleWrap}>
            <span className={styles.typeBadge}>PDF</span>
            <span className={styles.name} title={file.name}>
              {file.name}
            </span>
            {file.size && (
              <span className={styles.size}>{file.size}</span>
            )}
          </div>

          <div className={styles.actions}>
            <a
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtn}
              aria-label="Жаңа қойындыда ашу"
              title="Жаңа қойындыда ашу"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>

            <a
              href={file.url}
              download
              className={styles.actionBtn}
              aria-label="Жүктеп алу"
              title="Жүктеп алу"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 4v12M6 12l6 6 6-6M5 21h14" />
              </svg>
            </a>

            <button
              type="button"
              onClick={onClose}
              className={`${styles.actionBtn} ${styles.closeBtn}`}
              aria-label="Жабу"
              title="Жабу"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <div className={styles.viewer}>
          {!loaded && (
            <div className={styles.loading} aria-hidden="true">
              <span className={styles.spinner} />
              <span className={styles.loadingText}>Жүктелуде...</span>
            </div>
          )}

          {/* Без sandbox: PDF-просмотрщик Chrome не рендерится в sandboxed-iframe. */}
          <iframe
            src={src}
            title={file.name}
            className={styles.iframe}
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}
