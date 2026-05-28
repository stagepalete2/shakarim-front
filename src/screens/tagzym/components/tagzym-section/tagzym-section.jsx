import { ImageGallery } from "@/components/ui/image-gallery/image-gallery";
import styles from "./tagzym-section.module.scss";

// Секция «Тағзым»: пронумерованный заголовок + подпись + грид карточек.
// Каждый элемент: фото + название под ним; клик открывает lightbox с
// заголовком и развёрнутым описанием.
//
// Маппим items раздела в формат ImageGallery:
//   { src, caption (= title), description (формируем из year/location + body) }
export function TagzymSection({ section }) {
  if (!section) return null;
  const { id, number, title, subtitle, items = [] } = section;

  const galleryItems = items.map((it) => {
    // Собираем мета-префикс (год, место) перед основным описанием.
    const metaParts = [];
    if (it.year) metaParts.push(it.year);
    if (it.location) metaParts.push(it.location);
    const meta = metaParts.length > 0 ? metaParts.join(" · ") : null;
    const description = [meta, it.description].filter(Boolean).join(" — ");

    return {
      src: it.image,
      caption: it.title,
      description: description || undefined,
    };
  });

  return (
    <section
      id={id}
      className={styles.section}
      aria-labelledby={`${id}-title`}
    >
      <header className={styles.head}>
        {number && (
          <span className={styles.number} aria-hidden="true">
            {number}
          </span>
        )}
        <div className={styles.titles}>
          {title && (
            <h2 id={`${id}-title`} className={styles.title}>
              {title}
            </h2>
          )}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </header>

      <ImageGallery
        items={galleryItems}
        aspectRatio="4 / 3"
        showCaptions
        showHoverHint
        className={styles.gallery}
      />
    </section>
  );
}
