// Составные/страничные эндпоинты (см. API.md §6–§10).
import { apiGet } from "./http";

export function fetchBiography() {
  return apiGet("/biography/");
}

export function fetchShakarimtanu() {
  return apiGet("/shakarimtanu/");
}

export function fetchTagzym() {
  return apiGet("/tagzym/");
}

export function fetchMedia() {
  return apiGet("/media/");
}

// Глобальные настройки (header/footer/nav) — нужны на всех страницах.
export function fetchSettings() {
  return apiGet("/settings/");
}

// Контент главной страницы.
export function fetchHome() {
  return apiGet("/home/");
}
