import { PageHero } from "@/components/ui/page-hero/page-hero";
import { TAGZYM } from "@/lib/tagzym";
import { TagzymSection } from "./components/tagzym-section/tagzym-section";
import styles from "./tagzym.module.scss";

export function Tagzym({ data = TAGZYM }) {
  const sections = data.sections ?? [];

  return (
    <main className={styles.page}>
      <PageHero
        {...data.hero}
        breadcrumbs={[
          { label: "Главная", href: "/" },
          { label: "Тағзым" },
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
