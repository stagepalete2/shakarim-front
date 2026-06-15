// Articles — эндпоинты /api/articles/ (см. API.md §4). Деталь питает /biography/[slug].
import { apiGet } from "./http";

export function fetchArticles() {
  return apiGet("/articles/");
}

// Статья по slug + body + related. 404 → null.
export function fetchArticle(slug) {
  return apiGet(`/articles/${slug}/`, { allow404: true });
}
