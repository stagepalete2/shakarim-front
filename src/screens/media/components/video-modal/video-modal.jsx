"use client";

import { FileList } from "@/components/ui/file-list/file-list";
import { useBodyScrollLock } from "@/hooks/use-body-scroll-lock";
import { useKeydown } from "@/hooks/use-keydown";
import { getVideoEmbedUrl } from "@/lib/media";
import styles from "./video-modal.module.scss";

// Модалка video-плеера: YouTube/Vimeo iframe + полные метаданные:
// автор, год, описание, теги, дополнительные ссылки, вложенные файлы.
export function VideoModal({ item, onClose }) {
  useBodyScrollLock();
  useKeydown({ Escape: () => onClose?.() });

  if (!item) return null;
  const embedUrl = getVideoEmbedUrl(item.videoUrl);

  return (
    <div
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        className={styles.backdrop}
        onClick={onClose}
        aria-hidden="true"
      />

      <div className={styles.panel}>
        <button
          type="button"
          onClick={onClose}
          className={styles.close}
          aria-label="Жабу"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={styles.scroll}>
          <div className={styles.playerWrap}>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={item.title}
                className={styles.player}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className={styles.playerPlaceholder} aria-hidden="true">
                Видео жоқ
              </div>
            )}
          </div>

          <div className={styles.meta}>
            <h2 className={styles.title}>{item.title}</h2>

            <div className={styles.byline}>
              {item.author && <span className={styles.author}>{item.author}</span>}
              {item.year && (
                <>
                  {item.author && <span aria-hidden="true">·</span>}
                  <span>{item.year}</span>
                </>
              )}
              {item.duration && (
                <>
                  <span aria-hidden="true">·</span>
                  <span>{item.duration}</span>
                </>
              )}
            </div>

            {item.tags?.length > 0 && (
              <ul className={styles.tags} aria-label="Тегтер">
                {item.tags.map((t) => (
                  <li key={t} className={styles.tag}>
                    {t}
                  </li>
                ))}
              </ul>
            )}

            {item.description && (
              <p className={styles.description}>{item.description}</p>
            )}

            {item.links?.length > 0 && (
              <ul className={styles.links} aria-label="Сілтемелер">
                {item.links.map((l, i) => (
                  <li key={i}>
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkItem}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M7 17L17 7M9 7h8v8" />
                      </svg>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}

            {item.attachments?.length > 0 && (
              <div className={styles.attachments}>
                <FileList items={item.attachments} title="Вложения" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
