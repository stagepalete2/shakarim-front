import { Breadcrumbs } from "@/components/ui/breadcrumbs/breadcrumbs";
import { Image } from "@/components/ui/image/image";
import styles from "./page-hero.module.scss";

// Унифицированный editorial-hero для разделочных страниц
// (biography, shakarimtanu, tagzym и т.п.).
//
// Геометрия одна на всех; смыслонесущие отличия — через props:
//   • breadcrumbs — массив { label, href? } над заголовком
//   • eyebrow     — мелкий uppercase-label (цвет от tone-акцента)
//   • title       — крупный display-заголовок
//   • lifespan    — необяз. строка-эпиграф между title и lead (sepia)
//   • lead        — короткий описательный абзац
//   • portrait    — URL фото; включает split-layout на десктопе
//   • tone        — "museum" (default sepia/cream) | "academic" | "memorial"
//   • className   — для дополнительной обёртки на стороне страницы
export function PageHero({
  breadcrumbs,
  eyebrow,
  title,
  lifespan,
  lead,
  portrait,
  tone = "museum",
  className = "",
}) {
  // data-with-portrait — селектор для split-layout-а в SCSS.
  const dataAttrs = portrait ? { "data-with-portrait": "" } : {};

  return (
    <header
      className={`${styles.hero} ${styles[`tone-${tone}`]} ${className}`}
      {...dataAttrs}
    >
      <div className={styles.inner}>
        {breadcrumbs?.length > 0 && (
          <div className={styles.breadcrumbs}>
            <Breadcrumbs items={breadcrumbs} className="onLight" />
          </div>
        )}

        {/* body — нижний контейнер; на десктопе при portrait превращается
            в row (text | portrait). breadcrumbs выше — всегда независимый
            ряд, не попадают в split. */}
        <div className={styles.body}>
          <div className={styles.text}>
            {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
            {title && <h1 className={styles.title}>{title}</h1>}
            {lifespan && <p className={styles.lifespan}>{lifespan}</p>}
            {lead && <p className={styles.lead}>{lead}</p>}
            <hr className={styles.divider} aria-hidden="true" />
          </div>

          {portrait && (
            <div className={styles.portraitWrap}>
              <Image
                src={portrait}
                alt={title ?? ""}
                className={styles.portrait}
                loading="eager"
              />
              <div className={styles.portraitFrame} aria-hidden="true" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
