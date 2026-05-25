import { Image } from "@/components/ui/image/image";
import styles from "./bio-political.module.scss";

export function BioPolitical({
  data,
  eyebrow = "Қоғамдық қызмет",
  title = "Саяси және әлеуметтік белсенділік",
}) {
  if (!data) return null;
  const { intro, events = [], quote } = data;

  return (
    <section className={styles.section} aria-labelledby="bio-pol-title">
      <header className={styles.head}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 id="bio-pol-title" className={styles.title}>
          {title}
        </h2>
        {intro && <p className={styles.intro}>{intro}</p>}
      </header>

      {events.length > 0 && (
        <ol className={styles.events}>
          {events.map((ev, i) => (
            <li key={`${ev.year}-${i}`} className={styles.eventCell}>
              <article className={styles.event}>
                <div className={styles.eventMeta}>
                  {ev.year && (
                    <span className={styles.eventYear}>{ev.year}</span>
                  )}
                  <span className={styles.eventDivider} aria-hidden="true" />
                </div>

                <div className={styles.eventBody}>
                  {ev.title && (
                    <h3 className={styles.eventTitle}>{ev.title}</h3>
                  )}
                  {ev.description && (
                    <p className={styles.eventDesc}>{ev.description}</p>
                  )}
                  {ev.citation && (
                    <p className={styles.eventCitation}>{ev.citation}</p>
                  )}
                </div>

                {ev.image && (
                  <figure className={styles.eventFigure}>
                    <Image
                      src={ev.image}
                      alt=""
                      className={styles.eventFigureImg}
                      loading="lazy"
                    />
                  </figure>
                )}
              </article>
            </li>
          ))}
        </ol>
      )}

      {quote && (
        <blockquote className={styles.quote}>
          <p className={styles.quoteText}>«{quote.text}»</p>
          {quote.attribution && (
            <cite className={styles.quoteAttr}>— {quote.attribution}</cite>
          )}
        </blockquote>
      )}
    </section>
  );
}
