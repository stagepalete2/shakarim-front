import { Image } from "@/components/ui/image/image";
import styles from "./bio-descendants.module.scss";

export function BioDescendants({
  items = [],
  eyebrow = "Әулеттің жалғасы",
  title = "Отбасы, балалар, ұрпақтар",
}) {
  if (items.length === 0) return null;

  return (
    <section className={styles.section} aria-labelledby="bio-desc-title">
      <header className={styles.head}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <h2 id="bio-desc-title" className={styles.title}>
          {title}
        </h2>
      </header>

      <ul className={styles.grid}>
        {items.map((p, i) => (
          <li key={`${p.name}-${i}`} className={styles.cell}>
            <article className={styles.card}>
              <div className={styles.portraitWrap}>
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name ?? ""}
                    className={styles.portrait}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.portraitFallback} aria-hidden="true">
                    <span>{p.name?.[0] ?? "?"}</span>
                  </div>
                )}
              </div>
              <div className={styles.body}>
                {p.relation && (
                  <span className={styles.relation}>{p.relation}</span>
                )}
                {p.name && <h3 className={styles.name}>{p.name}</h3>}
                {p.bio && <p className={styles.bio}>{p.bio}</p>}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
