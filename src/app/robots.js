import { SITE_URL } from "@/lib/site";

// robots.txt (Next file-convention). Разрешаем обход всего сайта и указываем
// на sitemap. /api/ и служебное закрываем от индексации на всякий случай.
export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
