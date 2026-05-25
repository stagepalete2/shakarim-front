import Link from "next/link"
import styles from "./nav-link.module.scss"

export function NavLink({ href, children, className = "", ...rest }) {
  return (
    <Link href={href} className={`${styles.link} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
