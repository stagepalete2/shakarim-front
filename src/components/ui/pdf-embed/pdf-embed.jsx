"use client";

import { useState } from "react";
import styles from "./pdf-embed.module.scss";

// Inline-просмотр PDF (без модалки) — для использования внутри tab-панели
// или любого page-блока. Использует тот же FitH-режим что и ui/PdfViewer
// (модалка), но без затемнения, шапки и закрытия.
//
// Props:
//   url       — путь к PDF
//   title     — для <iframe title>
//   className — для оборачивающего блока
export function PdfEmbed({ url, title, className = "" }) {
  const [loaded, setLoaded] = useState(false);
  if (!url) return null;

  const src = `${url}#view=FitH`;

  return (
    <div className={`${styles.wrap} ${className}`}>
      {!loaded && (
        <div className={styles.loading} aria-hidden="true">
          <span className={styles.spinner} />
          <span className={styles.loadingText}>Жүктелуде...</span>
        </div>
      )}

      {/* Без sandbox: встроенный PDF-просмотрщик Chrome (MimeHandlerView)
          блокируется в sandboxed-iframe, особенно для кросс-доменного файла. */}
      <iframe
        src={src}
        title={title ?? "PDF"}
        className={styles.iframe}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
