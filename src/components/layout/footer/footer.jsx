import { Logo } from "@/components/ui/logo/logo"
import { LocaleLink as Link } from "@/components/ui/locale-link/locale-link"
import { getT } from "@/lib/i18n/server"
import styles from "./footer.module.scss"
import {
  InstagramIcon,
  TelegramIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "./social-icons"

// network → иконка (см. API.md §10.1: socials[].network).
const SOCIAL_ICONS = {
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
};

// settings — глобальные настройки (см. API.md §10.1).
export async function Footer({ settings = {} }) {
  const t = await getT();
  const logo = settings.logo ?? "/icons/logo.png";
  const title = settings.siteTitle ?? { line1: "Shakarim", line2: "Kudaiberdiuly" };
  const footer = settings.footer ?? {};
  const navLinks = footer.navLinks ?? [];
  const socials = footer.socials ?? [];
  const copyright = footer.copyright ?? "Университет Шакарим";

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logoSlot}>
          <Logo href="/">
            <img src={logo} alt="" width={60} height={60}/>
            <div className={styles.title}>
              <label htmlFor="">{title.line1}</label>
              <label htmlFor="">{title.line2}</label>
            </div>
          </Logo>
        </div>

        <nav className={styles.navSlot} aria-label="Навигация подвала">
          <ul className={styles.navList}>
            {navLinks.map((link, i) => (
              <li key={`${link.href ?? link.label ?? ""}-${i}`} className={styles.navItem}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <ul className={styles.socials} aria-label="Социальные сети">
          {socials.map((s) => {
            const Icon = SOCIAL_ICONS[s.network];
            if (!Icon) return null;
            return (
              <li key={s.network ?? s.label}>
                <a
                  href={s.href}
                  className={styles.socialLink}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.bottom}>
        <p className={styles.grant}>{t("footer.grant")}</p>
        <p>© {new Date().getFullYear()} {copyright}</p>
      </div>
    </footer>
  );
}
