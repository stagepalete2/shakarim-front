// Форматирование дат для отображения. Единый источник для всех карточек,
// hero-секций и т.п. На сервере и клиенте работает одинаково — Intl стабилен.

const ruLongDate = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatDate(date) {
  if (!date) return "";
  const d = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(d.getTime())) return "";
  return ruLongDate.format(d);
}
