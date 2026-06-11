import { Logo } from "@/components/ui/logo/logo"
import Link from "next/link"
import styles from "./footer.module.scss"
import {
  InstagramIcon,
  TelegramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "./social-icons"

const NAV_LINKS = [
  { label: "Лицензия", href: "#" },
  { label: "О проекте", href: "#" },
  { label: "Контактная информация", href: "#" },
  { label: "Новости", href: "#" },
  { label: "Медиаматериалы", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "Telegram", href: "#", icon: <TelegramIcon /> },
  { label: "WhatsApp", href: "#", icon: <WhatsAppIcon /> },
  { label: "Instagram", href: "#", icon: <InstagramIcon /> },
  { label: "TikTok", href: "#", icon: <TikTokIcon /> },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoSlot}>
          <Logo href="/">
            <img src="/icons/logo.png" alt="" width={60} height={60}/>
            <div className={styles.title}>
              <label htmlFor="">Shakarim</label>
              <label htmlFor="">Kudaiberdiuly</label>
            </div>
          </Logo>
        </div>

        <nav className={styles.navSlot} aria-label="Навигация подвала">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.label} className={styles.navItem}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={styles.socials} aria-label="Социальные сети">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                className={styles.socialLink}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Университет Шакарим</p>
      </div>
    </footer>
  );
}
