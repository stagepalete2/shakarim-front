import { LocaleLink as Link } from "@/components/ui/locale-link/locale-link";
import { Image } from "@/components/ui/image/image";
import { authorHref } from "@/lib/authors";
import styles from "./author-card.module.scss";

// Page-local карточка автора. Клик ведёт на /authors/[slug] с детальной
// страницей (биография, работы, цитаты). ui/AuthorCard оставлена
// маленькой (без bio/years), используется в home-section.
export function AuthorCard({ author }) {
  if (!author) return null;
  const { slug, name, role, years, bio, photo } = author;
  const initial = name?.[0] ?? "?";

  return (
    <Link
      href={authorHref(slug)}
      className={styles.card}
      aria-label={`${name} — толық ақпарат`}
    >
      <div className={styles.portraitWrap}>
        {photo ? (
          <Image
            src={photo}
            alt={name ?? ""}
            className={styles.portrait}
            loading="lazy"
          />
        ) : (
          <div className={styles.portraitFallback} aria-hidden="true">
            <span>{initial}</span>
          </div>
        )}
      </div>

      <div className={styles.body}>
        {name && <h3 className={styles.name}>{name}</h3>}
        {years && <p className={styles.years}>{years}</p>}
        {role && <p className={styles.role}>{role}</p>}
        {bio && <p className={styles.bio}>{bio}</p>}
      </div>
    </Link>
  );
}
