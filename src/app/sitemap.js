import { SITE_URL } from "@/lib/site";
import { fetchWorks } from "@/lib/endpoints/works";
import { fetchBooks } from "@/lib/endpoints/books";
import { fetchAuthors } from "@/lib/endpoints/authors";
import { fetchArticles } from "@/lib/endpoints/articles";
import { fetchArchive } from "@/lib/endpoints/archive";

// sitemap.xml (Next file-convention). Статические разделы + детальные страницы,
// slug'и которых берём из API. Каждый источник обёрнут в safe(): если бэкенд
// недоступен на билде — карта деградирует до статических маршрутов, сборка не
// падает (бэкенд при этом не меняется, только читается).

const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/biography", priority: 0.9, changeFrequency: "monthly" },
  { path: "/works", priority: 0.9, changeFrequency: "monthly" },
  { path: "/archive", priority: 0.8, changeFrequency: "monthly" },
  { path: "/shakarimtanu", priority: 0.8, changeFrequency: "monthly" },
  { path: "/tagzym", priority: 0.6, changeFrequency: "yearly" },
  { path: "/books", priority: 0.8, changeFrequency: "monthly" },
  { path: "/media", priority: 0.6, changeFrequency: "monthly" },
  { path: "/authors", priority: 0.7, changeFrequency: "monthly" },
];

// Безопасно получить список и превратить его в записи sitemap.
// prefix — базовый путь раздела ("/works"); items ожидаются как [{ slug, date? }].
async function safe(loader, prefix, { priority = 0.7, changeFrequency = "monthly" } = {}) {
  try {
    const list = await loader();
    if (!Array.isArray(list)) return [];
    return list
      .filter((item) => item && typeof item.slug === "string" && item.slug)
      .map((item) => ({
        url: `${SITE_URL}${prefix}/${item.slug}`,
        lastModified: item.date ? new Date(item.date) : new Date(),
        changeFrequency,
        priority,
      }));
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();
  const staticEntries = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const [works, books, authors, articles, archive] = await Promise.all([
    safe(fetchWorks, "/works", { priority: 0.7 }),
    safe(fetchBooks, "/books", { priority: 0.7 }),
    safe(fetchAuthors, "/authors", { priority: 0.6 }),
    safe(fetchArticles, "/biography", { priority: 0.7 }),
    safe(fetchArchive, "/archive", { priority: 0.6 }),
  ]);

  return [...staticEntries, ...works, ...books, ...authors, ...articles, ...archive];
}
