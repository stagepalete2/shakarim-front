import styles from "./shakarimtanu-hero.module.scss";

export function ShakarimtanuHero({ data }) {
  if (!data) return null;
  const { eyebrow, title, lead } = data;

  return (
    <header className={styles.hero}>
      <div className={styles.inner}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        {title && <h1 className={styles.title}>{title}</h1>}
        {lead && <p className={styles.lead}>{lead}</p>}
        <hr className={styles.divider} aria-hidden="true" />
      </div>
    </header>
  );
}
