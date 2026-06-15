// Works — эндпоинты /api/works/ (см. API.md §1).
import { apiGet } from "./http";

// Массив work-карточек.
export function fetchWorks() {
  return apiGet("/works/");
}

// Категории со счётчиками: [{ category, count }].
export function fetchWorksCategories() {
  return apiGet("/works/categories/");
}

// Полная работа по slug + поле related. 404 → null.
export function fetchWork(slug) {
  return apiGet(`/works/${slug}/`, { allow404: true });
}
