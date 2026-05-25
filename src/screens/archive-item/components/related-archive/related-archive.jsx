import { SectionHeader } from "@/components/ui/section-header/section-header";
import { ArchiveCard } from "@/screens/archive/components/archive-card/archive-card";
import styles from "./related-archive.module.scss";

export function RelatedArchive({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <section className={styles.section}>
      <SectionHeader
        title="Ұқсас жазбалар"
        allHref="/archive"
        allLabel="Архивке оралу →"
      />
      <div className={styles.grid}>
        {items.map((item) => (
          <ArchiveCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
