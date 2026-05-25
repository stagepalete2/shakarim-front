import { Prose } from "@/components/ui/prose/prose";
import { BlocksRenderer } from "../blocks/blocks-renderer";
import styles from "./shakarimtanu-section.module.scss";

// Универсальная секция. Поддерживает обе формы контента:
//   1) blocks — массив гибких блоков (предпочтительный CMS-формат).
//   2) content — единый HTML (legacy/простой кейс) — рендерится Prose.
// Lead-абзац всегда сверху, header (number + title) — над ним.
export function ShakarimtanuSection({ section }) {
  if (!section) return null;
  const { id, number, title, subtitle, lead, content, blocks } = section;
  const hasBlocks = Array.isArray(blocks) && blocks.length > 0;

  return (
    <section id={id} className={styles.section} aria-labelledby={`${id}-title`}>
      <header className={styles.head}>
        {number && (
          <span className={styles.number} aria-hidden="true">
            {number}
          </span>
        )}

        <div className={styles.titles}>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {title && (
            <h2 id={`${id}-title`} className={styles.title}>
              {title}
            </h2>
          )}
        </div>
      </header>

      {lead && <p className={styles.lead}>{lead}</p>}

      {hasBlocks ? (
        <div className={styles.body}>
          <BlocksRenderer blocks={blocks} />
        </div>
      ) : content ? (
        <div className={styles.body}>
          <Prose html={content} />
        </div>
      ) : null}
    </section>
  );
}
