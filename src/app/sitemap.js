import { SITE_URL } from "@/lib/site";
import { LANGS, DEFAULT_LANG } from "@/lib/i18n/config";
import { fetchWorks } from "@/lib/endpoints/works";
import { fetchBooks } from "@/lib/endpoints/books";
import { fetchAuthors } from "@/lib/endpoints/authors";
import { fetchArticles } from "@/lib/endpoints/articles";
import { fetchArchive } from "@/lib/endpoints/archive";

// sitemap.xml (Next file-convention). Каждый маршрут отдаётся во всех локалях
// (/kk, /ru, /en) с hreflang-альтернативами — Google берёт языковые версии прямо
// из карты. Детальные страницы тянут slug'и из API; каждый источник обёрнут в
// safe(): при недоступном бэкенде карта деградирует до статических маршрутов
// (бэкенд не меняется, только читается).

const STATIC_ROUTES = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "/biography", priority: 0.9, changeFrequency: "monthly" },
  { path: "/works", priority: 0.9, changeFrequency: "monthly" },
  { path: "/archive", priority: 0.8, changeFrequency: "monthly" },
  { path: "/shakarimtanu", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tagzym", priority: 0.6, changeFrequency: "yearly" },
  { path: "/books", priority: 0.8, changeFrequency: "monthly" },
  { path: "/media", priority: 0.6, changeFrequency: "monthly" },
  { path: "/authors", priority: 0.7, changeFrequency: "monthly" },
];

// Одна запись на локаль для маршрута + общий hreflang-набор (kk/ru/en + x-default).
function localizedEntries(path, lastModified, { priority = 0.7, changeFrequency = "monthly" } = {}) {
  const languages = Object.fromEntries(
    LANGS.map((l) => [l, `${SITE_URL}/${l}${path}`]),
  );
  languages["x-default"] = `${SITE_URL}/${DEFAULT_LANG}${path}`;

  return LANGS.map((l) => ({
    url: `${SITE_URL}/${l}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: { languages },
  }));
}

// Безопасно получить список и развернуть в записи sitemap по всем локалям.
async function safe(loader, prefix, opts = {}) {
  try {
    const list = await loader();
    if (!Array.isArray(list)) return [];
    return list
      .filter((item) => item && typeof item.slug === "string" && item.slug)
      .flatMap((item) =>
        localizedEntries(
          `${prefix}/${item.slug}`,
          item.date ? new Date(item.date) : new Date(),
          opts,
        ),
      );
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.flatMap((r) =>
    localizedEntries(r.path, now, r),
  );

  const [works, books, authors, articles, archive] = await Promise.all([
    safe(fetchWorks, "/works", { priority: 0.7 }),
    safe(fetchBooks, "/books", { priority: 0.7 }),
    safe(fetchAuthors, "/authors", { priority: 0.6 }),
    safe(fetchArticles, "/biography", { priority: 0.7 }),
    safe(fetchArchive, "/archive", { priority: 0.6 }),
  ]);

  return [...staticEntries, ...works, ...books, ...authors, ...articles, ...archive];
}
