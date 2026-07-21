// Инъектор структурированных данных Schema.org (JSON-LD).
// Серверный компонент: рендерит <script type="application/ld+json"> с переданным
// объектом. data — обычный JS-объект схемы (@context/@type/...).
export function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      // Данные формируем на сервере из доверенного контента; JSON.stringify
      // экранирует кавычки. Дополнительно закрываем "</" на случай строк с тегами.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
