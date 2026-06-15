// Books — эндпоинты /api/books/ (см. API.md §2).
import { apiGet } from "./http";

export function fetchBooks() {
  return apiGet("/books/");
}

// [{ category, count }]
export function fetchBooksCategories() {
  return apiGet("/books/categories/");
}

// [{ tag, count }] — по убыванию частоты
export function fetchBooksTags() {
  return apiGet("/books/tags/");
}

// Полная книга по slug + related. 404 → null.
export function fetchBook(slug) {
  return apiGet(`/books/${slug}/`, { allow404: true });
}
