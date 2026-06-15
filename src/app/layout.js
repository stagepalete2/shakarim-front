import "./globals.scss";
import { QueryProvider } from "@/components/providers/query-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { Header } from "@/components/layout/header/header";
import { SubHeader } from "@/components/layout/sub-header/sub-header";
import { Footer } from "@/components/layout/footer/footer";
import { fetchSettings } from "@/lib/endpoints/pages";
import { getLang } from "@/lib/i18n/server";

export const metadata = {
  title: "Shakarim University",
  description: "Сайт Университета Шакарим",
};

export default async function RootLayout({ children }) {
  // Язык (cookie) и глобальные настройки — на всех страницах.
  const lang = await getLang();
  const settings = await fetchSettings();

  return (
    <html lang={lang}>
      <body suppressHydrationWarning>
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
