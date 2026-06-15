// Archive — эндпоинты /api/archive/ (см. API.md §5).
import { apiGet } from "./http";

export function fetchArchive() {
  return apiGet("/archive/");
}

// [{ id, label, short, description, count }]
export function fetchArchiveTypes() {
  return apiGet("/archive/types/");
}

// Полный item по slug + gallery/files/tabs + related. 404 → null.
export function fetchArchiveItem(slug) {
  return apiGet(`/archive/${slug}/`, { allow404: true });
}
