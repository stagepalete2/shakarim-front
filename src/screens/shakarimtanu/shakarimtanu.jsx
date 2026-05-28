import { PageHero } from "@/components/ui/page-hero/page-hero";
import { SHAKARIMTANU } from "@/lib/shakarimtanu";
import { ShakarimtanuToc } from "./components/shakarimtanu-toc/shakarimtanu-toc";
import { ShakarimtanuSection } from "./components/shakarimtanu-section/shakarimtanu-section";
import styles from "./shakarimtanu.module.scss";

// Композиция страницы. Hero — full-width сверху. Ниже — 2-колоночный
// layout на десктопе: TOC слева (sticky), секции справа. На мобилке —
// TOC горизонтальной полосой над контентом.
export function Shakarimtanu({ data = SHAKARIMTANU }) {
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
          { label: "Главная", href: "/" },
          { label: "Шәкәрімтану" },
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
