import { Image } from "@/components/ui/image/image";
import styles from "./bio-environment.module.scss";

export function BioEnvironment({
  data,
  eyebrow,
  title = "Шәкәрім өскен орта",
}) {
  if (!data) return null;
  const { intro, paragraphs = [], quote, facts = [], images = [] } = data;

  return (
    <section className={styles.section} aria-labelledby="bio-env-title">
      <header className={styles.head}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 id="bio-env-title" className={styles.title}>
          {title}
        </h2>
        {intro && <p className={styles.intro}>{intro}</p>}
      </header>

      <div className={styles.layout}>
        <div className={styles.body}>
          {paragraphs.map((p, i) => (
            <p key={i} className={styles.paragraph}>
              {p}
            </p>
          ))}

          {quote && (
            <blockquote className={styles.quote}>
              <p className={styles.quoteText}>«{quote.text}»</p>
              {quote.attribution && (
                <cite className={styles.quoteAttr}>— {quote.attribution}</cite>
              )}
            </blockquote>
          )}
        </div>

        <aside className={styles.aside}>
          {images[0] && (
            <figure className={styles.figureLg}>
              <Image
                src={images[0].src}
                alt={images[0].caption ?? ""}
                className={styles.figureImg}
                loading="lazy"
              />
              {images[0].caption && (
                <figcaption className={styles.figureCaption}>
                  {images[0].caption}
                </figcaption>
              )}
            </figure>
          )}

          {facts.length > 0 && (
            <dl className={styles.facts}>
              {facts.map((f) => (
                <div key={f.label} className={styles.fact}>
                  <dt className={styles.factLabel}>{f.label}</dt>
                  <dd className={styles.factValue}>{f.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {images[1] && (
            <figure className={styles.figureSm}>
              <Image
                src={images[1].src}
                alt={images[1].caption ?? ""}
                className={styles.figureImg}
                loading="lazy"
              />
              {images[1].caption && (
                <figcaption className={styles.figureCaption}>
                  {images[1].caption}
                </figcaption>
              )}
            </figure>
          )}
        </aside>
      </div>
    </section>
  );
}
