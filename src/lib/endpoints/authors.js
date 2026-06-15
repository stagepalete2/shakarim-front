// Authors — эндпоинты /api/authors/ (см. API.md §3).
import { apiGet } from "./http";

export function fetchAuthors() {
  return apiGet("/authors/");
}

// Автор по slug + fullBio/works/quotes + related. 404 → null.
export function fetchAuthor(slug) {
  return apiGet(`/authors/${slug}/`, { allow404: true });
}
