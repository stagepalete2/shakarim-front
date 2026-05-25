import { Image } from "@/components/ui/image/image";
import styles from "./people-block.module.scss";

// Grid людей (учёных, авторов воспоминаний, ...) с портретом и био-snippet.
export function PeopleBlock({ title, items = [] }) {
  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      {title && (
        <header className={styles.head}>
          <h3 className={styles.title}>{title}</h3>
        </header>
      )}

      <ul className={styles.grid}>
        {items.map((p, i) => (
          <li key={`${p.name}-${i}`} className={styles.cell}>
            <article className={styles.card}>
              <div className={styles.portraitWrap}>
                {p.portrait ? (
                  <Image
                    src={p.portrait}
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
                {p.role && <span className={styles.role}>{p.role}</span>}
                {p.name && <h4 className={styles.name}>{p.name}</h4>}
                {p.years && <span className={styles.years}>{p.years}</span>}
                {p.bio && <p className={styles.bio}>{p.bio}</p>}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
