import Link from "next/link"
import styles from "./logo.module.scss"

export function Logo({ href = "/", children = "Shakarim", className = "", ...rest }) {
  return (
    <Link href={href} className={`${styles.logo} ${className}`} {...rest}>
      {children}
    </Link>
  );
}
