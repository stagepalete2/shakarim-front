import { QuickNavCard } from "@/components/ui/quick-nav-card/quick-nav-card";
import styles from "./quick-nav-section.module.scss";

export function QuickNavSection({ items = [] }) {
  return (
    <nav className={styles.section} aria-label="Танымал бөлімдер">
      <ul className={styles.grid}>
        {items.map((item, i) => (
          <li key={`${item.href ?? ""}-${i}`} className={styles.item}>
            <QuickNavCard
              title={item.title}
              href={item.href}
              icon={item.icon}
              image={item.image}
              imageAlt={item.imageAlt}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
