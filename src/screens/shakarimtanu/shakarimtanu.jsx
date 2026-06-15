import { PageHero } from "@/components/ui/page-hero/page-hero";
import { ShakarimtanuToc } from "./components/shakarimtanu-toc/shakarimtanu-toc";
import { ShakarimtanuSection } from "./components/shakarimtanu-section/shakarimtanu-section";
import { getT } from "@/lib/i18n/server";
import styles from "./shakarimtanu.module.scss";

// Композиция страницы. Hero — full-width сверху. Ниже — 2-колоночный
// layout на десктопе: TOC слева (sticky), секции справа. На мобилке —
// TOC горизонтальной полосой над контентом.
export async function Shakarimtanu({ data = {} }) {
  const t = await getT();
  const sections = data.sections ?? [];
  const tocItems = sections.map(({ id, number, title }) => ({
    id,
    number,
    title,
  }));

  return (
    <main className={styles.page}>
      <PageHero
        {...data.hero}
        breadcrumbs={[
          { label: t("common.home"), href: "/" },
          { label: t("pages.shakarimtanu") },
        ]}
        tone="academic"
      />

      <div className={styles.layout}>
        <aside className={styles.tocCol}>
          <ShakarimtanuToc items={tocItems} />
        </aside>

        <div className={styles.contentCol}>
          {sections.map((section) => (
            <ShakarimtanuSection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </main>
  );
}
