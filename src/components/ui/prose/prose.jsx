import styles from "./prose.module.scss";

// HTML-рендерер для CKEditor/CMS-контента. Применяет prose-стили к
// произвольной HTML-разметке, приходящей с бэкенда.
// Без оборачивающего div'а внутри, чтобы .prose > :first/last-child
// корректно матчили первый/последний верхнеуровневые элементы HTML.
export function Prose({ html, className = "" }) {
  if (!html) return null;
  return (
    <div
      className={`${styles.prose} ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
