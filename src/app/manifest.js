import { SITE_NAME, SITE_SEO } from "@/lib/site";

// Web App Manifest (Next file-convention -> /manifest.webmanifest, ссылка
// подключается автоматически). theme_color — акцент проекта (#008B8A).
export default function manifest() {
  return {
    name: SITE_SEO.kk.title,
    short_name: SITE_NAME,
    description: SITE_SEO.kk.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#008B8A",
    icons: [
      { src: "/icons/logo.png", sizes: "any", type: "image/png" },
    ],
  };
}
