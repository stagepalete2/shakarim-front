"use client";

import { useState } from "react";
import { PdfViewer } from "@/components/ui/pdf-viewer/pdf-viewer";
import styles from "./file-list.module.scss";

// Тип-специфичные SVG-иконки. Неизвестный тип → generic-doc.
function FileTypeIcon({ type }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false",
  };
  switch (type) {
    case "pdf":
      return (
        <svg {...common}>
          <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
          <path d="M15 2v5h5" />
          <path d="M9 13.5h1.5a1.5 1.5 0 0 1 0 3H9V13.5zM9 16.5V19M13 13.5v5.5M13 13.5h1.5a1.5 1.5 0 0 1 0 3H13M17.5 13.5h2M17.5 13.5V19M17.5 16h1.5" strokeWidth="1.2" />
        </svg>
      );
    case "image":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <circle cx="9" cy="11" r="2" />
          <path d="M3 17l5-4 4 3 4-5 5 7" />
        </svg>
      );
    case "audio":
      return (
        <svg {...common}>
          <path d="M9 17V5l12-2v12" />
          <circle cx="6" cy="17" r="3" />
          <circle cx="18" cy="15" r="3" />
        </svg>
      );
    case "video":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M10 9.2v5.6l5-2.8z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "doc":
    default:
      return (
        <svg {...common}>
          <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
          <path d="M15 2v5h5" />
          <path d="M8 13h8M8 17h5" />
        </svg>
      );
  }
}

function ActionIcon({ kind }) {
  // PDF — иконка глаза (просмотр), остальное — стрелка external.
  if (kind === "view") {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

// Универсальный список файлов с превью PDF в модалке.
//
// Props:
//   items: [{ name, url, size?, type?, author?, description? }]
//   title?     — заголовок секции (если задан — рендерится head)
//   className? — для тематических обёрток
//
// Поведение:
//   • Если type === "pdf" → кнопка, открывает PdfViewer модалку.
//   • Иначе → анкор, открывает файл в новой вкладке.
export function FileList({ items = [], title, className = "" }) {
  const [openPdf, setOpenPdf] = useState(null);
  if (items.length === 0) return null;

  const renderCardInner = (f) => (
    <>
      <span className={`${styles.icon} ${styles[`type-${f.type ?? "doc"}`]}`}>
        <FileTypeIcon type={f.type} />
      </span>

      <span className={styles.body}>
        <span className={styles.name}>{f.name}</span>
        <span className={styles.meta}>
          {f.type && (
            <span className={styles.typeBadge}>
              {(f.type ?? "doc").toUpperCase()}
            </span>
          )}
          {f.size && <span className={styles.size}>{f.size}</span>}
          {f.author && <span className={styles.author}>{f.author}</span>}
        </span>
        {f.description && (
          <span className={styles.desc}>{f.description}</span>
        )}
      </span>

      <span className={styles.action} aria-hidden="true">
        <ActionIcon kind={f.type === "pdf" ? "view" : "external"} />
      </span>
    </>
  );

  return (
    <section className={`${styles.section} ${className}`}>
      {title && (
        <header className={styles.head}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.count}>{items.length}</span>
        </header>
      )}

      <ul className={styles.list}>
        {items.map((f, i) => (
          <li key={`${f.url ?? f.name ?? "file"}-${i}`} className={styles.cell}>
            {f.type === "pdf" ? (
              <button
                type="button"
                className={styles.card}
                onClick={() => setOpenPdf(f)}
                aria-label={`${f.name}${f.size ? `, ${f.size}` : ""} — қарап шығу`}
              >
                {renderCardInner(f)}
              </button>
            ) : (
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
                aria-label={`${f.name}${f.size ? `, ${f.size}` : ""} — жаңа қойындыда ашу`}
              >
                {renderCardInner(f)}
              </a>
            )}
          </li>
        ))}
      </ul>

      {openPdf && (
        <PdfViewer file={openPdf} onClose={() => setOpenPdf(null)} />
      )}
    </section>
  );
}
