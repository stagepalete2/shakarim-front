import { PageHero } from "@/components/ui/page-hero/page-hero";
import { TagzymSection } from "./components/tagzym-section/tagzym-section";
import { getT } from "@/lib/i18n/server";
import styles from "./tagzym.module.scss";

export async function Tagzym({ data = {} }) {
  const t = await getT();
  const sections = data.sections ?? [];

  return (
    <main className={styles.page}>
      <PageHero
        {...data.hero}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("pages.tagzym") },
        ]}
        tone="memorial"
      />

      <div className={styles.sections}>
        {sections.map((section) => (
          <TagzymSection key={section.id} section={section} />
        ))}
      </div>
    </main>
  );
}
