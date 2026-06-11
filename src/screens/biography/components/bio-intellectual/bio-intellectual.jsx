import { Image } from "@/components/ui/image/image"
import styles from "./bio-intellectual.module.scss"

// Интеллектуальная биография: блок интро + сетка influences-карточек
// (карта влияний) + лента работ (reading journey). Все блоки опциональны.
export function BioIntellectual({
  data,
  eyebrow,
  title = "Рухани әлемі",
}) {
  if (!data) return null;
  const { intro, influences = [] } = data;

  return (
    <section className={styles.section} aria-labelledby="bio-int-title">
      <header className={styles.head}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        <h2 id="bio-int-title" className={styles.title}>
          {title}
        </h2>
        {intro && <p className={styles.intro}>{intro}</p>}
      </header>

      {influences.length > 0 && (
        <div className={styles.influences}>
          <h3 className={styles.subhead}>Ой ұстаздары</h3>
          <ul className={styles.influencesGrid}>
            {influences.map((inf, i) => (
              <li key={`${inf.name}-${i}`} className={styles.influenceCell}>
                <article className={styles.influence}>
                  <div className={styles.portraitWrap}>
                    {inf.portrait ? (
                      <Image
                        src={inf.portrait}
                        alt={inf.name ?? ""}
                        className={styles.portrait}
                        loading="lazy"
                      />
                    ) : (
                      <div className={styles.portraitFallback} aria-hidden="true">
                        <span>{inf.name?.[0] ?? "?"}</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.infBody}>
                    {inf.era && <span className={styles.era}>{inf.era}</span>}
                    {inf.name && <h4 className={styles.infName}>{inf.name}</h4>}
                    {inf.contribution && (
                      <p className={styles.contribution}>{inf.contribution}</p>
                    )}
                    {inf.quote && (
                      <blockquote className={styles.infQuote}>
                        «{inf.quote}»
                      </blockquote>
                    )}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      )}

    </section>
  );
}
