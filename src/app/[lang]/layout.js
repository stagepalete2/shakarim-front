import "../globals.scss";
import { QueryProvider } from "@/components/providers/query-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { Header } from "@/components/layout/header/header";
import { SubHeader } from "@/components/layout/sub-header/sub-header";
import { Footer } from "@/components/layout/footer/footer";
import { JsonLd } from "@/components/seo/json-ld";
import { fetchSettings } from "@/lib/endpoints/pages";
import { LANGS, normalizeLang } from "@/lib/i18n/config";
import { SITE_URL, SITE_NAME, OG_LOCALE, SITE_SEO } from "@/lib/site";

// Пререндер по одной статической ветке на каждый язык.
export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

// Язык берём из сегмента URL ([lang]) — источник истины для локали.
export async function generateMetadata({ params }) {
  const lang = normalizeLang((await params).lang);
  const seo = SITE_SEO[lang] ?? SITE_SEO.kk;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: seo.title, template: `%s | ${SITE_NAME}` },
    description: seo.description,
    applicationName: SITE_NAME,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: `${SITE_URL}/${lang}`,
      locale: OG_LOCALE[lang] ?? OG_LOCALE.kk,
      title: seo.title,
      description: seo.description,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    icons: {
      icon: "/icons/logo.png",
      apple: "/icons/logo.png",
    },
  };
}

export default async function RootLayout({ children, params }) {
  const lang = normalizeLang((await params).lang);
  // Глобальные настройки — язык apiGet берёт из заголовка x-lang (proxy).
  const settings = await fetchSettings();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: (SITE_SEO[lang] ?? SITE_SEO.kk).title,
    url: SITE_URL,
    inLanguage: ["kk", "ru", "en"],
  };

  return (
    <html lang={lang}>
      <body suppressHydrationWarning>
        <JsonLd data={websiteSchema} />
        <LanguageProvider lang={lang}>
          <QueryProvider>
            <Header settings={settings} />
            <SubHeader settings={settings} />
            {children}
            <Footer settings={settings} />
          </QueryProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
