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
      {items.map((item) => (
        <li key={item.label} className={styles.item}>
          <NavLink href={item.href} onClick={item.onClick}>
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
