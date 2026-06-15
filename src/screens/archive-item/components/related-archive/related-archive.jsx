import { SectionHeader } from "@/components/ui/section-header/section-header";
import { ArchiveCard } from "@/screens/archive/components/archive-card/archive-card";
import { getT } from "@/lib/i18n/server";
import styles from "./related-archive.module.scss";

export async function RelatedArchive({ items = [] }) {
  if (items.length === 0) return null;
  const t = await getT();

  return (
    <section className={styles.section}>
      <SectionHeader
        title={t("archive.related")}
        allHref="/archive"
        allLabel={t("archive.backToArchive")}
      />
      <div className={styles.grid}>
        {items.map((item) => (
          <ArchiveCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
