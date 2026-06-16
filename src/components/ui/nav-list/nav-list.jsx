import { NavLink } from "@/components/ui/nav-link/nav-link"
import styles from "./nav-list.module.scss"

export function NavList({
  items,
  direction = "horizontal",
  className = "",
  ...rest
}) {
  return (
    <ul
      className={`${styles.list} ${styles[direction]} ${className}`}
      {...rest}
    >
      {items.map((item, i) => (
        <li key={`${item.href ?? item.label ?? "nav"}-${i}`} className={styles.item}>
          <NavLink href={item.href} onClick={item.onClick}>
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
