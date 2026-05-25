import "./globals.scss";
import { QueryProvider } from "@/components/providers/query-provider";
import { Header } from "@/components/layout/header/header";
import { SubHeader } from "@/components/layout/sub-header/sub-header";
import { Footer } from "@/components/layout/footer/footer";

export const metadata = {
  title: "Shakarim University",
  description: "Сайт Университета Шакарим",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body suppressHydrationWarning>
        <QueryProvider>
          <Header />
          <SubHeader />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
